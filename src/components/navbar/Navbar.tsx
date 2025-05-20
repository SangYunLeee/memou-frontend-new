import Link from 'next/link';
import MobileMenuButton from './MobileMenuButton';
import { NavLink } from './NavLink';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg" role="navigation" aria-label="메인 네비게이션">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <div className="hidden md:flex items-center space-x-4">
            <NavLink href="/login">로그인</NavLink>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <MobileMenuButton />
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        id="mobile-menu"
        className="hidden md:hidden"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="mobile-menu-button"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <NavLink href="/login">로그인</NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;