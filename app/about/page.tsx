'use client'
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";

import bg_img from './../../public/icons/XZKTO.svg'

export default function HomePage() {
    return (
        <main className="">
            <Navbar />
            <div className="px-4 md:px-10 sm:px-10 lg:px-20">
                <div className="lg:mt-24 sm:mt-[-40px] mt-8 flex justify-center items-center text-center min-h-[20vh] sm:min-h-[30vh] md:min-h-[40vh] lg:min-h-[50vh]">
                    <h1 className="text-[32px] sm:text-[48px] md:text-[80px] lg:text-[150px] tracking-widest text-white">
                        ABOUT US
                    </h1>
                </div>
                <div className="justify-center lg:mt-[-80px] mt-[-20px] sm:mt-[-40px] items-center text-center min-h-[30vh] sm:min-h-[40vh] md:min-h-[50vh]">
                    <p className="text-white text-[14px] sm:text-[18px] md:text-[22px] lg:text-[30px] px-2 sm:px-0 leading-relaxed">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </p>
                </div>
                <div className="mt-[-50px] sm:mt-[-80px] md:mt-[-100px] lg:mt-[-160px]">
                    <Image 
                        src={bg_img} 
                        alt="bg_img" 
                        className="w-full h-auto mb-8 sm:mb-12" 
                        priority
                    />
                </div>
            </div>
            <Footer/>
        </main>
    );
}