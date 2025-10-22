import { axiosInstance } from "@/lib/axios";
import { UserType } from "@/interfaces/user-type";
import { ApiError } from "@/lib/errors/api-error";
import { AxiosError } from "axios";

/**
 * 클라이언트 컴포넌트에서만 사용 가능
 * 이메일/비밀번호로 로그인합니다
 */
export const login = async (email: string, password: string): Promise<UserType> => {
  try {
    const response = await axiosInstance.post(`/auth/login/email`, {
      email,
      password,
    });

    return response.data.user;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw ApiError.fromResponse(error.response.status, error.response.data);
    }
    throw ApiError.fromNetworkError(error);
  }
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
  try {
    const response = await axiosInstance.post(`/auth/register/email`, {
      email,
      password,
      nickname,
    });

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw ApiError.fromResponse(error.response.status, error.response.data);
    }
    throw ApiError.fromNetworkError(error);
  }
};

/**
 * 클라이언트 컴포넌트에서만 사용 가능
 * 현재 세션을 종료합니다
 */
export const logout = async (): Promise<void> => {
  try {
    await axiosInstance.get(`/auth/logout`);
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw ApiError.fromResponse(error.response.status, error.response.data);
    }
    throw ApiError.fromNetworkError(error);
  }
};