import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'
import { Menu, Search } from 'lucide-react'

import { Input } from '@/components/ui/input'
import NavLink from '@/components/nav-link'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { ThemeToggle } from '@/components/theme-toggle'

export default function AdminDashboard({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className='flex min-h-screen w-full flex-col'>
      <header className='sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6'>
        <nav className='hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6'>
          <Link
            href='/'
            className='flex items-center gap-2 text-lg font-semibold text-primary md:text-base'
          >
            B&F
          </Link>
          <NavLink href='/admin/dashboard'>Dashboard</NavLink>
          <NavLink href='/admin/appointments'>Appointments</NavLink>
          <NavLink href='/admin/customers'>Customers</NavLink>
          <NavLink href='/admin/invoices'>Invoices</NavLink>
          <NavLink href='/admin/products'>Products</NavLink>
          <NavLink href='/admin/services'>Services</NavLink>
          <NavLink href='/admin/team'>Team</NavLink>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              className='shrink-0 md:hidden'
            >
              <Menu className='h-5 w-5' />
              <span className='sr-only'>Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side='left'>
            <nav className='grid gap-6 text-lg font-medium'>
              <Link
                href='/'
                className='flex items-center gap-2 text-lg font-semibold text-primary'
              >
                B&F
              </Link>
              <NavLink href='/admin/dashboard'>Dashboard</NavLink>
              <NavLink href='/admin/appointments'>Appointments</NavLink>
              <NavLink href='/admin/customers'>Customers</NavLink>
              <NavLink href='/admin/invoices'>Invoices</NavLink>
              <NavLink href='/admin/products'>Products</NavLink>
              <NavLink href='/admin/services'>Services</NavLink>
              <NavLink href='/admin/team'>Team</NavLink>
            </nav>
          </SheetContent>
        </Sheet>
        <div className='flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4'>
          {/* <form className='ml-auto flex-1 sm:flex-initial'>
            <div className='relative'>
              <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
              <Input
                type='search'
                placeholder='Search products...'
                className='pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]'
              />
            </div>
          </form> */}
          <div className='ml-auto flex items-center gap-5'>
            <ThemeToggle />
            <UserButton />
          </div>
        </div>
      </header>
      <main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8'>
        {children}
      </main>
    </div>
  )
}
