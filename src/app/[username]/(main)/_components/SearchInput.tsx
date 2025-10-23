'use client';

import useStore from '@/app/[username]/_store/useStoreSearchquery';
import { useEffect, useRef, useState } from 'react';

export default function SearchInput({className}: {className?: string}) {
  const { setSearchQuery } = useStore();
  const [inputValue, setInputValue] = useState('');
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isFirstInputRef = useRef(true);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value); // 즉시 UI 업데이트

    // 이전 타이머 취소
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // 첫 입력은 즉시 실행, 이후 연속 입력은 150ms 디바운스
    const delay = isFirstInputRef.current ? 0 : 150;
    isFirstInputRef.current = false;

    debounceTimerRef.current = setTimeout(() => {
      setSearchQuery(value);
      // 검색이 완료되면 다음 입력을 첫 입력으로 간주
      isFirstInputRef.current = true;
    }, delay);
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
    <div className={`${className}`}>
      <input
        type="text"
        value={inputValue}
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
