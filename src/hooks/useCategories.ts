import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";
import { CategoryType } from "@/interfaces/category-type";
import React from "react";

type returnType = {
  categories: CategoryType[];
  setCategories: React.Dispatch<React.SetStateAction<CategoryType[]>>;
  isLoading: boolean;
  error: Error | null;
};

export function useCategories(): returnType {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get(`/categories/me`);

        if (isMounted) {
          setCategories(response.data);
          setError(null);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Failed to fetch categories:", error);
          setError(error instanceof Error ? error : new Error('Failed to fetch categories'));
          setCategories([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  return { categories, setCategories, isLoading, error };
}
