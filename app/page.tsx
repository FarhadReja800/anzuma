import * as React from "react"
import { HeroBanner } from "@/components/hero-banner"
import BestSweatshirts from "@/components/bestSweatshirts"
import Cenale from "@/components/cenale"
import BestSweatshirtsCard from "@/components/BestSweatshirtsCard"
import { TrustPoints } from "./_components/trust-points"
import { FeaturedCarousel } from "./_components/featured-carousel"
import { BestSellerCarousel } from "./_components/best-seller-carousel"
import { LatestNews } from "./_components/latest-news"
import { NewsletterPromo } from "./_components/newsletter-promo"

export default function Home() {
  return (
    <div className="flex-1 bg-white text-zinc-955 dark:bg-black dark:text-zinc-50 font-sans">
      {/* Hero Banner Component */}
      <HeroBanner />

      {/* Feature trust points */}
      <TrustPoints />

      {/* Featured Products */}
      <FeaturedCarousel />

      {/* New Collections Section - Redesigned Best Sweatshirts Layout */}
      <BestSweatshirts />
      <Cenale />

      {/* Best Seller Products Carousel */}
      <BestSellerCarousel />

      {/* Best Sweatshirts Card Section */}
      <BestSweatshirtsCard />

      {/* Latest News Section */}
      <LatestNews />

      {/* Promotion banner */}
      <NewsletterPromo />
    </div>
  )
}
