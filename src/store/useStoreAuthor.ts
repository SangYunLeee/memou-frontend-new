import { CategoryType } from '@/interfaces/category-type';
import { UserType } from '@/interfaces/user-type';
import { create } from 'zustand';

type returnType = {
  // author category
  categories: CategoryType[];
  setCategories: (categories: CategoryType[]) => void;
  clearCategories: () => void;

  // author profile
  author: UserType | null;
  setAuthor: (author: UserType) => void;
  clearAuthor: () => void;
};

const useAuthorStore = create<returnType>((set) => ({
  // author category
  categories: [],
  setCategories: (categories) => set({ categories }),
  clearCategories: () => set({ categories: [] }),

  // author profile
  author: null,
  setAuthor: (author) => set({ author }),
  clearAuthor: () => set({ author: null }),
}));

export default useAuthorStore;
