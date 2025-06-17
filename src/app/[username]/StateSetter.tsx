'use client';

import useSearchStore from "@/app/[username]/_hooks/useStoreSearchquery";
import { useEffect } from "react";
import { useAuthor } from "@/hooks/useAuthor";

export default function StateSetter({username}: {username: string}) {
  const { searchQuery, setSearchQuery } = useSearchStore();
  useAuthor({authorName: username});

  useEffect(() => {
    return () => {
      setSearchQuery('');
    }
  }, []);
  return null;
}
