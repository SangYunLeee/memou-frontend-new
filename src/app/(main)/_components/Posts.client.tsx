'use client';

import { getPosts } from "@/lib/post-client";
import useStore from '@/hooks/useStore';
import { useState, useEffect } from 'react';
import { PostType } from "@/interfaces/post-type";
import Post from "@/components/poster/post";

export default function SearchedPosts({initialPosts = []}: {initialPosts: PostType[]}) {
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
    <div className="searchedPosts grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
