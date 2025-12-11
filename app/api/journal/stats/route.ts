import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { prisma } from '@/lib/db'

// GET - Obtener estadísticas del usuario
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

    // Obtener o crear estadísticas
    let stats = await prisma.userStats.findUnique({
      where: { userId: user.id }
    })

    if (!stats) {
      stats = await prisma.userStats.create({
        data: {
          userId: user.id,
          totalPractices: 0,
          currentStreak: 0,
          longestStreak: 0,
          totalMinutes: 0,
          level: 1,
          experience: 0
        }
      })
    }

    // Obtener entradas recientes para análisis
    const entries = await prisma.journalEntry.findMany({
      where: { userId: user.id },
      orderBy: { date: 'desc' },
      take: 100
    })

    // Calcular estadísticas adicionales
    const totalEntries = entries.length
    
    // Secuencias más usadas
    const sequenceCount: Record<string, number> = {}
    entries.forEach((entry: any) => {
      entry.sequences.forEach((seq: string) => {
        sequenceCount[seq] = (sequenceCount[seq] || 0) + 1
      })
    })
    const topSequences = Object.entries(sequenceCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([seq, count]) => ({ sequence: seq, count }))

    // Mejora de ánimo promedio
    const moodImprovements = entries.map((e: any) => e.moodAfter - e.moodBefore)
    const avgMoodImprovement = moodImprovements.length > 0
      ? moodImprovements.reduce((a: number, b: number) => a + b, 0) / moodImprovements.length
      : 0

    // Prácticas por día de la semana
    const dayOfWeekCount: Record<number, number> = {}
    entries.forEach((entry: any) => {
      const day = new Date(entry.date).getDay()
      dayOfWeekCount[day] = (dayOfWeekCount[day] || 0) + 1
    })

    // Mejor día de la semana
    const bestDay = Object.entries(dayOfWeekCount)
      .sort(([, a], [, b]) => b - a)[0]
    
    const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
    const bestDayName = bestDay ? dayNames[parseInt(bestDay[0])] : null

    // Mejor hora del día
    const hourCount: Record<number, number> = {}
    entries.forEach((entry: any) => {
      const hour = new Date(entry.date).getHours()
      hourCount[hour] = (hourCount[hour] || 0) + 1
    })
    const bestHour = Object.entries(hourCount)
      .sort(([, a], [, b]) => b - a)[0]
    const bestHourFormatted = bestHour 
      ? `${bestHour[0].padStart(2, '0')}:00` 
      : null

    // Prácticas en los últimos 7 días
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    const recentPractices = entries.filter((e: any) => new Date(e.date) >= sevenDaysAgo).length

    // Prácticas este mes
    const startOfMonth = new Date()
    startOfMonth.setDate(1)
    startOfMonth.setHours(0, 0, 0, 0)
    const thisMonthPractices = entries.filter((e: any) => new Date(e.date) >= startOfMonth).length

    return NextResponse.json({
      stats,
      analytics: {
        totalEntries,
        topSequences,
        avgMoodImprovement: parseFloat(avgMoodImprovement.toFixed(2)),
        bestDay: bestDayName,
        bestHour: bestHourFormatted,
        recentPractices,
        thisMonthPractices,
        practicesByDay: dayOfWeekCount,
        practicesByHour: hourCount
      }
    })
  } catch (error) {
    console.error('Error al obtener estadísticas:', error)
    return NextResponse.json(
      { error: 'Error al obtener estadísticas' },
      { status: 500 }
    )
  }
}
