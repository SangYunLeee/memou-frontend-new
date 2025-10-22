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
 *
 * 캐싱 전략:
 * - 검색 쿼리 있음: 캐싱 안함 (실시간 검색)
 * - 일반 목록: 1분마다 재검증 (자주 변경되는 데이터)
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
    // 검색 쿼리가 있으면 캐싱하지 않음 (실시간 검색)
    const cacheConfig = searchQuery
      ? { cache: 'no-store' as const }
      : {
          next: {
            tags: ['posts'],
            revalidate: 60, // 1분 (60초)
          }
        };

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      ...cacheConfig,
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

/**
 * 서버 컴포넌트에서만 사용 가능
 * 단일 게시물을 가져옵니다
 *
 * 캐싱 전략: 10분마다 재검증
 * - 게시물 내용은 자주 변경되지 않으므로 긴 캐시 시간 설정
 * - 수정 시 revalidateTag로 즉시 갱신 가능
 */
export const getPost = async ({ postId }: { postId: string }): Promise<PostType> => {
  try {
    const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/posts/${postId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      next: {
        tags: [`post-${postId}`, 'posts'],
        revalidate: 600, // 10분 (600초)
      },
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