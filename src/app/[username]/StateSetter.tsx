'use client';

import useSearchStore from "@/app/[username]/_hooks/useStoreSearchquery";
import useAuthorStore from "@/app/[username]/_hooks/useStoreAuthor";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function StateSetter({username}: {username: string}) {
  const pathname = usePathname();
  const { searchQuery, setSearchQuery } = useSearchStore();
  const { author, setAuthor } = useAuthorStore();

  useEffect(() => {
    if (pathname !== `/${username}`) {
      setSearchQuery('');
    }
  }, [pathname, username]);
  return null;
}
