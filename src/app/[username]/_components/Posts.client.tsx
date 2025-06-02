'use client';

import { getPosts } from "@/lib/post-client";
import useStore from '@/app/[username]/_hooks/useStoreSearchquery';
import { useState, useEffect } from 'react';
import { PostType } from "@/interfaces/post-type";
import Post from "@/components/poster/post";

export default function SearchedPosts({initialPosts = [], username}: {initialPosts: PostType[], username?: string}) {
  const { searchQuery } = useStore();
  const [searchedPosts, setSearchedPosts] = useState<PostType[]>(initialPosts);
  const isSearched = searchQuery !== '';

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts({ searchQuery });
        setSearchedPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, [searchQuery]);

  return (
    <div className="searchedPosts grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-4">
      {searchedPosts.map((post) => (
        <Post key={post.id} post={post}/>
      ))}
    </div>
  );
}
