'use client';

import { useState } from 'react';

const MobileMenuButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onToggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
      mobileMenu.style.display = newState ? 'block' : 'none';
    }
  };
  const handleClick = () => {
    onToggle();
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
      aria-label={isOpen ? '메뉴 닫기' : '메뉴 열기'}
    >
      {!isOpen ? (
        <svg 
          className="block h-6 w-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          aria-hidden="true"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M4 6h16M4 12h16M4 18h16" 
          />
        </svg>
      ) : (
        <svg 
          className="block h-6 w-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          aria-hidden="true"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M6 18L18 6M6 6l12 12" 
          />
        </svg>
      )}
    </button>
  );
};

export default MobileMenuButton;