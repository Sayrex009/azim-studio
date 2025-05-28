'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import AzimLogo from './../../public/icons/LOGO png 1.svg';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(prev => !prev);

  // Запретить скролл при открытом меню
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [menuOpen]);

  return (
    <header className="w-full h-16 lg:h-20 flex items-center justify-between px-4 lg:px-12 relative mt-2">
      {/* Logo */}
      <Link href="/" className="flex items-center justify-center z-50">
        <Image src={AzimLogo} alt="logotip" className="w-[100px] h-auto lg:w-[228px]" />
      </Link>

      {/* Desktop menu */}
      <nav className="hidden lg:flex space-x-6 justify-center items-center text-white text-sm lg:text-base lg:ml-[900px]">
        <Link href="/index" className="hover:text-gray-300">INDEX</Link>
        <Link href="/service" className="hover:text-gray-300">SERVICE</Link>
        <Link href="/gallery" className="hover:text-gray-300">GALLERY</Link>
        <Link href="/price" className="hover:text-gray-300">PRICE</Link>
        <Link href="/contact" className="hover:text-gray-300">CONTACT</Link>
      </nav>

      {/* Desktop button */}
      <button className="hidden lg:flex w-[151px] h-[43px] justify-center items-center bg-white rounded-md">
        GET IN TOUCH
      </button>

      {/* Mobile menu icon */}
      <div className="lg:hidden z-50">
        <button onClick={toggleMenu} className="text-white focus:outline-none">
          <Menu size={28} />
        </button>
      </div>

      {/* Fullscreen mobile menu */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-[#1a5149] text-white z-[999] transition-transform duration-300 ease-in-out ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center px-2 border-b border-white/20">
          <Image src={AzimLogo} alt="logo" className="w-[100px]" />
          <button onClick={toggleMenu} className="text-white">
            <X size={28} />
          </button>
        </div>

        <div className="flex flex-col px-5 space-y-6 mt-10 text-lg font-medium">
          <Link href="/index" onClick={toggleMenu} className="hover:text-gray-300">INDEX</Link>
          <Link href="/service" onClick={toggleMenu} className="hover:text-gray-300">SERVICE</Link>
          <Link href="/gallery" onClick={toggleMenu} className="hover:text-gray-300">GALLERY</Link>
          <Link href="/price" onClick={toggleMenu} className="hover:text-gray-300">PRICE</Link>
          <Link href="/contact" onClick={toggleMenu} className="hover:text-gray-300">CONTACT</Link>

          <button className="mt-4 w-[151px] h-[43px] bg-white text-black rounded-md">
            GET IN TOUCH
          </button>
        </div>
      </div>
    </header>
  );
}
