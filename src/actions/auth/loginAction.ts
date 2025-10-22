import { login } from '@/lib/api/client/auth';
import { redirect } from 'next/navigation';

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    const response = await login(email, password);
    return {
      user: response,
      error: '',
    }
  } catch (error) {
    if (error instanceof Error) 
      {
        if (error.message === "NEXT_REDIRECT") {
          throw error;
        }
        return {
          error: '로그인 중 오류가 발생했습니다.',
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
      throw new Error(`회원가입에 실패했습니다. ${response.statusText}`);
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
