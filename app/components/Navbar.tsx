"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import AzimLogo from "./../../public/icons/LOGO png 1.svg";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

  return (
    <header className="w-full h-16 lg:h-20 flex items-center justify-between px-4 lg:px-12 relative mt-2">
      {/* Desktop Logo */}
      <Link
        href="/"
        className="hidden lg:flex items-center justify-center z-50"
      >
        <Image src={AzimLogo} alt="logotip" className="w-[250px] h-auto" />
      </Link>

      {/* Mobile Logo */}
      <Link
        href="/"
        className="flex lg:hidden items-center justify-center z-50"
      >
        <Image src={AzimLogo} alt="logotip" className="w-[170px] h-auto" />
      </Link>

      {/* Desktop menu */}
      <nav className="hidden lg:flex space-x-6 justify-center items-center text-white text-sm lg:text-base lg:ml-auto">
        <Link href="/service" className="hover:text-gray-300">
          SERVICE
        </Link>
        <Link href="/gallery" className="hover:text-gray-300">
          GALLERY
        </Link>
        <Link href="/contact" className="hover:text-gray-300">
          CONTACT
        </Link>
        <Link href="/about" className="hover:text-gray-300">
          ABOUT
        </Link>
      </nav>

      {/* Mobile menu icon */}
      <div className="lg:hidden z-50">
        <button
          onClick={toggleMenu}
          className="text-white cursor-pointer focus:outline-none"
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Fullscreen mobile menu */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-[#18202D] text-white z-[999] transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-2 border-b border-white/20">
          <Link href="/" className="flex items-center justify-center z-50">
            <Image src={AzimLogo} alt="logo" className="w-[120px]" />
          </Link>
          <button onClick={toggleMenu} className="text-white mr-2">
            <X size={28} />
          </button>
        </div>

        <div className="flex flex-col px-5 space-y-6 mt-10 text-lg font-medium ">
          <Link
            href="/service"
            onClick={toggleMenu}
            className="flex border-b h-10 border-white/20 hover:text-gray-300"
          >
            SERVICE{" "}
            <span className="right-0 absolute px-4">
              <ChevronRight />
            </span>
          </Link>
          <Link
            href="/gallery"
            onClick={toggleMenu}
            className="flex border-b h-10 border-white/20 hover:text-gray-300"
          >
            GALLERY{" "}
            <span className="right-0 absolute px-4">
              <ChevronRight />
            </span>
          </Link>
          <Link
            href="/contact"
            onClick={toggleMenu}
            className="flex border-b h-10 border-white/20 hover:text-gray-300"
          >
            CONTACT{" "}
            <span className="right-0 absolute px-4">
              <ChevronRight />
            </span>
          </Link>
          <Link
            href="/about"
            onClick={toggleMenu}
            className="flex border-b h-10 border-white/20 hover:text-gray-300"
          >
            ABOUT{" "}
            <span className="right-0 absolute px-4">
              <ChevronRight />
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
