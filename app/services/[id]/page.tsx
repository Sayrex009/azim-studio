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
        {/* Название и описание */}
        {!loading && currentCategory && (
          <div className="text-center text-white mb-8 px-4">
            <h1 className="text-5xl font-bold mb-4">{currentCategory.title}</h1>
            <p className="text-xl max-w-3xl mx-auto">
              {currentCategory.description}
            </p>
          </div>
        )}

        {/* Видео или картинка */}
        <div className="relative w-full h-[400px] rounded-lg overflow-hidden mb-12">
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

        {/* Services Grid - Desktop */}
        <div className="mb-12 hidden md:block">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-lg shadow-lg overflow-hidden"
                  >
                    <Skeleton height={300} className="w-full" />
                    <div className="p-6">
                      <Skeleton height={28} width="80%" />
                      <Skeleton height={20} width="100%" count={3} />
                    </div>
                  </div>
                ))
              : services.map((service) => (
                  <div
                    key={service.id}
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="w-full h-[300px] overflow-hidden">
                      <img
                        src={`https://kasimov.repid.uz${service.image}`}
                        alt={service.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-3">
                        {service.title}
                      </h3>
                      <p className="text-gray-600/90">{service.description}</p>
                    </div>
                  </div>
                ))}
          </div>
        </div>

        {/* Services Carousel - Mobile */}
        <div className="mb-12 md:hidden">
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            pagination={{ clickable: true }}
            modules={[Pagination]}
          >
            {loading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <SwiperSlide key={i}>
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                      <Skeleton height={300} className="w-full" />
                      <div className="p-6">
                        <Skeleton height={28} width="80%" />
                        <Skeleton height={20} width="100%" count={3} />
                      </div>
                    </div>
                  </SwiperSlide>
                ))
              : services.map((service) => (
                  <SwiperSlide key={service.id}>
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                      <div className="w-full h-[300px] overflow-hidden">
                        <img
                          src={`https://kasimov.repid.uz${service.image}`}
                          alt={service.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-3">
                          {service.title}
                        </h3>
                        <p className="text-gray-600/90">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
          </Swiper>
        </div>
      </div>

      <div className="bg-[#18202D] px-4 md:px-12 py-12 text-center">
        <p className="text-[16px] text-white/90 max-w-4xl mx-auto">
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
        </p>
      </div>
      <FaqLists />
    </div>
  );
}
