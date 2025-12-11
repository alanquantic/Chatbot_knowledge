import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { prisma } from '@/lib/db'

// GET - Obtener entradas del diario del usuario
export async function GET(req: NextRequest) {
  try {
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

    // Obtener parámetros de query para filtrado
    const { searchParams } = new URL(req.url)
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    // Construir el filtro de fecha
    const dateFilter: any = {}
    if (startDate) {
      dateFilter.gte = new Date(startDate)
    }
    if (endDate) {
      dateFilter.lte = new Date(endDate)
    }

    // Obtener entradas
    const entries = await prisma.journalEntry.findMany({
      where: {
        userId: user.id,
        ...(Object.keys(dateFilter).length > 0 ? { date: dateFilter } : {})
      },
      orderBy: {
        date: 'desc'
      },
      take: limit,
      skip: offset
    })

    // Contar total de entradas
    const total = await prisma.journalEntry.count({
      where: {
        userId: user.id,
        ...(Object.keys(dateFilter).length > 0 ? { date: dateFilter } : {})
      }
    })

    return NextResponse.json({ 
      entries,
      total,
      hasMore: offset + limit < total
    })
  } catch (error) {
    console.error('Error al obtener entradas del diario:', error)
    return NextResponse.json(
      { error: 'Error al obtener entradas' },
      { status: 500 }
    )
  }
}

// POST - Crear nueva entrada del diario
export async function POST(req: NextRequest) {
  try {
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

    const body = await req.json()
    const { 
      date, 
      sequences, 
      intention, 
      moodBefore, 
      moodAfter, 
      results, 
      duration,
      notes 
    } = body

    // Validaciones
    if (!date || !sequences || !intention || !moodBefore || !moodAfter || !duration) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      )
    }

    if (moodBefore < 1 || moodBefore > 10 || moodAfter < 1 || moodAfter > 10) {
      return NextResponse.json(
        { error: 'El estado emocional debe estar entre 1 y 10' },
        { status: 400 }
      )
    }

    if (duration < 1) {
      return NextResponse.json(
        { error: 'La duración debe ser mayor a 0' },
        { status: 400 }
      )
    }

    // Crear entrada
    const entry = await prisma.journalEntry.create({
      data: {
        userId: user.id,
        date: new Date(date),
        sequences: Array.isArray(sequences) ? sequences : [sequences],
        intention,
        moodBefore: parseInt(moodBefore),
        moodAfter: parseInt(moodAfter),
        results: results || null,
        duration: parseInt(duration),
        notes: notes || null
      }
    })

    // Actualizar o crear estadísticas del usuario
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const stats = await prisma.userStats.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        totalPractices: 1,
        currentStreak: 1,
        longestStreak: 1,
        totalMinutes: parseInt(duration),
        lastPracticeDate: new Date(date),
        level: 1,
        experience: 10 // XP base por práctica
      },
      update: {
        totalPractices: { increment: 1 },
        totalMinutes: { increment: parseInt(duration) },
        lastPracticeDate: new Date(date),
        experience: { increment: 10 } // XP base por práctica
      }
    })

    // Calcular racha
    const lastPractice = stats.lastPracticeDate
    if (lastPractice) {
      const lastDate = new Date(lastPractice)
      lastDate.setHours(0, 0, 0, 0)
      
      const entryDate = new Date(date)
      entryDate.setHours(0, 0, 0, 0)
      
      const daysDiff = Math.floor((entryDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24))
      
      let newStreak = stats.currentStreak
      
      if (daysDiff === 1) {
        // Día consecutivo
        newStreak = stats.currentStreak + 1
      } else if (daysDiff === 0) {
        // Mismo día, mantener racha
        newStreak = stats.currentStreak
      } else if (daysDiff > 1) {
        // Se rompió la racha
        newStreak = 1
      }

      const newLongest = Math.max(newStreak, stats.longestStreak)

      // Actualizar racha
      await prisma.userStats.update({
        where: { userId: user.id },
        data: {
          currentStreak: newStreak,
          longestStreak: newLongest
        }
      })
    }

    // Calcular nivel basado en experiencia
    const newLevel = Math.floor(stats.experience / 100) + 1
    if (newLevel > stats.level) {
      await prisma.userStats.update({
        where: { userId: user.id },
        data: { level: newLevel }
      })
    }

    return NextResponse.json({ 
      entry,
      message: 'Entrada creada exitosamente' 
    }, { status: 201 })
  } catch (error) {
    console.error('Error al crear entrada del diario:', error)
    return NextResponse.json(
      { error: 'Error al crear entrada' },
      { status: 500 }
    )
  }
}
