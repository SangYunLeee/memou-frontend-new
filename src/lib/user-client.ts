import { axiosInstance } from "./axios";

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

export const logout = async () => {
  await axiosInstance.get(`/auth/logout`);
};
