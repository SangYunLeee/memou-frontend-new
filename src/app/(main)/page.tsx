import { getPosts } from '@/lib/post';
import Link from 'next/link';

export default async function Home() {
  const posts = await getPosts() || [];
  return (
    <div className="min-h-screen p-8">
      <main className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">게시글 목록</h1>
          <Link 
            href="/write"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            글쓰기
          </Link>
        </div>

        <div className="space-y-4">
          {posts && posts.map((post) => (
            <article key={post.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <Link href={`/posts/${post.id}`}>
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-4">{post.content}</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{post.author.nickname}</span>
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
