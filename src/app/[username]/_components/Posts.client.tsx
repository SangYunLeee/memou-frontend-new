'use client';

import { getPosts } from "@/lib/post-client";
import useStore from '@/app/[username]/_hooks/useStoreSearchquery';
import { useState, useEffect } from 'react';
import { PostType } from "@/interfaces/post-type";
import Post from "@/components/poster/post";
import useAuthorStore from "@/app/[username]/_hooks/useStoreAuthor";

export default function SearchedPosts({className, initialPosts = [], username}: {className: string, initialPosts: PostType[], username?: string}) {
  const { searchQuery } = useStore();
  const [searchedPosts, setSearchedPosts] = useState<PostType[]>(initialPosts);
  const { author } = useAuthorStore();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts({ searchQuery, authorId: author?.id?.toString() });
        setSearchedPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    if (author) {
      fetchPosts();
    }
  }, [searchQuery, author]);

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
