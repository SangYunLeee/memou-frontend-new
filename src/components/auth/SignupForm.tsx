'use client';

import { signupAction } from '@/actions/auth/loginAction';
import SubmitButton from '@/components/auth/SummitButton';
import React from 'react';

export default function SignupForm() {
  const [state, formAction] = React.useActionState(signupAction, { error: "" });

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
          <label htmlFor="nickname" className="block text-sm font-medium text-gray-700 mb-1">
            닉네임
          </label>
          <input
            id="nickname"
            name="nickname"
            type="text"
            required
            className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="닉네임을 입력하세요"
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
            autoComplete="new-password"
            required
            className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="비밀번호를 입력하세요"
          />
        </div>
      </div>

      <div>
        <SubmitButton />
      </div>
    </form>
  );
}
