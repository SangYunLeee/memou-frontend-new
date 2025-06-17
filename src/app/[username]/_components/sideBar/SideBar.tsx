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
import Link from "next/link";
import useAuthorCategoryStore from "../../_store/useStoreAuthorCategory";
import { flattenItems } from "@/lib/utility";

export default function SideBar({className, authorName}: {className: string, authorName: string}) {
  const { author, categories } = useAuthorStore();
  const { selectedCategory } = useAuthorCategoryStore();
  const [items, setItems] = useState<TreeItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    setItems(convert(categories));
  }, [categories]);

  const onContentClick = (id: UniqueIdentifier) => {
    const flattenedItems = flattenItems(categories);
    const category = flattenedItems.find((item) => item.id === id);
    const parentCategory = category?.parentId ? flattenedItems.find((item) => item.id === category?.parentId) : null;
    if (category && parentCategory) {
      category.parent = parentCategory;
    }
    // if (category) {
    //   setSelectedCategory(category);
    // }
    if (parentCategory) {
      router.push(`/${author?.nickname}?category=${parentCategory?.categoryName.replaceAll(' ', '+')}&subCategory=${category?.categoryName.replaceAll(' ', '+')}`);
    } else {
      router.push(`/${author?.nickname}?category=${category?.categoryName.replaceAll(' ', '+')}`);
    }
  }

  return (
    <div className={className}>
      {/* 프로필 */}
      <Link href={`/${author?.nickname}`} className="flex flex-col items-center pt-4">
        {/* 프로필 이미지 */}
        <div className="relative w-20 h-20 rounded-full overflow-hidden">
          <Image
            src={author?.profileImage?.url || DefaultAvatar}
            alt={`${author?.nickname}의 프로필`}
            width={80}
            height={80}
            className="w-full h-full"
            priority
          />
        </div>
        {/* 닉네임 */}
        <p className="nickname">{author?.nickname}</p>
      </Link>
      {/* 카테고리 트리 */}
      <div className="mt-4">
        <SortableTree collapsible items={items} setItems={setItems} renderItem={CategoryTreeItem} onContentClick={onContentClick} />
      </div>
    </div>
  );
}
