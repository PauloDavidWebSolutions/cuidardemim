
import prisma from '@/lib/db/prisma'

export async function getTeam(limit?: number) {
  return await prisma.provider.findMany({
    include: { user: true },
    orderBy: { createdAt: 'desc' },
    ...(limit ? { take: limit } : {})
  })
}

export async function getProviderByCalUsername(calUsername: string) {
  try {
    const provider = await prisma.provider.findUnique({
      where: { calUsername: calUsername },
      include: { user: true }
    })

    return { provider }
  } catch (error) {
    return { error }
  }
}
