import { axiosInstance } from "@/lib/axios";
import { PostType } from "@/interfaces/post-type";
import { CategoryType } from "@/interfaces/category-type";
import { ApiError } from "@/lib/errors/api-error";
import { AxiosError } from "axios";

interface GetPostsProps {
  searchQuery?: string;
  authorId?: string;
  selectedCategory?: CategoryType;
}

/**
 * 클라이언트 컴포넌트에서만 사용 가능
 * 게시물 목록을 가져옵니다
 */
export const getPosts = async ({
  searchQuery,
  authorId,
  selectedCategory
}: GetPostsProps = {}): Promise<PostType[]> => {
  try {
    const response = await axiosInstance.get('/posts', {
      params: {
        content_or_title_include: searchQuery,
        author_id: authorId,
        category_ids: selectedCategory?.children
          ? [selectedCategory.id, ...selectedCategory.children.map((category) => category.id)].join(',')
          : selectedCategory?.id?.toString(),
      },
    });

    const posts = response.data.posts.data;

    // HTML 태그 제거
    const modifiedPosts = posts.map((post: PostType) => ({
      ...post,
      content: post.content.replace(/<[^>]+>/g, '')
    }));

    return modifiedPosts;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw ApiError.fromResponse(error.response.status, error.response.data);
    }
    throw ApiError.fromNetworkError(error);
  }
};

/**
 * 클라이언트 컴포넌트에서만 사용 가능
 * 단일 게시물을 가져옵니다
 */
export const getPost = async ({ postId }: { postId: string }): Promise<PostType> => {
  try {
    const response = await axiosInstance.get(`/posts/${postId}`);
    return response.data.post;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw ApiError.fromResponse(error.response.status, error.response.data);
    }
    throw ApiError.fromNetworkError(error);
  }
};