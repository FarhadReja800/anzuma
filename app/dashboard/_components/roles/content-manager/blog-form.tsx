"use client"

import * as React from "react"
import { Blog } from "./types"

interface BlogFormProps {
  initialData?: Blog | null
  onSubmit: (data: Partial<Blog>) => void
  onCancel: () => void
}

import { Upload } from "lucide-react"

export function BlogForm({ initialData, onSubmit, onCancel }: BlogFormProps) {
  const [title, setTitle] = React.useState(initialData?.title || "")
  const [category, setCategory] = React.useState(initialData?.category || "Programming")
  const [excerpt, setExcerpt] = React.useState(initialData?.excerpt || "")
  const [content, setContent] = React.useState(initialData?.content || "")
  const [image, setImage] = React.useState(initialData?.image || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97")
  const [tagsStr, setTagsStr] = React.useState(initialData?.tags ? initialData.tags.join(", ") : "typescript, node")
  const [isPopular, setIsPopular] = React.useState(initialData?.isPopular ?? true)
  const [views, setViews] = React.useState(initialData?.views ?? 100)
  const [uploadingImage, setUploadingImage] = React.useState(false)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingImage(true)
    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData
      })
      const resData = await response.json()
      if (response.ok && resData.success) {
        setImage(resData.url)
      } else {
        alert(resData.error || "Upload failed.")
      }
    } catch (error) {
      console.error("Upload error:", error)
      alert("Error uploading file.")
    } finally {
      setUploadingImage(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const tags = tagsStr.split(",").map(t => t.trim()).filter(Boolean)
    onSubmit({
      title,
      category,
      excerpt: excerpt || content.substring(0, 120),
      content: content || excerpt || title,
      image,
      tags,
      isPopular,
      views: Number(views) || 0
    })
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/80 p-6 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.01)] space-y-4 animate-fadeInFast">
      <h3 className="text-xs font-black uppercase text-[#3eb075] tracking-widest border-b pb-2">
        {initialData ? "Edit News / Blog Post" : "Create News / Blog Post Entry"}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5 md:col-span-2">
          <span className="text-[10px] font-bold text-zinc-400 uppercase">Blog Title *</span>
          <input 
            type="text" 
            placeholder="e.g. Getting Started with TypeScript" 
            required 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            className="bg-zinc-50 dark:bg-zinc-955 border border-zinc-200/60 dark:border-zinc-800/80 rounded-xl px-4 py-2 text-xs text-zinc-800 dark:text-zinc-200 outline-none focus:border-[#3eb075]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-bold text-zinc-400 uppercase">Category</span>
          <input 
            type="text" 
            placeholder="e.g. Programming, Fashion..." 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            className="bg-zinc-50 dark:bg-zinc-955 border border-zinc-200/60 dark:border-zinc-800/80 rounded-xl px-4 py-2 text-xs text-zinc-800 dark:text-zinc-200 outline-none focus:border-[#3eb075]"
          />
        </div>

        <div className="flex flex-col gap-1.5 md:col-span-2">
          <span className="text-[10px] font-bold text-zinc-400 uppercase">Featured Image (URL or Upload)</span>
          <div className="flex flex-col sm:flex-row items-stretch gap-2">
            <input 
              type="text" 
              placeholder="https://example.com/image.jpg or select file to upload" 
              value={image} 
              onChange={(e) => setImage(e.target.value)}
              className="flex-1 bg-zinc-50 dark:bg-zinc-955 border border-zinc-200/60 dark:border-zinc-800/80 rounded-xl px-4 py-2 text-xs text-zinc-800 dark:text-zinc-200 outline-none focus:border-[#3eb075]"
            />
            <label className="flex items-center justify-center gap-1.5 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 rounded-xl text-xs font-bold cursor-pointer transition-colors border border-zinc-200/60 dark:border-zinc-800 shrink-0">
              <Upload className="w-3.5 h-3.5" />
              <span>{uploadingImage ? "Uploading..." : "Upload File"}</span>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload} 
                disabled={uploadingImage}
                className="hidden" 
              />
            </label>
          </div>
          {image && (
            <div className="mt-1.5 relative w-20 h-20 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-bold text-zinc-400 uppercase">Tags (comma separated)</span>
          <input 
            type="text" 
            placeholder="typescript, node, react" 
            value={tagsStr} 
            onChange={(e) => setTagsStr(e.target.value)}
            className="bg-zinc-50 dark:bg-zinc-955 border border-zinc-200/60 dark:border-zinc-800/80 rounded-xl px-4 py-2 text-xs text-zinc-800 dark:text-zinc-200 outline-none focus:border-[#3eb075]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-bold text-zinc-400 uppercase">Initial Views</span>
          <input 
            type="number" 
            placeholder="100" 
            value={views} 
            onChange={(e) => setViews(Number(e.target.value))}
            className="bg-zinc-50 dark:bg-zinc-955 border border-zinc-200/60 dark:border-zinc-800/80 rounded-xl px-4 py-2 text-xs text-zinc-800 dark:text-zinc-200 outline-none focus:border-[#3eb075]"
          />
        </div>

        <div className="flex flex-col gap-1.5 md:col-span-2">
          <span className="text-[10px] font-bold text-zinc-400 uppercase">Excerpt / Summary</span>
          <input 
            type="text" 
            placeholder="Short blog excerpt summary..." 
            value={excerpt} 
            onChange={(e) => setExcerpt(e.target.value)}
            className="bg-zinc-50 dark:bg-zinc-955 border border-zinc-200/60 dark:border-zinc-800/80 rounded-xl px-4 py-2 text-xs text-zinc-800 dark:text-zinc-200 outline-none focus:border-[#3eb075]"
          />
        </div>

        <div className="flex flex-col gap-1.5 md:col-span-2">
          <span className="text-[10px] font-bold text-zinc-400 uppercase">Full Content *</span>
          <textarea 
            placeholder="Full blog post content..." 
            required
            value={content} 
            onChange={(e) => setContent(e.target.value)}
            className="bg-zinc-50 dark:bg-zinc-955 border border-zinc-200/60 dark:border-zinc-800/80 rounded-xl px-4 py-2 text-xs text-zinc-800 dark:text-zinc-200 outline-none focus:border-[#3eb075] h-28"
          />
        </div>

        <div className="flex items-center gap-2 md:col-span-2 pt-1">
          <input 
            type="checkbox" 
            id="isPopularToggle"
            checked={isPopular} 
            onChange={(e) => setIsPopular(e.target.checked)}
            className="rounded border-zinc-300 text-[#3eb075] focus:ring-[#3eb075]"
          />
          <label htmlFor="isPopularToggle" className="text-xs font-bold text-zinc-700 dark:text-zinc-300 cursor-pointer">
            Mark as Popular News Post
          </label>
        </div>
      </div>

      <div className="flex gap-2 pt-2">
        <button 
          type="submit"
          className="px-6 py-2.5 bg-[#3eb075] hover:bg-emerald-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
        >
          {initialData ? "Save Changes" : "Create News Item"}
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
