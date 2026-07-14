import * as React from "react"
import { HeroBanner } from "@/components/home/hero-banner"
import BestSweatshirts from "@/components/home/best-sweatshirts"
import Cenale from "@/components/home/cenale"
import BestSweatshirtsCard from "@/components/home/best-sweatshirts-card"
import { TrustPoints } from "@/components/home/trust-points"
import { FeaturedCarousel } from "@/components/home/featured-carousel"
import { BestSellerCarousel } from "@/components/home/best-seller-carousel"
import { VideoBanner } from "@/components/home/video-banner"
import { LatestNews } from "@/components/home/latest-news"
import { NewsletterPromo } from "@/components/home/newsletter-promo"

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

      {/* Background Video Section */}
      <VideoBanner videos={["/video/zara1 (1).mp4", "/video/zara1 (2).mp4", "/video/zara1 (3).mp4", "/video/zara1 (4).mp4"]} />

      {/* Best Sweatshirts Card Section */}
      <BestSweatshirtsCard />

      {/* Latest News Section */}
      <LatestNews />

      {/* Promotion banner */}
      <NewsletterPromo />
    </div>
  )
}

