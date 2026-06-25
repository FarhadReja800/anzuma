"use client"

import * as React from "react"
import Link from "next/link"
import { Heart, ShoppingBag, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface Product {
  id: number
  name: string
  price: string | number
  originalPrice?: string | number
  rating: number
  reviews: number
  imageBg: string
  tag: string
}

interface ProductCardProps {
  product: Product
  onAddToCart?: () => void
  onAddToWishlist?: () => void
}

export function ProductCard({ product, onAddToCart, onAddToWishlist }: ProductCardProps) {
  // Format price helper
  const formatPrice = (price: string | number) => {
    if (typeof price === "number") {
      return `$${price.toFixed(2)}`
    }
    return price
  }

  return (
    <div className="group relative flex flex-col justify-between">
      
      {/* Product Card Image Container */}
      <div className={`relative w-full overflow-hidden rounded-2xl bg-linear-to-br ${product.imageBg} border border-zinc-100 dark:border-zinc-900 flex items-center justify-center p-8 transition duration-300 group-hover:shadow-md`}>
        
        {/* Badge Tag */}
        <span className="absolute left-3 top-3 rounded-full bg-white px-2.5 py-1 text-[9px] font-bold text-zinc-950 shadow-sm dark:bg-zinc-900 dark:text-zinc-50 dark:border dark:border-zinc-800 uppercase tracking-wider">
          {product.tag}
        </span>

        {/* Heart Button */}
        <button 
          onClick={(e) => {
            e.preventDefault()
            if (onAddToWishlist) onAddToWishlist()
          }}
          className="absolute right-3 top-3 h-8 w-8 rounded-full bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-red-500 transition-colors shadow-sm cursor-pointer"
        >
          <Heart className="h-4 w-4" />
        </button>

        {/* Visual shape representation of an apparel item */}
        <div className="w-20 h-20 rounded-2xl bg-white/60 dark:bg-black/55 backdrop-blur-md flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-300">
          <ShoppingBag className="h-6 w-6 text-zinc-400 dark:text-zinc-650 stroke-[1.2]" />
        </div>

        {/* Hover Add to Cart overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/20 to-transparent flex justify-center">
          <Button 
            onClick={(e) => {
              e.preventDefault()
              if (onAddToCart) onAddToCart()
            }}
            className="w-full h-9 text-[10px] font-bold rounded-xl bg-zinc-950 text-white hover:bg-zinc-850 dark:bg-zinc-100 dark:text-black dark:hover:bg-zinc-200"
          >
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="mt-4 space-y-1">
        <div className="flex items-center gap-1">
          <div className="flex text-amber-400">
            <Star className="h-3 w-3 fill-current" />
          </div>
          <span className="text-[10px] font-semibold text-zinc-600 dark:text-zinc-400">
            {product.rating} ({product.reviews})
          </span>
        </div>
        <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-600 transition-colors duration-200">
          <Link href="/shop">{product.name}</Link>
        </h3>
        <div className="flex items-baseline gap-2 pt-0.5">
          <span className="text-xs font-bold text-zinc-900 dark:text-zinc-50">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-[10px] text-zinc-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>

    </div>
  )
}
