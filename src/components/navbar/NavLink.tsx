'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export const NavLink = ({ href, children }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
      isActive ? 'text-gray-900 bg-gray-100' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
    }`}
    aria-current={isActive ? 'page' : undefined}
    >
      {children}
    </Link>
  );
};
