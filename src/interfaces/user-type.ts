import { PostImageType } from "./post-type";

export interface UserType {
  id?: number;
  createdAt?: string;
  email?: string;
  nickname?: string;
  role?: 'admin' | 'user'| null | undefined;
  profileImage?: PostImageType;
  profileDescription?: string;
}
