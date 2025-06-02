"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

interface ImagesItem {
  id: number;
  image: string;
}

export default function GallerySection() {
  const [images, setImages] = useState<ImagesItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollUp = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        top: -300,
        behavior: "smooth",
      });
    }
  };

  const scrollDown = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        top: 300,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    fetch("/api/gallery")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data: ImagesItem[]) => {
        setImages(
          data.map((item) => ({
            ...item,
            image: item.image?.startsWith("http")
              ? item.image
              : item.image
                ? `https://kasimov.repid.uz/api/v1/common/galleries/${item.image}`
                : "",
          })),
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
    <section className="px-4 sm:px-8 lg:px-16 relative">
      {/* Уменьшаем верхний отступ заголовка на мобильных */}
      

      {loading ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 animate-pulse">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-[300px] bg-gray-700 rounded-xl" />
          ))}
        </div>
      ) : error ? (
        <p className="text-white text-center">{error}</p>
      ) : images.length === 0 ? (
        <p className="text-white text-center">No images found</p>
      ) : (
        <>
          {/* Мобильная версия — вертикальная карусель с кнопками */}
          <div className="block sm:hidden relative h-[400px] w-[90vw] max-w-xs mx-auto mt-4">
            {/* Кнопка вверх */}
            <button
              onClick={scrollUp}
              className="absolute top-2 left-1/2 -translate-x-1/2 z-20 bg-black/50 rounded-full p-2 hover:bg-black/80 transition"
              aria-label="Scroll Up"
            >
              <ChevronUp className="w-6 h-6 text-white" />
            </button>

            {/* Скролл контейнер вертикальный */}
            <div
              ref={scrollContainerRef}
              className="overflow-y-auto scrollbar-hide h-full rounded-xl space-y-4 pt-12 pb-6"
            >
              {images.map((image) => (
                <div
                  key={image.id}
                  className="min-h-[300px] rounded-xl shadow-lg bg-black/30 p-2"
                >
                  <Image
                    src={image.image}
                    alt="Gallery image"
                    width={400}
                    height={300}
                    className="w-full h-[300px] object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>

            {/* Кнопка вниз */}
            <button
              onClick={scrollDown}
              className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 bg-black/50 rounded-full p-2 hover:bg-black/80 transition"
              aria-label="Scroll Down"
            >
              <ChevronDown className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Десктопная версия — грид */}
          <div className="hidden px-2 mt-12 sm:grid gap-8 sm:grid-cols-2 lg:grid-cols-3 transition-opacity duration-700 opacity-100">
            {images.map((image) => (
              <div
                key={image.id}
                className="rounded-xl overflow-hidden shadow-lg bg-black/30 p-2 hover:scale-[1.01] transition-transform duration-300"
              >
                <Image
                  src={image.image}
                  alt="Gallery image"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
