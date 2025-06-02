import EditorWrapper from "./_component/EditorWrapper";

export default async function PostPage(props: { params: Promise<{ postid: string }> }) {
  const params = await props.params;
  const postId = params.postid;
  return (
    <main className="px-1 sm:px-8 lg:px-8 py-8 flex-1 flex">
      <div className="flex flex-col gap-4 border border-gray-300 p-6 max-w-3xl mx-auto w-full flex-1">
        <EditorWrapper postId={postId} />
      </div>
    </main>
  );
}
