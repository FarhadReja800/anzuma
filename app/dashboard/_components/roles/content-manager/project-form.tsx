"use client"

import * as React from "react"
import { Project } from "./types"

interface ProjectFormProps {
  initialData?: Project | null
  onSubmit: (data: Partial<Project>) => void
  onCancel: () => void
}

export function ProjectForm({ initialData, onSubmit, onCancel }: ProjectFormProps) {
  const [name, setName] = React.useState(initialData?.name || "")
  const [slug, setSlug] = React.useState(initialData?.slug || "")
  const [sku, setSku] = React.useState(initialData?.sku || "")
  const [price, setPrice] = React.useState(initialData?.price?.toString() || "")
  const [salePrice, setSalePrice] = React.useState(initialData?.salePrice?.toString() || "")
  const [onSale, setOnSale] = React.useState(initialData?.onSale ?? true)
  const [description, setDescription] = React.useState(initialData?.description || "")
  const [shortDescription, setShortDescription] = React.useState(initialData?.shortDescription || "")
  const [images, setImages] = React.useState(initialData?.images?.join(", ") || "")
  const [categories, setCategories] = React.useState(initialData?.categories?.join(", ") || "")
  const [tags, setTags] = React.useState(initialData?.tags?.join(", ") || "")
  const [sizes, setSizes] = React.useState(initialData?.sizes?.join(", ") || "")
  const [stockQuantity, setStockQuantity] = React.useState(initialData?.stockQuantity?.toString() || "50")
  const [inStock, setInStock] = React.useState(initialData?.inStock ?? true)
  const [ratings, setRatings] = React.useState(initialData?.ratings?.toString() || "4.8")
  const [reviewsCount, setReviewsCount] = React.useState(initialData?.reviewsCount?.toString() || "2")
  const [weight, setWeight] = React.useState(initialData?.additionalInformation?.weight || "250g")
  const [dimensions, setDimensions] = React.useState(initialData?.additionalInformation?.dimensions || "30 x 25 x 3 cm")
  const [isActive, setIsActive] = React.useState(initialData?.isActive ?? true)

  // Colors state color formatting
  const getColorsInitial = () => {
    if (!initialData?.colors) return ""
    return initialData.colors.map(c => `${c.name}:${c.value}`).join(", ")
  }
  const [colors, setColors] = React.useState(getColorsInitial())

  // Auto-generate slug from name during addition
  const handleNameChange = (newName: string) => {
    setName(newName)
    if (!initialData) {
      const generated = newName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "")
      setSlug(generated)
    }
  }

  const parseColorsString = (colStr: string): { name: string; value: string }[] => {
    return colStr.split(",").map(part => {
      const [n, v] = part.split(":")
      if (n && v) {
        return { name: n.trim(), value: v.trim() }
      }
      return null
    }).filter(c => c !== null) as { name: string; value: string }[]
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      name,
      slug,
      sku,
      price: parseFloat(price) || 0,
      salePrice: parseFloat(salePrice) || 0,
      onSale,
      description,
      shortDescription,
      images: images.split(",").map(s => s.trim()).filter(Boolean),
      categories: categories.split(",").map(s => s.trim()).filter(Boolean),
      tags: tags.split(",").map(s => s.trim()).filter(Boolean),
      colors: parseColorsString(colors),
      sizes: sizes.split(",").map(s => s.trim()).filter(Boolean),
      stockQuantity: parseInt(stockQuantity) || 0,
      inStock,
      ratings: parseFloat(ratings) || 5.0,
      reviewsCount: parseInt(reviewsCount) || 0,
      additionalInformation: {
        weight,
        dimensions
      },
      isActive
    })
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/80 p-6 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.01)] space-y-4 animate-fadeInFast">
      <h3 className="text-xs font-black uppercase text-[#3eb075] tracking-widest border-b pb-2">
        {initialData ? "Edit Project Details" : "Create Rich Project Entry"}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-bold text-zinc-400 uppercase">Product Name</span>
          <input 
            type="text" placeholder="e.g. Premium Cotton T-Shirt..." required value={name} onChange={(e) => handleNameChange(e.target.value)}
            className="bg-zinc-50 dark:bg-zinc-955 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2 text-xs text-zinc-800 dark:text-zinc-200 outline-none focus:border-[#3eb075]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-bold text-zinc-400 uppercase">URL Slug path</span>
          <input 
            type="text" placeholder="e.g. premium-cotton-t-shirt..." required value={slug} onChange={(e) => setSlug(e.target.value)}
            className="bg-zinc-50 dark:bg-zinc-955 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2 text-xs text-zinc-800 dark:text-zinc-200 outline-none focus:border-[#3eb075]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-bold text-zinc-400 uppercase">SKU Reference code</span>
          <input 
            type="text" placeholder="e.g. TSHIRT-001..." required value={sku} onChange={(e) => setSku(e.target.value)}
            className="bg-zinc-50 dark:bg-zinc-955 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2 text-xs text-zinc-800 dark:text-zinc-200 outline-none focus:border-[#3eb075]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-bold text-zinc-400 uppercase">Original Price ($)</span>
          <input 
            type="number" placeholder="e.g. 1200..." required value={price} onChange={(e) => setPrice(e.target.value)}
            className="bg-zinc-50 dark:bg-zinc-955 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2 text-xs text-zinc-800 dark:text-zinc-200 outline-none focus:border-[#3eb075]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-bold text-zinc-400 uppercase">Sale Price ($)</span>
          <input 
            type="number" placeholder="e.g. 999..." value={salePrice} onChange={(e) => setSalePrice(e.target.value)}
            className="bg-zinc-50 dark:bg-zinc-955 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2 text-xs text-zinc-800 dark:text-zinc-200 outline-none focus:border-[#3eb075]"
          />
        </div>

        <div className="flex items-center gap-2.5 pt-6">
          <input 
            type="checkbox" id="projOnSaleForm" checked={onSale} onChange={(e) => setOnSale(e.target.checked)}
            className="h-4.5 w-4.5 rounded-md border-zinc-300 dark:border-zinc-800 text-[#3eb075] focus:ring-[#3eb075] cursor-pointer"
          />
          <label htmlFor="projOnSaleForm" className="text-xs font-bold text-zinc-700 dark:text-zinc-350 cursor-pointer select-none uppercase">
            Is Product On Sale
          </label>
        </div>

        <div className="flex flex-col gap-1.5 md:col-span-2">
          <span className="text-[10px] font-bold text-zinc-400 uppercase">Short Description</span>
          <input 
            type="text" placeholder="Short features..." value={shortDescription} onChange={(e) => setShortDescription(e.target.value)}
            className="bg-zinc-50 dark:bg-zinc-955 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2 text-xs text-zinc-800 dark:text-zinc-200 outline-none focus:border-[#3eb075]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-bold text-zinc-400 uppercase">Stock Quantity</span>
          <input 
            type="number" placeholder="50" value={stockQuantity} onChange={(e) => setStockQuantity(e.target.value)}
            className="bg-zinc-50 dark:bg-zinc-955 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2 text-xs text-zinc-800 dark:text-zinc-200 outline-none focus:border-[#3eb075]"
          />
        </div>

        <div className="flex flex-col gap-1.5 md:col-span-3">
          <span className="text-[10px] font-bold text-zinc-400 uppercase">Images list (comma separated URLs)</span>
          <textarea 
            placeholder="https://example.com/front.jpg, https://example.com/back.jpg..." value={images} onChange={(e) => setImages(e.target.value)}
            className="bg-zinc-50 dark:bg-zinc-955 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2 text-xs text-zinc-800 dark:text-zinc-200 outline-none focus:border-[#3eb075] h-14"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-bold text-zinc-400 uppercase">Categories (comma separated IDs)</span>
          <input 
            type="text" placeholder="68748e89d9f9b3d9e4b1a001..." value={categories} onChange={(e) => setCategories(e.target.value)}
            className="bg-zinc-50 dark:bg-zinc-955 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2 text-xs text-zinc-800 dark:text-zinc-200 outline-none focus:border-[#3eb075]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-bold text-zinc-400 uppercase">Tags (comma separated)</span>
          <input 
            type="text" placeholder="Cotton, Fashion, Men..." value={tags} onChange={(e) => setTags(e.target.value)}
            className="bg-zinc-50 dark:bg-zinc-955 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2 text-xs text-zinc-800 dark:text-zinc-200 outline-none focus:border-[#3eb075]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-bold text-zinc-400 uppercase">Colors list (Name:Hex, comma separated)</span>
          <input 
            type="text" placeholder="Black:#000000, White:#ffffff..." value={colors} onChange={(e) => setColors(e.target.value)}
            className="bg-zinc-50 dark:bg-zinc-955 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2 text-xs text-zinc-800 dark:text-zinc-200 outline-none focus:border-[#3eb075]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-bold text-zinc-400 uppercase">Sizes list (comma separated)</span>
          <input 
            type="text" placeholder="S, M, L, XL..." value={sizes} onChange={(e) => setSizes(e.target.value)}
            className="bg-zinc-50 dark:bg-zinc-955 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2 text-xs text-zinc-800 dark:text-zinc-200 outline-none focus:border-[#3eb075]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-bold text-zinc-400 uppercase">Product Weight</span>
          <input 
            type="text" placeholder="250g" value={weight} onChange={(e) => setWeight(e.target.value)}
            className="bg-zinc-50 dark:bg-zinc-955 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2 text-xs text-zinc-800 dark:text-zinc-200 outline-none focus:border-[#3eb075]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-bold text-zinc-400 uppercase">Dimensions (L x W x H)</span>
          <input 
            type="text" placeholder="30 x 25 x 3 cm" value={dimensions} onChange={(e) => setDimensions(e.target.value)}
            className="bg-zinc-50 dark:bg-zinc-955 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2 text-xs text-zinc-800 dark:text-zinc-200 outline-none focus:border-[#3eb075]"
          />
        </div>

        <div className="flex items-center gap-2.5 pt-6">
          <input 
            type="checkbox" id="projInStockForm" checked={inStock} onChange={(e) => setInStock(e.target.checked)}
            className="h-4.5 w-4.5 rounded-md border-zinc-300 dark:border-zinc-800 text-[#3eb075] focus:ring-[#3eb075] cursor-pointer"
          />
          <label htmlFor="projInStockForm" className="text-xs font-bold text-zinc-700 dark:text-zinc-350 cursor-pointer select-none uppercase">
            Is In Stock
          </label>
        </div>

        <div className="flex items-center gap-2.5 pt-6">
          <input 
            type="checkbox" id="projIsActiveForm" checked={isActive} onChange={(e) => setIsActive(e.target.checked)}
            className="h-4.5 w-4.5 rounded-md border-zinc-300 dark:border-zinc-800 text-[#3eb075] focus:ring-[#3eb075] cursor-pointer"
          />
          <label htmlFor="projIsActiveForm" className="text-xs font-bold text-zinc-700 dark:text-zinc-350 cursor-pointer select-none uppercase">
            Is Product Active
          </label>
        </div>

        <div className="flex flex-col gap-1.5 md:col-span-3">
          <span className="text-[10px] font-bold text-zinc-400 uppercase">Full Description Details</span>
          <textarea 
            placeholder="Full Description..." required value={description} onChange={(e) => setDescription(e.target.value)}
            className="bg-zinc-50 dark:bg-zinc-955 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-800 dark:text-zinc-200 outline-none focus:border-[#3eb075] h-20"
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
