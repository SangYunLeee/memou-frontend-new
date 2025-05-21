import { UserType } from "@/interfaces/user-type";
import { cookies } from 'next/headers'

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
  const user = (await response.json()).user;
  return user;
};
