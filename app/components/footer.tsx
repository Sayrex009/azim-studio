'use client';

import Link from "next/link";
import { FaInstagram, FaApple, FaGoogle, FaFacebookF } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-[#e4e1dc] py-6 px-4 flex flex-col items-center gap-4 border-t mt-auto">
      {/* Навигация */}
      <div
        className="
          hidden sm:flex gap-6 text-black font-medium justify-center w-full max-w-4xl
        "
      >
        <Link href="/about"><span>/ABOUT</span></Link>
        <Link href="/service"><span>/SERVICE</span></Link>
        <Link href="/gallery"><span>GALLERY</span></Link>
        <Link href="/price"><span>/PRICE</span></Link>
        <Link href="/contact"><span>/CONTACT</span></Link>
      </div>

      <div
        className="
         grid grid-cols-4 gap-4 text-black font-medium max-w-md w-full sm:hidden
        "
      >
        <Link href="/about"><span className="block">/ABOUT</span></Link>
        <Link href="/service"><span className="block">/SERVICE</span></Link>
        <Link href="/gallery"><span className="block">GALLERY</span></Link>
        <Link href="/price"><span className="block">/PRICE</span></Link>
        <Link href="/contact" className="ml-[150px]"><span className="block">/CONTACT</span></Link>
      </div>

      {/* Иконки */}
      <div className="flex gap-6 text-black text-xl">
        <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="hover:text-gray-600 transition-colors" />
        </Link>
        <Link href="https://apple.com" target="_blank" rel="noopener noreferrer">
          <FaApple className="hover:text-gray-600 transition-colors" />
        </Link>
        <Link href="https://google.com" target="_blank" rel="noopener noreferrer">
          <FaGoogle className="hover:text-gray-600 transition-colors" />
        </Link>
        <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebookF className="hover:text-gray-600 transition-colors" />
        </Link>
      </div>
    </footer>
  );
}
