'use client'

import { usePathname } from 'next/navigation'
import { ThemeProvider, useTheme } from 'next-themes'

import Header from '@/components/header'
import Footer from '@/components/footer'
import { Toaster } from '@/components/ui/sonner'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      enableSystem
      attribute='class'
      defaultTheme='dark'
      disableTransitionOnChange
    >
      <Layout>{children}</Layout>
      <ToasterProvider />
    </ThemeProvider>
  )
}

function ToasterProvider() {
  const { resolvedTheme } = useTheme()

  return (
    <Toaster
      closeButton
      position='top-center'
      theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
    />
  )
}

function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')

  if (isAdmin) {
    return children
  }

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
