'use client'

import Navbar from "../components/Navbar";
import Footer from "../components/footer";
export default function HomePage() {
    return (
        <main>
            <Navbar />
            <div className="px-4 md:px-10 lg:px-20">
                <div className="mt-32 justify-center items-center text-center min-h-[50vh]">
                    <h1 className="text-[48px] md:text-[80px] lg:text-[150px] tracking-widest text-white">
                        ABOUT US
                    </h1>
                </div>
                <div className="justify-center lg:mt-[-60px] items-center text-center min-h-[50vh]">
                    <p className="text-white lg:text-[30px] ">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                </div>
            </div>
            <Footer/>
        </main>
    );
}
