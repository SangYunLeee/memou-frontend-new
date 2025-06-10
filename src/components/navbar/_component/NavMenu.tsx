'use client';

import useAuthStore from '@/store/useStoreMe';
import Link from 'next/link';
import { NavLink } from './NavLink';
import DropdownMenu from './DropdownMenu';

export default function NavMenu() {
  const user = useAuthStore((s) => s.user);
  return (
    <div className="flex items-center space-x-4">
    {user ? (
      <>
        <Link 
          href="/post/write"
          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
        >
          새글 쓰기
        </Link>
        <DropdownMenu user={user} />
      </>
    ) : (
      <NavLink href="/login">로그인</NavLink>
    )}
  </div>
  );
}
