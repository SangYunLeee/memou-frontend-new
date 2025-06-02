import SearchInput from "@/app/[username]/_components/SearchInput";
import SearchedPosts from "./_components/Posts.client";

export default async function UserPage(props: { params: Promise<{ username: string }> }) {
  const params = await props.params;
  return (
    <main className="px-1 sm:px-8 lg:px-8 py-8 flex-1 flex">
      <div className="w-full grid grid-cols-[230px_calc(100%-230px)] gap-6 max-w-5xl mx-auto">
        {/* 왼쪽 사이드바 */}
        <aside className="bg-purple-50 rounded-lg p-4">
          {/* 사이드바 내용 */}
        </aside>

        {/* 오른쪽 게시글 리스트 */}
        <section className="bg-pink-50 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">게시글 목록</h2>
            <SearchInput className="relative mb-4" />
          </div>
          {/* 게시글 리스트 내용 */}
          <SearchedPosts initialPosts={[]} />
        </section>
      </div>
    </main>
  );
}
