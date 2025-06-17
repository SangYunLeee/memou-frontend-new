'use client';

import { getPosts } from "@/lib/post-client";
import useStore from '@/app/(main)/_hooks/useStoreSearchquery';
import { useState, useEffect } from 'react';
import { PostType } from "@/interfaces/post-type";
import Post from "@/components/poster/post";

export default function SearchedPosts({initialPosts = [], className}: {initialPosts: PostType[], className: string}) {
  const { searchQuery } = useStore();
  const [searchedPosts, setSearchedPosts] = useState<PostType[]>(initialPosts);
  const isSearched = searchQuery !== '';

  const posts = isSearched ? searchedPosts : initialPosts;

  useEffect(() => {
    const fetchPosts = async () => {
      if (searchQuery === '') {
        setSearchedPosts(initialPosts);
        return;
      }
      try {
        const data = await getPosts({ searchQuery });
        setSearchedPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, [searchQuery]);

  if (isSearched && posts.length === 0) {
    return <div>검색 결과가 없습니다.</div>;
  }

  return (
    <div className={className}>
      {posts.map((post) => (
        <Post key={post.id} post={post} className="
        border border-gray-300
        rounded-lg
        hover:shadow-md transition-shadow transition-all
        h-[180px]
        hover:border-indigo-300
        p-0"/>
      ))}
    </div>
  );
}
