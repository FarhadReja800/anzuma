import * as React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { ProductCard, type Product } from "@/components/product-card"

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex items-center justify-between border-b pb-4 mb-10">
        <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Showing {products.length} items</span>
        <Link href="/shop" className="text-xs font-bold text-zinc-950 dark:text-zinc-100 hover:opacity-85 flex items-center gap-1 underline underline-offset-4">
          View All Shop Catalog
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
