"use client"

import * as React from "react"
import NextImage from "next/image"
import { Edit2, Trash2, Lock } from "lucide-react"
import { Project } from "./types"

interface ProjectListProps {
  projects: Project[]
  canEdit: boolean
  canDelete: boolean
  onEdit: (p: Project) => void
  onDelete: (id: string | number) => void
}

export function ProjectList({ projects, canEdit, canDelete, onEdit, onDelete }: ProjectListProps) {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/80 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.01)] overflow-hidden">
      <table className="w-full text-left text-xs border-collapse">
        <thead>
          <tr className="border-b border-zinc-100 dark:border-zinc-850 text-zinc-400 font-bold uppercase tracking-wider text-[10px] bg-zinc-50/50 dark:bg-zinc-900/50">
            <th className="p-4">Product Details</th>
            <th className="p-4">SKU</th>
            <th className="p-4">Price / Sale</th>
            <th className="p-4">Stock</th>
            <th className="p-4">Tags</th>
            <th className="p-4">Status</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-850 font-medium">
          {projects.map(p => (
            <tr key={p.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-850/30 transition-colors">
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-zinc-100 dark:bg-zinc-800 rounded-lg overflow-hidden shrink-0 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center">
                    {p.images && p.images[0] ? (
                      <NextImage 
                        src={p.images[0]} 
                        alt={p.name} 
                        width={40}
                        height={40}
                        className="h-full w-full object-cover" 
                        unoptimized
                      />
                    ) : (
                      <span className="text-[10px] text-zinc-400 font-bold">No Img</span>
                    )}
                  </div>
                  <div>
                    <div className="font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wide">{p.name}</div>
                    <div className="text-[10px] text-zinc-450 truncate max-w-xs lowercase mt-0.5">{p.slug}</div>
                  </div>
                </div>
              </td>
              <td className="p-4 font-mono text-[11px] text-zinc-550">{p.sku}</td>
              <td className="p-4 font-mono text-[11px]">
                {p.onSale ? (
                  <div className="flex flex-col">
                    <span className="text-zinc-400 line-through">${p.price}</span>
                    <span className="text-[#3eb075] font-bold">${p.salePrice}</span>
                  </div>
                ) : (
                  <span className="text-zinc-805 dark:text-zinc-205 font-bold">${p.price}</span>
                )}
              </td>
              <td className="p-4 font-mono text-[11px] text-zinc-650 dark:text-zinc-355">
                <div className="flex flex-col">
                  <span className="font-bold">{p.stockQuantity} units</span>
                  <span className={`text-[9px] font-black uppercase ${p.inStock ? "text-[#3eb075]" : "text-red-500"}`}>
                    {p.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
              </td>
              <td className="p-4 max-w-xs">
                <div className="flex flex-wrap gap-1">
                  {p.tags.map((t, i) => (
                    <span key={i} className="bg-zinc-50 dark:bg-zinc-850 text-zinc-450 border border-zinc-200 dark:border-zinc-800 px-1.5 py-0.2 text-[8px] font-black rounded-sm uppercase tracking-wider">
                      {t}
                    </span>
                  ))}
                </div>
              </td>
              <td className="p-4">
                <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${
                  p.isActive 
                    ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20" 
                    : "bg-zinc-100 text-zinc-400 dark:bg-zinc-800"
                }`}>
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  {p.isActive ? "Active" : "Inactive"}
                </span>
              </td>
              <td className="p-4 text-right">
                <div className="flex justify-end items-center gap-2">
                  {canEdit ? (
                    <button 
                      onClick={() => onEdit(p)}
                      className="p-2 text-zinc-400 hover:text-[#3eb075] hover:bg-emerald-50 dark:hover:bg-zinc-800 rounded-lg cursor-pointer transition-colors"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                  ) : (
                    <span className="text-[10px] text-zinc-350 dark:text-zinc-650 cursor-not-allowed select-none font-bold uppercase"><Lock className="h-3 w-3 inline" /></span>
                  )}

                  {canDelete ? (
                    <button 
                      onClick={() => onDelete(p.id)}
                      className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-zinc-800 rounded-lg cursor-pointer transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  ) : (
                    <span className="text-[10px] text-zinc-355 dark:text-zinc-650 cursor-not-allowed select-none font-bold uppercase"><Lock className="h-3 w-3 inline" /></span>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
