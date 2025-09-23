// app/_providers/BackGuardProvider.tsx
'use client';

import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

type BackPolicy = {
  block?: boolean;                 // 완전 차단
  confirmMessage?: string;         // 확인 필요
  fallbackHref?: string;           // 차단/히스토리 부재 시 보낼 곳
  steps?: number;                  // 여러 단계 뒤로가기
  sameOriginOnly?: boolean;        // 동일 출처에서만 뒤로 허용
};

type Ctx = {
  setPolicy: (p: BackPolicy | null) => void;
  getPolicy: () => BackPolicy | null;
  goBack: () => Promise<void>;     // 커스텀 버튼이 호출하는 핵심 API
};

const BackGuardContext = createContext<Ctx | null>(null);

export function BackGuardProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [policy, _setPolicy] = useState<BackPolicy | null>(null);

  const setPolicy = useCallback((p: BackPolicy | null) => _setPolicy(p), []);

  const getPolicy = useCallback(() => policy, [policy]);

  const goBack = useCallback(async () => {
    const p = policy ?? {};
    const {
      block,
      confirmMessage,
      fallbackHref = '/',
      steps = 1,
      sameOriginOnly,
    } = p;

    // 동일 출처 제한
    if (sameOriginOnly && document.referrer) {
      try {
        const ref = new URL(document.referrer);
        if (ref.origin !== location.origin) {
          // 동일 출처가 아니면 뒤로가기 대신 fallback
          return router.replace(fallbackHref);
        }
      } catch {
        return router.replace(fallbackHref);
      }
    }

    // 확인 메시지
    if (confirmMessage) {
      const ok = window.confirm(confirmMessage);
      if (!ok) return;
    }

    // 차단이면 fallback으로
    if (block) return router.replace(fallbackHref);

    // 히스토리 뒤로가기 시도
    const canGoBack = window.history.length > 1;
    if (canGoBack) {
      if (steps > 1 && 'go' in window.history) {
        window.history.go(-Math.abs(steps));
      } else {
        router.back();
      }
    } else {
      // 히스토리 없음 → fallback
      router.replace(fallbackHref);
    }
  }, [policy, router]);

  const value = useMemo<Ctx>(() => ({ setPolicy, getPolicy, goBack }), [setPolicy, getPolicy, goBack]);

  return (
    <BackGuardContext.Provider value={value}>
      {children}
    </BackGuardContext.Provider>
  );
}

export function useBackGuard() {
  const ctx = useContext(BackGuardContext);
  if (!ctx) throw new Error('useBackGuard must be used within BackGuardProvider');
  return ctx;
}
