import { getCategories } from '@/lib/db/categories'
import BookingForm from '@/components/booking-form'

export default async function Book() {
  const categories = await getCategories()

  return (
    <section className='pb-24 pt-40'>
      <div className='container max-w-5xl'>
        <div>
          <BookingForm categories={categories} />
        </div>
      </div>
    </section>
  )
}
