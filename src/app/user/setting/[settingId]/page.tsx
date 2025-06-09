import Content from "./_components/Content";
import SideBar from "./_components/SideBar";

export default async function ProfilePage({params}: {params: Promise<{settingId: string}>}) {
  const {settingId} = await params;

  return (
    <main className="px-1 sm:px-8 lg:px-8 py-8">
      <div className="
              w-full max-w-2xl
              grid grid-cols-[auto_1fr]
              mx-auto rounded-lg
              shadow-[0_0_10px_rgba(0,0,0,0.1)]
              min-h-[70vh]
              "
              >
        <SideBar  className="
                    bg-slate-50
                    p-6 text-[1.2rem]
                    border-r
                    border-slate-300
                    flex flex-col gap-2
                    h-full
                    w-[190px]
                    "
                    settingId={settingId} />
        <Content className="p-6 flex flex-col gap-4" settingId={settingId} />
      </div>
    </main>
  );
}
