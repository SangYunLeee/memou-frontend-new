'use client';
import { useAuthor } from "@/hooks/useAuthor";
import Link from "next/link";

export default function SideBar({className, authorName}: {className: string, authorName: string}) {
  const { author, categories, setCategories, isLoading } = useAuthor({authorName});

  if (isLoading) {
    return <div>Loading...</div>;
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
      <h1>{categories.map((category) => category.categoryName).join(', ')}</h1>
    </div>
  );
}
