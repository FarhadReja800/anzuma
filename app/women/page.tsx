"use client"

import * as React from "react"
import { products, categoriesMetadata } from "@/lib/data"
import { CategoryHero } from "./_components/category-hero"
import { ProductGrid } from "./_components/product-grid"

export default function WomenPage() {
  const metadata = categoriesMetadata.women
  const womenProducts = products.filter((product) => product.collections.includes("women"))

  return (
    <div className="flex-1 bg-white text-zinc-955 dark:bg-black dark:text-zinc-50 font-sans">
      {/* Hero Category Banner */}
      <CategoryHero metadata={metadata} />

      {/* Product list */}
      <ProductGrid products={womenProducts} />
    </div>
  )
}
