import BackButton from '@/components/back-button'
import NewServiceForm from '@/components/new-service-form'
import { getCategories } from '@/lib/db/categories'
import { getDurations } from '@/lib/db/durations'
import { getTeam } from '@/lib/db/team'

export default async function NewService() {
  const categories = await getCategories()
  const durations = await getDurations()
  const team = await getTeam()

  return (
    <section>
      <BackButton href='/admin/services' text='Back' />

      <div className='mt-4 max-w-2xl'>
        <h2 className='text-2xl font-semibold tracking-tight'>New service</h2>

        <NewServiceForm
          categories={categories}
          durations={durations}
          team={team}
        />
      </div>
    </section>
  )
}
