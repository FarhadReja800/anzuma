"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"
import { products, Product } from "@/lib/data"

interface RelatedProductsProps {
  productId: number
}

export default function RelatedProducts({ productId }: RelatedProductsProps) {
  const currentProduct = products.find((p) => p.id === productId) || products[0]

  // Dynamic related products calculation (same category first, then fallback to others)
  const sameCategory = products.filter(
    (p) => p.id !== productId && p.category === currentProduct.category
  )
  const otherCategories = products.filter(
    (p) => p.id !== productId && p.category !== currentProduct.category
  )
  const relatedList = [...sameCategory, ...otherCategories].slice(0, 4)

  return (
    <section className="py-20 border-t border-zinc-100 dark:border-zinc-900 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
        
        {/* Section Header */}
        <div className="border-b border-zinc-100 dark:border-zinc-900 pb-6 mb-12 select-none">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 font-sans">
            Related products
          </h2>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {relatedList.map((product) => (
            <RelatedProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  )
}

function RelatedProductCard({ product }: { product: Product }) {
  // Set up a dynamic countdown timer for the sale
  const [timeLeft, setTimeLeft] = React.useState({
    days: product.countdownDays || 77,
    hours: 4,
    minutes: 0,
    seconds: 43
  })

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        } else {
          clearInterval(timer)
          return prev
        }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Formatting helper to pad single digits with leading zero
  const pad = (num: number) => String(num).padStart(2, "0")

  return (
    <div className="flex flex-col group cursor-pointer">
      
      {/* Image frame */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-900/50">
        <Link href={`/shop?id=${product.id}`} className="relative block w-full h-full">
          <Image
            src={product.imageUrl || "/products/orange-hoodie.png"}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1280px) 25vw, 300px"
            className="object-cover transition-transform duration-700 group-hover:scale-103"
          />
        </Link>

        {/* Discount Badge */}
        {product.discountPercent && (
          <span className="absolute top-4 left-4 inline-flex items-center px-2 py-0.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold rounded select-none">
            {product.discountPercent}%
          </span>
        )}

        {/* Countdown overlay at the bottom of the image */}
        {product.countdownDays && (
          <div className="absolute bottom-4 left-4 right-4 bg-white/95 dark:bg-zinc-900/95 shadow-sm py-1.5 px-3 rounded text-[10px] font-bold font-sans text-center text-zinc-900 dark:text-zinc-50 backdrop-blur-xs select-none">
            {timeLeft.days}d : {pad(timeLeft.hours)}h : {pad(timeLeft.minutes)}m : {pad(timeLeft.seconds)}s
          </div>
        )}
      </div>

      {/* Info Content Block */}
      <div className="pt-4 space-y-2 flex flex-col">
        
        {/* Rating Stars & Reviews */}
        <div className="flex items-center gap-1.5 select-none">
          <div className="flex text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 fill-current ${
                  i < Math.floor(product.rating) ? "stroke-none" : "text-zinc-200 fill-none"
                }`}
              />
            ))}
          </div>
          <span className="text-[10px] font-semibold text-zinc-400 dark:text-zinc-500">
            {product.reviews} review
          </span>
        </div>

        {/* Product Title */}
        <Link 
          href={`/shop?id=${product.id}`}
          className="text-sm font-semibold leading-snug hover:underline text-zinc-900 dark:text-zinc-100 line-clamp-1"
        >
          {product.name}
        </Link>

        {/* Price list */}
        <div className="flex items-baseline gap-2 font-sans">
          {product.originalPrice && (
            <span className="text-xs text-zinc-400 line-through font-light">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
          <span className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
            ${product.price.toFixed(2)}
          </span>
        </div>

      </div>

    </div>
  )
}
