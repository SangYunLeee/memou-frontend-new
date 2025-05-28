'use client';

import { getPosts } from "@/lib/post-client";
import useStore from '@/hooks/useStore';
import { useState, useEffect } from 'react';
import { PostType } from "@/interfaces/post-type";
import Post from "@/components/poster/post";

export default function SearchedPosts({initialPosts = []}: {initialPosts: PostType[]}) {
  const { searchQuery } = useStore();
  const [searchedPosts, setSearchedPosts] = useState<PostType[]>(initialPosts);
  const [isLoading, setIsLoading] = useState(false);
  const isSearched = searchQuery !== '';

  const posts = isSearched ? searchedPosts : initialPosts;

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const data = await getPosts({ searchQuery });
        setSearchedPosts(data);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, [searchQuery]);

  return (
    <div className="searchedPosts grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
