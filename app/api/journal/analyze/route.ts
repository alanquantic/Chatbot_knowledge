import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { getPrismaClient } from '@/lib/db'
import { z } from 'zod'

// Force dynamic rendering - prevents build-time database connection
export const dynamic = 'force-dynamic'

type OpenAIChatCompletionRequestMessage = {
  role: 'system' | 'user' | 'assistant'
  content: string
}

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

// POST - Analizar patrones y generar insights con IA
export async function POST(req: NextRequest) {
  try {
    const prisma = getPrismaClient()
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })
    }

    // Obtener entradas recientes
    const entries = await prisma.journalEntry.findMany({
      where: { userId: user.id },
      orderBy: { date: 'desc' },
      take: 50 // Analizar últimas 50 entradas
    })

    if (entries.length === 0) {
      return NextResponse.json({
        insights: [],
        suggestions: [],
        message: 'Aún no hay suficientes datos para el análisis. Continúa practicando!'
      })
    }

    // Preparar datos para la IA
    const analysisData = {
      totalEntries: entries.length,
      entries: entries.map((e: any) => ({
        date: e.date.toISOString(),
        sequences: e.sequences,
        intention: e.intention,
        moodBefore: e.moodBefore,
        moodAfter: e.moodAfter,
        moodImprovement: e.moodAfter - e.moodBefore,
        duration: e.duration,
        results: e.results,
        dayOfWeek: new Date(e.date).toLocaleDateString('es-ES', { weekday: 'long' }),
        hour: new Date(e.date).getHours()
      }))
    }

    // Llamar a la IA para análisis
    const prompt = `Eres un experto analista de prácticas espirituales con Grabovoi. Analiza el siguiente historial de prácticas del usuario y proporciona insights y sugerencias personalizadas.

Datos del usuario:
- Total de prácticas registradas: ${analysisData.totalEntries}
- Prácticas recientes: ${JSON.stringify(analysisData.entries, null, 2)}

Por favor analiza:
1. Patrones temporales (¿cuándo tiene mejores resultados?)
2. Secuencias más efectivas para este usuario
3. Correlación entre estado emocional y resultados
4. Intenciones que más trabaja
5. Áreas de mejora

Proporciona:
- 3-5 insights específicos basados en los datos
- 3-5 sugerencias prácticas y personalizadas

Responde en JSON con la siguiente estructura:
{
  "insights": [
    {
      "title": "Título del insight",
      "description": "Descripción detallada del patrón encontrado",
      "icon": "emoji relevante"
    }
  ],
  "suggestions": [
    {
      "title": "Título de la sugerencia",
      "description": "Acción específica recomendada",
      "priority": "alta" | "media" | "baja",
      "sequences": ["secuencias recomendadas si aplica"]
    }
  ],
  "summary": "Resumen general del análisis en 2-3 líneas"
}

Reglas de longitud:
- description (insights y suggestions): máximo 220 caracteres cada una
- summary: máximo 320 caracteres

Responde con JSON puro, sin bloques de código ni formato markdown.`

    const openAiApiKey = process.env.OPENAI_API_KEY
    if (!openAiApiKey) {
      return NextResponse.json(
        { error: 'OPENAI_API_KEY no está configurada en el servidor' },
        { status: 500 }
      )
    }

    const messages: OpenAIChatCompletionRequestMessage[] = [
      {
        role: 'system',
        content:
          'Eres un experto analista de prácticas espirituales con las enseñanzas de Grigori Grabovoi. Proporcionas insights precisos y sugerencias prácticas basadas en datos.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ]

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${openAiApiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-5.2',
        messages,
        response_format: { type: 'json_object' },
        max_completion_tokens: 2600,
      })
    })

    if (!response.ok) {
      throw new Error(`IA API error: ${response.statusText}`)
    }

    const aiResponse: unknown = await response.json()
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
      .safeParse(aiResponse)

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
      return NextResponse.json(
        {
          error: 'Respuesta vacía del proveedor de IA',
          details: {
            model: parsed.data.model ?? null,
            finishReason: choice0?.finish_reason ?? null,
            contentShape: describeContentShape(message?.content),
          },
        },
        { status: 502 }
      )
    }

    const analysisResult = JSON.parse(content)

    return NextResponse.json(analysisResult)
  } catch (error) {
    console.error('Error al analizar con IA:', error)
    return NextResponse.json(
      { error: 'Error al generar análisis' },
      { status: 500 }
    )
  }
}
