import { PostType } from "@/interfaces/post-type";
import { axiosInstance } from "./axios";

interface GetPostsProps {
  searchQuery?: string;
  authorId?: string;
}

export const getPosts = async ({ searchQuery, authorId }: GetPostsProps): Promise<PostType[]> => {
  const test = process.env.NEXT_PUBLIC_API_URL;
  console.log(test);
  const response = await axiosInstance.get('/posts', {
    params: {
      content_or_title_include: searchQuery,
      author_id: authorId,
    },
  });

  const posts = response.data.posts.data;

  const modifiedPosts = posts.map((post: PostType) => ({
    ...post,
    content: post.content.replace(/<[^>]+>/g, '')
  }));

  return modifiedPosts;
};

export const getPost = async ({ postId }: { postId: string }): Promise<PostType> => {
  const response = await axiosInstance.get(`/posts/${postId}`);
  return response.data.post;
};
