'use client';

import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImagesItem {
    id: number;
    image: string;
}

export default function GallerySection() {
    const [images, setImages] = useState<ImagesItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: -300,
                behavior: 'smooth'
            });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: 300,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        fetch('/api/gallery')
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch');
                return res.json();
            })
            .then((data: ImagesItem[]) => {
                setImages(
                    data.map(item => ({
                        ...item,
                        image: item.image?.startsWith('http')
                            ? item.image
                            : item.image
                                ? `https://kasimov.repid.uz/api/v1/common/galleries/${item.image}`
                                : '',
                    }))
                );
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError('Maʼlumotlar yuklanmadi');
                setLoading(false);
            });
    }, []);

    return (
        <section className="px-4 sm:px-8 lg:px-16 relative">
            <div className="mt-10 sm:mt-16 md:mt-24 text-center">
                <h1 className="text-[28px] mb-4 sm:text-[36px] md:text-[60px] lg:text-[120px] tracking-wide text-white leading-tight">
                    GALLERY
                </h1>
            </div>

            {loading ? (
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 animate-pulse">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="h-[300px] bg-gray-700 rounded-xl" />
                    ))}
                </div>
            ) : error ? (
                <p className="text-white text-center">{error}</p>
            ) : images.length === 0 ? (
                <p className="text-white text-center"></p>
            ) : (
                <>
                    {/* Мобильная версия — карусель */}
                    <div className="block sm:hidden relative">
                        <div 
                            ref={scrollContainerRef}
                            className="flex overflow-x-auto space-x-4 scrollbar-hide py-4 px-2 -mx-2"
                        >
                            {images.map((image) => (
                                <div
                                    key={image.id}
                                    className="min-w-[85%] flex-shrink-0 rounded-xl shadow-lg bg-black/30 p-2"
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