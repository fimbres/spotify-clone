import { create } from 'zustand';

interface AuthModalStoreProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useAuthModal = create<AuthModalStoreProps>(set => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
}));
