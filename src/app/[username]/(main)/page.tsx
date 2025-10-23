import SearchInput from "@/app/[username]/(main)/_components/SearchInput";
import SearchedPosts from "../_components/Posts.client";
import StateSetter from "./_components/StateSetter";
import CategoryTitle from "./_components/CategoryTitle";

export default async function UserPage({
  params,
  searchParams
}: {
  params: Promise<{ username: string }>,
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { username } = await params;
  return (
      <>
          <div className="flex justify-between items-center">
            <CategoryTitle />
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
              gap-2" initialPosts={[]} username={username} />
          <StateSetter username={username} />
      </>
  );
}
