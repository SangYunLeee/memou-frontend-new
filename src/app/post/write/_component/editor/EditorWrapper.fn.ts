import { PostStatus, PostType, SendPostType, Visibility } from "@/interfaces/post-type";
import { axiosInstance } from "@/lib/axios";
import { Editor } from "slate";
import { serialize } from "@/components/slateEditor/serialize";

export const getEditorSerializedData = ({post, editor, title, isPublic}: {post?: PostType, editor: Editor, title: string, isPublic: boolean}) : SendPostType => {
  const jsonContent = JSON.stringify(editor.children);
  const deserializedContent = serialize(editor);
  return {
    title,
    content: deserializedContent,
    contentSlate: jsonContent,
    categoryId: post?.category?.id || undefined,
    visibilityId: isPublic ? Visibility.PUBLIC : Visibility.PRIVATE,
    statusId: post?.statusId || PostStatus.PUBLISHED,
  }
}

export const handlePostSubmission = async (post: SendPostType) => {
  try {
    const isUpdate = post.id ? true : false;
    const response = isUpdate
      ? await axiosInstance.patch(`/posts/${post.id}`, post)
      : await axiosInstance.post('/posts', post);

    const updatedPost = response.data.post as PostType;
    if (!updatedPost) {
      throw new Error('Post not found');
    }
    return updatedPost;
  } catch (error) {
    console.error('게시글 저장 실패:', error);
    throw error;
  }
};
