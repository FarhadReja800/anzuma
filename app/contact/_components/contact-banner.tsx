import * as React from "react"
import { Sparkles } from "lucide-react"

export function ContactBanner() {
  return (
    <section className="relative bg-zinc-50 dark:bg-zinc-900/40 py-16 lg:py-24 overflow-hidden border-b border-zinc-100 dark:border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative flex flex-col items-center text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Support</span>
        <h1 className="text-4xl font-extrabold tracking-tight">Contact Us</h1>
        <p className="text-sm text-zinc-500 max-w-lg leading-relaxed">
          Have questions about our garments, custom ordering, sizing assistance, or shipping? Get in touch, we are here to help.
        </p>
        <div className="flex items-center gap-1 text-[11px] font-bold text-zinc-500">
          <Sparkles className="h-3.5 w-3.5 text-amber-500" />
          <span>24/7 DEDICATED CUSTOMER SUPPORT</span>
        </div>
      </div>
    </section>
  )
}
