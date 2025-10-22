'use client';

import { getPosts } from "@/lib/api/client/post";
import useStore from '@/app/[username]/_store/useStoreSearchquery';
import { useState, useEffect } from 'react';
import { PostType } from "@/interfaces/post-type";
import { CategoryType } from "@/interfaces/category-type";
import Post from "@/components/poster/post";
import useAuthorStore from "@/store/useStoreAuthor";
import { useSearchParams } from 'next/navigation';
import useAuthorCategoryStore from "../_store/useStoreAuthorCategory";

export default function SearchedPosts({className, initialPosts = [], username}: {className: string, initialPosts: PostType[], username: string}) {
  const { searchQuery } = useStore();
  const [searchedPosts, setSearchedPosts] = useState<PostType[]>(initialPosts);
  const { author, categories } = useAuthorStore();
  const { selectedCategory } = useAuthorCategoryStore();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (selectedCategory === undefined) {
          return;
        }
        const data = await getPosts({ searchQuery, authorId: author?.id?.toString(), selectedCategory: selectedCategory ?? undefined });
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
