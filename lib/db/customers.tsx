import prisma from '@/lib/db/prisma'

export async function getCustomers(limit?: number) {
  return await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    ...(limit ? { take: limit } : {})
  })
}
