import { create } from 'zustand';

interface SubscribeModalStoreProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useSubscribeModal = create<SubscribeModalStoreProps>(set => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
}));
