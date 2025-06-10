import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";
import { CategoryType } from "@/interfaces/category-type";
import useMyCategoryStore from "@/store/useStoreMyCategory";

type returnType = {
  myCategories: CategoryType[];
  setMyCategories: (myCategories: CategoryType[]) => void;
  isLoading: boolean;
  error: Error | null;
};

export function useCategories(): returnType {
  const { myCategories, setMyCategories } = useMyCategoryStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get(`/categories/me`);

        if (isMounted) {
          setMyCategories(response.data);
          setError(null);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Failed to fetch categories:", error);
          setError(error instanceof Error ? error : new Error('Failed to fetch categories'));
          setMyCategories([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    if (myCategories.length > 0) {
      setIsLoading(false);
      return;
    }

    fetchCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  return { myCategories, setMyCategories, isLoading, error };
}
