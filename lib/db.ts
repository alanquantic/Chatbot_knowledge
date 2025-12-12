import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createPrismaClient(): PrismaClient {
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  })
}

export function getPrismaClient(): PrismaClient {
  if (globalForPrisma.prisma) {
    return globalForPrisma.prisma
  }

  if (!process.env.DATABASE_URL) {
    throw new Error(
      'Missing required env var DATABASE_URL. Set it in your Vercel Project Settings (Production/Preview) and locally in .env.'
    )
  }

  const prisma = createPrismaClient()

  // Cache PrismaClient globally to avoid exhausting DB connections,
  // especially in serverless environments (e.g., Vercel) where modules can be reused.
  globalForPrisma.prisma = prisma

  return prisma
}
