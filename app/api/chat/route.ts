import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

export const dynamic = 'force-dynamic'

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

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${openAiApiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4.1-mini',
      messages: body.messages,
      max_tokens: 800,
      temperature: 0.7,
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
      choices: z.array(
        z.object({
          message: z.object({
            content: z.string(),
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

  const content = parsed.data.choices[0]?.message.content
  if (!content) {
    return NextResponse.json(
      { error: 'Respuesta vacía del proveedor de IA' },
      { status: 502 }
    )
  }

  return NextResponse.json({ message: content })
}


