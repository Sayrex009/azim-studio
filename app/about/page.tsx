"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import Image1 from "@/public/images/image 11.png";
import Image2 from "@/public/images/image 12.png";
import Image3 from "@/public/images/image 13.png";

interface AboutUsItem {
  id: number;
  title: string;
  image: string | null;
}

const staticImages = [
  {
    id: 1,
    title: "Image 1",
    src: Image1,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
  },
  {
    id: 2,
    title: "Image 2",
    src: Image2,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
  },
  {
    id: 3,
    title: "Image 3",
    src: Image3,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
  },
];

export default function HomePage() {
  const [aboutUs, setAboutUs] = useState<AboutUsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/about-us")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data: AboutUsItem[]) => {
        setAboutUs(
          data.map((item) => ({
            ...item,
            image: item.image?.startsWith("http")
              ? item.image
              : item.image
              ? `https://kasimov.repid.uz/swagger/about_us/${item.image}`
              : null,
          }))
        );
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Maʼlumotlar yuklanmadi");
        setLoading(false);
      });
  }, []);

  return (
    <main>
      <Navbar />
      <div className="px-4 md:px-10 sm:px-10 lg:px-20">
        {aboutUs.map((item) => (
          <div key={item.id}>
            <div className="flex justify-center items-center text-center flex-col mt-12">
              <h1 className="text-[28px] sm:text-[36px] md:text-[60px] lg:text-[120px] font-bold tracking-widest text-white">
                {item.title}
              </h1>
            </div>
            {item.image && (
              <div className="mt-[-50px] lg:ml-8 lg:mt-1 sm:mt-[-80px] md:mt-[-100px]">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={300}
                  height={300}
                  className="w-[2000px] h-auto mb-8 sm:mb-12"
                  unoptimized
                />
              </div>
            )}
            <div className="text-center mt-6 mb-12 px-4">
              <p className="text-white text-[14px] sm:text-[16px] md:text-[20px] lg:text-[28px] leading-relaxed">
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua..."
              </p>
            </div>
          </div>
        ))}

        {/* Meet our team */}
        <div className="flex justify-center items-center text-center flex-col">
          <h1 className="text-[28px] sm:text-[36px] md:text-[60px] lg:text-[120px] font-bold tracking-widest text-white">
            Meet our team
          </h1>
        </div>
        <div className="text-center mt-6 mb-6 px-4">
          <p className="text-white text-[14px] sm:text-[16px] md:text-[20px] lg:text-[28px] leading-relaxed">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua..."
          </p>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 mt-12 mb-20">
          {staticImages.map((image) => (
            <div
              key={image.id}
              className="relative rounded-xl overflow-hidden shadow-lg transform hover:scale-[1.02] transition-all duration-300 cursor-pointer"
            >
              <div className="relative h-[500px] w-full">
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-md text-white p-4">
                <h3 className="text-lg font-semibold mb-2">{image.title}</h3>
                <p className="text-sm">{image.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-[#18202D] px-12 py-8 text-center">
        <p className="text-[16px] text-white ">
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </p>
      </div>
      <div className="lg:hidden">
        <Footer />
      </div>
    </main>
  );
}
