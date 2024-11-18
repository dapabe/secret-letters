import { type ExtractTypedKeys } from "#/common/types/generic";
import { create } from "zustand";

type IModalStore = {
  createLetterModal: boolean;
  toggleModal: (modal: ExtractTypedKeys<IModalStore, boolean>) => void;
};

export const useModalStore = create<IModalStore>((set) => ({
  createLetterModal: false,
  toggleModal: (modal) => set((x) => ({ ...x, [modal]: !x[modal] })),
}));
