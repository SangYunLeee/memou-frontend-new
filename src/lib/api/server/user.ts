import { UserType } from "@/interfaces/user-type";
import { cookies } from 'next/headers';

/**
 * 서버 컴포넌트에서만 사용 가능
 * cookies()를 사용하여 access_token을 가져옵니다
 */
export const getCurrentUser = async (): Promise<UserType> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token')?.value;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    credentials: 'include',
    next: { tags: ['user'] },
    cache: 'force-cache',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch user: ${response.status}`);
  }

  const data = await response.json();
  return data.user;
};