"use client"

import * as React from "react"
import { TCategory } from "./types"

interface CategoryFormProps {
  categories: TCategory[]
  initialData?: TCategory | null
  onSubmit: (data: Partial<TCategory>) => void
  onCancel: () => void
}

export function CategoryForm({ categories, initialData, onSubmit, onCancel }: CategoryFormProps) {
  const [name, setName] = React.useState(initialData?.name || "")
  const [slug, setSlug] = React.useState(initialData?.slug || "")
  const [parent, setParent] = React.useState(initialData?.parent || "")
  const [icon, setIcon] = React.useState(initialData?.icon || "")
  const [order, setOrder] = React.useState(initialData?.order?.toString() || "0")
  const [isActive, setIsActive] = React.useState(initialData?.isActive ?? true)

  const handleNameChange = (val: string) => {
    setName(val)
    if (!initialData) {
      const generated = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "")
      setSlug(generated)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      name,
      slug,
      parent: parent || null,
      icon: icon || "Folder",
      order: parseInt(order) || 0,
      isActive
    })
  }

  // Filter out the category itself if editing to prevent self-parent cycles
  const parentChoices = categories.filter(c => !initialData || c.id !== initialData.id)

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/80 p-6 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.01)] space-y-4 animate-fadeInFast">
      <h3 className="text-xs font-black uppercase text-[#3eb075] tracking-widest border-b pb-2">
        {initialData ? "Edit Category Details" : "Create TCategory Entry"}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-bold text-zinc-400 uppercase">Category Name</span>
          <input 
            type="text" placeholder="e.g. Shirts..." required value={name} onChange={(e) => handleNameChange(e.target.value)}
            className="bg-zinc-50 dark:bg-zinc-955 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2 text-xs text-zinc-800 dark:text-zinc-200 outline-none focus:border-[#3eb075]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-bold text-zinc-400 uppercase">Slug path</span>
          <input 
            type="text" placeholder="e.g. shirts..." required value={slug} onChange={(e) => setSlug(e.target.value)}
            className="bg-zinc-50 dark:bg-zinc-955 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2 text-xs text-zinc-800 dark:text-zinc-200 outline-none focus:border-[#3eb075]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-bold text-zinc-400 uppercase">Parent Category</span>
          <select
            value={parent}
            onChange={(e) => setParent(e.target.value)}
            className="bg-zinc-50 dark:bg-zinc-955 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2 text-xs text-zinc-800 dark:text-zinc-200 outline-none focus:border-[#3eb075] cursor-pointer"
          >
            <option value="">None (Top Level Category)</option>
            {parentChoices.map(c => (
              <option key={c.id} value={c.id.toString()}>{c.name}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-bold text-zinc-400 uppercase">Icon Class / Slug</span>
          <input 
            type="text" placeholder="e.g. shirt, package, tag..." value={icon} onChange={(e) => setIcon(e.target.value)}
            className="bg-zinc-50 dark:bg-zinc-955 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2 text-xs text-zinc-800 dark:text-zinc-200 outline-none focus:border-[#3eb075]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-bold text-zinc-400 uppercase">Sort Order</span>
          <input 
            type="number" placeholder="0" value={order} onChange={(e) => setOrder(e.target.value)}
            className="bg-zinc-50 dark:bg-zinc-955 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2 text-xs text-zinc-800 dark:text-zinc-200 outline-none focus:border-[#3eb075]"
          />
        </div>

        <div className="flex items-center gap-2.5 pt-6">
          <input 
            type="checkbox" id="catActiveForm" checked={isActive} onChange={(e) => setIsActive(e.target.checked)}
            className="h-4.5 w-4.5 rounded-md border-zinc-300 dark:border-zinc-800 text-[#3eb075] focus:ring-[#3eb075] cursor-pointer"
          />
          <label htmlFor="catActiveForm" className="text-xs font-bold text-zinc-700 dark:text-zinc-350 cursor-pointer select-none uppercase">
            Is Category Active
          </label>
        </div>
      </div>

      <div className="flex gap-2">
        <button 
          type="submit"
          className="px-6 py-2.5 bg-[#3eb075] hover:bg-emerald-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
        >
          {initialData ? "Save Changes" : "Create Item"}
        </button>
        <button 
          type="button"
          onClick={onCancel}
          className="px-6 py-2.5 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
