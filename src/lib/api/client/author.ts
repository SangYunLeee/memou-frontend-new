import { axiosInstance } from "@/lib/axios";
import { UserType } from "@/interfaces/user-type";

/**
 * 클라이언트 컴포넌트에서만 사용 가능
 * 닉네임으로 작가 정보를 가져옵니다
 */
export const getAuthor = async ({ username }: { username: string }): Promise<UserType> => {
  const decodedNickname = decodeURIComponent(username);
  const response = await axiosInstance.get(`/users/nickname/${decodedNickname}`);
  return response.data.user;
};