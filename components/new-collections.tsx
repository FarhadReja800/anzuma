import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"

export interface NewCollectionsProps {
  variant?: "default" | "overlapping" | "simple"
  topBrands?: boolean
  subtitle: string
  title: string
  description: string
  buttonText: string
  buttonLink: string
  image1: string
  image2: string
  testimonialText: string
  testimonialAuthor: string
  rating?: {
    score: number
    count: string
  }
}

export function NewCollections(props: NewCollectionsProps) {
  const {
    variant = "default",
    topBrands = false,
    subtitle,
    title,
    description,
    buttonText,
    buttonLink,
    image1,
    image2,
    testimonialText,
    testimonialAuthor,
    rating
  } = props
  return (
    <section className="py-20 lg:py-28 bg-white dark:bg-black overflow-visible">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
        
        {/* Top Brands Bar */}
        {topBrands && (
          <div className="w-full border-b border-zinc-100 dark:border-zinc-900 pb-16 mb-20">
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 sm:gap-x-16 lg:gap-x-20 text-zinc-400 dark:text-zinc-600">
              <span className="font-sans font-bold tracking-[0.25em] text-sm text-zinc-950 dark:text-zinc-100">
                MARNI
              </span>
              <span className="font-sans font-light tracking-[0.3em] text-sm text-zinc-800 dark:text-zinc-200">
                AVAKEN
              </span>
              <span className="font-serif italic text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
                genith
              </span>
              <span className="font-sans font-semibold tracking-[0.15em] text-xs text-zinc-800 dark:text-zinc-200">
                FRAME
              </span>
              <div className="flex flex-col items-center">
                <span className="font-serif italic text-[10px] leading-none tracking-[0.05em] text-zinc-500">The</span>
                <span className="font-sans font-bold text-xs tracking-[0.2em] text-zinc-950 dark:text-zinc-100">HAYDEN</span>
              </div>
              <span className="font-serif italic text-base tracking-wide text-zinc-700 dark:text-zinc-300">
                3.1 Phillip Lim
              </span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Column */}
          <div className="flex flex-col">
            {variant === "simple" ? (
              /* Simple Layout Left Side - Text block */
              <div className="space-y-6 max-w-lg">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-450 dark:text-zinc-500">
                  {subtitle}
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-normal tracking-tight text-zinc-950 dark:text-zinc-50 leading-[1.15]">
                  {title}
                </h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-light">
                  {description}
                </p>
                <div className="pt-2">
                  <Link 
                    href={buttonLink} 
                    className="inline-flex items-center gap-2 border border-zinc-950 dark:border-zinc-50 px-6 py-2.5 text-xs font-medium uppercase tracking-wider text-zinc-950 dark:text-zinc-50 hover:bg-zinc-950 hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-300"
                  >
                    {buttonText} →
                  </Link>
                </div>
              </div>
            ) : variant === "overlapping" ? (
              /* Overlapping Layout Left Side */
              <div className="relative w-[85%] aspect-[4/4] bg-zinc-50 dark:bg-zinc-900">
                <Image 
                  src={image1} 
                  alt={title} 
                  fill 
                  priority
                  className="object-cover hover:scale-[1.01] transition-transform duration-700"
                />
                <div className="absolute -bottom-10 -right-[15%] w-[55%] aspect-[4/5] border-[12px] border-white dark:border-black shadow-2xl bg-zinc-50 dark:bg-zinc-900">
                  <Image 
                    src={image2} 
                    alt={title} 
                    fill 
                    className="object-cover hover:scale-[1.01] transition-transform duration-700"
                  />
                </div>
              </div>
            ) : (
              /* Default Layout Left Side */
              <>
                <div className="relative w-full aspect-[4/5] overflow-hidden bg-zinc-50 dark:bg-zinc-900">
                  <Image 
                    src={image1} 
                    alt={title} 
                    fill 
                    priority
                    className="object-cover hover:scale-102 transition-transform duration-700"
                  />
                </div>
                <p className="mt-6 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-light max-w-md">
                  {testimonialText}
                </p>
                <p className="mt-4 text-sm font-bold text-zinc-900 dark:text-zinc-100 font-sans tracking-wide">
                  {testimonialAuthor}
                </p>
              </>
            )}
          </div>

          {/* Right Column */}
          <div className="flex flex-col">
            {variant === "simple" ? (
              /* Simple Layout Right Side - Single Image */
              <div className="relative w-full aspect-[4/5] overflow-hidden bg-zinc-50 dark:bg-zinc-900">
                <Image 
                  src={image1} 
                  alt={title} 
                  fill 
                  priority
                  className="object-cover hover:scale-102 transition-transform duration-700"
                />
              </div>
            ) : variant === "overlapping" ? (
              /* Right Column for Overlapping Layout */
              <div className="flex flex-col">
                {/* Top Text content */}
                <div className="space-y-6 max-w-lg">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-450 dark:text-zinc-500">
                    {subtitle}
                  </span>
                  <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-normal tracking-tight text-zinc-950 dark:text-zinc-50 leading-[1.15]">
                    {title}
                  </h2>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-light">
                    {description}
                  </p>
                  <div className="pt-2">
                    <Link 
                      href={buttonLink} 
                      className="inline-flex items-center gap-2 border border-zinc-950 dark:border-zinc-50 px-6 py-2.5 text-xs font-medium uppercase tracking-wider text-zinc-950 dark:text-zinc-50 hover:bg-zinc-950 hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-300"
                    >
                      {buttonText} →
                    </Link>
                  </div>
                </div>

                {/* Testimonial & Ratings under the text block */}
                <div className="mt-20 pt-8 border-t border-zinc-100 dark:border-zinc-900 space-y-6 max-w-lg">
                  {rating && (
                    <div className="flex items-center gap-2">
                      <div className="flex text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-current stroke-none" />
                        ))}
                      </div>
                      <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                        {rating.score}
                      </span>
                      <span className="text-xs text-zinc-400 dark:text-zinc-500">
                        [{rating.count}] Rating
                      </span>
                    </div>
                  )}
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-light italic">
                    &ldquo;{testimonialText}&rdquo;
                  </p>
                  <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100 font-sans tracking-wide">
                    {testimonialAuthor}
                  </p>
                </div>
              </div>
            ) : (
              /* Default Layout Right Side (Original) */
              <div className="flex flex-col">
                {/* Top Text content */}
                <div className="space-y-6 max-w-lg">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-450 dark:text-zinc-500">
                    {subtitle}
                  </span>
                  <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-normal tracking-tight text-zinc-950 dark:text-zinc-50 leading-[1.15]">
                    {title}
                  </h2>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-light">
                    {description}
                  </p>
                  <div className="pt-2">
                    <Link 
                      href={buttonLink} 
                      className="inline-flex items-center gap-2 border border-zinc-950 dark:border-zinc-50 px-6 py-2.5 text-xs font-medium uppercase tracking-wider text-zinc-950 dark:text-zinc-50 hover:bg-zinc-950 hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-300"
                    >
                      {buttonText} →
                    </Link>
                  </div>
                </div>

                {/* Bottom Image */}
                <div className="mt-12 relative w-full aspect-[4/5] overflow-hidden bg-zinc-50 dark:bg-zinc-900">
                  <Image 
                    src={image2} 
                    alt={title} 
                    fill 
                    className="object-cover hover:scale-102 transition-transform duration-700"
                  />
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
