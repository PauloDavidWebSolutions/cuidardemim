'use server'

import { z } from 'zod'
import { auth } from '@clerk/nextjs/server'
import { createCategory } from '@/lib/db/categories' // Import the function to create a category

// Define schema for category creation (you can expand this if necessary)
const NewCategorySchema = z.object({
  name: z.string().min(1, 'Category name is required'),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
})

export async function createNewCategoryAction(data: z.infer<typeof NewCategorySchema>) {
  const { userId } = auth()

  if (!userId) {
    return { error: 'Unauthorized' }
  }

  // Validate input data against the schema
  const result = NewCategorySchema.safeParse(data)
  
  if (result.error) {
    return { error: 'Form validation error.' }
  }

  try {
    // Create the category using Prisma
    const category = await createCategory(result.data)

    if (!category) {
      throw new Error('Failed to create category')
    }

    // Optionally, you can perform additional actions here like revalidating paths
    // e.g., revalidatePath(`/admin/categories`)

    return { category }
  } catch (error) {
    console.error(error)
    return { error: 'Error creating category' }
  }
}
