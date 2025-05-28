import { PostType } from "@/interfaces/post-type";
import { axiosInstance } from "./axios";

interface GetPostsProps {
  searchQuery?: string;
}

export const getPosts = async ({ searchQuery }: GetPostsProps): Promise<PostType[]> => {
  const test = process.env.NEXT_PUBLIC_API_URL;
  console.log(test);
  const response = await axiosInstance.get('/posts', {
    params: {
      content_or_title_include: searchQuery,
    },
  });

  const posts = response.data.posts.data;

  const modifiedPosts = posts.map((post: PostType) => ({
    ...post,
    content: post.content.replace(/<[^>]+>/g, '')
  }));

  return modifiedPosts;
};
