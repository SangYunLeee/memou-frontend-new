import { PostType } from "@/interfaces/post-type";
import { CategoryType } from "@/interfaces/category-type";
import { env } from '@/lib/env';
import { ApiError } from '@/lib/errors/api-error';

interface GetPostsProps {
  searchQuery?: string;
  authorId?: string;
  selectedCategory?: CategoryType;
}

/**
 * 서버 컴포넌트에서만 사용 가능
 * native fetch를 사용하여 게시물을 가져옵니다
 */
export const getPosts = async ({
  searchQuery,
  authorId,
  selectedCategory
}: GetPostsProps = {}): Promise<PostType[]> => {
  const params = new URLSearchParams();

  if (searchQuery) {
    params.append('content_or_title_include', searchQuery);
  }
  if (authorId) {
    params.append('author_id', authorId);
  }
  if (selectedCategory) {
    const categoryIds = selectedCategory.children
      ? [selectedCategory.id, ...selectedCategory.children.map((category) => category.id)].join(',')
      : selectedCategory.id?.toString();
    if (categoryIds) {
      params.append('category_ids', categoryIds);
    }
  }

  const url = `${env.NEXT_PUBLIC_API_URL}/posts${params.toString() ? `?${params.toString()}` : ''}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      next: { tags: ['posts'] },
      cache: 'force-cache',
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw ApiError.fromResponse(response.status, data);
    }

    const data = await response.json();
    const posts = data.posts.data;

    // HTML 태그 제거
    const modifiedPosts = posts.map((post: PostType) => ({
      ...post,
      content: post.content.replace(/<[^>]+>/g, '')
    }));

    return modifiedPosts;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw ApiError.fromNetworkError(error);
  }
};

export const getPost = async ({ postId }: { postId: string }): Promise<PostType> => {
  try {
    const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/posts/${postId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      next: { tags: [`post-${postId}`] },
      cache: 'force-cache',
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw ApiError.fromResponse(response.status, data);
    }

    const data = await response.json();
    return data.post;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw ApiError.fromNetworkError(error);
  }
};