"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import { MapPin, Phone } from "lucide-react";
import Image from "next/image";
import BgImg from "./../../public/images/bg-img.svg";
import FaqLists from "../components/FaqLists";

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <main className="flex-grow px-4 md:px-10 lg:px-20">
        <div className="mt-10  md:mt-24 text-center">
          <h1 className="text-[28px] sm:text-[36px] md:text-[60px] lg:text-[120px] tracking-wide text-white leading-tight">
            CONTACT US
          </h1>
        </div>

        <div className="mt-6 sm:mt-10 md:mt-12 text-center">
          <p className="text-white text-[14px] sm:text-[16px] md:text-[20px] lg:text-[28px] leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div className="mt-12">
          <Image
            src={BgImg}
            alt="bg_img"
            className="w-full h-auto mb-8 sm:mt-12"
            priority
          />
        </div>
      </main>
      <main className="min-h-screen mb-[-250px] lg:mb-[-100px]   text-white">
        <div className="flex flex-col items-center justify-center py-12 px-4 md:px-8 lg:px-24">
          {/* Contact Info */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-8 text-center mb-12">
            <div>
              <div className="flex flex-col items-center">
                <MapPin className="w-10 h-10 mb-2" />
                <h2 className="text-lg font-semibold">Office</h2>
                <p className="text-sm">Lorem ipsum dolor sit amet</p>
                <p className="mt-2 text-xs">
                  100 street
                  <br />
                  Collingwood VIC 2101 AU
                </p>
              </div>
            </div>
            <div>
              <div className="flex flex-col items-center">
                <Phone className="w-10 h-10 mb-2" />
                <h2 className="text-lg font-semibold">Phone</h2>
                <p className="text-sm">Lorem ipsum dolor sit amet</p>
                <p className="mt-2 text-xs">+998 (88) 206 21 01</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form className="w-full max-w-xl space-y-4 ">
            <div>
              <label className="block text-xs mb-1" htmlFor="firstName">
                First name
              </label>
              <input
                id="firstName"
                type="text"
                placeholder="First name..."
                className="w-full p-3 rounded bg-white text-black text-sm"
              />
            </div>
            <div>
              <label className="block text-xs mb-1" htmlFor="phone">
                Phone number
              </label>
              <input
                id="phone"
                type="text"
                placeholder="+998 (88) 206 21 01"
                className="w-full p-3 rounded bg-white text-black text-sm"
              />
            </div>
            <div>
              <label className="block text-xs mb-1" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                placeholder="Send message..."
                rows={4}
                className="w-full p-3 rounded bg-white text-black text-sm"
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-[#1C2431] w-full text-white py-2 px-8 rounded border border-white hover:bg-[#294040] transition"
              >
                SEND MESSAGE
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
