import { UserType } from "./user-type";

export interface CategoryType {
  id: number;
  categoryName: string;
  pos: number;
  user: UserType;
  tempPostCount: number;
  postCount: number;
  children: CategoryType[];
}
