'use client';

import useStore from "@/app/(main)/_hooks/useStoreSearchquery";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function StateSetter() {
  const pathname = usePathname();
  const { searchQuery, setSearchQuery } = useStore();

  useEffect(() => {
    if (pathname !== '/') {
      if (searchQuery !== '') {
        setSearchQuery('');
      }
    }
  }, [pathname]);

  return null;
}
