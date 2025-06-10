'use client';
import useAuthStore from "@/store/useStoreMe";
import { useRef } from "react";
import { handleChangePassword, validatePassword, validatePasswordMatch } from './ContentPassword.fn';

export default function ContentPassword() {
  const {user} = useAuthStore();
  const refPassword = useRef<HTMLInputElement>(null);
  const refNewPassword = useRef<HTMLInputElement>(null);
  const refConfirmPassword = useRef<HTMLInputElement>(null);

  const handleChangePasswordHandler = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const passwordInput = refPassword.current;
      const newPasswordInput = refNewPassword.current;
      const confirmPasswordInput = refConfirmPassword.current;
      if (!passwordInput || !newPasswordInput || !confirmPasswordInput) return;

      // 각 입력 필드의 유효성 검사
      if (!validatePassword(passwordInput, '현재 비밀번호')) return;
      if (!validatePassword(newPasswordInput, '새 비밀번호')) return;
      if (!validatePasswordMatch(newPasswordInput, confirmPasswordInput)) return;

      await handleChangePassword(passwordInput.value, newPasswordInput.value);
  }

  return (
    <>
      <h2 className="text-2xl font-bold text-center">비밀번호 설정</h2>
      <form className="flex flex-col gap-4 mt-10" onSubmit={handleChangePasswordHandler}>
        <div>
          <span className="text-[1.0rem] text-gray-500">ID ┃</span>
          <span className="text-[1.0rem] text-gray-500 ml-2">
            {user?.email}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="username" className="sr-only">사용자 이름</label>
          <input 
            type="text" 
            id="username" 
            name="username"
            autoComplete="username"
            className="sr-only"
            defaultValue={user?.email}
          />
          <label htmlFor="password" className="text-[1.0rem] text-gray-500">현재 비밀번호</label>
          <input 
            type="password" 
            id="password" 
            className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" 
            ref={refPassword}
            autoComplete="current-password"
          />
          <span className="text-red-500 text-sm" id="password-error"></span>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="newPassword" className="text-[1.0rem] text-gray-500">새 비밀번호</label>
          <input 
            type="password" 
            id="newPassword" 
            className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" 
            autoComplete="new-password"
            ref={refNewPassword}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="confirmPassword" className="text-[1.0rem] text-gray-500">새 비밀번호 확인</label>
          <input 
            type="password" 
            id="confirmPassword" 
            className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" 
            autoComplete="new-password"
            ref={refConfirmPassword}
          />
        </div>
        <button
          className="bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-blue-500"
        >
          비밀번호 변경
        </button>
      </form>
    </>
  );
}
