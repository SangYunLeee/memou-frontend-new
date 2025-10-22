"use client";
import { Suspense, useEffect } from "react";
import EditorWrapper from "./_component/editor/EditorWrapper";
import { useBackGuard } from '@/app/_providers/BackGuardProvider';
import { useSearchParams } from 'next/navigation';

function WritePageContent() {
  const searchParams = useSearchParams();
  const postId = searchParams?.get('postId') || undefined;
  const { setPolicy } = useBackGuard();

  useEffect(() => {
    // 이 페이지는 저장 안 한 변경이 있으면 뒤로가기 확인
    setPolicy({
      confirmMessage: '변경 사항이 저장되지 않았습니다. 뒤로 가시겠어요?',
      fallbackHref: '/dashboard',
      sameOriginOnly: true,
    });
    return () => setPolicy(null);  // 페이지 떠날 때 정책 해제
  }, [setPolicy]);

  return (
    <main className="px-1 sm:px-8 py-2 flex-1 flex">
      <div className="
          flex flex-col
          gap-4
          border border-gray-300
          p-6
          max-w-3xl mx-auto w-full flex-1
          mb-10
          min-h-[calc(80vh)]
      ">
        <EditorWrapper postId={postId} />
      </div>
    </main>
  );
}

export default function WritePage() {
  return (
    <Suspense fallback={
      <main className="px-1 sm:px-8 py-2 flex-1 flex">
        <div className="
            flex flex-col
            gap-4
            border border-gray-300
            p-6
            max-w-3xl mx-auto w-full flex-1
            mb-10
            min-h-[calc(80vh)]
            items-center justify-center
        ">
          <div className="text-gray-500">에디터 로딩 중...</div>
        </div>
      </main>
    }>
      <WritePageContent />
    </Suspense>
  );
}
