import Link from 'next/link'

import { combineName } from '@/lib/db/users'
import { PlusCircledIcon } from '@radix-ui/react-icons'
import { formatDateTime, getAppointments } from '@/lib/db/appointments'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'

export default async function Appointments() {
  const appointments = await getAppointments(10)

  return (
    <section>
      <div>
        <div className='flex items-center justify-between'>
          <h2 className='text-2xl font-semibold tracking-tight'>
            Appointments
          </h2>
          <Button size='sm' className='h-7 gap-2' asChild>
            <Link href='/admin/appointments/new'>
              <PlusCircledIcon className='h-3.5 w-3.5' />
              <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
                New appointment
              </span>
            </Link>
          </Button>
        </div>

        {appointments?.length > 0 ? (
          <Table className='mt-6'>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                {/* <TableHead>Email</TableHead> */}
                <TableHead>Phone</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map(appointment => (
                <TableRow key={appointment.id}>
                  <TableCell>{combineName(appointment.user)}</TableCell>
                  {/* <TableCell>{appointment.user.email}</TableCell> */}
                  <TableCell>{appointment.user.phone}</TableCell>
                  <TableCell>{appointment.service.name}</TableCell>
                  <TableCell>{appointment.provider.user.firstName}</TableCell>
                  <TableCell>
                    {formatDateTime(appointment.startDateTime, 'date')}
                  </TableCell>
                  <TableCell>
                    {formatDateTime(appointment.startDateTime, 'time')} –{' '}
                    {formatDateTime(appointment.endDateTime, 'time')}
                  </TableCell>
                  <TableCell>
                    <Button size='sm' className='h-7 gap-2' asChild>
                      <Link href={`/admin/appointments/${appointment.id}`}>
                        {/* <ShoppingCart className='text-primary-600 h-5 w-5' /> */}
                        Invoice
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className='mt-6 text-sm text-muted-foreground'>
            No appointments found.
          </div>
        )}
      </div>
    </section>
  )
}
