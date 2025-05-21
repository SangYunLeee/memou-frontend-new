import Link from 'next/link';
import SignupForm from '@/components/auth/SignupForm';
export const metadata = {
  title: '회원가입 - Nmemou',
  description: 'Nmemou 서비스에 회원가입하세요',
};

export default function LoginPage() {
  return (
    <>
      <div>
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          회원가입
        </h2>
      </div>
      <SignupForm />
      <div className="text-center">
        <p className="text-sm text-gray-600">
          이미 계정이 있으신가요?{' '}
          <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            로그인
          </Link>
        </p>
      </div>
    </>
  );
}