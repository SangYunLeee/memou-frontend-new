'use client';

import { getPosts } from '@/lib/api/client/post';
import useStore from '@/app/(main)/_hooks/useStoreSearchquery';
import { useEffect, useRef } from 'react';

export default function SearchInput() {
  const { searchQuery, setSearchQuery } = useStore();
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    // 이전 타이머 취소
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // 500ms 후에 API 호출
    debounceTimerRef.current = setTimeout(async () => {
      if (value) {
        await getPosts({ searchQuery: value });
      }
    }, 500);
  };

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="relative">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="검색어를 입력하세요"
        className="w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>
  );
}
