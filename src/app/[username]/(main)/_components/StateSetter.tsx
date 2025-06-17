'use client';

import { useStoreSeletedCategory } from "@/app/[username]/(main)/_hooks/useStoreSeletedCategory";
import { useEffect } from "react";
import useSearchStore from "@/app/[username]/_store/useStoreSearchquery";

export default function StateSetter({username}: {username: string}) {
  const { searchQuery, setSearchQuery } = useSearchStore();
  useStoreSeletedCategory();

  useEffect(() => {
    return () => {
      setSearchQuery('');
    }
  }, []);  
  return null;
}
