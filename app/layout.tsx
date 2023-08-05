import './globals.css'
import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import SideBar from '@/components/SideBar'
import { SupabaseProvider } from '@/providers/SupabaseProvider'
import { UserProvider } from '@/providers/UserProvider'
import ModalProvider from '@/providers/ModalProvider'

const inter = Figtree({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Spotify',
  description: 'This is a realistic Spotify clone, made just with learning purposes.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            <SideBar>
              {children}
            </SideBar>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}
