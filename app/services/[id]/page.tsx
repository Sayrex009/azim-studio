"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/footer";
import FaqLists from "@/app/components/FaqLists";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface Category {
  id: number;
  title: string;
  description: string;
  video?: string;
  image?: string;
}

interface Service {
  id: number;
  title: string;
  description: string;
  image: string;
}

export default function ServicePage(): JSX.Element {
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : "";

  const [categories, setCategories] = useState<Category[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const currentCategory = categories.find((c) => c.id === parseInt(id));

  useEffect(() => {
    async function fetchData() {
      try {
        const [catRes, servRes] = await Promise.all([
          fetch("/api/services-categories"),
          fetch(`/api/proxy/services/${id}`),
        ]);
        const [catData, servData] = await Promise.all([
          catRes.json(),
          servRes.json(),
        ]);

        setCategories(catData);
        setServices(servData);
      } catch (err) {
        console.error("Error loading data:", err);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchData();
  }, [id]);

  return (
    <div className="w-full">
      <Navbar />
      <div className="w-full max-w-[1920px] mx-auto lg:px-20 px-4 py-8">
        {!loading && currentCategory && (
          <div className="text-center text-white mb-8 px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              {currentCategory.title}
            </h1>
            <p className="text-base sm:text-lg md:text-xl mx-auto bg-black/20 inline-block px-4 py-4 rounded">
              {currentCategory.description}
            </p>
          </div>
        )}

        <div className="relative w-full h-[250px] sm:h-[350px] md:h-[700px] rounded-lg overflow-hidden mb-12">
          {loading ? (
            <Skeleton height={400} className="w-full rounded-lg" />
          ) : currentCategory?.video ? (
            <video
              src={currentCategory.video}
              autoPlay
              muted
              loop
              playsInline
              controls
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <img
              src={currentCategory?.image}
              alt={currentCategory?.title}
              className="w-full h-full object-cover rounded-lg"
            />
          )}
        </div>
      </div>

      {/* Карточки для десктопа */}
      <div className="relative mb-12 hidden md:block">
        <div className="absolute inset-0 bg-[#18202D] -z-10" />
        <div className="max-w-[1920px] mx-auto px-4 sm:px-10 md:px-[85px] grid py-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white shadow-lg overflow-hidden rounded-2xl"
                >
                  <Skeleton height={250} className="w-full" />
                  <div className="p-4 sm:p-6">
                    <Skeleton height={24} width="80%" />
                    <Skeleton height={16} width="100%" count={3} />
                  </div>
                </div>
              ))
            : services.map((service) => (
                <div
                  key={service.id}
                  className="relative bg-black/50 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="w-full h-[300px] sm:h-[400px] lg:h-[680px] overflow-hidden rounded-t-2xl">
                    <img
                      src={`https://kasimov.repid.uz${service.image}`}
                      alt={service.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-black/50 text-white rounded-b-2xl">
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
                      {service.title}
                    </h3>
                    <p className="text-sm sm:text-base">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
        </div>
        <div className="flex justify-center items-center mt-12">
          <div className="border-b-8 rounded-[4px] mb-12 border-gray-500 w-36"></div>
        </div>
      </div>

      {/* Карточки для мобильных устройств (Swiper) */}
      <div className="mb-12 md:hidden bg-[#18202D] py-8 px-4">
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          pagination={{ clickable: true }}
          modules={[Pagination]}
        >
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <SwiperSlide key={i}>
                  <div className="bg-white/50 rounded-lg shadow-lg overflow-hidden">
                    <Skeleton height={250} className="w-full" />
                    <div className="p-4">
                      <Skeleton height={24} width="80%" />
                      <Skeleton height={16} width="100%" count={3} />
                    </div>
                  </div>
                </SwiperSlide>
              ))
            : services.map((service) => (
                <SwiperSlide key={service.id}>
                  <div className="relative bg-white/50 rounded-lg shadow-lg overflow-hidden">
                    <div className="w-full h-[250px] overflow-hidden rounded-t-lg">
                      <img
                        src={`https://kasimov.repid.uz${service.image}`}
                        alt={service.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/50 text-white rounded-b-lg">
                      <h3 className="text-lg font-semibold mb-2">
                        {service.title}
                      </h3>
                      <p className="text-sm">{service.description}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
        </Swiper>
      </div>

      <div className="bg-[#18202D] px-4 md:px-12 py-12 text-center">
        <p className="text-[16px] text-white/90 max-w-4xl mx-auto bg-black/40 inline-block px-6 py-4 rounded">
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
        </p>
      </div>

      <FaqLists />
    </div>
  );
}
