import NextImage from "next/image";
import type { ComponentProps, ComponentType } from "react";
import { ShieldCheck, Truck, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroBanner } from "@/components/hero-banner";
import { FeaturedProductCard } from "@/components/featured-product-card";
import BestSweatshirts from "@/components/bestSweatshirts";
import Cenale from "@/components/cenale";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
} from "@/components/ui/carousel";
import { products, trustPoints } from "@/lib/data";
import BestSweatshirtsCard from "@/components/BestSweatshirtsCard";

const Image = NextImage as ComponentType<ComponentProps<typeof NextImage>>;

const newsPosts = [
  {
    id: 1,
    category: "COLLECTION",
    date: "25 Apr 2022",
    title: "The Best Products That Shape Fashion",
    excerpt:
      "Donec rhoncus quis diam sit amet faucibus. Vivamus pellentesque, sem sed convallis ultricies, ante eros",
    image: "/news_fashion_model.png",
  },
  {
    id: 2,
    category: "FASHION",
    date: "25 Apr 2022",
    title: "New Finds From Tuckernuck",
    excerpt:
      "Donec rhoncus quis diam sit amet faucibus. Vivamus pellentesque, sem sed convallis ultricies, ante eros",
    image: "/news_smiling_girl.png",
  },
  {
    id: 3,
    category: "CLOTHING",
    date: "25 Apr 2022",
    title: "Sunset Sets From Saks",
    excerpt:
      "Donec rhoncus quis diam sit amet faucibus. Vivamus pellentesque, sem sed convallis ultricies, ante eros",
    image: "/news_red_sofa.png",
  },
];

// Mapping strings to Lucide Icon components
const iconMap = {
  Truck,
  RefreshCw,
  ShieldCheck,
};

export default function Home() {
  // Select first 8 products for featured carousel (3 items per page, 3 pages)
  const featuredProducts = products.slice(0, 8);

  // Chunk products into pages of 3 items
  const chunkedProducts = [
    featuredProducts.slice(0, 3),
    featuredProducts.slice(3, 6),
    featuredProducts.slice(6, 8),
  ];

  // Chunk products into pages of 4 items
  const chunkedProducts4 = [
    featuredProducts.slice(0, 4),
    featuredProducts.slice(4, 8),
  ];

  return (
    <div className="flex-1 bg-white text-zinc-950 dark:bg-black dark:text-zinc-50 font-sans">
      {/* Hero Banner Component */}
      <HeroBanner />

      {/* Feature trust points */}
      <section className="border-y border-zinc-100 dark:border-zinc-900 py-12 bg-white dark:bg-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {trustPoints.map((point) => {
              const IconComponent = iconMap[point.iconName] || Truck;
              return (
                <div key={point.id} className="flex items-start gap-4">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
                    <IconComponent className="h-12 w-12 stroke-[1.5]" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold tracking-wide">
                      {point.title}
                    </h4>
                    <p className="mt-1 text-base text-zinc-550 dark:text-zinc-400">
                      {point.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 max-w-400 mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden md:overflow-visible">
        <div className=" mb-16 flex items-center gap-20">
          <h2 className="flex-1 text-2xl font-sans font-bold tracking-[0.2em] text-zinc-450 dark:text-zinc-500">
            Featured Products
          </h2>

          <p className="flex-1 text-xl font-sans font-medium text-zinc-500 dark:text-zinc-400 leading-relaxed w-full">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas
            accumsan lacus vel facilisis.
          </p>
        </div>

        <div className="relative px-2 sm:px-0">
          <Carousel
            autoplay={false}
            className="group relative w-full overflow-visible!"
          >
            <div className="overflow-hidden w-full">
              <CarouselContent>
                {chunkedProducts4.map((chunk, pageIndex) => (
                  <CarouselItem key={pageIndex}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
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

            <CarouselPrevious className="absolute -left-4 md:-left-8 lg:-left-12 top-[35%] -translate-y-1/2 z-30 hidden md:inline-flex !bg-transparent hover:!bg-transparent !border-none text-zinc-400 hover:text-zinc-900 dark:text-zinc-650 dark:hover:text-zinc-150 !opacity-100 hover:!opacity-100 !shadow-none h-12 w-12 cursor-pointer transition-colors" />
            <CarouselNext className="absolute -right-4 md:-right-8 lg:-right-12 top-[35%] -translate-y-1/2 z-30 hidden md:inline-flex !bg-transparent hover:!bg-transparent !border-none text-zinc-400 hover:text-zinc-900 dark:text-zinc-650 dark:hover:text-zinc-150 !opacity-100 hover:!opacity-100 !shadow-none h-12 w-12 cursor-pointer transition-colors" />

            <CarouselDots className="relative bottom-0 left-0 translate-x-0 mt-10 justify-center" />
          </Carousel>
        </div>
      </section>
      

      {/* New Collections Section - Redesigned Best Sweatshirts Layout */}
      <BestSweatshirts />
       <Cenale />

      {/* Featured Products Grid */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden md:overflow-visible">
        <div className="space-y-6 max-w-2xl mb-16 text-left">
          <span className="text-base font-normal font-sans uppercase tracking-[0.2em] text-zinc-450 dark:text-zinc-500">
            Featured Products
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-normal tracking-tight text-zinc-950 dark:text-zinc-50 leading-[1.15]">
            Best Seller Products
          </h2>
          <p className="text-lg font-sans font-normal text-zinc-500 dark:text-zinc-400 leading-relaxed font-light">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
            ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas
            accumsan lacus vel facilisis.
          </p>
        </div>

        <div className="relative px-2 sm:px-0">
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

            <CarouselPrevious className="absolute -left-4 md:-left-8 lg:-left-12 top-[35%] -translate-y-1/2 z-30 hidden md:inline-flex !bg-transparent hover:!bg-transparent !border-none text-zinc-400 hover:text-zinc-900 dark:text-zinc-650 dark:hover:text-zinc-150 !opacity-100 hover:!opacity-100 !shadow-none h-12 w-12 cursor-pointer transition-colors" />
            <CarouselNext className="absolute -right-4 md:-right-8 lg:-right-12 top-[35%] -translate-y-1/2 z-30 hidden md:inline-flex !bg-transparent hover:!bg-transparent !border-none text-zinc-400 hover:text-zinc-900 dark:text-zinc-650 dark:hover:text-zinc-150 !opacity-100 hover:!opacity-100 !shadow-none h-12 w-12 cursor-pointer transition-colors" />

            <CarouselDots className="relative bottom-0 left-0 translate-x-0 mt-10 justify-center" />
          </Carousel>
        </div>
      </section>

      {/* Chanel Testimonial Banner Section */}
     

      {/* New Collections Section - Layout 1 */}
      {/* <NewCollections
        variant="simple"
        subtitle="NEW COLLECTION"
        title="Best Sweatshirts and tracksuits for everyone!"
        description="Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis."
        buttonText="Shop Now"
        buttonLink="/shop"
        image1="/new_collection_woman2.png"
        image2=""
        testimonialText=""
        testimonialAuthor=""
      /> */}
      <BestSweatshirtsCard/>

      {/* Latest News Section */}
      <section className="py-20 lg:py-28 bg-white dark:bg-black border-t border-zinc-100 dark:border-zinc-900">
        <div className="max-w-9xl mx-auto px-6 sm:px-12 lg:px-20">
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 font-serif italic">
              Our Latest News
            </h2>
            <p className="text-sm sm:text-base text-zinc-550 dark:text-zinc-400 leading-relaxed font-light">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
              ipsum suspendisse ultrices gravida. Risus commodo viverra vel
              facilisis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {newsPosts.map((post) => (
              <Card
                key={post.id}
                className="border-none shadow-none bg-transparent flex flex-col group cursor-pointer"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-zinc-50 dark:bg-zinc-900">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-103"
                  />
                </div>
                <CardContent className="p-0 pt-6 space-y-3">
                  <div className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-zinc-450 dark:text-zinc-500">
                    {post.category} — {post.date}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 leading-snug group-hover:text-zinc-650 dark:group-hover:text-zinc-350 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm font-light text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {post.excerpt}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Promotion banner */}
      <section className="bg-zinc-950 text-white py-16 dark:bg-zinc-900">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Join the Clotya Club
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
            Subscribe to receive update on new collections, exclusive events,
            and a 15% discount on your first order.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-xl bg-zinc-900 text-white border border-zinc-800 text-sm outline-none focus:border-white transition dark:bg-zinc-950"
            />
            <Button className="bg-white text-black hover:bg-zinc-200 h-11 text-xs font-bold rounded-xl px-6">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
