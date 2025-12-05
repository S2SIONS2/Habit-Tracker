import { create } from "zustand";
import type { ReactNode } from "react";

type ModalState = {
    isOpen: boolean;
    content: ReactNode | null;
    openModal: (content: ReactNode) => void;
    closeModal: () => void;
}

export const useModalStore = create<ModalState>()((set) => ({
    isOpen: false,
    content: null,
    openModal: (content: ReactNode) => set({ isOpen: true, content }),
    closeModal: () => set({ isOpen: false }),
}))