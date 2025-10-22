import { axiosInstance } from "@/lib/axios";
import { UserType } from "@/interfaces/user-type";

/**
 * 클라이언트 컴포넌트에서만 사용 가능
 * 이메일/비밀번호로 로그인합니다
 */
export const login = async (email: string, password: string): Promise<UserType> => {
  const response = await axiosInstance.post(`/auth/login/email`, {
    email,
    password,
  });

  if (response.status !== 200) {
    throw new Error('로그인에 실패했습니다.');
  }

  return response.data.user;
};

/**
 * 클라이언트 컴포넌트에서만 사용 가능
 * 새로운 사용자를 등록합니다
 */
export const signup = async (
  email: string,
  password: string,
  nickname: string
): Promise<{ user: UserType }> => {
  const response = await axiosInstance.post(`/auth/register/email`, {
    email,
    password,
    nickname,
  });

  if (response.status !== 200) {
    throw new Error('회원가입에 실패했습니다.');
  }

  return response.data;
};

/**
 * 클라이언트 컴포넌트에서만 사용 가능
 * 현재 세션을 종료합니다
 */
export const logout = async (): Promise<void> => {
  await axiosInstance.get(`/auth/logout`);
};