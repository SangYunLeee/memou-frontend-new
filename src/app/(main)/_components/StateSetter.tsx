'use client';

import useStore from "@/app/(main)/_hooks/useStoreSearchquery";
import { useEffect } from "react";

export default function StateSetter() {
  const { setSearchQuery } = useStore();
  useEffect(() => {
    return () => {
      setSearchQuery('');
    }
  }, [setSearchQuery]);

  return null;
}
