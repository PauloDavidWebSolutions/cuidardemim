import Link from 'next/link'
import { Category, Duration, Service } from '@prisma/client'
import ServiceItem from '@/components/service-item'

interface ServiceProps {
  services: (Service & {
    duration: Duration
    category: Category
  })[]
}

export default function Services({ services }: ServiceProps) {
  return (
    <ul className='mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5'>
      {services.map(service => (
        <li
          key={service.id}
          className='group relative overflow-hidden rounded-2xl'
        >
          <Link href={`/admin/services/${service.id}/edit`}>
            <ServiceItem service={service} />
          </Link>
        </li>
      ))}
    </ul>
  )
}
