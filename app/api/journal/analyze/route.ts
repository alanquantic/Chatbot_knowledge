import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { getPrismaClient } from '@/lib/db'

// Force dynamic rendering - prevents build-time database connection
export const dynamic = 'force-dynamic'

type OpenAIChatCompletionRequestMessage = {
  role: 'system' | 'user' | 'assistant'
  content: string
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
    const prompt = `Eres un experto analista de prácticas espirituales con Grabovoi. Analiza el siguiente historial de prácticas del usuario y proporciona insights profundos y sugerencias personalizadas.

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
        model: 'gpt-5-mini',
        messages,
        response_format: { type: 'json_object' },
        max_tokens: 2000,
        temperature: 0.7
      })
    })

    if (!response.ok) {
      throw new Error(`IA API error: ${response.statusText}`)
    }

    const aiResponse = await response.json()
    const analysisResult = JSON.parse(aiResponse.choices[0].message.content)

    return NextResponse.json(analysisResult)
  } catch (error) {
    console.error('Error al analizar con IA:', error)
    return NextResponse.json(
      { error: 'Error al generar análisis' },
      { status: 500 }
    )
  }
}
