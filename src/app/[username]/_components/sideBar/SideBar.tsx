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
import useAuthorStore from "@/store/useStoreAuthor";
import DefaultAvatar from '@/assets/defaultAvatar.png';
import Image from 'next/image';

export default function SideBar({className, authorName}: {className: string, authorName: string}) {
  const { author, categories } = useAuthorStore();
  const [items, setItems] = useState<TreeItem[]>([]);
  const router = useRouter();
  console.log("111categories", categories);

  useEffect(() => {
    setItems(convert(categories));
  }, [categories]);

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
        {/* 프로필 이미지 */}
        <div className="relative w-20 h-20 rounded-full overflow-hidden">
          <Image
            src={author?.profileImage?.url || DefaultAvatar}
            alt={`${author?.nickname}의 프로필`}
            fill
          />
        </div>
        {/* 닉네임 */}
        <p className="nickname">{author?.nickname}</p>
      </div>
      {/* 카테고리 트리 */}
      <div className="mt-4">
        <SortableTree collapsible items={items} setItems={setItems} renderItem={CategoryTreeItem} onContentClick={onContentClick} />
      </div>
    </div>
  );
}
