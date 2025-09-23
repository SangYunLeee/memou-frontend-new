'use client'
import { useEffect, useRef, useState } from "react";
import SlateEditorComponent from "./_component/SlateEditor";
import TitleInput from "./_component/TitleInput";
import useStorePostPoster from "@/app/(main)/_hooks/useStorePostPoster";
import { getEditorSerializedData, handlePostSubmission } from "./EditorWrapper.fn";
import { updateEditorContent } from "@/components/slateEditor/helper";
import { revalidatePosts } from "@/actions/postAction";
import { useRouter } from 'next/navigation'
import { getPost } from "@/lib/post-client";
import ToolbarImplement from "@/components/slateEditor/toolbar/ToolbarImplement";
import ToggleVisibilityButton, { ToggleVisibilityButtonHandle } from "./ToggleVisibilityButton";
import { Visibility } from "@/interfaces/post-type";
import { CategoryType } from "@/interfaces/category-type";
import CategoryOption from "./_component/CategoryOption";
import { BackButton } from "./_component/BackButton";

export default function EditorWrapper({postId}: {postId?: string}) {
  const { post, setPost } = useStorePostPoster();
  const titleInputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<any>(null);
  const router = useRouter()
  const toggleRef = useRef<ToggleVisibilityButtonHandle>(null);
  const isEdit = postId ? true : false;
  const categoryOptionRef = useRef<{ current: CategoryType | null }>(null);
  // 포스트 데이터 가져오기
  useEffect(() => {
    if (postId) {
      getPost({postId}).then(setPost);
    }
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

  const handleSave = async () => {
    const selectedCategory = categoryOptionRef.current?.current;
    const editor = editorRef.current?.editor;
    const title = titleInputRef.current?.value || '';
    const isPublic = toggleRef.current?.isPublic() || false;
    const sendPostData = getEditorSerializedData({
      post,
      editor,
      title,
      isPublic,
      categoryId: selectedCategory?.id || undefined,
    })
    const updatedPost = await handlePostSubmission({post: sendPostData, postId: postId ? Number(postId) : undefined})
    await revalidatePosts()
    router.push(`/${updatedPost.author?.nickname}/post/${updatedPost.id}`);
  }

  return (
    <>
      {/* 포스트 제목 */}
      <TitleInput ref={titleInputRef} initialValue={post?.title} className="w-full h-10 border-b-1 border-gray-300 focus:outline-none text-[1.3rem] focus:placeholder-transparent"/>
      {/* 포스트 내용 */}
      <SlateEditorComponent ref={editorRef} initialValue={post?.contentSlate} className="flex-1 focus:outline p-2" >
        {/* 카테고리 선택 */}
        <div className="relative mb-2 h-8 flex items-center justify-between">
          <CategoryOption ref={categoryOptionRef} initialValue={post?.category?.id} className="flex items-center gap-2 rounded-md" />
          <ToggleVisibilityButton ref={toggleRef} initialValue={(!post || post?.visibilityId === Visibility.PUBLIC)} />
        </div>
        <ToolbarImplement className="" />
      </SlateEditorComponent>
      {/* 등록하기 버튼 */}
      <div className="flex justify-between">
        <BackButton className="mr-2 py-1 px-2"/>
        <button 
          className="bg-[#12b886] text-white p-1 px-2 rounded-md hover:bg-[#0ca678] transition-colors text-lg" 
          onClick={handleSave}>
          {isEdit ? '수정하기' : '등록하기'}
        </button>
      </div>
    </>
  );
}
