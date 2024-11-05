import { create } from "zustand";

type LetterStoreProps = {
  isModalOpen: boolean;
  secrets: string[];
  toggleModal: () => void;
  storeSecret: (text: string) => void
  updateSecret: (index: number, text: string) => void
  deleteSecret: (index: number) => void
}

export const useLetterStore = create<LetterStoreProps>((set,get) => ({
  isModalOpen: false,
  secrets: [],
  toggleModal: () => set(x => ({...x, isModalOpen: !x.isModalOpen})),
  storeSecret: (text) => {
    set(x => ({...x, secrets: [...x.secrets, text]}))
  },
  updateSecret:(index, secret)=> {
    set(x => ({...x, secrets: x.secrets.filter((_, i) => i !== index).concat([secret])}))
  },
  deleteSecret: ()=> void 0
}));