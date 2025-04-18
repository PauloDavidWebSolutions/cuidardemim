import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

import pic1 from '@/public/images/leo-haircut-2.jpg'
import pic2 from '@/public/images/leo-haircut.jpg'
import pic3 from '@/public/images/leo-shave.jpg'
import pic5 from '@/public/images/leo-junior-haircut.jpg'
import pic6 from '@/public/images/c-beard.webp'

export default function Hero() {
  return (
    <main className='relative isolate'>
      <svg
        aria-hidden='true'
        className='absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-border [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]'
      >
        <defs>
          <pattern
            x='50%'
            y={-1}
            id='1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84'
            width={200}
            height={200}
            patternUnits='userSpaceOnUse'
          >
            <path d='M.5 200V.5H200' fill='none' />
          </pattern>
        </defs>
        <svg x='50%' y={-1} className='overflow-visible fill-border'>
          <path
            d='M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z'
            strokeWidth={0}
          />
        </svg>
        <rect
          fill='url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)'
          width='100%'
          height='100%'
          strokeWidth={0}
        />
      </svg>
      <div className='overflow-hidden'>
        <div className='container pb-32 pt-36 sm:pt-60 lg:pt-32'>
          <div className='mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center'>
            {/* Text */}
            <div className='relative w-full max-w-xl lg:mb-16 lg:shrink-0 xl:max-w-2xl'>
              <p className='text-xs font-medium uppercase tracking-wider text-primary'>
                Welcome To
              </p>
              <h1 className='mt-2 font-serif text-4xl font-bold lg:text-5xl'>
                Blade & Fade Barbershop
              </h1>
              <p className='mt-3 font-light text-muted-foreground'>
                We are a barbershop in the heart of the city, offering a range
                of services for all ages. Our team of experienced barbers are
                here to help you look and feel your best. Book an appointment or
                contact us for more information.
              </p>
              {/* <h1 className='text-4xl font-bold tracking-tight sm:text-6xl'>
                Welcome to Blade & Fade Barbershop
              </h1>
              <p className='mt-6 text-lg leading-8 text-muted-foreground sm:max-w-md lg:max-w-none'>
                We are a barbershop in the heart of the city, offering a range
                of services for all ages. Our team of experienced barbers are
                here to help you look and feel your best. Book an appointment or
                contact us for more information.
              </p> */}
              <div className='mt-10 flex items-center gap-x-4'>
                <Button asChild variant='secondary'>
                  <Link href='/book'>Book online</Link>
                </Button>
                <Button variant='link' asChild>
                  <Link href='/contact'>
                    Contact us <span aria-hidden='true'>→</span>
                  </Link>
                </Button>
              </div>
            </div>

            {/* Images */}
            <div className='mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0'>
              <div className='ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80'>
                <div className='relative'>
                  <Image
                    alt=''
                    src={pic1}
                    className='aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg'
                  />
                  <div className='pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10' />
                </div>
              </div>
              <div className='mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36'>
                <div className='relative'>
                  <Image
                    alt=''
                    src={pic2}
                    className='aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg'
                  />
                  <div className='pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10' />
                </div>
                <div className='relative'>
                  <Image
                    alt=''
                    src={pic3}
                    className='aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg'
                  />
                  <div className='pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10' />
                </div>
              </div>
              <div className='w-44 flex-none space-y-8 pt-32 sm:pt-0'>
                <div className='relative'>
                  <Image
                    alt=''
                    src={pic6}
                    className='aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg'
                  />
                  <div className='pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10' />
                </div>
                <div className='relative'>
                  <Image
                    alt=''
                    src={pic5}
                    className='aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg'
                  />
                  <div className='pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
