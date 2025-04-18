import { formatDateTime } from '@/lib/db/appointments'
import { getServiceBySlug } from '@/lib/db/services'
import { getProviderByCalUsername } from '@/lib/db/team'
import { combineName } from '@/lib/db/users'
import { CheckCircle } from 'lucide-react'
import { z } from 'zod'

const searchParamsSchema = z.object({
  name: z.string().optional(),
  email: z.array(z.string().email()).or(z.string().email()),
  eventTypeSlug: z.string(),
  user: z.string(),
  startTime: z.string().datetime(),
  endTime: z.string().datetime()
})

export default async function Success({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const params = searchParamsSchema.parse(searchParams)
  const { name, email, eventTypeSlug, user, startTime, endTime } = params

  const eventDateAndTime = formatAppointmentDateAndTime(startTime, endTime)

  const { service } = await getServiceBySlug(eventTypeSlug)
  const { provider } = await getProviderByCalUsername(user)

  return (
    <section className='pb-24 pt-40'>
      <div className='container max-w-5xl'>
        <h1 className='inline-flex items-center gap-2 text-2xl font-semibold'>
          <span>Your appointment is scheduled</span>
          <CheckCircle className='inline-block h-6 w-6 text-primary' />
        </h1>
        <p className='text-sm text-muted-foreground'>
          We&apos;ve sent you an email with the details.
        </p>

        <div className='mt-12 flex max-w-lg flex-col gap-2 divide-y px-2 text-sm'>
          <div className='flex justify-between gap-2 pt-2'>
            <h3 className='font-medium'>What</h3>
            <p>{service?.name}</p>
          </div>

          <div className='flex justify-between gap-2 pt-2'>
            <h3 className='font-medium'>When</h3>
            {eventDateAndTime}
          </div>

          <div className='flex justify-between gap-2 pt-2'>
            <h3 className='font-medium'>With</h3>
            <p>{combineName(provider?.user!)}</p>
          </div>

          <div className='flex justify-between gap-2 pt-2'>
            <h3 className='font-medium'>Where</h3>
            <p>123 Main St, Toronto ON L4G 3B5</p>
          </div>
        </div>

        <div className='mt-16 text-sm text-muted-foreground'>
          <div>
            <a href='tel:+11234567890'>(123) 456-7890</a>
          </div>

          <div className='mt-1'>
            <a href='mailto:info@bladeandfade.com'>info@bladeandfade.com</a>
          </div>

          <p className='mt-1 text-primary'>We look forward to seeing you!</p>
        </div>
      </div>
    </section>
  )
}

function formatAppointmentDateAndTime(startTime: string, endTime: string) {
  return (
    <div className='flex flex-col items-end gap-1'>
      <p>{formatDateTime(startTime, 'date')}</p>
      <time className='text-xs text-muted-foreground'>
        {formatDateTime(startTime, 'time')} – {formatDateTime(endTime, 'time')}
      </time>
    </div>
  )
}
