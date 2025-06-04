'use client';

import useSearchStore from "@/app/[username]/_hooks/useStoreSearchquery";
import useAuthorStore from "@/app/[username]/_hooks/useStoreAuthor";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { getAuthor } from "@/lib/author-client";

export default function StateSetter({username}: {username: string}) {
  const pathname = usePathname();
  const { searchQuery, setSearchQuery } = useSearchStore();
  const { author, setAuthor } = useAuthorStore();

  useEffect(() => {
    return () => {
      setSearchQuery('');
      setAuthor(undefined);
    }
  }, []);

  useEffect(() => {
    const fetchAuthor = async () => {
      const author = await getAuthor({ username });
      setAuthor(author);
    }
    fetchAuthor();
  }, [username]);

  return null;
}
