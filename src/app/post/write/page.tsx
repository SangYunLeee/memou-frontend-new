import EditorWrapper from "./_component/editor/EditorWrapper";

export default async function WritePage(props: {searchParams: Promise<{postId: string}>}) {
  const searchParams = await props.searchParams;
  const postId = searchParams?.postId || undefined;
  return (
    <div className="flex flex-col gap-4 border border-gray-300 p-6 max-w-4xl mx-auto w-full min-h-[73vh]">
      <EditorWrapper postId={postId} />
    </div>
  );
}
