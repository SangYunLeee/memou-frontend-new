import { CategoryType } from '@/interfaces/category-type';
import { create } from 'zustand';

type returnType = {
  myCategories: CategoryType[];
  setMyCategories: (myCategories: CategoryType[]) => void;
};

const useMyCategoryStore = create<returnType>((set) => ({
  myCategories: [],
  setMyCategories: (myCategories) => set({ myCategories }),
}));

export default useMyCategoryStore;
