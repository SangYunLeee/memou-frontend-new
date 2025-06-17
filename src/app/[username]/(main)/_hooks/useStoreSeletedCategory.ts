import { useEffect, useState } from "react";
import useAuthorCategoryStore from "../../_store/useStoreAuthorCategory";
import { useSearchParams } from "next/navigation";
import { flattenItems } from "@/lib/utility";
import useAuthorStore from "@/store/useStoreAuthor";

export function useStoreSeletedCategory() {
  const { setSelectedCategory } = useAuthorCategoryStore();
  const searchParams = useSearchParams();
  const level1CategoryName = searchParams.get('category');
  const level2CategoryName = searchParams.get('subCategory');
  const { categories } = useAuthorStore();
  const flattenedCategories = flattenItems(categories);

  useEffect(() => {
    if (!level1CategoryName && !level2CategoryName) {
      setSelectedCategory(null);
      return;
    }
    const level1Category = flattenedCategories.find((category) => category.categoryName === level1CategoryName);
    const level2Category = flattenedCategories.find((category) => category.categoryName === level2CategoryName);
    // 검색된 카테고리가 없으면 종료
    if (!level1Category) {
      return;
    }
    // 검색된 카테고리의 부모 카테고리가 있으면 부모 카테고리를 설정
    if (level2Category) {
      level2Category.parent = level1Category;
    }
    // 검색된 카테고리를 설정
    setSelectedCategory(level2Category ?? level1Category ?? undefined);
  }, [level1CategoryName, level2CategoryName]);

  useEffect(() => {
    return () => {
      setSelectedCategory(undefined);
    }
  }, []);
  return null;
}
