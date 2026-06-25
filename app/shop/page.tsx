"use client"

import * as React from "react"
import { SlidersHorizontal, Search } from "lucide-react"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { products as shopProducts } from "@/lib/data"

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null)
  const [priceRange, setPriceRange] = React.useState<number>(250)
  const [sortBy, setSortBy] = React.useState<string>("featured")
  const [searchQuery, setSearchQuery] = React.useState<string>("")

  // Filter products
  const filteredProducts = shopProducts.filter((product) => {
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true
    const matchesPrice = product.price <= priceRange
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesPrice && matchesSearch
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price
    if (sortBy === "price-high") return b.price - a.price
    if (sortBy === "rating") return b.rating - a.rating
    return 0 // default featured
  })

  return (
    <div className="flex-1 bg-white text-zinc-950 dark:bg-black dark:text-zinc-50 font-sans">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="border-b border-zinc-100 dark:border-zinc-900 pb-8 mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Collections</span>
          <h1 className="text-3xl font-extrabold tracking-tight mt-1">Shop Catalog</h1>
          <p className="text-sm text-zinc-500 mt-2">Find the perfect minimalist and elegant clothing pieces.</p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-zinc-50 dark:bg-zinc-900/40 p-4 rounded-2xl mb-8 border border-zinc-100 dark:border-zinc-900">
          
          {/* Search bar inside Catalog */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search product..."
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 pl-10 text-xs outline-none transition focus:border-zinc-950 dark:border-zinc-800 dark:bg-zinc-900 dark:focus:border-zinc-50"
            />
            <Search className="absolute left-3.5 top-3.5 h-3.5 w-3.5 text-zinc-400" />
          </div>

          <div className="flex flex-wrap w-full md:w-auto items-center justify-between md:justify-end gap-4">
            
            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-zinc-500">Sort by:</span>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs font-semibold outline-none cursor-pointer focus:border-zinc-950 dark:border-zinc-800 dark:bg-zinc-900 dark:focus:border-zinc-50"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>

            <span className="text-xs text-zinc-500 font-semibold">{sortedProducts.length} items found</span>
          </div>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          
          {/* Sidebar Filter Area */}
          <aside className="space-y-8 lg:col-span-1">
            
            {/* Category Filter */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Categories</h3>
              <div className="flex flex-col gap-2">
                {["Shirts", "Outerwear", "Pants", "Accessories"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                    className={`flex items-center justify-between text-xs font-semibold py-2 px-3 rounded-lg text-left transition ${
                      selectedCategory === cat 
                        ? "bg-zinc-950 text-white dark:bg-zinc-100 dark:text-black" 
                        : "hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300"
                    }`}
                  >
                    <span>{cat}</span>
                    <span className="text-[10px] text-zinc-400">
                      ({shopProducts.filter(p => p.category === cat).length})
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="space-y-3">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-zinc-400">
                <span>Max Price</span>
                <span className="text-zinc-950 dark:text-zinc-100 font-mono">${priceRange}</span>
              </div>
              <input
                type="range"
                min="40"
                max="250"
                step="5"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-zinc-950 dark:accent-zinc-100"
              />
              <div className="flex justify-between text-[10px] font-semibold text-zinc-400">
                <span>$40</span>
                <span>$250</span>
              </div>
            </div>

            {/* Size filters */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Filter By Size</h3>
              <div className="flex flex-wrap gap-2">
                {["XS", "S", "M", "L", "XL"].map((size) => (
                  <button 
                    key={size}
                    className="h-8 w-8 rounded-lg border border-zinc-200 dark:border-zinc-800 text-[10px] font-bold hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:border-zinc-450 dark:hover:border-zinc-750 transition cursor-pointer"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Reset Button */}
            {(selectedCategory || priceRange !== 250 || searchQuery !== "") && (
              <Button 
                onClick={() => {
                  setSelectedCategory(null)
                  setPriceRange(250)
                  setSearchQuery("")
                }}
                variant="outline" 
                className="w-full text-xs font-semibold rounded-xl h-10 border-red-200 text-red-500 hover:bg-red-50/50 dark:border-red-900/30 dark:text-red-400 dark:hover:bg-red-950/20"
              >
                Reset Filters
              </Button>
            )}

          </aside>

          {/* Product Catalog Grid */}
          <main className="lg:col-span-3">
            {sortedProducts.length === 0 ? (
              <div className="text-center py-20 border border-dashed rounded-3xl border-zinc-200 dark:border-zinc-800 flex flex-col items-center justify-center gap-3">
                <SlidersHorizontal className="h-10 w-10 text-zinc-300 stroke-[1.5]" />
                <h3 className="text-sm font-bold">No Products Found</h3>
                <p className="text-xs text-zinc-500 max-w-xs leading-normal">
                  Try adjusting your category, price slider, or search query to find matches.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>

        </div>

      </div>
    </div>
  )
}
