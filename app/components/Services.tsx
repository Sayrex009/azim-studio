"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";
import { Pagination } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";

interface Category {
  id: number;
  title: string;
  description: string;
  image: string;
  video: string;
}

export default function ServiceCategoriesList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const swiperRef = useRef<SwiperRef>(null);

  const goNext = () => {
    swiperRef.current?.swiper.slideNext();
  };

  const goPrev = () => {
    swiperRef.current?.swiper.slidePrev();
  };

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/services-categories");
        if (!res.ok) throw new Error("Ошибка при загрузке категорий");
        const data = await res.json();
        setCategories(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse rounded-xl overflow-hidden shadow-lg"
          >
            <div className="bg-gray-300 h-[300px] w-full" />
            <div className="bg-black/10 p-4">
              <div className="h-4 bg-gray-400 rounded w-3/4 mb-2" />
              <div className="h-3 bg-gray-400 rounded w-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) return <p className="text-red-600">Ошибка: {error}</p>;

  return (
    <div className="relative px-2 md:px-4">
      <div className="text-center lg:mt-24">
        <h1 className="text-white mb-12 text-4xl md:text-6xl font-extrabold uppercase mt-12 tracking-wide">
          Service
        </h1>
      </div>
      {/* Мобильная карусель с кнопками навигации */}
      <div className="block md:hidden relative">
        <Swiper
          ref={swiperRef}
          modules={[Pagination]}
          spaceBetween={12}
          slidesPerView={1.1}
          centeredSlides={true}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          className="!pb-10"
        >
          {categories.map((cat) => (
            <SwiperSlide key={cat.id}>
              <div className="rounded-xl overflow-hidden shadow-lg relative mx-1">
                <div className="relative h-[380px] w-full">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-black/50 text-white p-4 backdrop-blur-sm">
                    <h3 className="text-lg font-bold line-clamp-1">
                      {cat.title}
                    </h3>
                    <p className="text-sm line-clamp-2">{cat.description}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Кнопки навигации */}
        <div className="flex justify-center gap-4 mt-2">
          <button
            onClick={goPrev}
            className="p-2 rounded-full bg-white/90 shadow-md hover:bg-white transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 text-gray-800" />
          </button>
          <button
            onClick={goNext}
            className="p-2 rounded-full bg-white/90 shadow-md hover:bg-white transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 text-gray-800" />
          </button>
        </div>
      </div>

      <div className="hidden cursor-pointer md:flex flex-wrap px-16 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="rounded-xl overflow-hidden shadow-lg max-w-[400px] w-full"
          >
            <div className="relative h-[600px] w-full">
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full bg-black/40 text-white p-4 backdrop-blur-md">
                <h3 className="text-lg font-bold">{cat.title}</h3>
                <p className="text-sm">{cat.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
