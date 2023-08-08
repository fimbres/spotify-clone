import './globals.css'
import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import SideBar from '@/components/SideBar'
import { SupabaseProvider } from '@/providers/SupabaseProvider'
import { UserProvider } from '@/providers/UserProvider'
import ModalProvider from '@/providers/ModalProvider'
import { ToasterProvider } from '@/providers/ToasterProvider'
import { getSongsByUserId } from '@/actions/get_songs_by_user_id'
import Player from '@/components/Player'
import { getActiveProductsWithPrices } from '@/actions/get_active_products'

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
  const products = await getActiveProductsWithPrices();

  return (
    <html lang="en">
      <body className={inter.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider products={products} />
            <SideBar songs={userSongs}>
              {children}
            </SideBar>
            <Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}
