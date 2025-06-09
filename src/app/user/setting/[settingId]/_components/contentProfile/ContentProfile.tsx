'use client';
import UploadImage from "./UploadImage";
import UpdateProfile from "./UpdateProfile";
export default function ContentProfile() {
  return (
    <>
      <h2 className="text-2xl font-bold text-center">프로필 설정</h2>
      <UploadImage className="relative mx-auto bg-gray-100 rounded-full h-[10rem] w-[10rem] p-2 mt-6 mb-4" />
      <UpdateProfile className="flex flex-col gap-4 mt-3" />
    </>
  );
}
