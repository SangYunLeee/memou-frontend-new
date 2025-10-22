import Image from "next/image";
import DefaultAvatar from "@/assets/defaultAvatar.png";
import useAuthStore from "@/store/useStoreMe";
import { axiosInstance } from "@/lib/axios";
import { fetchAndUpdateUserProfile } from "@/lib/api/client/user";
import { revalidatePosts } from "@/actions/postAction";

const uploadImage = async (file: File) => {
  try {
    const formData = new FormData();
    const encodedFilename = encodeURIComponent(file.name);
    const encodedFile = new File([file], encodedFilename, { type: file.type });
    formData.append('image', encodedFile);

    await axiosInstance.put('/users/me/profile/images', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    await revalidatePosts();
    alert('프로필 이미지가 성공적으로 업데이트되었습니다.');
  } catch (error) {
    alert('프로필 이미지 업로드에 실패했습니다. 다시 시도해주세요.');
  }
};

export default function UploadImage({className}: {className: string}) {
  const {user, setUser} = useAuthStore();

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      await uploadImage(e.target.files[0]);
      await fetchAndUpdateUserProfile(setUser);
    }
  };
  return (
    <div className={className}>
      <Image
        src={user?.profileImage?.url || DefaultAvatar}
        alt="profile"
        fill
        priority={false}
        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 17vw"
        className="rounded-full" />
      <label
        className="
          absolute bottom-0 right-0
          bg-blue-400 text-white hover:bg-blue-500
          rounded-full p-1 text-[1.2rem]
          px-2
          "
        htmlFor="profile-image-input">
        변경
      </label>
      <input
          id="profile-image-input"
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleImageChange}
        />
    </div>
  );
}
