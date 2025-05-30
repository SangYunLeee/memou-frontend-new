'use client'
import TitleInput from "./_component/TitleInput";
import SlateEditorComponent from "./_component/SlateEditor";

export default async function WritePage({searchParams}: {searchParams: {postid: string}}) {
  const postId = await searchParams.postid;

  console.log("postId", postId)
  // const post = await getPost(postId);
  // useEffect(() => {
  //   if (postId) {
  //     const post = await getPost(postId);
  //   }
  // }, [postId]);
  return (
    <div className="flex flex-col gap-4 border border-gray-300 p-6 max-w-4xl mx-auto w-full min-h-[73vh]">
      <TitleInput className="w-full h-10 border-b-1 border-gray-300 focus:outline-none text-[1.3rem] focus:placeholder-transparent"/>
      <SlateEditorComponent className="flex-1 focus:outline" />
    </div>
  );
}
