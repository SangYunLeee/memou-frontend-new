import { CategoryType } from "@/interfaces/category-type";
import { FlattenedItem, TreeItem } from "./_components/dnd-kit/Tree/types";

export const convert = (categories: CategoryType[] | undefined): TreeItem[] => {
  if (!categories || categories.length === 0) return [];

  return categories.map((category) => ({
    id: category.id,
    name: category.categoryName,
    children: convert(category.children),
    count: category.postCount,
    tempPostCount: category.tempPostCount,
    pos: category.pos,
  }));
};


export const getItemsNotFinished = (items: FlattenedItem[]) => {
  return items.filter((item) => !!item.isEditing);
};

export const getDeletedItems = (originalFlattenedItems: FlattenedItem[], changedFlattenedItems: FlattenedItem[]) => {
  return originalFlattenedItems.filter((originalItem) => !changedFlattenedItems.some((flattenedItem) => flattenedItem.id === originalItem.id));
};

export const getAddedItems = (originalFlattenedItems: FlattenedItem[], changedFlattenedItems: FlattenedItem[]) => {
  return changedFlattenedItems.filter((changedItem) => !originalFlattenedItems.some((originalItem) => originalItem.id === changedItem.id));
};

export const getChangedItems = (originalFlattenedItems: FlattenedItem[], changedFlattenedItems: FlattenedItem[]) => {
  return changedFlattenedItems.filter((changedItem) => originalFlattenedItems.some((originalItem) =>
    originalItem.id === changedItem.id &&
      (originalItem.name !== changedItem.name
        || originalItem.index !== changedItem.index
        || originalItem.parentId !== changedItem.parentId
      )
    )
  );
};
