import { getPosts } from '@/lib/post';
import SearchInput from './SearchInput';
import Post from '@/components/poster/post';
import SearchedPosts from './_components/Posts.client';

export default async function Home() {
  const initialPosts = await getPosts({});

  return (
    <div className="min-h-screen p-2 sm:p-8">
      <main className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">게시글 목록</h1>
          <SearchInput />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 ">
        </div>
        <SearchedPosts initialPosts={initialPosts} />
      </main>
    </div>
  );
}
