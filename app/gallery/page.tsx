"use client";

import Footer from "../components/footer";
import Navbar from "../components/Navbar";
import Gallery from "./../components/GalleryImages";
import bgimg from "./../../public/images/Group 12 (1).png";
import Image from "next/image";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <main className="flex-grow px-6 md:px-10 lg:px-20">
        <Image
          src={bgimg}
          alt="bg-img"
          width={700}
          height={400}
          className="w-full h-auto mt-12"
        />
      </main>

      <div>
        <Gallery />
      </div>

      <div className="bg-[#18202D] px-6 sm:px-12 py-6 sm:py-8 text-center">
        <p className="text-[14px] sm:text-[16px] text-white">
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
          ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duisaute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </p>
      </div>
    </main>
  );
}
