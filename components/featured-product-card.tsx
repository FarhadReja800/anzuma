"use client"

import * as React from "react"
import Link from "next/link"
import NextImage from "next/image"
import { Star, Heart } from "lucide-react"

// Bypass React 19 JSX type resolution issue with Next.js Image component
const Image = NextImage as React.ComponentType<React.ComponentProps<typeof NextImage>>
import { Product } from "@/lib/data"

interface FeaturedProductCardProps {
  product: Product
}

export function FeaturedProductCard({ product }: FeaturedProductCardProps) {
  const [isHovered, setIsHovered] = React.useState(false)
  const [timeLeft, setTimeLeft] = React.useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false
  })

  // Target date for countdown
  React.useEffect(() => {
    if (!product.countdownDays) return

    // Create a target date: X days, 7 hours, 12 minutes, 22 seconds from now, but persistent per day
    const targetDate = new Date()
    targetDate.setDate(targetDate.getDate() + product.countdownDays)
    targetDate.setHours(targetDate.getHours() + 7)
    targetDate.setMinutes(targetDate.getMinutes() + 12)
    targetDate.setSeconds(targetDate.getSeconds() + 22)

    const updateTimer = () => {
      const now = new Date().getTime()
      const difference = targetDate.getTime() - now

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true })
        return
      }

      const d = Math.floor(difference / (1000 * 60 * 60 * 24))
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const s = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeLeft({ days: d, hours: h, minutes: m, seconds: s, isExpired: false })
    }

    updateTimer()
    const timer = setInterval(updateTimer, 1000)
    return () => clearInterval(timer)
  }, [product.countdownDays])

  // Price helper formatting
  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`
  }

  return (
    <div 
      className="group flex flex-col w-full text-left"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Container */}
      <div className="relative aspect-2/3 w-full overflow-hidden bg-[#F5F5F5] dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 transition duration-300">
        
        {/* Local Image Asset (Swaps source dynamically on hover to prevent double exposure) */}
        {product.imageUrl ? (
          <Image
            src={isHovered && product.hoverImageUrl ? product.hoverImageUrl : product.imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 scale-100 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        ) : (
          /* Fallback visual shape representation of an apparel item */
          <div className={`w-full h-full bg-gradient-to-br ${product.imageBg} flex items-center justify-center p-8`}>
            <div className="w-16 h-16 rounded-xl bg-white/60 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-300">
              <span className="text-xs text-zinc-400 font-medium">No Image</span>
            </div>
          </div>
        )}

        {/* Badges Container top-left */}
        <div className="z-10 absolute left-3 top-3 flex flex-col gap-1 items-start">
          {product.discountPercent && (
            <span className="bg-[#eefcf3] text-[#10b981] dark:bg-[#10b981]/10 dark:text-[#10b981] px-2 py-0.5 text-[11px] font-bold tracking-wide uppercase rounded-xs">
              {product.discountPercent}%
            </span>
          )}
          {product.tag && product.tag !== `${product.discountPercent}%` && (
            <span className="bg-white text-zinc-950 dark:bg-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-800 px-2 py-0.5 text-[9px] font-bold tracking-wider uppercase rounded-xs">
              {product.tag}
            </span>
          )}
        </div>

        {/* Premium Heart Button top-right (slides & fades in on hover) */}
        <button
          onClick={(e) => {
            e.preventDefault()
          }}
          className={`z-20 absolute right-3 top-3 h-8 w-8 rounded-full bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-red-500 transition-all duration-300 shadow-xs cursor-pointer ${
            isHovered ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-1 scale-95 pointer-events-none"
          }`}
        >
          <Heart className="h-4 w-4 stroke-[1.5]" />
        </button>

        {/* 4-Segmented Pagination/Slide Indicators (fades & slides up on hover) */}
        <div 
          className={`z-20 absolute bottom-3 inset-x-4 flex gap-1 transition-all duration-300 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1 pointer-events-none"
          }`}
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <div 
              key={i} 
              className={`h-0.5 flex-1 transition-colors duration-300 ${
                i === 1 ? "bg-zinc-800 dark:bg-white" : "bg-zinc-350/40 dark:bg-zinc-700/40"
              }`}
            />
          ))}
        </div>

        {/* Live Countdown Timer bottom centered (hidden on hover to prioritize indicators) */}
        {product.countdownDays && !timeLeft.isExpired && (
          <div 
            className={`z-10 absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/95 dark:bg-zinc-950/95 border border-zinc-100 dark:border-zinc-800 rounded-sm px-2.5 py-1 text-[11px] font-semibold text-zinc-900 dark:text-zinc-100 shadow-xs flex items-center justify-center gap-1 min-w-[150px] transition-opacity duration-300 ${
              isHovered ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            <span>{timeLeft.days}</span>
            <span className="text-[10px] text-zinc-400 font-light">d</span>
            <span className="text-zinc-300 dark:text-zinc-700 mx-0.5">:</span>
            <span>{timeLeft.hours.toString().padStart(2, '0')}</span>
            <span className="text-[10px] text-zinc-400 font-light">h</span>
            <span className="text-zinc-300 dark:text-zinc-700 mx-0.5">:</span>
            <span>{timeLeft.minutes.toString().padStart(2, '0')}</span>
            <span className="text-[10px] text-zinc-400 font-light">m</span>
            <span className="text-zinc-300 dark:text-zinc-700 mx-0.5">:</span>
            <span className="w-4 text-left">{timeLeft.seconds.toString().padStart(2, '0')}</span>
            <span className="text-[10px] text-zinc-400 font-light">s</span>
          </div>
        )}
      </div>

      {/* Product Details Section */}
      <div className="mt-4 flex flex-col space-y-1">
        {/* Rating Line */}
        <div className="flex items-center gap-1 text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
          <Star className="h-3 w-3 fill-[#FBBF24] text-[#FBBF24]" />
          <span>
            {product.reviews} {product.reviews === 1 ? 'review' : 'reviews'}
          </span>
        </div>

        {/* Product Title */}
        <h3 className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-150 tracking-tight leading-snug hover:opacity-85 transition-opacity">
          <Link href="/shop">{product.name}</Link>
        </h3>

        {/* Price Display */}
        <div className="flex items-baseline gap-2 pt-0.5">
          {product.priceRange ? (
            <span className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100">
              {product.priceRange}
            </span>
          ) : (
            <>
              {product.originalPrice && (
                <span className="text-[11px] sm:text-xs text-zinc-400 dark:text-zinc-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              <span className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100">
                {formatPrice(product.price)}
              </span>
            </>
          )}
        </div>
      </div>

    </div>
  )
}
