'use client';

import { useEffect, useState } from 'react';

interface VideoItem {
  id: number;
  video: string;
}

export default function VideosSection() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchVideos = async () => {
      try {
        const res = await fetch('/api/video', { signal: controller.signal });
        const data = await res.json();
        setVideos(data);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error('Xatolik video yuklashda:', err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();

    return () => controller.abort();
  }, []);

  return (
    <section className="py-16 px-4 sm:px-8 lg:px-16">
      <div className="mt-10 sm:mt-16 md:mt-12 text-center">
        <h1 className="text-[28px] sm:text-[36px] md:text-[60px] lg:text-[120px] tracking-wide text-white leading-tight">
          VIDEO
        </h1>
      </div>

      {loading ? (
        <div className="flex space-x-4 overflow-x-auto animate-pulse mt-10">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="min-w-[80%] h-[300px] bg-gray-700 rounded-xl"
            />
          ))}
        </div>
      ) : videos.length === 0 ? (
        <p className="text-white text-center mt-10">Videolar topilmadi.</p>
      ) : (
        <div className="-mx-4 px-4 mt-10">
          <div className="flex overflow-x-auto space-x-4 scrollbar-hidden">
            {videos.map((video) => (
              <div
                key={video.id}
                className="min-w-[80%] sm:min-w-[50%] lg:min-w-[33%] flex-shrink-0 rounded-xl overflow-hidden shadow-lg bg-black/30 p-2"
              >
                <video
                  controls
                  className="w-full h-[400px] object-cover rounded-lg"
                  src={video.video}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
