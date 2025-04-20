import Link from 'next/link'

import { PlusCircledIcon } from '@radix-ui/react-icons'
import { getCategories } from '@/lib/db/categories'

import { Button } from '@/components/ui/button'
import Categories from '@/components/categories'


export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <section>
      <div>
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='text-2xl font-semibold tracking-tight'>Categories</h2>
          </div>
          <Button size='sm' className='h-7 gap-2' asChild>
            <Link href='/admin/categories/new'>
              <PlusCircledIcon className='h-3.5 w-3.5' />
              <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
                Add Categorie
              </span>
            </Link>
          </Button>
        </div>

        {categories?.length > 0 ? (
          <Categories categories={categories} />
        ) : (
          <div className='mt-6 text-sm text-muted-foreground'>
            No categories found.
          </div>
        )}
      </div>
    </section>
  )
}
