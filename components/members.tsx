import Link from 'next/link'
import { Provider, User } from '@prisma/client'
import Member from '@/components/member'

interface MembersProps {
  team: (Provider & {
    user: User
  })[]
}

export default function Members({ team }: MembersProps) {
  return (
    <ul className='mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5'>
      {team.map(member => (
        <li
          key={member.id}
          className='group relative overflow-hidden rounded-2xl'
        >
          <Link href={`/admin/members/${member.id}/edit`}>
            <Member member={member} />
          </Link>
        </li>
      ))}
    </ul>
  )
}
