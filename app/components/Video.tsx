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
        if (err.name !== 'AbortError') {
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
      <h2 className="text-white text-3xl sm:text-4xl font-bold text-center mb-8">
        STUDIO VIDEOS
      </h2>

      {loading ? (
        // Skeleton Loader
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 animate-pulse">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-[300px] bg-gray-700 rounded-xl" />
          ))}
        </div>
      ) : videos.length === 0 ? (
        <p className="text-white text-center">Videolar topilmadi.</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 transition-opacity duration-700 opacity-100">
          {videos.map((video) => (
            <div
              key={video.id}
              className="rounded-xl overflow-hidden shadow-lg bg-black/30 p-2 hover:scale-[1.01] transition-transform duration-300"
            >
              <video
                controls
                className="w-full h-[300px] object-cover rounded-lg"
                src={video.video}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
