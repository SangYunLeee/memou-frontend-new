'use client';

import { useCallback, useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";
import { CategoryType } from "@/interfaces/category-type";
import useAuthorStore from "@/store/useStoreAuthor";
import { UserType } from "@/interfaces/user-type";
import { getAuthor } from "@/lib/author-client";

type returnType = {
  author: UserType | null;
  categories: CategoryType[];
  setCategories: (categories: CategoryType[]) => void;
  isLoading: boolean;
};

export function useAuthor({authorName}: {authorName: string}): returnType {
  const { author, setAuthor, categories, setCategories, clearAuthor, clearCategories } = useAuthorStore();
  const [isLoading, setIsLoading] = useState(false);

  const fetchAuthorInformation = useCallback(async () => {
    const decodedAuthorName = decodeURIComponent(authorName);
    if (author?.nickname === decodedAuthorName) return;
    try {
      const _author = await getAuthor({username: decodedAuthorName});
      setAuthor(_author);
      const categoriesResponse = await axiosInstance.get(`/categories`, {
        params: { authorId: _author.id }
      });
      setCategories(categoriesResponse.data.categories);
    } catch (error) {
      console.error("Failed to fetch user or categories:", error);
    }
  }, [authorName, author, setAuthor, setCategories]);

  useEffect(() => {
    fetchAuthorInformation();
    return () => {
      clearAuthor();
      clearCategories();
    }
  }, []);

  if (author?.nickname !== authorName) {
    return { author: null, categories: [], setCategories: () => {}, isLoading: true };
  }

  return { author, categories, setCategories, isLoading };
}
