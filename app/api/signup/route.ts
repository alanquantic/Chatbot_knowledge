import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getPrismaClient } from '@/lib/db';
import { z } from 'zod';

// Force dynamic rendering - prevents build-time database connection
export const dynamic = 'force-dynamic'

const signupSchema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(6),
  name: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const prisma = getPrismaClient();
    const rawBody: unknown = await request.json();
    const parsed = signupSchema.safeParse(rawBody);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Datos inválidos. Verifica email y contraseña (mínimo 6 caracteres).' },
        { status: 400 }
      );
    }

    const email = parsed.data.email.trim().toLowerCase();
    const password = parsed.data.password;
    const name = parsed.data.name?.trim() || null;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email y contraseña son requeridos' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'El usuario ya existe' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    return NextResponse.json(
      { message: 'Usuario creado exitosamente', user: { id: user.id, email: user.email } },
      { status: 201 }
    );
  } catch (error) {
    const err = error as { code?: string } | null;
    // Unique constraint (race condition)
    if (err?.code === 'P2002') {
      return NextResponse.json({ error: 'El usuario ya existe' }, { status: 409 });
    }
    console.error('Error en signup:', error);
    return NextResponse.json(
      { error: 'Error al crear usuario' },
      { status: 500 }
    );
  }
}
