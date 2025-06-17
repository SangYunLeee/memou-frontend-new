import EditorWrapper from "./_component/EditorWrapper";

export default async function PostPage(props: { params: Promise<{ postid: string }> }) {
  const params = await props.params;
  const postId = params.postid;
  return (
      <div className="flex flex-col gap-4 border border-gray-300 p-6 max-w-3xl mx-auto w-full min-h-[calc(80vh)]">
        <EditorWrapper postId={postId} />
      </div>
  );
}
