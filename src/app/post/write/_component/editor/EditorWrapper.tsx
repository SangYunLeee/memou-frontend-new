'use client'
import { useEffect, useRef, useState } from "react";
import SlateEditorComponent from "./_component/SlateEditor";
import TitleInput from "./_component/TitleInput";
import useStorePostPoster from "@/hooks/useStorePostPoster";
import { fetchPost, getEditorSerializedData, handlePostSubmission, updateEditorContent } from "./EditorWrapper.fn";
import { PostType } from "@/interfaces/post-type";
import { revalidatePosts } from "@/actions/postAction";
import { useRouter } from 'next/navigation'
export default function EditorWrapper({postId}: {postId?: string}) {
  const { post, setPost } = useStorePostPoster();
  const titleInputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<any>(null);
  const router = useRouter()


  // 포스트 데이터 가져오기
  useEffect(() => {
    fetchPost(postId, setPost);
    return () => {
      setPost(undefined);
    }
  }, [postId]);

  // 포스트 데이터 업데이트
  useEffect(() => {
    if (post) {
      // 포스트 내용 업데이트
      updateEditorContent(editorRef.current?.editor, post?.contentSlate || [])
    }
  }, [post])

  return (
    <>
      <TitleInput ref={titleInputRef} initialValue={post?.title} className="w-full h-10 border-b-1 border-gray-300 focus:outline-none text-[1.3rem] focus:placeholder-transparent"/>
      <SlateEditorComponent ref={editorRef} initialValue={post?.contentSlate} className="flex-1 focus:outline" />
      <button onClick={async () => {
          const sendPostData = getEditorSerializedData({
            post,
            editor: editorRef.current?.editor,
            title: titleInputRef.current?.value || ''
          })
          await handlePostSubmission(sendPostData)
          await revalidatePosts()
          router.push('/');
      }}>
        BUTTON
      </button>
    </>
  );
}
