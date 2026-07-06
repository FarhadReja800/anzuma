import Link from "next/link"
import NextImage from "next/image"
import { ShoppingBag } from "lucide-react"
import type { ComponentProps, ComponentType } from "react"

// Bypass React 19 JSX type resolution issue with Next.js Image component
const Image = NextImage as ComponentType<ComponentProps<typeof NextImage>>
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselPrevious, 
  CarouselNext, 
  CarouselDots 
} from "@/components/ui/carousel"
import { heroSlides, Slide } from "@/lib/data"

interface HeroBannerProps {
  slides?: Slide[]
  arrowWidthClass?: string
  arrowHeightClass?: string
  arrowRadiusClass?: string
  arrowBorderClass?: string
  arrowBgClass?: string
}

export function HeroBanner({ 
  slides = heroSlides,
  arrowWidthClass = "w-12",
  arrowHeightClass = "h-12",
  arrowRadiusClass = "rounded-full",
  arrowBorderClass = "border border-zinc-200/50 dark:border-zinc-800/50",
  arrowBgClass = "bg-white/85 hover:bg-white dark:bg-black/70 dark:hover:bg-black"
}: HeroBannerProps) {
  const arrowStyles = `${arrowWidthClass} ${arrowHeightClass} ${arrowRadiusClass} ${arrowBorderClass} ${arrowBgClass}`

  return (
    <section className="relative w-full">
      <Carousel autoplay={true} className="group relative w-full bg-[#E5E5E3] dark:bg-zinc-950">
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem 
              key={slide.id} 
              className={`relative flex flex-col md:flex-row items-center min-h-120 md:h-150 px-6 sm:px-12 lg:px-20 overflow-hidden ${slide.bgColorClass}`}
            >
              {/* Left Content */}
              <div className="w-full md:w-[50%] space-y-6 text-left z-10 py-12 md:py-0 md:pr-4 pl-0 md:pl-10">
                <span className="text-base font-medium uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400">
                  {slide.subtitle}
                </span>
                <h2 className="text-4xl sm:text-5xl lg:text-[56px] xl:text-[62px] font-medium tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.1] md:leading-[1.05]">
                  {slide.titleLight} <br />
                  {slide.titleBold}
                </h2>
                <p className="max-w-md text-xs sm:text-base text-zinc-550 dark:text-zinc-400 leading-relaxed font-light">
                  {slide.description}
                </p>
                <div className="pt-2">
                  <Link 
                    href={slide.buttonLink} 
                    className="group/btn inline-flex items-center gap-2 text-sm font-medium text-zinc-950 hover:opacity-70 transition dark:text-zinc-50"
                  >
                    <span>{slide.buttonText}</span>
                    <span className="inline-block transition-transform duration-200 group-hover/btn:translate-x-1 text-base leading-none">
                      →
                    </span>
                  </Link>
                </div>
              </div>

              {/* Right Side Visuals (Full bleed/seamless design to match user screenshot) */}
              <div className="w-full md:w-[50%] h-80 md:h-full relative self-stretch flex items-end justify-end md:absolute md:right-0 md:bottom-0 md:top-0">
                {slide.imageSrc ? (
                  <div className="relative w-full h-full">
                    <Image 
                      src={slide.imageSrc} 
                      alt={slide.imageAlt || ""} 
                      fill
                      priority
                      className="object-contain md:object-cover object-bottom md:object-bottom-right transition-transform duration-700"
                    />
                  </div>
                ) : (
                  /* Slide 2 Visual Representation */
                  <div className="relative w-full h-full flex items-center justify-center bg-linear-to-tr from-amber-50 to-emerald-50 dark:from-zinc-800 dark:to-zinc-750">
                    <div className="w-24 h-24 rounded-2xl bg-white/60 dark:bg-black/40 backdrop-blur-md flex items-center justify-center shadow-lg border border-white/20">
                      {slide.visualIcon === "shopping-bag" ? (
                        <ShoppingBag className="h-10 w-10 text-zinc-400 dark:text-zinc-650 stroke-[1.2]" />
                      ) : null}
                    </div>
                  </div>
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Arrows */}
        <CarouselPrevious className={arrowStyles} />
        <CarouselNext className={arrowStyles} />
        
        {/* Dot Pagination indicators */}
        <CarouselDots />
      </Carousel>
    </section>
  )
}
