'use client';

import { useEffect, useState, useRef } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';

interface VideoItem {
  id: number;
  video: string;
}

export default function VideosSection() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [playingVideoId, setPlayingVideoId] = useState<number | null>(null);

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

  const togglePlay = (videoEl: HTMLVideoElement, videoId: number) => {
    if (videoEl.paused) {
      videoEl.play();
      setPlayingVideoId(videoId);
    } else {
      videoEl.pause();
      setPlayingVideoId(null);
    }
  };

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
        <div className="-mx-4 px-6  mt-10">
          <div className="flex overflow-x-auto space-x-4 custom-scrollbar pr-2">
            {videos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                isPlaying={playingVideoId === video.id}
                onTogglePlay={togglePlay}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function VideoCard({
  video,
  isPlaying,
  onTogglePlay,
}: {
  video: VideoItem;
  isPlaying: boolean;
  onTogglePlay: (video: HTMLVideoElement, videoId: number) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div
      className="f-full h-full flex-shrink-0 rounded-xl overflow-hidden shadow-lg bg-black/30 p-2 relative"
      style={{
        width: '100%',
        maxWidth: '400px',
      }}
    >
      <video
        ref={videoRef}
        controls
        className="w-full object-cover rounded-lg h-[250px] sm:h-[350px] lg:h-[490px] transition-all duration-300"
        src={video.video}
      />

      {/* Play/Pause button */}
      <button
        className="absolute inset-0 flex items-center justify-center text-white bg-black/50 hover:bg-black/70 transition rounded-lg lg:hidden"
        onClick={() =>
          videoRef.current && onTogglePlay(videoRef.current, video.id)
        }
      >
        {isPlaying ? (
          <FaPause className="text-4xl sm:text-5xl" />
        ) : (
          <FaPlay className="text-4xl sm:text-5xl" />
        )}
      </button>
    </div>
  );
}
