"use client";

import { useEffect, useState, useRef } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

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
        const res = await fetch("/api/video", { signal: controller.signal });
        const data = await res.json();
        setVideos(data);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          console.error("Xatolik video yuklashda:", err);
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
    <section className="relative z-10 py-16 px-4 sm:px-8 lg:px-16 bg-[#18202D]">
      <div className="text-center">
        <h1 className="text-[28px] sm:text-[36px] md:text-[60px] lg:text-[120px] tracking-wide text-white leading-tight">
          VIDEO
        </h1>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-10 animate-pulse">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-[300px] bg-gray-700 rounded-xl" />
          ))}
        </div>
      ) : videos.length === 0 ? (
        <p className="text-white text-center mt-10"></p>
      ) : (
        <div className="mt-10 px-10">
          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 1.5,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 25,
              },
              1024: {
                slidesPerView: 2.5,
                spaceBetween: 30,
              },
              1280: {
                slidesPerView: 3,
                spaceBetween: 35,
              },
            }}
            centeredSlides={true}
            loop={true}
            className="video-swiper"
          >
            {videos.map((video) => (
              <SwiperSlide key={video.id}>
                <VideoCard
                  video={video}
                  isPlaying={playingVideoId === video.id}
                  onTogglePlay={togglePlay}
                />
              </SwiperSlide>
            ))}
          </Swiper>
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
    <div className="rounded-xl overflow-hidden shadow-lg bg-black/30 p-2 relative w-full h-[500px]">
      <video
        ref={videoRef}
        controls
        className="w-full h-full object-cover rounded-lg transition-all duration-300"
        src={video.video}
      />

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
