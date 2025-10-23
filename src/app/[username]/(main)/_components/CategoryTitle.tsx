'use client';

import useAuthorCategoryStore from "../../_store/useStoreAuthorCategory";

export default function CategoryTitle() {
  const { selectedCategory } = useAuthorCategoryStore();

  if (!selectedCategory) {
    return <h2 className="text-2xl font-bold">게시글 목록</h2>;
  }

  // 부모 카테고리가 있으면 "부모 - 자식" 형식으로 표시
  const title = selectedCategory.parent
    ? `${selectedCategory.parent.categoryName} - ${selectedCategory.categoryName}`
    : selectedCategory.categoryName;

  return <h2 className="text-2xl font-bold">{title}</h2>;
}
