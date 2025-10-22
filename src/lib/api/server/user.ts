import { UserType } from "@/interfaces/user-type";
import { cookies } from 'next/headers';
import { env } from '@/lib/env';
import { ApiError } from '@/lib/errors/api-error';

/**
 * 서버 컴포넌트에서만 사용 가능
 * cookies()를 사용하여 access_token을 가져옵니다
 *
 * 캐싱 전략: 5분마다 재검증 (stale-while-revalidate)
 * - 빠른 응답을 위해 캐시된 데이터 즉시 반환
 * - 백그라운드에서 5분마다 최신 데이터로 갱신
 */
export const getCurrentUser = async (): Promise<UserType> => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value;

    const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      credentials: 'include',
      next: {
        tags: ['user'],
        revalidate: 300, // 5분 (300초)
      },
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw ApiError.fromResponse(response.status, data);
    }

    const data = await response.json();
    return data.user;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw ApiError.fromNetworkError(error);
  }
};