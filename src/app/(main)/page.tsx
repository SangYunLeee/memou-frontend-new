import { getPosts } from '@/lib/post';
import Link from 'next/link';
import Image from 'next/image';
import DefaultAvatar from '@/assets/defaultAvatar.png';
export default async function Home() {
  const posts = await getPosts() || [];
  return (
    <div className="min-h-screen p-1 sm:p-8">
      <main className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">게시글 목록</h1>
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
