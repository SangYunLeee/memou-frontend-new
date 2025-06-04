import { UserType } from '@/interfaces/user-type';
import { create } from 'zustand';

interface StoreState {
  author: UserType | undefined;
  setAuthor: (author: UserType | undefined) => void;
}

const useStore = create<StoreState>((set) => ({
  author: undefined,
  setAuthor: (author) => set({ author })
}));

export default useStore;
