import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"

export interface BestSweatshirtsCardProps {
  subtitle?: string
  title?: string
  description?: string
  buttonText?: string
  buttonLink?: string
  image?: string
}

export function BestSweatshirtsCard({
  subtitle = "NEW COLLECTION",
  title = "Best Sweatshirts and\ntracksuits for everyone!",
  description = "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.",
  buttonText = "Shop Now",
  buttonLink = "/shop",
  image = "/new_collection_woman2.png",
}: BestSweatshirtsCardProps) {
  return (
    <section className="py-12 max-w-7xl mx-auto px-6 sm:px-12 ">
      <Card className="overflow-hidden  ">
        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Column - Content */}
          <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16 space-y-6">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-950 dark:text-zinc-50">
                {subtitle}
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-medium tracking-tight text-zinc-950 dark:text-zinc-50 leading-[1.2] font-sans whitespace-pre-line">
              {title}
            </h2>
            
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-light max-w-md">
              {description}
            </p>
            
            <div className="pt-2">
              <Link 
                href={buttonLink} 
                className="inline-flex items-center gap-2 border border-zinc-950 dark:border-zinc-50 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-950 dark:text-zinc-50 bg-transparent hover:bg-zinc-950 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 select-none"
              >
                {buttonText} <span className="text-sm">→</span>
              </Link>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative w-full h-[300px] md:h-auto min-h-[300px]  bg-zinc-50 dark:bg-zinc-900 group overflow-hidden">
            <Image 
              src={image} 
              alt={title} 
              fill 
              priority
              className="object-cover object-top md:object-center transition-transform duration-700 group-hover:scale-102"
            />
          </div>

        </div>
      </Card>
    </section>
  )
}

export default BestSweatshirtsCard
