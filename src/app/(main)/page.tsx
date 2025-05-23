import { getPosts } from '@/lib/post';
import Link from 'next/link';
import Image from 'next/image';
import DefaultAvatar from '@/assets/defaultAvatar.png';
export default async function Home() {
  const posts = await getPosts() || [];
  return (
    <div className="min-h-screen p-2 sm:p-8">
      <main className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">게시글 목록</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              className="w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {posts && posts.map((post) => (
            <article key={post.id} className="border border-gray-300 rounded-lg hover:shadow-md transition-shadow h-[200px] hover:border-indigo-300 transition-all p-0">
              <Link href={`/posts/${post.id}`} className="block h-full p-3 ">
                <div className="flex flex-col h-full">
                  <h2 className="text-lg font-semibold mb-1.5 line-clamp-2 text-gray-800">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 text-sm line-clamp-3 flex-grow">
                    {post.content}
                  </p>
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="flex items-center">
                        <span className="w-5 h-5 rounded-full bg-gray-200 mr-1.5">
                          <Image src={post.author.profileImage?.url || DefaultAvatar} alt="프로필 이미지" width={20} height={20} />
                        </span>
                        {post.author.nickname}
                      </span>
                      <time>{new Date(post.createdAt).toLocaleDateString()}</time>
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
