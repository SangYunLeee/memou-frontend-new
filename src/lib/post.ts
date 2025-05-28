import { PostType } from "@/interfaces/post-type";
// import { cookies } from 'next/headers'

interface GetPostsProps {
  searchQuery?: string;
}

export const getPosts = async ({ searchQuery }: GetPostsProps): Promise<PostType[]> => {
  // const cookieStore = await cookies();
  // const accessToken = cookieStore.get('access_token')?.value;
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${accessToken}`,
    },
    credentials: 'include',
    next: { tags: ['posts'] },
    cache: 'force-cache',
  });
  const posts = (await response.json()).posts.data;

  const modifiedPosts = posts.map((post: PostType) => ({
    ...post,
    content: post.content.replace(/<[^>]+>/g, '')
  }));
  return modifiedPosts;
};
