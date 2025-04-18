import prisma from '@/lib/db/prisma'

export async function getCategories() {
  return await prisma.category.findMany({
    where: {
      service: {
        some: {}
      }
    },
    orderBy: {
      name: 'asc'
    },
    include: {
      service: {
        include: {
          provider: {
            include: {
              user: true
            }
          },
          category: true,
          duration: true
        }
      }
    }
  })
}
