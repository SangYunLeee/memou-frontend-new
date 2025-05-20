import LoginForm from '@/components/auth/LoginForm';
import Link from 'next/link';
export const metadata = {
  title: '로그인 - Nmemou',
  description: 'Nmemou 서비스에 로그인하세요',
};

export default function LoginPage() {
  return (
    <>
      <div> 
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          로그인
        </h2>
        </div>
        <LoginForm />
        <div className="text-center">
          <p className="text-sm text-gray-600">
            계정이 없으신가요?{' '}
            <Link href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
              새 계정 만들기
            </Link>
          </p>
        </div>
    </>
  );
}