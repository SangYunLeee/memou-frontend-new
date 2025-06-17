import Link from "next/link";
import Image from "next/image";
import DefaultAvatar from "@/assets/defaultAvatar.png";
import { PostType } from "@/interfaces/post-type";
import { changeDateFormat } from "@/lib/date-helper";

export default function Post({ className, post, authorView = true }: { className: string, post: PostType, authorView?: boolean }) {
  return (
    <article key={post.id} className={`${className}`}>
      <div className="flex flex-col h-full">
        <Link href={`/${post.author.nickname}/post/${post.id}`} className="flex-1 p-2">
          <h4 className="text-lg font-semibold mb-1.5 line-clamp-2 text-gray-800">
            {post.title}
          </h4>
          <p className="text-gray-600 text-sm line-clamp-3 flex-grow">
            {post.content}
          </p>
        </Link>
        <div className="mt-3 border-t border-gray-100 p-2">
          <div className="flex items-center justify-between text-xs text-gray-500">
            {authorView ? (
              <Link href={`/${post.author.nickname}`} className="flex items-center hover:opacity-80 transition-opacity">
                <span className="w-5 h-5 rounded-full bg-gray-200 mr-1.5 overflow-hidden">
                  <Image src={post.author.profileImage?.url || DefaultAvatar} alt="프로필 이미지" width={20} height={20} />
                </span>
                <span className="text-gray-700">{post.author.nickname}</span>
              </Link>
            ): (<div></div>)}
            <time>{changeDateFormat(post.createdAt)}</time>
          </div>
        </div>
      </div>
  </article>
  );
}
