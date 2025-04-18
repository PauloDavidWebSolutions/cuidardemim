import Image from 'next/image'
import { formatCurrency } from '@/lib/db/services'
import { Category, Duration, Service } from '@prisma/client'

interface ServiceProps {
  service: Service & {
    duration: Duration
    category: Category
  }
}

export default function ServiceItem({ service }: ServiceProps) {
  return (
    <>
      {service.imageUrl && (
        <div className='relative h-72 overflow-hidden bg-muted sm:h-64'>
          <Image
            src={service.imageUrl}
            alt={service.name || ''}
            className='object-cover object-center transition-transform duration-500 group-hover:scale-105'
            sizes='25vw'
            priority
            fill
          />
        </div>
      )}

      <div className='absolute inset-0 bg-black/50 transition-colors duration-500 group-hover:bg-black/70' />

      <div className='absolute inset-x-0 bottom-0 px-6 py-5 text-white'>
        <p className='text-2xl'>
          {formatCurrency({ amount: service.price, decimalPlaces: 0 })}
        </p>

        <h3 className='line-clamp-1 text-xl font-semibold tracking-tight text-primary'>
          {service.name}
        </h3>

        <p className='line-clamp-1 text-sm text-white/70'>
          {service.description}
        </p>
        <p className='mt-0.5 text-xs font-light text-white/70'>
          {service.category.name} – {service.duration.name}
        </p>
      </div>
    </>
  )
}
