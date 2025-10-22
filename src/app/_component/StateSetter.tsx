'use client';

import { useEffect } from "react";
import useAuthStore from '@/store/useStoreMe';
import { getCurrentUser } from "@/lib/api/client/user";
export default function StateSetter() {
  const {setUser, logout} = useAuthStore();
  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser();
      if (user) {
        setUser(user);
      } else {
        logout();
      }
    };
    fetchUser();
  }, []);
  return null;
}
