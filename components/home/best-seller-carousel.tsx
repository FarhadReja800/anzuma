"use client"

import * as React from "react"
import { FeaturedProductCard } from "@/components/featured-product-card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
} from "@/components/ui/carousel"
import { products } from "@/lib/data"

export function BestSellerCarousel() {
  const featuredProducts = products.slice(0, 8)
  const chunkedProducts = [
    featuredProducts.slice(0, 3),
    featuredProducts.slice(3, 6),
    featuredProducts.slice(6, 8),
  ]

  return (
    <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden md:overflow-visible">
      <div className="space-y-6 max-w-2xl mb-16 text-left">
        <span className="text-base font-normal font-sans uppercase tracking-[0.2em] text-zinc-450 dark:text-zinc-500">
          Featured Products
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-normal tracking-tight text-zinc-955 dark:text-zinc-50 leading-[1.15]">
          Best Seller Products
        </h2>
        <p className="text-lg font-sans font-normal text-zinc-500 dark:text-zinc-400 leading-relaxed font-light">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
        </p>
      </div>

      {/* Mobile view: Horizontal Touch-Swipe List */}
      <div className="md:hidden flex overflow-x-auto gap-6 snap-x snap-mandatory pb-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {featuredProducts.map((product) => (
          <div key={product.id} className="min-w-[270px] w-[270px] snap-start shrink-0">
            <FeaturedProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Desktop view: Carousel Slider */}
      <div className="hidden md:block relative px-2 sm:px-0">
        <Carousel
          autoplay={false}
          className="group relative w-full !overflow-visible"
        >
          <div className="overflow-hidden w-full">
            <CarouselContent>
              {chunkedProducts.map((chunk, pageIndex) => (
                <CarouselItem key={pageIndex}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {chunk.map((product) => (
                      <FeaturedProductCard
                        key={product.id}
                        product={product}
                      />
                    ))}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </div>

          <CarouselPrevious className="absolute -left-4 md:-left-8 lg:-left-12 top-[35%] -translate-y-1/2 z-30 hidden md:inline-flex !bg-transparent hover:!bg-transparent !border-none text-zinc-405 hover:text-zinc-900 dark:text-zinc-650 dark:hover:text-zinc-150 !opacity-100 hover:!opacity-100 !shadow-none h-12 w-12 cursor-pointer transition-colors" />
          <CarouselNext className="absolute -right-4 md:-right-8 lg:-right-12 top-[35%] -translate-y-1/2 z-30 hidden md:inline-flex !bg-transparent hover:!bg-transparent !border-none text-zinc-405 hover:text-zinc-900 dark:text-zinc-650 dark:hover:text-zinc-150 !opacity-100 hover:!opacity-100 !shadow-none h-12 w-12 cursor-pointer transition-colors" />

          <CarouselDots className="relative bottom-0 left-0 translate-x-0 mt-10 justify-center" />
        </Carousel>
      </div>
    </section>
  )
}
