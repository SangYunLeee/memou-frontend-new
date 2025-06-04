import { UserType } from "@/interfaces/user-type";
import { axiosInstance } from "./axios";

export const getAuthor = async ({ username }: { username: string }): Promise<UserType> => {
  const decodedNickname = decodeURIComponent(username);
  const response = await axiosInstance.get(`/users/nickname/${decodedNickname}`);
  return response.data.user;
};
