// components/category-item.tsx
import { Category } from '@prisma/client'
import Image from 'next/image'

interface CategoryItemProps {
  category: Category
}

export default function CategoryItem({ category }: CategoryItemProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl">
      <div className="w-full h-48 bg-gray-200">
        {/* Assuming imageUrl is available, replace with a default image if not */}
        {category.imageUrl ? (
          <Image src={category.imageUrl} alt={category.name} className="w-full h-full object-cover" />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-white text-lg font-semibold">
            No Image
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold">{category.name}</h3>
        {category.description && <p className="text-sm text-gray-600 mt-2">{category.description}</p>}
      </div>
    </div>
  )
}
