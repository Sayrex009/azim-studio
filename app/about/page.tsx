'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';

interface AboutUsItem {
    id: number;
    title: string;
    image: string | null;
}

export default function HomePage() {
    const [aboutUs, setAboutUs] = useState<AboutUsItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('/api/about-us')
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch');
                return res.json();
            })
            .then((data: AboutUsItem[]) => {
                setAboutUs(
                    data.map(item => ({
                        ...item,
                        image: item.image?.startsWith('http')
                            ? item.image
                            : item.image
                                ? `https://kasimov.repid.uz/swagger/about_us/${item.image}`
                                : null,
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
        <main>
            <Navbar />
            <div className="px-4 md:px-10 sm:px-10 lg:px-20">
                {loading ? (
                    <div></div>

                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : (
                    aboutUs.map(item => (
                        <div key={item.id}>
                            <div className="lg:mt-6 lg:mb-[-100px] sm:mt-[-40px] mt-8 flex justify-center items-center text-center min-h-[20vh] sm:min-h-[30vh] md:min-h-[40vh] lg:min-h-[50vh]">
                                <h1 className="text-[32px] sm:text-[48px] md:text-[80px] lg:text-[150px] tracking-widest text-white">
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
                        </div>
                    ))
                )}
            </div>
        </main>
    );
}
