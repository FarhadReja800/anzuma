"use client"

import Link from "next/link"
import { MAIN_CATEGORIES } from "./allProductCategories"
import { ArrowRight, ShoppingBag } from "lucide-react"

export const CategoryGrid = () => {
  return (
    <div className="bg-white text-zinc-900 dark:bg-black dark:text-zinc-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-zinc-950 dark:text-zinc-50">
            Shop by Category
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed">
            Discover our extensive collection across all departments. From daily essentials to premium seasonal selections.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {MAIN_CATEGORIES.map((cat, index) => {
            // Assign dynamic colors for the gradient backgrounds based on index
            const gradients = [
              "from-rose-100 to-teal-100 dark:from-rose-950/40 dark:to-teal-950/40",
              "from-blue-100 to-indigo-100 dark:from-blue-950/40 dark:to-indigo-950/40",
              "from-amber-100 to-orange-100 dark:from-amber-950/40 dark:to-orange-950/40",
              "from-emerald-100 to-cyan-100 dark:from-emerald-950/40 dark:to-cyan-950/40",
              "from-purple-100 to-pink-100 dark:from-purple-950/40 dark:to-pink-950/40",
              "from-slate-100 to-zinc-100 dark:from-slate-900 dark:to-zinc-900"
            ]
            const bgGradient = gradients[index % gradients.length]
            const itemCount = (index * 13 + 42) // Deterministic mock item count
            
            return (
              <Link 
                key={cat.id} 
                href={`/productCategories/${cat.id}`}
                className="group relative flex flex-col h-64 rounded-2xl overflow-hidden border border-zinc-100 dark:border-zinc-800 transition-all hover:shadow-xl dark:hover:border-zinc-700"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${bgGradient} opacity-60 transition-opacity group-hover:opacity-100`} />
                
                {/* Content */}
                <div className="relative h-full flex flex-col justify-between p-8">
                  <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md w-12 h-12 rounded-full flex items-center justify-center shadow-sm">
                    <ShoppingBag className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
                  </div>
                  
                  <div className="space-y-1 transform transition-transform group-hover:translate-x-2">
                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                      {cat.name}
                    </h3>
                    <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 flex items-center gap-2">
                      {itemCount} Items
                      <ArrowRight className="w-4 h-4 opacity-0 -translate-x-4 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                    </p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

      </div>
    </div>
  )
}
