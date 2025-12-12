import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { buildDefaultKnowledgePaths, retrieveKnowledgeContext } from '@/lib/knowledge-retrieval'

export const dynamic = 'force-dynamic'

type ChatContentPart = {
  type?: unknown
  text?: unknown
  content?: unknown
}

function extractTextDeep(value: unknown, depth: number): string {
  if (depth <= 0) return ''
  if (typeof value === 'string') return value
  if (Array.isArray(value)) return value.map((v) => extractTextDeep(v, depth - 1)).filter(Boolean).join('\n')
  if (typeof value !== 'object' || value === null) return ''

  const obj = value as Record<string, unknown>
  const candidates: unknown[] = []
  if (Object.prototype.hasOwnProperty.call(obj, 'text')) candidates.push(obj.text)
  if (Object.prototype.hasOwnProperty.call(obj, 'value')) candidates.push(obj.value)
  if (Object.prototype.hasOwnProperty.call(obj, 'content')) candidates.push(obj.content)

  return candidates
    .map((c) => extractTextDeep(c, depth - 1))
    .filter((t) => t.trim().length > 0)
    .join('\n')
}

function extractAssistantText(rawContent: unknown): string {
  const text = extractTextDeep(rawContent, 5).trim()
  return text
}

function describeContentShape(rawContent: unknown): { kind: string; keys?: string[]; length?: number } {
  if (typeof rawContent === 'string') return { kind: 'string', length: rawContent.length }
  if (Array.isArray(rawContent)) {
    const first = rawContent[0]
    if (typeof first === 'object' && first !== null) {
      return { kind: 'array', length: rawContent.length, keys: Object.keys(first as Record<string, unknown>).slice(0, 15) }
    }
    return { kind: 'array', length: rawContent.length }
  }
  if (typeof rawContent === 'object' && rawContent !== null) return { kind: 'object', keys: Object.keys(rawContent as Record<string, unknown>).slice(0, 15) }
  return { kind: typeof rawContent }
}

const chatMessageSchema = z.object({
  role: z.enum(['system', 'user', 'assistant']),
  content: z.string().min(1),
})

const chatRequestSchema = z.object({
  messages: z.array(chatMessageSchema).min(1),
})

type ChatRequest = z.infer<typeof chatRequestSchema>

export async function POST(req: NextRequest) {
  const openAiApiKey = process.env.OPENAI_API_KEY
  if (!openAiApiKey) {
    return NextResponse.json(
      { error: 'OPENAI_API_KEY no está configurada en el servidor' },
      { status: 500 }
    )
  }

  let body: ChatRequest
  try {
    const rawBody: unknown = await req.json()
    body = chatRequestSchema.parse(rawBody)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Invalid request body'
    return NextResponse.json({ error: message }, { status: 400 })
  }

  const lastUserMessage = [...body.messages].reverse().find((m) => m.role === 'user')?.content
  const question = typeof lastUserMessage === 'string' ? lastUserMessage : ''
  const paths = buildDefaultKnowledgePaths(process.cwd())

  let knowledgeSnippetsText = ''
  try {
    const snippets = await retrieveKnowledgeContext(
      {
        question,
        maxSnippets: 5,
        maxCharsPerSnippet: 900,
        maxTotalChars: 3200,
      },
      paths
    )

    if (snippets.length > 0) {
      knowledgeSnippetsText = snippets
        .map((s) => `Fuente: ${s.source}\nSección: ${s.title}\n${s.content}`)
        .join('\n\n---\n\n')
        .trim()
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error cargando base de conocimiento'
    return NextResponse.json(
      { error: `Base de conocimiento inválida o inaccesible: ${message}` },
      { status: 500 }
    )
  }

  const knowledgeSystemMessage = {
    role: 'system' as const,
    content: [
      'Eres el Asistente Grabovoi. Responde en español y con tono práctico.',
      'Usa el CONTEXTO proporcionado abajo como fuente principal para secuencias, métodos, rutinas y PRK-1U.',
      'Si el contexto no contiene la respuesta específica, dilo explícitamente y pide una aclaración; no inventes secuencias.',
      'Mantén la respuesta concisa.',
      knowledgeSnippetsText.length > 0 ? `\nCONTEXTO:\n${knowledgeSnippetsText}` : '\nCONTEXTO: (vacío)',
    ].join('\n'),
  }

  const messagesWithContext = [knowledgeSystemMessage, ...body.messages]

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${openAiApiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-5-mini',
      messages: messagesWithContext,
      max_completion_tokens: 2000,
    }),
  })

  if (!response.ok) {
    const text = await response.text()
    return NextResponse.json(
      { error: `OpenAI API error: ${response.status} ${text}` },
      { status: 502 }
    )
  }

  const data: unknown = await response.json()
  const parsed = z
    .object({
      model: z.string().optional(),
      choices: z.array(
        z.object({
          finish_reason: z.string().optional(),
          message: z.object({
            content: z.unknown().optional(),
            refusal: z.string().nullable().optional(),
          }),
        })
      ),
    })
    .safeParse(data)

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Respuesta inválida del proveedor de IA' },
      { status: 502 }
    )
  }

  const choice0 = parsed.data.choices[0]
  const message = choice0?.message
  const content = extractAssistantText(message?.content)
  const refusal = typeof message?.refusal === 'string' ? message.refusal.trim() : ''

  if (content.length === 0) {
    if (refusal.length > 0) {
      return NextResponse.json(
        { error: `El proveedor de IA rechazó la solicitud: ${refusal}` },
        { status: 403 }
      )
    }
    if (choice0?.finish_reason === 'length') {
      return NextResponse.json(
        {
          error:
            'El proveedor de IA cortó la respuesta por límite de tokens (finish_reason=length). Incrementa max_completion_tokens o reduce el tamaño del prompt.',
          details: {
            model: parsed.data.model ?? null,
            finishReason: choice0?.finish_reason ?? null,
            contentShape: describeContentShape(message?.content),
          },
        },
        { status: 502 }
      )
    }
    return NextResponse.json(
      {
        error:
          'Respuesta vacía del proveedor de IA (response OK pero sin contenido). Revisa modelo/endpoint y el payload devuelto por OpenAI.',
        details: {
          model: parsed.data.model ?? null,
          finishReason: choice0?.finish_reason ?? null,
          contentShape: describeContentShape(message?.content),
        },
      },
      { status: 502 }
    )
  }

  return NextResponse.json({ message: content })
}


