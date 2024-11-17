import { create } from "zustand";

type LetterStoreProps = {
  isModalOpen: boolean;
  toggleModal: () => void;
};

export const useLetterStore = create<LetterStoreProps>((set, get) => ({
  isModalOpen: false,
  secrets: [],
  toggleModal: () => set((x) => ({ ...x, isModalOpen: !x.isModalOpen })),
}));
