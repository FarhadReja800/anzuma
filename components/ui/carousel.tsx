"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type CarouselContextType = {
  activeIndex: number
  totalSlides: number
  nextSlide: () => void
  prevSlide: () => void
  goToSlide: (index: number) => void
  registerSlide: () => void
  unregisterSlide: () => void
}

const CarouselContext = React.createContext<CarouselContextType | null>(null)

export function useCarousel() {
  const context = React.useContext(CarouselContext)
  if (!context) {
    throw new Error("useCarousel must be used within a Carousel provider")
  }
  return context
}

interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  autoplay?: boolean
  autoplayInterval?: number
}

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  ({ autoplay = true, autoplayInterval = 5000, className, children, ...props }, ref) => {
    const [activeIndex, setActiveIndex] = React.useState(0)
    const [totalSlides, setTotalSlides] = React.useState(0)

    const registerSlide = React.useCallback(() => {
      setTotalSlides((prev) => prev + 1)
    }, [])

    const unregisterSlide = React.useCallback(() => {
      setTotalSlides((prev) => Math.max(0, prev - 1))
    }, [])

    const nextSlide = React.useCallback(() => {
      setActiveIndex((prev) => (totalSlides > 0 ? (prev + 1) % totalSlides : 0))
    }, [totalSlides])

    const prevSlide = React.useCallback(() => {
      setActiveIndex((prev) => (totalSlides > 0 ? (prev - 1 + totalSlides) % totalSlides : 0))
    }, [totalSlides])

    const goToSlide = React.useCallback((index: number) => {
      setActiveIndex(index)
    }, [])

    // Autoplay logic
    React.useEffect(() => {
      if (!autoplay || totalSlides === 0) return
      const interval = setInterval(nextSlide, autoplayInterval)
      return () => clearInterval(interval)
    }, [autoplay, autoplayInterval, totalSlides, nextSlide])

    return (
      <CarouselContext.Provider
        value={{
          activeIndex,
          totalSlides,
          nextSlide,
          prevSlide,
          goToSlide,
          registerSlide,
          unregisterSlide,
        }}
      >
        <div
          ref={ref}
          className={cn("relative w-full overflow-hidden", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    )
  }
)
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { activeIndex } = useCarousel()

  return (
    <div
      ref={ref}
      className={cn(
        "flex transition-transform duration-700 ease-in-out h-full w-full",
        className
      )}
      style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      {...props}
    >
      {children}
    </div>
  )
})
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { registerSlide, unregisterSlide } = useCarousel()

  React.useEffect(() => {
    registerSlide()
    return () => unregisterSlide()
  }, [registerSlide, unregisterSlide])

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn("min-w-full w-full shrink-0 grow-0", className)}
      {...props}
    >
      {children}
    </div>
  )
})
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { prevSlide } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute left-4 top-1/2 -translate-y-1/2 rounded-full h-10 w-10 bg-white/80 hover:bg-white text-zinc-950 dark:bg-black/60 dark:text-zinc-550 dark:hover:bg-black border-zinc-200/50 shadow-md transition-all opacity-0 group-hover:opacity-100 focus:opacity-100",
        className
      )}
      onClick={prevSlide}
      {...props}
    >
      <ChevronLeft className="h-6 w-6 stroke-[1.2]" />
      <span className="sr-only">Previous slide</span>
    </Button>
  )
})
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { nextSlide } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute right-4 top-1/2 -translate-y-1/2 rounded-full h-10 w-10 bg-white/80 hover:bg-white text-zinc-950 dark:bg-black/60 dark:text-zinc-550 dark:hover:bg-black border-zinc-200/50 shadow-md transition-all opacity-0 group-hover:opacity-100 focus:opacity-100",
        className
      )}
      onClick={nextSlide}
      {...props}
    >
      <ChevronRight className="h-6 w-6 stroke-[1.2]" />
      <span className="sr-only">Next slide</span>
    </Button>
  )
})
CarouselNext.displayName = "CarouselNext"

// Dot Pagination component to match user requirements
export function CarouselDots({ className }: { className?: string }) {
  const { activeIndex, totalSlides, goToSlide } = useCarousel()

  if (totalSlides <= 1) return null

  return (
    <div className={cn("absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10", className)}>
      {Array.from({ length: totalSlides }).map((_, index) => (
        <button
          key={index}
          className={cn(
            "h-1.5 w-1.5 rounded-full transition-all duration-300 cursor-pointer",
            activeIndex === index 
              ? "bg-zinc-900 dark:bg-white scale-110" 
              : "bg-zinc-400/60 hover:bg-zinc-500 dark:bg-zinc-600/60 dark:hover:bg-zinc-500"
          )}
          onClick={() => goToSlide(index)}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  )
}

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
}

