'use client';

import Image from 'next/image';
import Link from 'next/link';
import AzimLogo from './../../public/icons/LOGO png 1.svg';

export default function Navbar() {
    return (
        <header className="w-full h-16 lg:h-20 bg-gradient-to-r flex items-center justify-between px-4 lg:px-12">
            {/* Logo */}
            <Link href="/" className="flex items-center">
                <Image src={AzimLogo} alt="logotip" className="w-[100px] h-auto lg:w-[228px]" />
            </Link>

            {/* Menu */}
            <nav className="flex space-x-6 lg:ml-[900px] text-white text-sm lg:text-base">
                <Link href="/index" className="hover:text-gray-300">INDEX</Link>
                <Link href="/service" className="hover:text-gray-300">SERVICE</Link>
                <Link href="/gallery" className="hover:text-gray-300">GALLERY</Link>
                <Link href="/price" className="hover:text-gray-300">PRICE</Link>
                <Link href="/about" className="hover:text-gray-300">CONTACT</Link>
            </nav>

            {/* Button */}
            <button className="w-[151px] h-[43px] bg-white rounded-md">
              GET IN TOUCH
            </button>
        </header>
    );
}
