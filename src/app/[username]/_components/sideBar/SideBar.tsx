'use client';
import { useAuthor } from "@/hooks/useAuthor";
import { SortableTree } from "./SortableTree/SortableTree";
import { useEffect, useState } from "react";
import { TreeItem } from "./SortableTree/types";
import { CategoryTreeItem } from "./SortableTreeItem/CategoryTreeItem";
import { flattenTree } from "./SortableTree/utilities";
import { UniqueIdentifier } from "@dnd-kit/core";
import { useRouter } from "next/navigation";
import { convert } from "@/app/user/setting/[settingId]/_components/contentCategory/ContentCategory.fn";

export default function SideBar({className, authorName}: {className: string, authorName: string}) {
  const { author, categories, setCategories, isLoading } = useAuthor({authorName});
  const [items, setItems] = useState<TreeItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      setItems(convert(categories));
    }
  }, [categories, isLoading]);

  if (isLoading) {
    return <div className={className}>Loading...</div>;
  }

  const onContentClick = (id: UniqueIdentifier) => {
    const flattenedItems = flattenTree(items);
    const category = flattenedItems.find((item) => item.id === id);
    const parentCategory = category?.parentId ? flattenedItems.find((item) => item.id === category?.parentId) : null;
    if (parentCategory) {
      router.push(`/${author?.nickname}?category=${parentCategory?.name.replaceAll(' ', '+')}&subCategory=${category?.name.replaceAll(' ', '+')}`);
    } else {
      router.push(`/${author?.nickname}?category=${category?.name.replaceAll(' ', '+')}`);
    }
  }

  return (
    <div className={className}>
      <div className="flex flex-col items-center">
        <img
          src={author?.profileImage?.url || '/defaultAvatar.png'}
          alt={`${author?.nickname}의 프로필`}
          className="rounded-full w-20 h-20"
        />
        <p className="nickname">{author?.nickname}</p>
      </div>
      <SortableTree collapsible items={items} setItems={setItems} renderItem={CategoryTreeItem} onContentClick={onContentClick} />
    </div>
  );
}
