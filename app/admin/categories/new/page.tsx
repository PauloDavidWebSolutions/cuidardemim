import BackButton from '@/components/back-button'
import NewCategoryForm from '@/components/new-category-form'
import { getCategories } from '@/lib/db/categories'

export default async function NewCategory() {
  const categories = await getCategories()  // If needed for any dropdowns or prefilled data

  return (
    <section>
      <BackButton href='/admin/categories' text='Back' />

      <div className='mt-4 max-w-2xl'>
        <h2 className='text-2xl font-semibold tracking-tight'>New Category</h2>

        <NewCategoryForm categories={categories} />
      </div>
    </section>
  )
}