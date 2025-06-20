'use client'
import SlateEditorComponent from "./editor/SlateEditor";
import Image from "next/image";
import DefaultAvatar from "@/assets/defaultAvatar.png";
import { changeDateFormat } from "@/lib/date-helper";
import Link from "next/link";
import { useEditorWrapper } from "./EditorWrapper.fn";

export default function EditorWrapper({postId}: {postId?: string}) {
  const { post, editorRef, isOwner, handleDelete } = useEditorWrapper(postId);

  return (
    <>
      {/* 포스트 제목 */}
      <div className="w-full border-b-1 border-gray-300 focus:outline-none text-[1.5rem] focus:placeholder-transparent pb-1">
        {post?.title || 'Loading...'}
      </div>
      {/* 작성자 정보와 날짜 */}
      <div className="flex items-center gap-3 py-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full overflow-hidden object-cover">
            <Image 
              src={post?.author.profileImage?.url || DefaultAvatar} 
              alt="프로필 이미지" 
              width={32} 
              height={32}
              className="w-full h-full"
            />
          </div>
          <span className="text-gray-700 font-medium">
            {post?.author.nickname || 'Loading...'}
          </span>
        </div>
        <span className="text-gray-400 text-sm">
          {changeDateFormat(post?.createdAt || '')}
        </span>
        {isOwner && (
            <div className="flex items-center gap-2 ml-auto">
              <Link href={`/post/write?postId=${postId}`}>수정</Link>
              <button onClick={handleDelete}>삭제</button>
            </div>
          )}
      </div>
      {/* 포스트 내용 */}
      <SlateEditorComponent ref={editorRef} initialValue={post?.contentSlate} className="flex-1 focus:outline p-2" />
    </>
  );
}