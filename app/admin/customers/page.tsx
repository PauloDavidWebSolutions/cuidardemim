import Link from 'next/link'

import { combineName } from '@/lib/db/users'
import { PlusCircledIcon } from '@radix-ui/react-icons'
import { getCustomers } from '@/lib/db/customers'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

import { Button } from '@/components/ui/button'

export default async function Customers() {
  const customers = await getCustomers(10)

  return (
    <section>
      <div>
        <div className='flex items-center justify-between'>
          <h2 className='text-2xl font-semibold tracking-tight'>Customers</h2>

          <Button size='sm' className='h-7 gap-2' asChild>
            <Link href='/admin/customers/new'>
              <PlusCircledIcon className='h-3.5 w-3.5' />
              <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
                Add customer
              </span>
            </Link>
          </Button>
        </div>

        {customers?.length > 0 ? (
          <Table className='mt-6'>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map(customer => (
                <TableRow key={customer.id}>
                  <TableCell>{combineName(customer)}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>{customer.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className='mt-6 text-sm text-muted-foreground'>
            No customers found.
          </div>
        )}
      </div>
    </section>
  )
}
