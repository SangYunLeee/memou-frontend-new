import { axiosInstance } from "@/lib/axios";
import { UserType } from "@/interfaces/user-type";

/**
 * 클라이언트 컴포넌트에서만 사용 가능
 * 현재 로그인된 사용자 정보를 가져옵니다
 */
export const getCurrentUser = async (): Promise<UserType> => {
  const response = await axiosInstance.get(`/users/me`);
  return response.data.user;
};

/**
 * 클라이언트 컴포넌트에서만 사용 가능
 * 사용자 프로필을 가져와서 상태를 업데이트합니다
 */
export const fetchAndUpdateUserProfile = async (
  setUser: (user: UserType) => void
): Promise<void> => {
  try {
    const response = await axiosInstance.get('/users/me');
    setUser(response.data.user);
  } catch (error) {
    console.error('프로필 정보를 가져오는데 실패했습니다:', error);
    throw error;
  }
};