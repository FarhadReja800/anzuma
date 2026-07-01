import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

export function BestSweatshirts() {
  return (
    <section className="py-20 lg:py-28 bg-white dark:bg-black overflow-visible">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Left Column - Couple Image Card and Testimonial */}
          <Card className="border-none shadow-none bg-transparent p-0 flex flex-col">
            <div className="relative w-full aspect-[4/5] overflow-hidden bg-zinc-50 dark:bg-zinc-900 group">
              <Image 
                src="/new_collection_couple.png" 
                alt="Best Sweatshirts and tracksuits collection" 
                fill 
                priority
                className="object-cover transition-transform duration-700 "
              />
            </div>
            <CardContent className="p-0 mt-8 space-y-3">
              <p className="text-base font-normal font-sans text-zinc-500 dark:text-zinc-400 leading-relaxed font-light max-w-md">
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
                ipsum suspendisse ultrices gravida.
              </p>
              <p className="text-base font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                Petra van der Meer
              </p>
            </CardContent>
          </Card>

          {/* Right Column - Brand Information & Man Image Card */}
          <div className="flex flex-col space-y-16">
            
            {/* Top Text Content Area */}
            <div className="space-y-6 max-w-lg">
              <div className="space-y-2">
                <div className="w-10 h-[2px] bg-zinc-900 dark:bg-zinc-100" />
                <span className="text-base font-semibold uppercase tracking-[0.2em] text-zinc-450 dark:text-zinc-500 block pt-1">
                  NEW COLLECTIONS
                </span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-medium tracking-tight text-zinc-950 dark:text-zinc-50 leading-[1.2] font-sans">
                Best Sweatshirts and<br />tracksuits for everyone!
              </h2>
              
              <p className="text-leading font-normal font-sans text-zinc-500 dark:text-zinc-400 leading-relaxed font-light">
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Quis ipsum suspendisse ultrices gravida. Risus commodo viverra
                maecenas accumsan lacus vel facilisis.
              </p>
              
              <div className="pt-2">
                <Link 
                  href="/shop" 
                  className="inline-flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-900 dark:hover:border-zinc-100 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-zinc-950 dark:text-zinc-50 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all duration-300"
                >
                  Shop Now <span className="text-sm">→</span>
                </Link>
              </div>
            </div>

            {/* Bottom Image Card */}
            <Card className="border-none shadow-none bg-transparent p-0">
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-zinc-50 dark:bg-zinc-900 group">
                <Image 
                  src="/new_collection_man.png" 
                  alt="New Sweatshirt model" 
                  fill 
                  className="object-cover  transition-transform duration-700 group-hover:scale-103"
                />
              </div>
            </Card>

          </div>

        </div>
      </div>
    </section>
  )
}
export default BestSweatshirts;
