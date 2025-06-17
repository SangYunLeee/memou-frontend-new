import { CategoryType } from '@/interfaces/category-type';
import { create } from 'zustand';

type returnType = {
  selectedCategory: CategoryType | undefined | null;
  setSelectedCategory: (category: CategoryType | null | undefined) => void;
};

const useAuthorCategoryStore = create<returnType>((set) => ({
  selectedCategory: null,
  setSelectedCategory: (category) => set({ selectedCategory: category}),
}));

export default useAuthorCategoryStore;
