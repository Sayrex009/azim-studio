'use client';
import Image from 'next/image';

interface Props {
  src: string;
  alt: string;
  title: string;
  description: string;
}

export default function ImageCard({ src, alt, title, description }: Props) {
  return (
    <div className="relative rounded-xl overflow-hidden shadow-lg">
      <div className="relative h-[400px] w-full">
        <Image
          src={src}
          alt={alt}
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
      <div className="bg-black/40 backdrop-blur-md text-white p-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
}
