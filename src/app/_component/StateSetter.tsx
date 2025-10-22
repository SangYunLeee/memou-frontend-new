'use client';

import { useEffect } from "react";
import useAuthStore from '@/store/useStoreMe';
import { UserType } from "@/interfaces/user-type";

interface StateSetterProps {
  initialUser?: UserType | null;
}

/**
 * 서버에서 가져온 user 정보를 클라이언트 Zustand store에 초기화합니다.
 * 이를 통해 API 중복 호출을 방지하고 초기 로딩 속도를 향상시킵니다.
 */
export default function StateSetter({ initialUser }: StateSetterProps) {
  const { setUser, logout } = useAuthStore();

  useEffect(() => {
    // 서버에서 전달받은 초기값이 있으면 store에 설정
    if (initialUser) {
      setUser(initialUser);
    } else {
      // user가 없으면 로그아웃 상태로 설정
      logout();
    }
  }, [initialUser, setUser, logout]);

  return null;
}
