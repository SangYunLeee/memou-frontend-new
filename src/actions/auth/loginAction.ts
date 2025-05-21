'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import setCookie from 'set-cookie-parser';

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login/email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('로그인에 실패했습니다.');
    }

    const setCookieHeader = response.headers.get('set-cookie');
    if (setCookieHeader) {
      const cookiesList = setCookie.parse(setCookieHeader);
      for (const cookie of cookiesList) {
        (await cookies()).set(cookie.name, cookie.value);
      }
    }

    redirect('/');
  } catch (error) {
    if (error instanceof Error) 
      {
        if (error.message === "NEXT_REDIRECT") {
          throw error;
        }
        return {
          error: error.message || '로그인 중 오류가 발생했습니다.',
        }
      }
  }
  return {
    error: '',
  }
}

export async function signupAction(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const nickname = formData.get('nickname') as string;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register/email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email, password, nickname }),
    });

    if (!response.ok) {
      throw new Error('회원가입에 실패했습니다.');
    }
    const setCookieHeader = response.headers.get('set-cookie');
    if (setCookieHeader) {
      const cookiesList = setCookie.parse(setCookieHeader);
      for (const cookie of cookiesList) {
        (await cookies()).set(cookie.name, cookie.value);
      }
    }
    redirect('/');
  } catch (error) {
    if (error instanceof Error) 
    {
      if (error.message === "NEXT_REDIRECT") {
        throw error;
      }
      return {
        error: error.message || '회원가입 중 오류가 발생했습니다.',
      }
    }
  }
  return {
    error: '',
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('access_token');
  cookieStore.delete('refresh_token');
  redirect("/");
}
