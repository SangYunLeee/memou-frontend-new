import SideBar from "./_components/sideBar/SideBar";
import StateSetter from "./_components/StateSetter";
export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ username: string }>;
}) {
  const _params = await params;
  const decodedNickname = decodeURIComponent(_params.username);
  return (
    <main className="px-1 sm:px-8 py-2 flex-1 flex">
      <div className="grid w-270 mx-auto gap-3 grid-cols-1 sm:grid-cols-[260px_auto]">
        {/* 왼쪽 사이드바 */}
        <aside className="rounded-lg p-2">
          <SideBar className="rounded-lg" authorName={decodedNickname} />
        </aside>
        {/* 오른쪽 콘텐츠 */}
        <section className="rounded-lg p-4">
          {children}
        </section>
      </div>
      <StateSetter username={decodedNickname} />
    </main>
  );
}
