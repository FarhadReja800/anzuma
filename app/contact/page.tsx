import * as React from "react"
import Image from "next/image"
import { Store, Clock } from "lucide-react"
import { ContactForm } from "./_components/contact-form"
import fs from "fs"
import path from "path"

// Auto-copy the generated banner image to public/contact-banner.png on server compilation/render
try {
  const src = "C:\\Users\\farha\\.gemini\\antigravity-ide\\brain\\9fa542cc-5199-4755-8b8d-9cc79bd13280\\contact_page_banner_1783314556925.png"
  const dest = path.join(process.cwd(), "public", "contact-banner.png")
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest)
  }
} catch (e) {
  console.error("Failed to copy contact banner image:", e)
}

export default function ContactPage() {
  return (
    <div className="flex-1 bg-[#fbfbfb] text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50 font-sans">
      
      {/* Top Banner Section */}
      <div className="w-full relative h-[380px] bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200/50">
        <Image 
          src="/contact-banner.png" 
          alt="Contact Banner" 
          fill 
          priority
          className="object-cover object-center"
        />
      </div>

      {/* Main Content Section */}
      <section className="bg-[#fbfbfb] dark:bg-zinc-950 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Overlapping Card */}
          <div className="relative -mt-36 z-10 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-8 sm:p-12 md:p-16 shadow-[0_4px_30px_rgba(0,0,0,0.02)] rounded-none">
            
            {/* Card Header */}
            <div className="mb-10">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#df4a4a] block mb-2">
                Contact with us
              </span>
              <h1 className="text-3xl sm:text-4xl font-normal text-zinc-900 dark:text-white tracking-tight mb-4 font-serif">
                Get In Touch
              </h1>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 max-w-3xl leading-relaxed font-normal">
                In hac habitasse platea dictumst. Pellentesque viverra sem nec orci lacinia, in bibendum urna mollis. Quisque nunc lacus, varius vel leo a, pretium lobortis metus. Vivamus consectetur consequat justo.
              </p>
            </div>

            {/* Card Body - Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              
              {/* Left Column: Form */}
              <div className="lg:col-span-8">
                <ContactForm />
              </div>

              {/* Right Column: Info */}
              <div className="lg:col-span-4 space-y-8">
                
                {/* Clotya Store */}
                <div className="flex gap-4">
                  <div className="h-8 w-8 border border-[#df4a4a] text-[#df4a4a] flex items-center justify-center shrink-0">
                    <Store className="h-4 w-4" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold text-zinc-900 dark:text-white tracking-wider uppercase">
                      Clotya Store
                    </h3>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal whitespace-pre-line">
                      Germany — 785 15h Street, Office 478/B
                      Green Mall Berlin, De 81566
                    </p>
                    <div className="text-[11px] text-zinc-500 dark:text-zinc-400 font-normal">
                      Phone: +1 1234 567 88
                    </div>
                    <div className="text-[11px] text-zinc-500 dark:text-zinc-400 font-normal">
                      Email: <span className="text-[#df4a4a]">contact@example.com</span>
                    </div>
                  </div>
                </div>

                {/* Opening Hours */}
                <div className="flex gap-4">
                  <div className="h-8 w-8 border border-[#df4a4a] text-[#df4a4a] flex items-center justify-center shrink-0">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold text-zinc-900 dark:text-white tracking-wider uppercase">
                      Opening Hours
                    </h3>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal whitespace-pre-line">
                      Monday - Friday : 9am - 5pm
                      Weekend Closed
                    </p>
                  </div>
                </div>

              </div>

            </div>

          </div>

          {/* Bottom Text */}
          <div className="mt-16 text-center max-w-5xl mx-auto px-4">
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal">
              In hac habitasse platea dictumst. Pellentesque viverra sem nec orci lacinia, in bibendum urna mollis. Quisque nunc lacus, varius vel leo a, pretium lobortis metus. Vivamus consectetur consequat justo. Sed interdum nunc ut tristique congue. Quisque maximus mauris et dui sagittis scelerisque.
            </p>
          </div>

        </div>
      </section>

    </div>
  )
}
