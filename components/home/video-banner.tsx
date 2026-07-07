"use client"

import * as React from "react"
import Link from "next/link"

interface VideoBannerProps {
  videoUrl?: string
  subtitle?: string
  title?: string
  description?: string
  buttonText?: string
  buttonLink?: string
}

export function VideoBanner({
  videoUrl = "/video/bibidi%20banner%20v4.mp4",
  subtitle = "EXPERIENCE THE VIBE",
  title = "Aesthetics in Motion",
  description = "Explore our premium streetwear collection designed for absolute comfort and timeless expression. Made from sustainably sourced organic cotton with a modern fit.",
  buttonText = "Shop Collection",
  buttonLink = "/shop",
}: VideoBannerProps) {
  return (
    <section className="relative w-full h-[500px] sm:h-[600px] overflow-hidden flex items-center justify-center font-sans">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay with Blur */}
      <div className="absolute inset-0 bg-black/45 dark:bg-black/60 backdrop-blur-[1px] z-10" />

      {/* Content Container */}
      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center space-y-6 text-white">
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

      {/* Aesthetic Bottom Gradient Wave */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-black to-transparent z-15 pointer-events-none" />
    </section>
  )
}

export default VideoBanner
