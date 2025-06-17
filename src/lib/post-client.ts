import { PostType } from "@/interfaces/post-type";
import { CategoryType } from "@/interfaces/category-type";
import { axiosInstance } from "./axios";

interface GetPostsProps {
  searchQuery?: string;
  authorId?: string;
  selectedCategory?: CategoryType;
}

export const getPosts = async ({ searchQuery, authorId, selectedCategory }: GetPostsProps): Promise<PostType[]> => {
  const test = process.env.NEXT_PUBLIC_API_URL;
  console.log(test);
  const response = await axiosInstance.get('/posts', {
    params: {
      content_or_title_include: searchQuery,
      author_id: authorId,
      category_ids: selectedCategory?.children ? [selectedCategory.id, ...selectedCategory.children.map((category) => category.id)].join(',') : selectedCategory?.id?.toString(),
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
