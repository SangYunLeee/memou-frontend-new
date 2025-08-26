import { axiosInstance } from "./axios";
import { UserType } from "@/interfaces/user-type";

export const getCurrentUser = async () => {
  const response = await axiosInstance.get(`/users/me`);
  return response.data.user;
};

export const login = async (email: string, password: string) => {
  const response = await axiosInstance.post(`/auth/login/email`, {
    email,
    password,
  });
  if (response.status !== 200) {
    throw new Error('로그인에 실패했습니다.');
  }
  return response.data.user;
};

export const signup = async (email: string, password: string, nickname: string) => {
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

export const logout = async () => {
  await axiosInstance.get(`/auth/logout`);
};

export const fetchAndUpdateUserProfile = async (setUser: (user: UserType) => void) => {
  try {
    const response = await axiosInstance.get('/users/me');
    setUser(response.data.user);
  } catch (error) {
    console.error('프로필 정보를 가져오는데 실패했습니다:', error);
  }
};
