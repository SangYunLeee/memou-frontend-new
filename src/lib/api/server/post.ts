import { PostType } from "@/interfaces/post-type";
import { CategoryType } from "@/interfaces/category-type";

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

  const url = `${process.env.NEXT_PUBLIC_API_URL}/posts${params.toString() ? `?${params.toString()}` : ''}`;

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
    throw new Error(`Failed to fetch posts: ${response.status}`);
  }

  const data = await response.json();
  const posts = data.posts.data;

  // HTML 태그 제거
  const modifiedPosts = posts.map((post: PostType) => ({
    ...post,
    content: post.content.replace(/<[^>]+>/g, '')
  }));

  return modifiedPosts;
};

export const getPost = async ({ postId }: { postId: string }): Promise<PostType> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    next: { tags: [`post-${postId}`] },
    cache: 'force-cache',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch post: ${response.status}`);
  }

  const data = await response.json();
  return data.post;
};