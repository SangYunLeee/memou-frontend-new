export default async function PostPage({ params }: { params: { postid: string } }) {
  return <div>{params.postid}</div>;
}
