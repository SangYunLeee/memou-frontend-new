'use server';

import { redirect } from 'next/navigation';

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    // TODO: 실제 API 연동
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login/email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('로그인에 실패했습니다.');
    }
    redirect('/');
  } catch (error) {
    if (error instanceof Error && error.message === "NEXT_REDIRECT") {
      throw error;
    }
    return {
      error: error instanceof Error ? error.message : '로그인 중 오류가 발생했습니다.',
    };
  }
}
