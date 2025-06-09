import useAuthStore from "@/app/_hooks/useStoreMe";
import { axiosInstance } from "@/lib/axios";
import { fetchAndUpdateUserProfile } from "@/lib/user-client";
import { useRef } from "react";

export default function UpdateProfile({className}: {className: string}) {
  const {user, setUser} = useAuthStore();
  const refNickname = useRef<HTMLInputElement>(null);
  const refIntroduce = useRef<HTMLInputElement>(null);

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nickname = refNickname.current?.value;
    const profileDescription = refIntroduce.current?.value;

    try {
      const userData = {
        ...(nickname && { nickname }),
        ...(profileDescription && { profileDescription })
      };
      await axiosInstance.patch('/users/me/profile', userData);

      alert('프로필이 성공적으로 업데이트되었습니다.');
      fetchAndUpdateUserProfile(setUser);
    } catch (error) {
      console.error('프로필 업데이트에 실패했습니다:', error);
      alert('프로필 업데이트에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <form className={className} onSubmit={handleUpdateProfile}>
        <div className="flex flex-col gap-2">
          <label htmlFor="nickname" className="text-[1.0rem] text-gray-500">닉네임</label>
          <input
            type="text"
            id="nickname"
            className="w-full p-2 rounded-md border border-gray-300"
            defaultValue={user?.nickname}
            ref={refNickname}
            minLength={2}
            maxLength={20}
            pattern="^[가-힣a-zA-Z0-9]+$"
            title="2~20자의 한글, 영문, 숫자만 사용 가능합니다"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="introduce" className="text-[1.0rem] text-gray-500">자기 소개</label>
          <input
            type="text"
            id="introduce"
            className="w-full p-2 rounded-md border border-gray-300"
            defaultValue={user?.profileDescription}
            placeholder="자기를 소개해주세요."
            ref={refIntroduce}
          />
        </div>
        <button className="bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-blue-500">
          변경사항 저장
        </button>
    </form>
  );
}
