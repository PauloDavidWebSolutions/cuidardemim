import Link from 'next/link'

import { PlusCircledIcon } from '@radix-ui/react-icons'
import { getServices } from '@/lib/db/services'

import { Button } from '@/components/ui/button'
import Services from '@/components/services'

export default async function ServicesPage() {
  const services = await getServices(10)

  return (
    <section>
      <div>
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='text-2xl font-semibold tracking-tight'>Services</h2>
          </div>
          <Button size='sm' className='h-7 gap-2' asChild>
            <Link href='/admin/services/new'>
              <PlusCircledIcon className='h-3.5 w-3.5' />
              <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
                Add service
              </span>
            </Link>
          </Button>
        </div>

        {services?.length > 0 ? (
          <Services services={services} />
        ) : (
          <div className='mt-6 text-sm text-muted-foreground'>
            No services found.
          </div>
        )}
      </div>
    </section>
  )
}
