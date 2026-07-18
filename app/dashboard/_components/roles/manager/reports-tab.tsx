"use client"

import * as React from "react"

interface StockProduct {
  id: number
  name: string
  category: string
  price: number
  originalPrice?: number
  stockQty: number
  supplier: string
}

interface ReportsTabProps {
  products: StockProduct[]
}

export function ReportsTab({ products = [] }: ReportsTabProps) {
  // Calculate total value of all stock
  const totalValue = products.reduce((acc, curr) => acc + (curr.price * curr.stockQty), 0)

  // Categories definitions and matching logic
  const categoriesConfig = [
    { name: "Outerwear", match: ["Outerwear"], color: "bg-indigo-500" },
    { name: "Pants", match: ["Pants"], color: "bg-blue-500" },
    { name: "Shirts", match: ["Shirts"], color: "bg-violet-500" },
    { name: "Accessories", match: ["Accessories"], color: "bg-purple-500" },
    { name: "Bags & Shoes", match: ["Bags", "Belts", "Shoes", "Wallets", "Watches"], color: "bg-pink-500" },
  ]

  const mappedCategories = categoriesConfig.map(catConfig => {
    const value = products
      .filter(p => catConfig.match.includes(p.category))
      .reduce((acc, p) => acc + (p.price * p.stockQty), 0)
    
    const percentage = totalValue > 0 ? (value / totalValue) * 100 : 0

    return {
      name: catConfig.name,
      value,
      percentage,
      color: catConfig.color
    }
  })

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeInFast">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 shadow-[0_1px_3px_rgba(0,0,0,0.01)] rounded-2xl">
        <h3 className="text-xs font-bold uppercase tracking-wider text-black dark:text-zinc-200 mb-6">
          Stock Value Contribution
        </h3>
        
        {/* Pie/Donut Chart Simulation using clean inline tables with colors */}
        <div className="space-y-4">
          {mappedCategories.map((cat, idx) => (
            <div 
              key={cat.name} 
              className={`flex items-center justify-between text-xs pb-2 ${
                idx < mappedCategories.length - 1 ? "border-b border-zinc-100 dark:border-zinc-800" : ""
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`h-3 w-3 rounded ${cat.color}`}></span>
                <span className="font-bold text-black/75 dark:text-zinc-300 uppercase">{cat.name}</span>
              </div>
              <span className="font-mono text-black dark:text-zinc-200 font-semibold">
                ${cat.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ({cat.percentage.toFixed(0)}%)
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 flex flex-col justify-between shadow-[0_1px_3px_rgba(0,0,0,0.01)] rounded-2xl">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-black dark:text-zinc-200 mb-4">
            Logistics Performance Index
          </h3>
          <p className="text-[11px] text-black/70 dark:text-zinc-450 leading-relaxed mb-6">
            Logistics metrics measured based on shipper turnaround times and warehouse packing operations.
          </p>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-black/60 dark:text-zinc-400 mb-1.5">
                <span>Order Fulfillment Speed</span>
                <span>96.4% (Optimal)</span>
              </div>
              <div className="h-1.5 bg-zinc-100 dark:bg-zinc-950 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: "96.4%" }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-black/60 dark:text-zinc-400 mb-1.5">
                <span>Vendor Supply Accuracy</span>
                <span>98.8% (Excellent)</span>
              </div>
              <div className="h-1.5 bg-zinc-100 dark:bg-zinc-955 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: "98.8%" }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-black/60 dark:text-zinc-400 mb-1.5">
                <span>Return Rate Index</span>
                <span>1.8% (Very Low)</span>
              </div>
              <div className="h-1.5 bg-zinc-100 dark:bg-zinc-955 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: "1.8%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
