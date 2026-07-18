"use client"

import * as React from "react"
import { Search, Edit, Check, X, Lock } from "lucide-react"
import { RolePermissions } from "../rbac-config"
import { Product } from "@/lib/data"

interface CatalogTabProps {
  categories: string[]
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  filteredProducts: Product[]
  editingProduct: number | null
  setEditingProduct: (id: number | null) => void
  editPrice: string
  setEditPrice: (price: string) => void
  handleStartEdit: (p: Product) => void
  handleSavePrice: (id: number) => void
  permissions: RolePermissions | null
}

export function CatalogTab({
  categories,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  filteredProducts,
  editingProduct,
  setEditingProduct,
  editPrice,
  setEditPrice,
  handleStartEdit,
  handleSavePrice,
  permissions
}: CatalogTabProps) {
  return (
    <div className="space-y-6 animate-fadeInFast">
      {/* Toolbar */}
      <div className="flex justify-between items-center gap-4 flex-wrap">
        <div className="flex gap-4">
          {/* Category select filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[10px] uppercase font-bold tracking-wider py-2.5 px-3.5 outline-none text-black dark:text-zinc-200 cursor-pointer rounded-xl"
          >
            {categories.map((c, i) => (
              <option key={i} value={c} className="bg-white dark:bg-zinc-900">{c}</option>
            ))}
          </select>
        </div>

        {/* Search */}
        <div className="relative w-full max-w-sm">
          <input 
            type="text" 
            placeholder="Search catalog by SKU or name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 py-2.5 pl-10 pr-4 text-xs text-black dark:text-zinc-200 outline-none focus:border-blue-500 transition rounded-xl"
          />
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 dark:text-zinc-500" />
        </div>
      </div>

      {/* Catalog Grid */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-x-auto shadow-[0_1px_3px_rgba(0,0,0,0.01)] rounded-2xl">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-800 text-black dark:text-zinc-400 font-bold uppercase tracking-widest text-[9px] bg-zinc-50/50 dark:bg-zinc-900/50">
              <th className="p-4">SKU Code</th>
              <th className="p-4">Product details</th>
              <th className="p-4">Category</th>
              <th className="p-4">Original price</th>
              <th className="p-4">Sale Price ($)</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/80">
            {filteredProducts.map((p) => (
              <tr key={p.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-850/30 transition-colors">
                <td className="p-4 font-mono text-black/70 dark:text-zinc-400 text-[10px]">SKU-{p.id}</td>
                <td className="p-4">
                  <div className="font-bold text-black dark:text-zinc-200 uppercase tracking-wide">{p.name}</div>
                </td>
                <td className="p-4">
                  <span className="bg-zinc-50 text-black/90 border border-zinc-200 dark:bg-zinc-955 dark:text-zinc-450 dark:border-zinc-800 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-md">
                    {p.category}
                  </span>
                </td>
                <td className="p-4 font-mono text-black/75 dark:text-zinc-400 font-semibold">${p.originalPrice?.toFixed(2) || p.price.toFixed(2)}</td>
                <td className="p-4 font-mono">
                  {editingProduct === p.id ? (
                    <input 
                      type="text"
                      value={editPrice}
                      onChange={(e) => setEditPrice(e.target.value)}
                      className="bg-zinc-50 dark:bg-zinc-955 border border-zinc-200 dark:border-zinc-800 text-xs w-20 px-2 py-1 outline-none text-black dark:text-zinc-100 focus:border-blue-500 rounded"
                    />
                  ) : (
                    <span className="font-bold text-black dark:text-zinc-100">${p.price.toFixed(2)}</span>
                  )}
                </td>
                <td className="p-4 text-right">
                  {editingProduct === p.id ? (
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => handleSavePrice(p.id)}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white p-1.5 rounded cursor-pointer"
                      >
                        <Check className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => setEditingProduct(null)}
                        className="bg-red-600 hover:bg-red-500 text-white p-1.5 rounded cursor-pointer"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    permissions && !permissions.editProject ? (
                      <span className="text-[10px] text-black/60 dark:text-zinc-450 font-bold uppercase tracking-wider inline-flex items-center gap-1.5 select-none pr-2">
                        <Lock className="h-3.5 w-3.5 text-black/50" />
                        Locked
                      </span>
                    ) : (
                      <button 
                        onClick={() => handleStartEdit(p)}
                        className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 font-bold uppercase tracking-wider text-[10px] inline-flex items-center gap-1 cursor-pointer bg-transparent border-none"
                      >
                        <Edit className="h-3 w-3" />
                        Edit Price
                      </button>
                    )
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
