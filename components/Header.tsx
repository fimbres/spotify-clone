"use client";

import React from 'react'
import { useRouter } from 'next/navigation';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';
import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import Button from './Button';
import { useAuthModal } from '@/hooks/useAuthModal';

interface HeaderProps {
    children: React.ReactNode;
    className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
    const router = useRouter();
    const { onOpen } = useAuthModal();

    const handleLogout = () => {

    }

  return (
    <div className={`h-fit bg-gradient-to-b from-emerald-800 to-transparent p-6 ${className}`}>
        <div className='w-full mb-4 flex items-center justify-between'>
            <div className='hidden md:flex gap-x-2 items-center'>
                <button className='rounded-full bg-black flex items-center justify-center hover:opacity-75 transition' onClick={() => router.back()}>
                    <RxCaretLeft size={35} />
                </button>
                <button className='rounded-full bg-black flex items-center justify-center hover:opacity-75 transition' onClick={() => router.forward()}>
                    <RxCaretRight size={35} />
                </button>
            </div>
            <div className='flex md:hidden gap-x-2 items-center'>
                <button className='rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition'>
                    <HiHome className='text-black' size={20} />
                </button>
                <button className='rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition'>
                    <BiSearch className='text-black' size={20} />
                </button>
            </div>
            <div className='flex justify-between items-center gap-x-4'>
                <>
                    <div>
                        <Button className='bg-transparent text-neutral-300 font-medium' onClick={onOpen}>
                            Log in
                        </Button>
                    </div>
                    <div>
                        <Button className='bg-white px-6 py-2' onClick={onOpen}>
                            Sign Up
                        </Button>
                    </div>
                </>
            </div>
        </div>
        {children}
    </div>
  )
}

export default Header