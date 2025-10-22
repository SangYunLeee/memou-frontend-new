import { axiosInstance } from "@/lib/axios";

export const validatePassword = (input: HTMLInputElement, fieldName: string): boolean => {
  if (!input.value) {
    input.setCustomValidity(`${fieldName}를 입력해주세요`);
    input.reportValidity();
    return false;
  }

  if (input.value.length < 3) {
    input.setCustomValidity('비밀번호는 3자 이상이어야 합니다');
    input.reportValidity();
    return false;
  }
  return true;
};

export const validatePasswordMatch = (password: HTMLInputElement, confirmPassword: HTMLInputElement): boolean => {
  if (password.value !== confirmPassword.value) {
    confirmPassword.setCustomValidity('비밀번호가 일치하지 않습니다');
    confirmPassword.reportValidity();
    return false;
  }
  return true;
};


export const handleChangePassword = async (password: string, newPassword: string) => {
  try {
    await axiosInstance.patch('/auth/password', {
      currentPassword: password,
      newPassword,
    });
    alert('비밀번호가 변경되었습니다.');
  } catch (error: any) {
    console.error(error);
    alert(`${error.response.data.message}`);
  }
}