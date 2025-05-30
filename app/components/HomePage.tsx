'use client';

import Footer from '../components/footer';
import Navbar from '../components/Navbar';
import Services from '../components/Services'
import Video from '../components/Video'
import Gallery from './GalleryImages';
import Karusel from './Karusel';

export default function HomePage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            {/* Content  */}
            <main className="flex-grow px-4 md:px-10 lg:px-20">
                <div className="mt-10 sm:mt-16 md:mt-24 text-center">
                    <h1 className="text-[28px] sm:text-[36px] md:text-[60px] lg:text-[120px] tracking-wide text-white leading-tight">
                        KASIMOV STUDIO
                    </h1>
                </div>

                <div className="mt-6 sm:mt-10 md:mt-12 text-center">
                    <p className="text-white text-[14px] sm:text-[16px] md:text-[20px] lg:text-[28px] leading-relaxed">
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat..."
                    </p>
                </div>
            </main>
            <Video />
            <Services />
            <Gallery />
            <Karusel />
            <div className="bg-[#18202D] py-8 text-center">
                <h1 className="text-[28px] sm:text-[36px] md:text-[60px] lg:text-[120px] tracking-wide text-white leading-tight">
                    KASIMOV STUDIO
                </h1>
            </div>
        </div>
    );
}
