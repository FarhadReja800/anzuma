"use client"

import * as React from "react"
import Link from "next/link"

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
  videoUrl = "/video/zara.mp4",
  subtitle = "EXPERIENCE THE VIBE",
  title = "Aesthetics in Motion",
  description = "Explore our premium streetwear collection designed for absolute comfort and timeless expression. Made from sustainably sourced organic cotton with a modern fit.",
  buttonText = "Shop Collection",
  buttonLink = "/shop",
}: VideoBannerProps) {
  const defaultVideos = [
    "/video/zara1 (1).mp4",
    "/video/zara1 (2).mp4",
    "/video/zara1 (3).mp4",
    "/video/zara1 (4).mp4",
  ];
  const videoList = videos && videos.length ? videos : (videoUrl ? [videoUrl] : defaultVideos);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const handleEnded = () => {
    setCurrentIndex((prev) => (prev + 1) % videoList.length);
  };

  React.useEffect(() => {
    // When source changes, load and play immediately to avoid pause
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play();
    }
  }, [currentIndex]);

  return (
    <section className="relative w-full overflow-hidden flex items-center justify-center font-sans">
      {/* Fixed-height video stage: full width, video fully visible (no cropping) */}
      <div className="relative w-full h-[800px] bg-black flex items-center justify-center">
        <video
          key={currentIndex}
          ref={videoRef}
          src={encodeURI(videoList[currentIndex])}
          preload="auto"
          autoPlay
          muted
          playsInline
          onEnded={handleEnded}
          className="w-full h-full object-cover z-0"
        >
          Your browser does not support the video tag.
        </video>

        {/* Content Container */}
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-6 text-center space-y-6 text-white">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-teal-400 dark:text-teal-350 block">
              {subtitle}
            </span>

            <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-medium tracking-tight leading-tight select-none">
              {title}
            </h2>

            <p className="text-sm sm:text-base text-zinc-200 dark:text-zinc-300 max-w-xl mx-auto font-light leading-relaxed">
              {description}
            </p>

            <div className="pt-4">
              <Link
                href={buttonLink}
                className="inline-flex items-center gap-2 px-8 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-black bg-white hover:bg-zinc-200 dark:text-white dark:bg-zinc-950 dark:hover:bg-zinc-900 border border-transparent dark:border-zinc-800 transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform select-none"
              >
                {buttonText} <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default VideoBanner