import EditorWrapper from "./_component/EditorWrapper";

export default async function PostPage(props: { params: Promise<{ postid: string }> }) {
  const params = await props.params;
  const postId = params.postid;
  return (
      <div className="
        flex flex-col
        min-h-[calc(80vh)]
        gap-4
        p-6
        mb-10
        border border-gray-300
        max-w-3xl mx-auto w-full
      ">
        <EditorWrapper postId={postId} />
      </div>
  );
}
