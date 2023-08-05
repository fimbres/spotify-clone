"use client";

import React, { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import Box from './Box';
import SideBarItem from './SideBarItem';
import Library from './Library';
import { Song } from '@/types';

interface SideBarProps {
    children: React.ReactNode;
    songs: Song[];
};

const SideBar: React.FC<SideBarProps> = ({ children, songs }) => {
    const pathname = usePathname();
    const routes = useMemo(() => [
        {
            label: "Home",
            active: pathname !== '/search',
            href: '/',
            icon: HiHome
        },
        {
            label: "Search",
            active: pathname === '/search',
            href: '/search',
            icon: BiSearch
        },
    ], [pathname])

  return (
    <aside className='flex h-full'>
        <div className='hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2'>
            <Box>
                <div className='flex flex-col gap-y-4 px-5 py-4'>
                    {routes.map(route => (
                        <SideBarItem
                            key={route.label}
                            {...route}
                        />
                    ))}
                </div>
            </Box>
            <Box className='overflow-y-auto flex-1'>
                <Library songs={songs} />
            </Box>
        </div>
        <section className='h-full flex-1 overflow-y-auto py-2'>
            {children}
        </section>
    </aside>
  )
}

export default SideBar