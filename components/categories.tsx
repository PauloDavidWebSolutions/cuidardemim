// components/categories.tsx
import Link from 'next/link'
import { Category } from '@prisma/client'
import CategoryItem from '@/components/category-item'

interface CategoriesProps {
  categories: Category[]
}

export default function Categories({ categories }: CategoriesProps) {
  return (
    <ul className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
      {categories.map(category => (
        <li key={category.id} className="group relative overflow-hidden rounded-2xl">
          <Link href={`/admin/categories/${category.id}/edit`}>
            <CategoryItem category={category} />
          </Link>
        </li>
      ))}
    </ul>
  )
}
