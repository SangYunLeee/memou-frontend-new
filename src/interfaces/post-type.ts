import { UserType } from "./user-type";
import { CustomElement } from "./slate.d";

export interface PostType {
  id: string;
  createdAt: string;
  author: UserType;
  title: string;
  content: string;
  contentSlate: (CustomElement)[];
  category?: CategoryType;
  postFiles: PostFile[];
  statusId: PostStatus;
  updatedAt: string;
  visibilityId: Visibility;
  tempPost?: tempPostType;
  comments: CommentType[];
};

export interface PostImageType {
  id: number;
  url: string;
}

export enum PostStatus {
  DRAFT = 1, // 임시 글 게시판에서 작성한 글
  PUBLISHED = 2, // 게시판에서 작성한 글
  UNREGISTERED = 3, // 게시글의 일부만 올라가 있는 경우 (이미지 등을 업로드하여 자동 임시 저장이 되어있으나 게시글 작성이 완료되지 않은 경우)
}

export interface CategoryType {
  id: number;
  categoryName: string;
  pos: number;
  user: UserType;
  tempPostCount: number;
  postCount: number;
  children: CategoryType[];
}

export interface PostFile {
  id: number;
  originalFilename: string;
  fileSize: number;
  createdAt: string;
  url: string;
};

export enum Visibility {
  PUBLIC = 1,
  PRIVATE = 2,
}

export interface tempPostType {
  title: string;
  content: string;
  contentSlate: (CustomElement)[];
}

export interface CommentType {
  id: string;
  postId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: UserType;
}

export type SendPostType = {
  id?: string;
  title: string;
  content: string;
  contentSlate: string;
  categoryId?: number;
  visibilityId: Visibility;
  statusId: PostStatus;
};
