import EditorWrapper from "./_component/editor/EditorWrapper";

export default async function WritePage(props: {searchParams: Promise<{postId: string}>}) {
  const searchParams = await props.searchParams;
  const postId = searchParams?.postId || undefined;
  return (
    <main className="px-1 sm:px-8 py-2 flex-1 flex">
      <div className="flex flex-col gap-4 border border-gray-300 p-6 max-w-3xl mx-auto w-full flex-1">
        <EditorWrapper postId={postId} />
      </div>
    </main>
  );
}
