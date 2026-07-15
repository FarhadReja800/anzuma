"use client"

import * as React from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { getHomeVideoContainer } from "@/store/api/video"
import { Video } from "@/data/video"

interface VideoBannerProps {
  videos?: string[]
  videoUrl?: string
  subtitle?: string
  title?: string
  description?: string
  buttonText?: string
  buttonLink?: string
}

export function VideoBanner({
  videos,
  videoUrl,
  subtitle,
  title,
  description,
  buttonText,
  buttonLink,
}: VideoBannerProps) {
  const [activeVideos, setActiveVideos] = React.useState<Video[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    async function loadBannerVideos() {
      try {
        const container = await getHomeVideoContainer()
        if (container && container.videos) {
          const filtered = container.videos.filter(v => v.isActive)
          if (filtered.length > 0) {
            setActiveVideos(filtered)
          }
        }
      } catch (error) {
        console.error("Failed to load banner videos:", error)
      } finally {
        setLoading(false)
      }
    }
    loadBannerVideos()
  }, [])

  // Map to unified array format containing video details
  const videoList: Video[] = activeVideos.length > 0
    ? activeVideos
    : (videos && videos.length
        ? videos.map(url => ({ videoUrl: url, title, isActive: true }))
        : (videoUrl
            ? [{ videoUrl, title, isActive: true }]
            : []
          )
      );

  const [currentIndex, setCurrentIndex] = React.useState(0);
  const videoRefs = React.useRef<(HTMLVideoElement | null)[]>([]);

  // Sync ref array dimensions
  React.useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, videoList.length);
  }, [videoList]);

  const handleEnded = () => {
    setCurrentIndex((prev) => (prev + 1) % videoList.length);
  };

  React.useEffect(() => {
    // Control play/pause of each video based on index
    videoRefs.current.forEach((videoEl, idx) => {
      if (videoEl) {
        if (idx === currentIndex) {
          videoEl.currentTime = 0;
          const playPromise = videoEl.play();
          if (playPromise !== undefined) {
            playPromise.catch((error) => {
              console.warn(`Video play error for index ${idx}:`, error);
            });
          }
        } else {
          videoEl.pause();
        }
      }
    });
  }, [currentIndex, videoList]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + videoList.length) % videoList.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % videoList.length);
  };

  const handleGoTo = (index: number) => {
    setCurrentIndex(index);
  };

  if (loading) return null;
  if (videoList.length === 0) return null;

  const currentVideo = videoList[currentIndex];
  const currentTitle = currentVideo?.title || title;
  const currentSubtitle = currentVideo?.subtitle || subtitle;
  const currentDescription = currentVideo?.description || description;
  const currentButtonText = currentVideo?.buttonText || buttonText;
  const currentButtonLink = currentVideo?.buttonLink || buttonLink;

  return (
    <section className="relative w-full overflow-hidden flex items-center justify-center font-sans">
      {/* Fixed-height video stage: full width, video fully visible (no cropping) */}
      <div className="relative w-full h-[800px] bg-black flex items-center justify-center">
        {videoList.map((video, idx) => (
          <video
            key={idx}
            ref={(el) => {
              videoRefs.current[idx] = el;
            }}
            src={encodeURI(video.videoUrl)}
            preload="auto"
            muted
            playsInline
            onEnded={handleEnded}
            className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-1000 ${
              idx === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            Your browser does not support the video tag.
          </video>
        ))}

        {/* Subtle overlay for text readability */}
        <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />

        {/* Left Chevron Button */}
        {videoList.length > 1 && (
          <button
            onClick={handlePrev}
            className="absolute left-6 z-30 p-2.5 rounded-full bg-black/30 hover:bg-black/60 text-white transition-all cursor-pointer hover:scale-105"
            aria-label="Previous video"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}

        {/* Right Chevron Button */}
        {videoList.length > 1 && (
          <button
            onClick={handleNext}
            className="absolute right-6 z-30 p-2.5 rounded-full bg-black/30 hover:bg-black/60 text-white transition-all cursor-pointer hover:scale-105"
            aria-label="Next video"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        )}

        {/* Carousel indicator dots */}
        {videoList.length > 1 && (
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex gap-2">
            {videoList.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleGoTo(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentIndex ? "w-8 bg-teal-400" : "w-2 bg-white/50 hover:bg-white/80"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}

        {/* Content Container */}
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-6 text-center space-y-6 text-white">
            {currentSubtitle && (
              <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-teal-400 dark:text-teal-350 block">
                {currentSubtitle}
              </span>
            )}

            {currentTitle && (
              <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-medium tracking-tight leading-tight select-none">
                {currentTitle}
              </h2>
            )}

            {currentDescription && (
              <p className="text-sm sm:text-base text-zinc-200 dark:text-zinc-300 max-w-xl mx-auto font-light leading-relaxed">
                {currentDescription}
              </p>
            )}

            {currentButtonLink && currentButtonText && (
              <div className="pt-4">
                <Link
                  href={currentButtonLink}
                  className="inline-flex items-center gap-2 px-8 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-black bg-white hover:bg-zinc-200 dark:text-white dark:bg-zinc-955 dark:hover:bg-zinc-900 border border-transparent dark:border-zinc-800 transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform select-none"
                >
                  {currentButtonText} <span>→</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}


export default VideoBanner