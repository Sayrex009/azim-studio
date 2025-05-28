'use client';

import Link from 'next/link';
import { FaInstagram, FaApple, FaGoogle, FaFacebookF } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="w-full bg-[#e4e1dc] py-6 px-4 flex flex-col items-center gap-4 border-t border-black">
      {/* Навигация */}
      <div className="flex gap-6 flex-wrap justify-center text-black font-medium">
        <Link href="/"><span>/INDEX</span></Link>
        <Link href="/service"><span>/SERVICE</span></Link>
        <Link href="/gallery"><span>GALLERY</span></Link>
        <Link href="/price"><span>/PRICE</span></Link>
        <Link href="/contact"><span>/CONTACT</span></Link>
      </div>

      {/* Иконки */}
      <div className="flex gap-6 text-black text-xl">
        <Link href="https://instagram.com" target="_blank">
          <FaInstagram className="hover:text-gray-600 transition-colors" />
        </Link>
        <Link href="https://apple.com" target="_blank">
          <FaApple className="hover:text-gray-600 transition-colors" />
        </Link>
        <Link href="https://google.com" target="_blank">
          <FaGoogle className="hover:text-gray-600 transition-colors" />
        </Link>
        <Link href="https://facebook.com" target="_blank">
          <FaFacebookF className="hover:text-gray-600 transition-colors" />
        </Link>
      </div>
    </footer>
  );
}
