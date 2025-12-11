import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { getPrismaClient } from '@/lib/db'

// Force dynamic rendering - prevents build-time database connection
export const dynamic = 'force-dynamic'

// DELETE - Eliminar una entrada del diario
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params

    // Verificar que la entrada pertenece al usuario
    const entry = await prisma.journalEntry.findUnique({
      where: { id }
    })

    if (!entry) {
      return NextResponse.json({ error: 'Entrada no encontrada' }, { status: 404 })
    }

    if (entry.userId !== user.id) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 403 })
    }

    // Eliminar entrada
    await prisma.journalEntry.delete({
      where: { id }
    })

    // Actualizar estadísticas (decrementar)
    await prisma.userStats.update({
      where: { userId: user.id },
      data: {
        totalPractices: { decrement: 1 },
        totalMinutes: { decrement: entry.duration }
      }
    })

    return NextResponse.json({ 
      message: 'Entrada eliminada exitosamente' 
    })
  } catch (error) {
    console.error('Error al eliminar entrada:', error)
    return NextResponse.json(
      { error: 'Error al eliminar entrada' },
      { status: 500 }
    )
  }
}
