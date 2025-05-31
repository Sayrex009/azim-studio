"use client";

import Footer from "../components/footer";
import Navbar from "../components/Navbar";
import StudioServices from "../components/Services";
export default function HomePage() {
  return (
    <main>
      <Navbar />
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow px-4 md:px-10 lg:px-20"></main>
        <div className="mt-[-50px] ">
          <StudioServices />
        </div>
        <div className="bg-[#18202D] px-12 py-8  mt-12 text-center">
          <p className="text-[16px] text-white ">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
