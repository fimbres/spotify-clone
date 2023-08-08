"use client";

import React from 'react';
import { TbPlaylist } from 'react-icons/tb';
import { AiOutlinePlus } from 'react-icons/ai';
import { useAuthModal } from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/useUser';
import { useUploadModal } from '@/hooks/useUploadModal';
import { Song } from '@/types';
import MediaItem from './MediaItem';
import useOnPlay from '@/hooks/useOnPlay';
import { useSubscribeModal } from '@/hooks/useSubscribe';

interface LibraryProps {
    songs: Song[];
}

const Library: React.FC<LibraryProps> = ({ songs }) => {
    const authModal = useAuthModal();
    const subscribeModal = useSubscribeModal();
    const onPlay = useOnPlay(songs);
    const uploadModal = useUploadModal();
    const { user, subscription } = useUser();

    const handleClick = () => {
        if(!user) {
            authModal.onOpen();
        }

        if(!subscription) {
            subscribeModal.onOpen();
        }

        uploadModal.onOpen();
    }

  return (
    <div className='flex flex-col'>
        <div className='flex items-center justify-between px-5 pt-4'>
            <div className='inline-flex items-center gap-x-2'>
                <TbPlaylist size={26} className='text-neutral-400' />
                <p className='text-md text-neutral-400 font-medium'>Your Library</p>
            </div>
            <AiOutlinePlus onClick={handleClick} className='text-neutral-400 cursor-pointer hover:text-white transition' size={20} />
        </div>
        <div className='flex flex-col gap-y-2 mt-4 px-3'>
            {songs.map(song => (
                <MediaItem
                    onClick={() => onPlay(song.id)}
                    key={song.id}
                    data={song}
                />
            ))}
        </div>
    </div>
  )
}

export default Library
