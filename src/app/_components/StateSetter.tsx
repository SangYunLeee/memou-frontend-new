'use client';

import useStore from "@/hooks/useStore";
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
