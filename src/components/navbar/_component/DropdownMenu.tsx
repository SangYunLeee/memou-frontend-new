'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import DefaultAvatar from '@/assets/defaultAvatar.png';
import { UserType } from '@/interfaces/user-type';
import useAuthStore from '@/store/useStoreMe';
import { useRouter } from 'next/navigation';
import { logout } from '@/lib/user-client';
export default function DropdownMenu({ user }: { user: UserType }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const clearUser = useAuthStore((s) => s.logout);
  const router = useRouter();
  const logoutHandler = async () => {
    clearUser();
    await logout();
    router.push('/');
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        className="relative w-8 h-8 rounded-full overflow-hidden cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Image
          src={user?.profileImage?.url || DefaultAvatar}
          alt="프로필"
          width={32}
          height={32}
          className="w-full h-full"
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-100">
          <Link 
            href={`/${user.nickname}`} 
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            개인 블로그
          </Link>
          <Link 
            href="/user/setting/profile" 
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            설정
          </Link>
          <button 
            onClick={logoutHandler}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
          >
            로그아웃
          </button>
        </div>
      )}
    </div>
  );
}
