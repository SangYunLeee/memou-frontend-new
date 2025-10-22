'use client';
import { useEffect, useMemo, useState } from "react";
import { useCategories } from "@/hooks/useMyCategories";
import { convert, getAddedItems, getChangedItems, getDeletedItems, getItemsNotFinished } from "./ContentCategory.fn";
import { TreeItem } from "./_components/dnd-kit/Tree/types";
import { flattenTree } from "./_components/dnd-kit/Tree/utilities";
import { SortableTree } from "./_components/dnd-kit/Tree/SortableTree";
import { UniqueIdentifier } from "@dnd-kit/core";
import { axiosInstance } from "@/lib/axios";
import { revalidatePosts } from "@/actions/postAction";

export default function ContentCategory() {
  const { myCategories, setMyCategories, isLoading, error } = useCategories();
  const originItems = useMemo(() => convert(myCategories), [myCategories]);
  const [items, setItems] = useState<TreeItem[]>([]);
  const flattenedItems = useMemo(() => flattenTree(items), [items]);
  const [newCategoryId, setNewCategoryId] = useState(-1);

  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    setItems(originItems);
  }, [originItems]);

  const handleAdd = () => {
    setItems((items) => [...items, { id: newCategoryId, name: '새 카테고리', children: [], count: 0, tempPostCount: 0, pos: 0, isEditing: true }]);
    setNewCategoryId(newCategoryId - 1);
  };

  const handleItemChanged = (id: UniqueIdentifier) => {
    setIsChanged(true);
  };

  const handleApply = async () => {
    const itemsNotFinished = getItemsNotFinished(flattenedItems);
    if (itemsNotFinished.length > 0) {
      alert('변경사항이 완료되지 않았습니다.');
      return;
    }
    const originalFlattenedItems = flattenTree(originItems).map((item) => ({...item, index: item.pos}));
    // 변경사항 적용
    // 삭제 대상
    const deletedItems = getDeletedItems(originalFlattenedItems, flattenedItems);
    // 추가 대상
    const addedItems = getAddedItems(originalFlattenedItems, flattenedItems).map((item) => ({...item, categoryName: item.name, pos: item.index, parentId: item.parentId}));
    // 변경 대상
    const changedItems = getChangedItems(originalFlattenedItems, flattenedItems).map((item) => ({...item, categoryName: item.name, pos: item.index, parentId: item.parentId}));

    if (deletedItems.length + addedItems.length + changedItems.length === 0) {
      alert('변경사항이 없습니다.');
      return;
    }

    const response = await axiosInstance.patch('/categories/list', {
      categoryIdsToDelete: deletedItems.map((item) => item.id),
      categoriesToAdd: addedItems,
      categoriesToUpdate: changedItems,
    });
    setMyCategories(response.data.categories);
    alert('카테고리 변경사항이 적용되었습니다.');
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-center">카테고리 설정</h2>
      <div className="mt-4">
        <SortableTree collapsible removable indicator items={items} setItems={setItems} handleItemChanged={handleItemChanged} />
        <div className="bg-gray-100 px-4 py-2 cursor-pointer border border-gray-300 border-solid" onClick={handleAdd}>+ 카테고리 추가</div>
      </div>
      <div className="flex justify-end mt-4">
        <button className={`px-4 py-2 border border-gray-300 border-solid ${isChanged ? 'bg-gray-100 text-gray-700' : 'bg-gray-100 text-gray-500 cursor-not-allowed'}`} onClick={handleApply}>
          카테고리 변경사항 적용
        </button>
      </div>
    </>
  );
}
