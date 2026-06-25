"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { ProductCard } from "@/components/product-card"
import { products, categoriesMetadata } from "@/lib/data"

export default function WomenPage() {
  const metadata = categoriesMetadata.women
  const womenProducts = products.filter((product) => product.collections.includes("women"))

  return (
    <div className="flex-1 bg-white text-zinc-950 dark:bg-black dark:text-zinc-50 font-sans">
      
      {/* Hero Category Banner */}
      <section className="relative bg-zinc-50 dark:bg-zinc-900/40 py-16 lg:py-24 overflow-hidden border-b border-zinc-100 dark:border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative flex flex-col items-center text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">{metadata.subtitle}</span>
          <h1 className="text-4xl font-extrabold tracking-tight">{metadata.title}</h1>
          <p className="text-sm text-zinc-500 max-w-lg leading-relaxed">
            {metadata.description}
          </p>
          <div className="flex items-center gap-1 text-[11px] font-bold text-zinc-500">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            <span>{metadata.tagline}</span>
          </div>
        </div>
      </section>

      {/* Product list */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between border-b pb-4 mb-10">
          <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Showing {womenProducts.length} items</span>
          <Link href="/shop" className="text-xs font-bold text-zinc-950 dark:text-zinc-100 hover:opacity-85 flex items-center gap-1 underline underline-offset-4">
            View All Shop Catalog
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {womenProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

    </div>
  )
}
