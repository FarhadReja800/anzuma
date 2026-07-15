"use client"

import * as React from "react"
import { Plus, Trash2, Eye, EyeOff, Image as ImageIcon, Sparkles, AlertCircle, Edit, X, Loader2 } from "lucide-react"
import { getBanners, createBanner, updateBanner, deleteBanner } from "@/store/api/banner"
import { Banner } from "@/data/banner"

interface BannerTabProps {
  triggerToast: (msg: string) => void
}

export function HomeBannerTab({ triggerToast }: BannerTabProps) {
  const [banners, setBanners] = React.useState<Banner[]>([])
  const [loading, setLoading] = React.useState(true)
  const [isAdding, setIsAdding] = React.useState(false)
  const [editingBannerId, setEditingBannerId] = React.useState<string | null>(null)
  const [uploadMethod, setUploadMethod] = React.useState<"upload" | "url">("upload")

  // Image loading states
  const [loadedImages, setLoadedImages] = React.useState<Record<string, boolean>>({})
  const [previewLoading, setPreviewLoading] = React.useState(false)

  // Form states
  const [title, setTitle] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [imageUrl, setImageUrl] = React.useState("")
  const [isActive, setIsActive] = React.useState(true)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const updateImageUrl = (url: string) => {
    setImageUrl(url)
    if (url) {
      setPreviewLoading(true)
    } else {
      setPreviewLoading(false)
    }
  }

  const loadBannersData = React.useCallback(async () => {
    try {
      const apiBanners = await getBanners()
      setBanners(apiBanners || [])
    } catch (error) {
      console.error("Failed to fetch banners from API:", error)
      triggerToast("Failed to fetch banners from server.")
      setBanners([])
    } finally {
      setLoading(false)
    }
  }, [triggerToast])

  React.useEffect(() => {
    const timer = setTimeout(() => {
      loadBannersData()
    }, 0)
    return () => clearTimeout(timer)
  }, [loadBannersData])

  const handleCancelForm = () => {
    setIsAdding(false)
    setEditingBannerId(null)
    setTitle("")
    setDescription("")
    setImageUrl("")
    setIsActive(true)
    setPreviewLoading(false)
  }

  const handleStartEdit = (banner: Banner) => {
    const bannerId = banner.id || banner._id || ""
    setEditingBannerId(bannerId)
    setTitle(banner.title || "")
    setDescription(banner.description || "")
    setImageUrl(banner.imageUrl || "")
    setIsActive(banner.isActive ?? true)
    
    // Auto-detect upload method based on image string
    if (banner.imageUrl && banner.imageUrl.startsWith("data:")) {
      setUploadMethod("upload")
    } else {
      setUploadMethod("url")
    }
    
    if (banner.imageUrl) {
      setPreviewLoading(true)
    }
    
    setIsAdding(true)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      triggerToast("File is too large. Max size is 5MB.")
      return
    }

    setPreviewLoading(true)
    const reader = new FileReader()
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setImageUrl(reader.result)
        triggerToast("Image loaded successfully")
      } else {
        setPreviewLoading(false)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      triggerToast("Please drop an image file")
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      triggerToast("File is too large. Max size is 5MB.")
      return
    }

    setPreviewLoading(true)
    const reader = new FileReader()
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setImageUrl(reader.result)
        triggerToast("Image uploaded successfully")
      } else {
        setPreviewLoading(false)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !imageUrl.trim()) {
      triggerToast("Title and Image URL are required")
      return
    }

    setIsSubmitting(true)
    const payload = {
      title: title.trim(),
      description: description.trim(),
      imageUrl: imageUrl.trim(),
      isActive
    }

    if (editingBannerId) {
      // Edit existing banner on backend
      try {
        const updated = await updateBanner(editingBannerId, payload)
        const updatedBanner = {
          ...payload,
          id: editingBannerId,
          _id: editingBannerId,
          ...(typeof updated === "object" ? updated : {})
        }
        setBanners(prev => prev.map(b => (b.id === editingBannerId || b._id === editingBannerId) ? updatedBanner : b))
        triggerToast("Banner updated successfully on server!")
        handleCancelForm()
      } catch (error: any) {
        console.error("Could not update banner on server:", error)
        triggerToast(error.message || "Failed to update banner on server.")
      } finally {
        setIsSubmitting(false)
      }
    } else {
      // Create new banner on backend
      try {
        const created = await createBanner(payload)
        setBanners(prev => [created, ...prev])
        triggerToast("Banner created successfully on server!")
        handleCancelForm()
      } catch (error: any) {
        console.error("Could not create banner on server:", error)
        triggerToast(error.message || "Failed to create banner on server.")
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const handleToggleStatus = async (id: string | undefined) => {
    if (!id) return
    const banner = banners.find(b => (b.id || b._id) === id)
    if (!banner) return

    const newStatus = !banner.isActive
    try {
      await updateBanner(id, { isActive: newStatus })
      setBanners(prev => prev.map(b => (b.id === id || b._id === id) ? { ...b, isActive: newStatus } : b))
      triggerToast(`Banner status toggled to ${newStatus ? "Active" : "Inactive"} on server!`)
    } catch (error: any) {
      console.error("Could not update banner status on backend:", error)
      triggerToast(error.message || "Failed to update banner status on server.")
    }
  }

  const handleDelete = async (id: string | undefined) => {
    if (!id) return
    try {
      await deleteBanner(id)
      setBanners(prev => prev.filter(b => b.id !== id && b._id !== id))
      triggerToast("Banner removed from server successfully!")
    } catch (error: any) {
      console.error("Could not delete banner on backend:", error)
      triggerToast(error.message || "Failed to delete banner from server.")
    }
  }

  return (
    <div className="space-y-6 animate-fadeInFast">
      {/* Tab Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-zinc-150 dark:border-zinc-800/80 pb-5">
        <div>
          <h2 className="text-base font-extrabold uppercase tracking-wider text-zinc-850 dark:text-zinc-100">
            Homepage Hero Banners
          </h2>
          <p className="text-[11px] text-zinc-400 dark:text-zinc-550 mt-1.5">
            Configure full-width hero campaign sliders featured on the storefront homepage.
          </p>
        </div>

        <button
          onClick={() => {
            if (isAdding) {
              handleCancelForm()
            } else {
              setIsAdding(true)
            }
          }}
          className={`flex items-center justify-center gap-2 px-4 py-2 text-[10px] font-extrabold uppercase tracking-wider transition-all duration-200 cursor-pointer rounded-xl ${
            isAdding
              ? "bg-zinc-100 text-zinc-655 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
              : "bg-[#047857] text-white hover:bg-emerald-700 shadow-md shadow-emerald-500/10"
          }`}
        >
          {isAdding ? (
            <>
              <X className="h-3.5 w-3.5" />
              Cancel Form
            </>
          ) : (
            <>
              <Plus className="h-3.5 w-3.5" />
              Add Campaign Banner
            </>
          )}
        </button>
      </div>

      {/* Add New Banner Form Panel */}
      {isAdding && (
        <form 
          onSubmit={handleCreate}
          className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-3xl p-6 shadow-sm space-y-4 animate-slideDown max-w-2xl"
        >
          <div className="flex items-center gap-2 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest border-b border-zinc-50 dark:border-zinc-855 pb-3">
            <Sparkles className="h-4 w-4" />
            <span>{editingBannerId ? "Edit Campaign Banner" : "Create Campaign Banner"}</span>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                Banner Title
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Winter Campaign Essentials"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-955 border border-zinc-200 dark:border-zinc-800/80 rounded-xl px-3.5 py-2.5 text-xs text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 outline-none focus:ring-1 focus:ring-[#047857]"
              />
            </div>

            {/* Image section with toggle upload/url */}
            <div className="space-y-2">
              <div className="flex items-center justify-between border-b border-zinc-50 dark:border-zinc-855 pb-1.5">
                <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                  Banner Image Source
                </label>
                <div className="flex gap-1 p-0.5 bg-zinc-105 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-[9px] font-extrabold uppercase select-none">
                  <button
                    type="button"
                    onClick={() => setUploadMethod("upload")}
                    className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                      uploadMethod === "upload"
                        ? "bg-white dark:bg-zinc-900 text-[#047857] shadow-xs"
                        : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                    }`}
                  >
                    Upload File
                  </button>
                  <button
                    type="button"
                    onClick={() => setUploadMethod("url")}
                    className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                      uploadMethod === "url"
                        ? "bg-white dark:bg-zinc-900 text-[#047857] shadow-xs"
                        : "text-zinc-550 hover:text-zinc-800 dark:hover:text-zinc-200"
                    }`}
                  >
                    Image URL
                  </button>
                </div>
              </div>

              {uploadMethod === "upload" ? (
                <div
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById("banner-image-input")?.click()}
                  className="border-2 border-dashed border-zinc-200 dark:border-zinc-805 hover:border-[#047857] dark:hover:border-emerald-500 rounded-2xl p-6 text-center cursor-pointer transition-colors bg-zinc-50/50 dark:bg-zinc-955/50 flex flex-col items-center justify-center gap-2 min-h-36 relative"
                >
                  <input
                    type="file"
                    id="banner-image-input"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  
                  {imageUrl && imageUrl.startsWith("data:") ? (
                    <div className="flex flex-col items-center gap-2 relative">
                      {previewLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-zinc-900/80 z-10 rounded-lg">
                          <Loader2 className="h-5 w-5 text-[#047857] animate-spin" />
                        </div>
                      )}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={imageUrl} 
                        alt="Uploaded Preview" 
                        onLoad={() => setPreviewLoading(false)}
                        onError={() => setPreviewLoading(false)}
                        className={`h-20 w-auto object-cover rounded-lg border border-zinc-200 dark:border-zinc-800 transition-opacity duration-200 ${
                          previewLoading ? "opacity-30" : "opacity-100"
                        }`}
                      />
                      <span className="text-[9px] text-zinc-455 font-bold uppercase tracking-wider">Click or drag to replace image</span>
                    </div>
                  ) : (
                    <>
                      <ImageIcon className="h-6 w-6 text-zinc-400 stroke-[1.5]" />
                      <div className="space-y-1">
                        <p className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300">
                          Drag and drop your image here, or click to browse
                        </p>
                        <p className="text-[9px] text-zinc-400 dark:text-zinc-500">
                          Supports PNG, JPG, JPEG, WEBP (Max 5MB)
                        </p>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  <input
                    type="url"
                    required
                    placeholder="e.g. https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920"
                    value={imageUrl}
                    onChange={(e) => updateImageUrl(e.target.value)}
                    className="w-full bg-zinc-50 dark:bg-zinc-955 border border-zinc-200 dark:border-zinc-800/80 rounded-xl px-3.5 py-2.5 text-xs text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 outline-none focus:ring-1 focus:ring-[#047857]"
                  />
                  {imageUrl && !imageUrl.startsWith("data:") && (
                    <div className="flex flex-col items-center justify-center p-4 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl bg-zinc-50/50 dark:bg-zinc-955/50 min-h-24 relative">
                      {previewLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-zinc-900/80 z-10 rounded-2xl">
                          <Loader2 className="h-5 w-5 text-[#047857] animate-spin" />
                        </div>
                      )}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={imageUrl} 
                        alt="URL Preview" 
                        onLoad={() => setPreviewLoading(false)}
                        onError={() => setPreviewLoading(false)}
                        className={`h-20 w-auto object-cover rounded-lg border border-zinc-200 dark:border-zinc-800 transition-opacity duration-200 ${
                          previewLoading ? "opacity-30" : "opacity-100"
                        }`}
                      />
                      <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider mt-2">Image Preview</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
              Description
            </label>
            <textarea
              placeholder="Provide a subtle subtitle or caption description for the campaign banner"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="w-full bg-zinc-50 dark:bg-zinc-955 border border-zinc-200 dark:border-zinc-800/80 rounded-xl px-3.5 py-2.5 text-xs text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 outline-none focus:ring-1 focus:ring-[#047857] resize-none"
            />
          </div>

          <div className="flex items-center justify-between border-t border-zinc-50 dark:border-zinc-850 pt-4">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="banner-status-checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="h-4.5 w-4.5 rounded-md border-zinc-300 dark:border-zinc-700 accent-[#047857] cursor-pointer"
              />
              <label htmlFor="banner-status-checkbox" className="text-[11px] font-bold text-zinc-650 dark:text-zinc-400 cursor-pointer select-none">
                Publish immediately (Set Active)
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#047857] hover:bg-emerald-700 text-white font-extrabold text-[10px] uppercase tracking-wider px-5 py-2.5 rounded-xl cursor-pointer shadow-sm transition-all disabled:opacity-50"
            >
              {isSubmitting ? (editingBannerId ? "Updating..." : "Creating...") : (editingBannerId ? "Update Banner" : "Save Banner")}
            </button>
          </div>
        </form>
      )}

      {/* Loading state */}
      {loading ? (
        <div className="flex flex-col gap-3 justify-center items-center py-20 animate-fadeInFast">
          <Loader2 className="h-7 w-7 text-[#047857] animate-spin" />
          <div className="text-[10px] font-extrabold uppercase tracking-widest text-zinc-500 animate-pulse">
            Syncing campaign creatives...
          </div>
        </div>
      ) : banners.length === 0 ? (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-3xl p-8 text-center">
          <AlertCircle className="h-8 w-8 text-zinc-400 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-zinc-700 dark:text-zinc-300">No active banners</h3>
          <p className="text-[10px] text-zinc-455 dark:text-zinc-500 mt-1">
            Create some homepage hero campaigns to drive shopping traffic.
          </p>
        </div>
      ) : (
        /* Banners Grid list */
        <div className="grid gap-8 grid-cols-1 lg:grid-cols-2 w-full">
          {banners.map((banner, index) => {
            const bannerId = banner.id || banner._id || `banner-${index}`
            return (
              <div 
                key={bannerId} 
                className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-xs flex flex-col justify-between"
              >
                {/* Banner Image Preview / Background placeholder */}
                <div className="relative h-80 bg-zinc-50 dark:bg-zinc-955 flex items-center justify-center border-b border-zinc-100 dark:border-zinc-800 overflow-hidden group">
                  {banner.imageUrl ? (
                    <div className="relative w-full h-full">
                      {!loadedImages[bannerId] && (
                        <div className="absolute inset-0 flex items-center justify-center bg-zinc-50 dark:bg-zinc-955 z-10">
                          <Loader2 className="h-6 w-6 text-[#047857] animate-spin" />
                        </div>
                      )}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={banner.imageUrl} 
                        alt={banner.title || "Banner Preview"} 
                        onLoad={() => setLoadedImages(prev => ({ ...prev, [bannerId]: true }))}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&q=80"
                          setLoadedImages(prev => ({ ...prev, [bannerId]: true }))
                        }}
                        className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${
                          loadedImages[bannerId] ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-1.5 text-zinc-400">
                      <ImageIcon className="h-6 w-6 stroke-[1.5]" />
                      <span className="text-[9px] uppercase tracking-wide">No image file</span>
                    </div>
                  )}

                  {/* Top Floating Badge */}
                  <div className="absolute top-3.5 right-3.5">
                    <span className={`text-[8px] font-bold px-2 py-0.75 rounded-full uppercase tracking-wider ${
                      banner.isActive
                        ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"
                        : "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400"
                    }`}>
                      {banner.isActive ? "Active" : "Draft"}
                    </span>
                  </div>
                </div>

                {/* Banner Information details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h4 className="text-sm font-black uppercase text-zinc-850 dark:text-zinc-100 tracking-wide line-clamp-1">
                      {banner.title}
                    </h4>
                    <p className="text-xs text-zinc-550 dark:text-zinc-400 leading-relaxed line-clamp-2">
                      {banner.description || "No description provided."}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-4 mt-4 border-t border-zinc-50 dark:border-zinc-850">
                    <button
                      onClick={() => handleToggleStatus(bannerId)}
                      className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 border rounded-xl text-[9px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                        banner.isActive
                          ? "border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800 text-zinc-650 dark:text-zinc-300"
                          : "border-emerald-250 bg-emerald-50/50 hover:bg-emerald-50 text-emerald-600 dark:border-emerald-900/60 dark:bg-emerald-950/20 dark:hover:bg-emerald-950/30"
                      }`}
                      title={banner.isActive ? "Deactivate" : "Activate"}
                    >
                      {banner.isActive ? (
                        <>
                          <EyeOff className="h-3 w-3" />
                          Deactivate
                        </>
                      ) : (
                        <>
                          <Eye className="h-3 w-3" />
                          Activate
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleStartEdit(banner)}
                      className="px-3 py-2 border border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800 text-zinc-655 dark:text-zinc-300 rounded-xl transition-colors cursor-pointer text-[9px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5"
                      title="Edit banner details"
                    >
                      <Edit className="h-3 w-3" />
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(bannerId)}
                      className="px-3 py-2 border border-red-200 hover:bg-red-50 text-red-505 dark:border-red-900/40 dark:hover:bg-red-955/20 dark:text-red-400 rounded-xl transition-colors cursor-pointer"
                      title="Delete banner"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
