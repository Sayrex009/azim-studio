'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

interface ServiceCategory {
  id: number;
  title: string;
  description: string;
  image: string;
  video: string;
}

export default function StudioServices() {
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/service_categories')
      .then(res => res.json())
      .then(data => {
        setCategories(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Ошибка загрузки категорий:', err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-16 px-4 sm:px-8 lg lg:px-16">
      <h2 className="text-white text-center text-4xl sm:text-5xl font-bold mb-6">
        STUDIO SERVICES
      </h2>
      <div className='text-center mt-12 mb-12'>
        <p className="text-white text-[14px] sm:text-[16px] md:text-[20px] lg:text-[28px] leading-relaxed">
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat..."
        </p>
      </div>

      {loading ? (
        <div className="text-white text-center">Yuklanmoqda...</div>
      ) : (
        <>
          <div className="block sm:hidden">
            <Swiper
              spaceBetween={16}
              slidesPerView={1.2}
              centeredSlides={true}
            >
              {categories.map((item) => (
                <SwiperSlide key={item.id}>
                  <Link href={`/categories/${item.id}`} className="block">
                    <div className="relative rounded-xl overflow-hidden shadow-lg transform hover:scale-[1.02] transition-all duration-300 cursor-pointer">
                      <div className="relative h-[400px] w-full">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                          loading="lazy"
                          placeholder="blur"
                          blurDataURL="/blur-placeholder.jpg"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/fallback.jpg';
                          }}
                        />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-md text-white p-4">
                        <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                        <p className="text-sm">{item.description}</p>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Сетка для md и выше */}
          <div className="hidden sm:grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((item) => (
              <Link
                key={item.id}
                href={`/categories/${item.id}`}
                className="block relative rounded-xl overflow-hidden shadow-lg transform hover:scale-[1.02] transition-all duration-300 cursor-pointer"
              >
                <div className="relative h-[700px] w-full">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="/blur-placeholder.jpg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/fallback.jpg';
                    }}
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-md text-white p-4">
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
