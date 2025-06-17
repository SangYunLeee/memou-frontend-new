import SearchInput from "@/app/[username]/_components/SearchInput";
import SearchedPosts from "./_components/Posts.client";
import StateSetter from "./StateSetter";
import SideBar from "./_components/SideBar/SideBar";
import { initialPosts } from "./page.fn";
import { PostType } from "@/interfaces/post-type";

export default async function UserPage(props: { params: Promise<{ username: string }> }) {
  const params = await props.params;
  return (
    <main className="px-1 sm:px-8 py-2 flex-1 flex">
      <div className="grid max-w-7xl mx-auto gap-3 grid-cols-1 sm:grid-cols-[250px_auto]">
        {/* 왼쪽 사이드바 */}
        <aside className="col-start-1 col-end-2 bg-purple-50 rounded-lg p-2">
          <SideBar className="bg-purple-50 rounded-lg" authorName={params.username} />
        </aside>

        {/* 오른쪽 게시글 리스트 */}
        <section className="col-start-2 col-end-3 bg-pink-50 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">게시글 목록</h2>
            <SearchInput className="relative mb-4" />
          </div>
          {/* 게시글 리스트 내용 */}
          <SearchedPosts className="
              w-full
              sm:min-w-[500px]
              lg:min-w-[700px]
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              gap-2" initialPosts={[]} username={params.username} />
        </section>
      </div>
      <StateSetter username={params.username} />
    </main>
  );
}
