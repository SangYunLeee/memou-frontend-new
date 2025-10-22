import Link from 'next/link';
import NavMenu from './_component/NavMenu';

/**
 * 네비게이션 바 컴포넌트
 * user 정보는 layout.tsx에서 한 번만 가져와 Zustand store에 저장되므로
 * 이 컴포넌트에서는 별도로 가져오지 않습니다.
 */
const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg" role="navigation" aria-label="메인 네비게이션">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="flex-shrink-0 flex items-center"
              aria-label="홈으로 이동"
            >
              <span className="text-xl font-bold text-gray-800">Nmemou</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="flex items-center space-x-4">
            <NavMenu />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
