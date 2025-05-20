import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <main className="max-w-2xl w-full space-y-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900">
          Nmemou에 오신 것을 환영합니다
        </h1>
        
        <p className="text-lg text-gray-600">
          당신의 생각을 기록하고 관리하세요
        </p>

        <div className="flex gap-4 justify-center">
          <Link 
            href="/login"
            className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            로그인
          </Link>
          <Link 
            href="/signup"
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            회원가입
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 border rounded-lg">
            <h3 className="text-lg font-semibold mb-2">간편한 메모</h3>
            <p className="text-gray-600">빠르고 쉽게 메모를 작성하세요</p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="text-lg font-semibold mb-2">카테고리 관리</h3>
            <p className="text-gray-600">메모를 체계적으로 정리하세요</p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="text-lg font-semibold mb-2">언제 어디서나</h3>
            <p className="text-gray-600">모든 기기에서 접근 가능합니다</p>
          </div>
        </div>
      </main>
    </div>
  );
}
