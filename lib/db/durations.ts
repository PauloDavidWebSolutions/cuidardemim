import prisma from '@/lib/db/prisma'

export async function getDurations() {
  return await prisma.duration.findMany({
    orderBy: {
      createdAt: 'asc'
    }
  })
}
