'use client';

import { getPosts } from "@/lib/post-client";
import useStore from '@/app/[username]/_hooks/useStoreSearchquery';
import { useState, useEffect } from 'react';
import { PostType } from "@/interfaces/post-type";
import { CategoryType } from "@/interfaces/category-type";
import Post from "@/components/poster/post";
import useAuthorStore from "@/store/useStoreAuthor";
import { useSearchParams } from 'next/navigation';

export default function SearchedPosts({className, initialPosts = [], username}: {className: string, initialPosts: PostType[], username: string}) {
  const { searchQuery } = useStore();
  const [searchedPosts, setSearchedPosts] = useState<PostType[]>(initialPosts);
  const { author, categories } = useAuthorStore();

  const searchParams = useSearchParams();
  const mainCategoryName = searchParams.get('category');
  const subCategoryName = searchParams.get('subCategory');
  let selectedLevel1Category: CategoryType | undefined = undefined;
  let selectedLevel2Category: CategoryType | undefined = undefined;
  if (categories) {
    selectedLevel1Category = categories.find((category) => category.categoryName === mainCategoryName);
    selectedLevel2Category = selectedLevel1Category?.children.find((category) => category.categoryName === subCategoryName);
  }
  const selectedCategory = selectedLevel2Category ? selectedLevel2Category : selectedLevel1Category;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts({ searchQuery, authorId: author?.id?.toString(), selectedCategory });
        setSearchedPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    if (author) {
      fetchPosts();
    }
  }, [searchQuery, author, selectedCategory]);

  return (
    <div className={`${className}`}>
      {searchedPosts.map((post) => (
        <Post key={post.id} className="
            border border-gray-300
            rounded-lg
            hover:shadow-md transition-shadow transition-all
            h-[180px]
            hover:border-indigo-300
            p-0" post={post}
            authorView={false}
            />
      ))}
    </div>
  );
}
