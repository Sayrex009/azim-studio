'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface ImagesItem {
    id: number;
    image: string;
}

export default function GallerySection() {
    const [images, setImages] = useState<ImagesItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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
        <section className="py-16 px-4 sm:px-8 lg:px-16">
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
                <p className="text-white text-center">Rasimlar topilmadi.</p>
            ) : (
                <>
                    {/* Мобильная версия — карусель */}
                    <div className="block sm:hidden -mx-4 px-4">
                        <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
                            {images.map((image) => (
                                <div
                                    key={image.id}
                                    className="min-w-[80%] flex-shrink-0 rounded-xl overflow-hidden shadow-lg bg-black/30 p-2"
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
                    <div className="hidden sm:grid gap-8 sm:grid-cols-2  lg:grid-cols-3 transition-opacity duration-700 opacity-100">
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
                    <div className='text-center mt-12'>
                        <p className="text-white text-[14px] sm:text-[16px] md:text-[20px] lg:text-[28px] leading-relaxed">
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat..."
                        </p>
                    </div>
                </>
            )}
        </section>
    );
}
