'use client';

import { useCallback, useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";
import { CategoryType } from "@/interfaces/category-type";
import useAuthorStore from "@/store/useStoreAuthor";
import { UserType } from "@/interfaces/user-type";

type returnType = {
  author: UserType | null;
  categories: CategoryType[];
  setCategories: (categories: CategoryType[]) => void;
  isLoading: boolean;
};

export function useAuthor({authorName}: {authorName: string}): returnType {
  const { author, setAuthor, clearAuthor } = useAuthorStore();
  const { categories, setCategories, clearCategories } = useAuthorStore();
  const [isLoading, setIsLoading] = useState(false);

  const fetchAuthorInformation = useCallback(async () => {
    const decodedAuthorName = decodeURIComponent(authorName);
    if (author?.nickname === decodedAuthorName) return;
    try {
      const response = await axiosInstance.get(`/users/nickname/${decodedAuthorName}`);
      if (author?.id !== response.data.user.id) {
        setAuthor(response.data.user);
        const categoriesResponse = await axiosInstance.get(`/categories`, {
          params: { authorId: response.data.user.id }
        });
        setCategories(categoriesResponse.data.categories);
      }
    } catch (error) {
      console.error("Failed to fetch user or categories:", error);
    }
  }, [authorName, author, setAuthor, setCategories]);

  useEffect(() => {
    fetchAuthorInformation();
  }, [fetchAuthorInformation]);

  if (author?.nickname !== authorName) {
    return { author: null, categories: [], setCategories: () => {}, isLoading: true };
  }

  return { author, categories, setCategories, isLoading };
}