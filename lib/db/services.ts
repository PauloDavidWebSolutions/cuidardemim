import prisma from '@/lib/db/prisma'

export async function getServices(limit?: number) {
  const services = await prisma.service.findMany({
    include: {
      category: true,
      duration: true
    },
    orderBy: { name: 'asc' },
    ...(limit ? { take: limit } : {})
  })

  return services
}

export async function getServiceBySlug(slug: string) {
  try {
    const service = await prisma.service.findFirst({
      where: { calEventSlug: slug },
      include: {
        category: true,
        duration: true
      }
    })
    return { service }
  } catch (error) {
    return { error }
  }
}

export async function createService(data: {
  name: string
  description: string
  price: number
  imageUrl?: string
  categoryId: string
  durationId: string
  providers: string[]
  calEventId: number
  calEventSlug: string
}) {
  return await prisma.service.create({
    data: {
      name: data.name,
      description: data.description,
      price: data.price,
      imageUrl: data.imageUrl,
      categoryId: data.categoryId,
      durationId: data.durationId,
      calEventId: data.calEventId,
      calEventSlug: data.calEventSlug,
      provider: {
        connect: data.providers.map(providerId => ({ id: providerId }))
      }
    }
  })
}

export function formatCurrency({
  amount,
  local = 'en-US',
  currency = 'USD',
  decimalPlaces = 2
}: {
  amount: number
  local?: string
  currency?: string
  decimalPlaces?: number
}) {
  if (typeof amount !== 'number' || isNaN(amount)) return

  const { format } = new Intl.NumberFormat(local, {
    style: 'currency',
    currency,
    maximumFractionDigits: decimalPlaces
  })

  return format(amount)
}

export function createUniqueSlugFromName(name: string) {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')

  const uniqueIdentifier = Date.now().toString().slice(-6)
  return `${slug}-${uniqueIdentifier}`
}
