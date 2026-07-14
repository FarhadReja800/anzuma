"use client"

import * as React from "react"
import { Blog } from "./types"

interface BlogFormProps {
  initialData?: Blog | null
  onSubmit: (data: Partial<Blog>) => void
  onCancel: () => void
}

export function BlogForm({ initialData, onSubmit, onCancel }: BlogFormProps) {
  const [title, setTitle] = React.useState(initialData?.title || "")
  const [category, setCategory] = React.useState(initialData?.category || "")
  const [excerpt, setExcerpt] = React.useState(initialData?.excerpt || "")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      title,
      category,
      excerpt
    })
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/80 p-6 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.01)] space-y-4 animate-fadeInFast">
      <h3 className="text-xs font-black uppercase text-[#3eb075] tracking-widest border-b pb-2">
        {initialData ? "Edit Blog Post" : "Create Blog Post Entry"}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-bold text-zinc-400 uppercase">Blog Title</span>
          <input 
            type="text" placeholder="Blog Title..." required value={title} onChange={(e) => setTitle(e.target.value)}
            className="bg-zinc-50 dark:bg-zinc-955 border border-zinc-200/60 dark:border-zinc-800/80 rounded-xl px-4 py-2 text-xs text-zinc-800 dark:text-zinc-200 outline-none focus:border-[#3eb075]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-bold text-zinc-400 uppercase">Category</span>
          <input 
            type="text" placeholder="Blog Category (e.g. Collection)..." value={category} onChange={(e) => setCategory(e.target.value)}
            className="bg-zinc-50 dark:bg-zinc-955 border border-zinc-200/60 dark:border-zinc-800/80 rounded-xl px-4 py-2 text-xs text-zinc-800 dark:text-zinc-200 outline-none focus:border-[#3eb075]"
          />
        </div>

        <div className="flex flex-col gap-1.5 md:col-span-2">
          <span className="text-[10px] font-bold text-zinc-400 uppercase">Excerpt summary content</span>
          <textarea 
            placeholder="Blog excerpt content..." value={excerpt} onChange={(e) => setExcerpt(e.target.value)}
            className="bg-zinc-50 dark:bg-zinc-955 border border-zinc-200/60 dark:border-zinc-800/80 rounded-xl px-4 py-2 text-xs text-zinc-800 dark:text-zinc-200 outline-none focus:border-[#3eb075] h-20"
          />
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
