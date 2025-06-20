import { useEffect, useRef, useState } from "react";
import { updateEditorContent } from "@/components/slateEditor/helper";
import { PostType } from "@/interfaces/post-type";
import { getPost } from "@/lib/post-client";
import useAuthStore from "@/store/useStoreMe";
import { axiosInstance } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { revalidatePosts } from "@/actions/postAction";

export function useEditorWrapper(postId?: string) {
  const [post, setPost] = useState<PostType>();
  const user = useAuthStore((s) => s.user);
  const editorRef = useRef<any>(null);
  const router = useRouter();
  const isOwner = user?.id && (user.id === post?.author?.id);

  useEffect(() => {
    if (postId) {
      getPost({postId}).then(setPost);
    }
    return () => {
      setPost(undefined);
    }
  }, [postId]);

  useEffect(() => {
    if (post) {
      updateEditorContent(editorRef.current?.editor, post?.contentSlate || [])
    }
  }, [post])

  const handleDelete = async () => {
    if (window.confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
      try {
        const response = await axiosInstance.delete(`/posts/${postId}`);
        console.log('Post Deleted:', response);
        await revalidatePosts();
        router.push(`/${user?.nickname}`);
      } catch (error) {
        console.error("Failed to delete post:", error);
      }
    }
  }

  return {
    post,
    editorRef,
    isOwner,
    handleDelete,
  };
}
