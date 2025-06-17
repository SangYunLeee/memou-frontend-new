import { PostType } from '@/interfaces/post-type';
import { create } from 'zustand';

interface StoreState {
  post: PostType | undefined;
  setPost: (post: PostType | undefined) => void;
}

const useStore = create<StoreState>((set) => ({
  post: undefined,
  setPost: (post) => set({ post })
}));

export default useStore;
