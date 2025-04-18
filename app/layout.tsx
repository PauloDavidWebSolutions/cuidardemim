import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { dark } from '@clerk/themes'
import { ClerkProvider } from '@clerk/nextjs'
import Providers from '@/components/providers'
import { Inter, Playfair_Display } from 'next/font/google'

import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif'
})

export const metadata: Metadata = {
  title: 'Blade & Fade',
  description: 'A barbershop in the heart of the city'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark
      }}
    >
      <html
        lang='en'
        suppressHydrationWarning
        className='scroll-smooth antialiased'
      >
        <body
          className={cn(
            'flex min-h-screen flex-col font-sans antialiased',
            inter.variable,
            playfair.variable
          )}
        >
          <Providers>
            <main className='h-full grow'>{children}</main>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  )
}
