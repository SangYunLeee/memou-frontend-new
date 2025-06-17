'use client';

import useSearchStore from "@/app/[username]/_store/useStoreSearchquery";
import { useEffect } from "react";
import { useAuthor } from "@/hooks/useAuthor";

export default function StateSetter({username}: {username: string}) {
  useAuthor({authorName: username});
  return null;
}
