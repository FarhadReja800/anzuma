import { Playball } from "next/font/google"

const playball = Playball({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
})

export function Cenale() {
  return (
    <section className="py-20 lg:py-24 bg-[#f3f6fb] dark:bg-zinc-950/40 border-y border-zinc-100 dark:border-zinc-900/50">
      <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center justify-center">
        
        {/* Chanel Interlocking CC Logo & Title */}
        <div className="flex flex-col items-center space-y-2 select-none">
          <svg 
            viewBox="15 20 70 60" 
            className="w-20 h-20 text-[#032040] dark:text-zinc-200 transition-colors"
          >
            {/* Left C */}
            <path
              d="M 20.85 33.92 A 25 25 0 1 0 20.85 66.08"
              fill="none"
              stroke="currentColor"
              strokeWidth="7"
              strokeLinecap="butt"
            />
            {/* Right C */}
            <path
              d="M 79.15 33.92 A 25 25 0 1 1 79.15 66.08"
              fill="none"
              stroke="currentColor"
              strokeWidth="7"
              strokeLinecap="butt"
            />
            {/* Interlocking overlay (top crossing of Left C) */}
            <path
              d="M 35 29 A 25 25 0 0 0 55 32"
              fill="none"
              stroke="currentColor"
              strokeWidth="7"
            />
          </svg>
          <h3 className="font-sans font-bold tracking-[0.3em] text-zinc-900 dark:text-zinc-100 text-lg mr-[-0.3em]">
            CHANEL
          </h3>
        </div>

        {/* Testimonial Quote */}
        <p className="text-zinc-750 dark:text-zinc-300 text-base sm:text-lg font-light leading-relaxed max-w-2xl mt-8 mb-6 font-sans">
          Eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum
          suspendisse ultrices gravida. Risus commodobendo viverra maecenas
          accumsan lacus vel facilisis libero.
        </p>

        {/* Signature & Role */}
        <div className="flex flex-col items-center space-y-1">
          <span 
            className={`${playball.className} text-3xl sm:text-4xl text-[#35665a] dark:text-teal-400 font-normal italic`}
          >
            Patricia Colbert
          </span>
          <span className="text-[10px] tracking-[0.25em] uppercase text-zinc-450 dark:text-zinc-550 font-bold">
            CHANEL CEO
          </span>
        </div>

      </div>
    </section>
  )
}

export default Cenale
