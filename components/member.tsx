import Image from 'next/image'

import { combineName } from '@/lib/db/users'
import { Provider, User } from '@prisma/client'

import { Badge } from '@/components/ui/badge'

interface MemberProps {
  member: Provider & {
    user: User
  }
}

export default function Member({ member }: MemberProps) {
  return (
    <>
      {(member.imageUrl || member.user.imageUrl) && (
        <div className='relative h-72 w-full overflow-hidden bg-muted sm:h-64'>
          <Image
            src={member.imageUrl || (member.user.imageUrl as string)}
            alt={combineName(member.user) || ''}
            className='object-cover object-center grayscale'
            sizes='25vw'
            priority
            fill
          />
        </div>
      )}

      <div className='absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/60' />

      <Badge className='absolute left-0 top-0 mb-2 -translate-x-full rounded-none opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100'>
        {member.jobTitle}
      </Badge>

      <div className='absolute inset-x-0 bottom-0 translate-y-2 px-6 py-5 text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100'>
        <h3 className='line-clamp-1 text-xl font-semibold tracking-tight text-primary'>
          {combineName(member.user)}
        </h3>

        <p className='line-clamp-2 text-sm font-light text-white/90'>
          {member.description}
        </p>
      </div>
    </>
  )
}
