import './globals.css'
import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import SideBar from '@/components/SideBar'
import { SupabaseProvider } from '@/providers/SupabaseProvider'
import { UserProvider } from '@/providers/UserProvider'
import ModalProvider from '@/providers/ModalProvider'
import { ToasterProvider } from '@/providers/ToasterProvider'
import { getSongsByUserId } from '@/actions/get_songs_by_user_id'

const inter = Figtree({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Spotify',
  description: 'This is a realistic Spotify clone, made just with learning purposes.',
}

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const userSongs = await getSongsByUserId();
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            <SideBar songs={userSongs}>
              {children}
            </SideBar>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}
