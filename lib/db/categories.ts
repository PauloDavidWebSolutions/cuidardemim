import prisma from '@/lib/db/prisma'

export async function getCategories() {
  return await prisma.category.findMany({
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


// Function to create a new category
export async function createCategory(data: {
  name: string
  description?: string
  imageUrl?: string
}) {
  return await prisma.category.create({
    data: {
      name: data.name,
      description: data.description || null,
      imageUrl: data.imageUrl || null
    }
  })
}