'use client';

import { loginAction } from '@/actions/auth/loginAction';
import SubmitButton from '@/components/auth/SummitButton';
import React, { useEffect } from 'react';
import useAuthStore from '@/app/_hooks/useStoreMe';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();
  const [state, formAction] = React.useActionState(loginAction, { error: "" });
  const setUser = useAuthStore((s) => s.setUser);

  // 로그인 액션이 성공적으로 끝났을 때(예: state.user가 있으면)
  React.useEffect(() => {
    if (state.user) {
      setUser(state.user);
      router.push('/');
    }
  }, [state.user, setUser, router]);

  return (
    <form className="mt-8 space-y-6" action={formAction}>
      {state.error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="text-sm text-red-700">{state.error}</div>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            이메일
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="이메일을 입력하세요"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            비밀번호
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="비밀번호를 입력하세요"
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
            로그인 상태 유지
          </label>
        </div>

        <div className="text-sm">
          <a href="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">
            비밀번호를 잊으셨나요?
          </a>
        </div>
      </div>

      <div>
        <SubmitButton />
      </div>
    </form>
  );
}
