"use client"

import * as React from "react"
import { Plus, Lock, X } from "lucide-react"
import { Project, TCategory, Blog } from "./content-manager/types"
import { ProjectForm } from "./content-manager/project-form"
import { ProjectList } from "./content-manager/project-list"
import { CategoryForm } from "./content-manager/category-form"
import { CategoryList } from "./content-manager/category-list"
import { BlogForm } from "./content-manager/blog-form"
import { BlogList } from "./content-manager/blog-list"
import { RolePermissions } from "./rbac-config"
import { createNews, getAllNews, updateNews, deleteNews } from "@/store/api/news"
import { CreateNewsPayload, NewsItem, UpdateNewsPayload } from "@/data/news"

interface RawCategory {
  _id?: string
  id?: string
  name?: string
  slug?: string
  parent?: string | { _id?: string; id?: string; name?: string } | null
  icon?: string
  order?: number
  isActive?: boolean
}

function formatImageUrl(url?: string): string {
  if (!url || typeof url !== "string" || !url.trim()) {
    return "https://images.unsplash.com/photo-1517694712202-14dd9538aa97"
  }
  const trimmed = url.trim()
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed
  }
  if (trimmed.startsWith("/")) {
    const origin = typeof window !== "undefined" ? window.location.origin : "http://localhost:3000"
    return `${origin}${trimmed}`
  }
  return `https://${trimmed}`
}

interface ContentTabProps {
  permissions: RolePermissions | null
  triggerToast: (msg: string) => void
}

export function ContentTab({ permissions, triggerToast }: ContentTabProps) {
  const [activeSubTab, setActiveSubTab] = React.useState<"projects" | "categories" | "blogs">("projects")

  // State Lists
  const [projects, setProjects] = React.useState<Project[]>([])
  const [categories, setCategories] = React.useState<TCategory[]>([])
  const [blogs, setBlogs] = React.useState<Blog[]>([])

  // Modal / Form States
  const [isAdding, setIsAdding] = React.useState(false)
  const [editingId, setEditingId] = React.useState<string | number | null>(null)

  // Memoized Permissions checkers
  const canAdd = React.useMemo(() => {
    if (!permissions) return false
    if (activeSubTab === "projects") return permissions.addProject
    if (activeSubTab === "categories") return permissions.addService // map categories to addService
    if (activeSubTab === "blogs") return permissions.addProject
    return false
  }, [permissions, activeSubTab])

  const canEdit = React.useMemo(() => {
    if (!permissions) return false
    if (activeSubTab === "projects") return permissions.editProject
    if (activeSubTab === "categories") return permissions.editService // map categories to editService
    if (activeSubTab === "blogs") return permissions.editProject
    return false
  }, [permissions, activeSubTab])

  const canDelete = React.useMemo(() => {
    if (!permissions) return false
    if (activeSubTab === "projects") return permissions.deleteProject
    if (activeSubTab === "categories") return permissions.deleteService // map categories to deleteService
    if (activeSubTab === "blogs") return permissions.deleteProject
    return false
  }, [permissions, activeSubTab])

  const fetchCategories = React.useCallback(async () => {
    try {
      const response = await fetch("/api/category/get-categories")
      if (response.ok) {
        const json = await response.json()
        const rawList = Array.isArray(json) ? json : (json.data || [])
        if (Array.isArray(rawList) && rawList.length > 0) {
          const formatted: TCategory[] = rawList.map((c: RawCategory) => ({
            id: c._id || c.id || c.slug || String(c.name || "").toLowerCase(),
            name: c.name || "",
            slug: c.slug || "",
            parent: c.parent ? (typeof c.parent === "object" ? (c.parent._id || c.parent.id || c.parent.name) : c.parent) : null,
            icon: c.icon || "tag",
            order: c.order || 0,
            isActive: c.isActive !== false
          }))
          setCategories(formatted)
          localStorage.setItem("arzuma_content_categories", JSON.stringify(formatted))
          return
        }
      }
    } catch (error) {
      console.error("Failed to load live categories from API:", error)
    }

    // Fallback to localStorage if API fails/returns empty
    const storedCategories = localStorage.getItem("arzuma_content_categories")
    setCategories(storedCategories ? JSON.parse(storedCategories) : [])
  }, [])

  const fetchProjects = React.useCallback(async () => {
    try {
      const response = await fetch("/api/product/get-products")
      if (response.ok) {
        const json = await response.json()
        const rawList = Array.isArray(json) ? json : (json.data || [])
        if (Array.isArray(rawList)) {
          const formatted: Project[] = rawList.map((p: Omit<Project, "id"> & { _id?: string | number; id?: string | number }) => ({
            id: p._id ?? p.id ?? "",
            name: p.name,
            slug: p.slug,
            sku: p.sku,
            price: p.price,
            salePrice: p.salePrice,
            onSale: p.onSale,
            description: p.description,
            shortDescription: p.shortDescription,
            images: p.images || [],
            categories: p.categories || [],
            tags: p.tags || [],
            colors: p.colors || [],
            sizes: p.sizes || [],
            stockQuantity: p.stockQuantity,
            inStock: p.inStock,
            ratings: p.ratings,
            reviewsCount: p.reviewsCount,
            reviews: p.reviews || [],
            additionalInformation: p.additionalInformation || { weight: "", dimensions: "" },
            isActive: p.isActive
          }))
          setProjects(formatted)
          localStorage.setItem("arzuma_content_projects", JSON.stringify(formatted))
          return
        }
      }
    } catch (error) {
      console.error("Failed to load live products/projects from API:", error)
    }

    const storedProjects = localStorage.getItem("arzuma_content_projects")
    setProjects(storedProjects ? JSON.parse(storedProjects) : [])
  }, [])

  const fetchBlogs = React.useCallback(async () => {
    try {
      const response = await getAllNews()
      const rawList: NewsItem[] = Array.isArray(response) 
        ? response 
        : Array.isArray(response?.data)
        ? response.data
        : []

      if (Array.isArray(rawList) && rawList.length > 0) {
        const formatted: Blog[] = rawList.map((item: NewsItem) => ({
          id: item._id || item.id || item.slug,
          _id: item._id || item.id,
          title: item.title || "Untitled News",
          category: item.category || "General",
          excerpt: item.excerpt || (item.content ? item.content.substring(0, 120) : ""),
          content: item.content || "",
          image: item.image || "",
          tags: item.tags || [],
          isPopular: item.isPopular ?? false,
          views: item.views ?? 0,
          slug: item.slug,
          createdAt: item.createdAt
        }))
        setBlogs(formatted)
        localStorage.setItem("arzuma_content_blogs", JSON.stringify(formatted))
        return
      }
    } catch (error) {
      console.error("Failed to load live blogs/news from API:", error)
    }

    const storedBlogs = localStorage.getItem("arzuma_content_blogs")
    setBlogs(storedBlogs ? JSON.parse(storedBlogs) : [])
  }, [])

  // Sync state on load
  React.useEffect(() => {
    let active = true

    async function loadData() {
      if (active) {
        await fetchProjects()
      }
      if (active) {
        await fetchBlogs()
      }
      if (active) {
        await fetchCategories()
      }
    }

    loadData()

    return () => {
      active = false
    }
  }, [fetchCategories, fetchProjects, fetchBlogs])

  // Action Persistors
  const saveProjects = (updated: Project[]) => {
    setProjects(updated)
    localStorage.setItem("arzuma_content_projects", JSON.stringify(updated))
  }

  const saveCategories = (updated: TCategory[]) => {
    setCategories(updated)
    localStorage.setItem("arzuma_content_categories", JSON.stringify(updated))
  }

  const saveBlogs = (updated: Blog[]) => {
    setBlogs(updated)
    localStorage.setItem("arzuma_content_blogs", JSON.stringify(updated))
  }

  const handleCreateProject = async (data: Partial<Project>) => {
    try {
      const token = localStorage.getItem("arzuma_token")
      if (!token) {
        throw new Error("Your authentication session has expired or is invalid. Please log out and log in again.")
      }
      
      const payload = {
        name: data.name,
        slug: data.slug || data.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""),
        sku: data.sku || `PROD-${Date.now()}`,
        price: Number(data.price) || 0,
        salePrice: Number(data.salePrice) || 0,
        onSale: data.onSale !== false,
        description: data.description || "",
        shortDescription: data.shortDescription || "",
        images: data.images || [],
        categories: data.categories || [],
        tags: data.tags || [],
        colors: data.colors || [],
        sizes: data.sizes || [],
        stockQuantity: Number(data.stockQuantity) || 0,
        inStock: data.inStock !== false,
        ratings: data.ratings || 0,
        reviewsCount: data.reviewsCount || 0,
        reviews: data.reviews || [],
        additionalInformation: data.additionalInformation || { weight: "", dimensions: "" },
        isActive: data.isActive !== false
      }

      const response = await fetch("/api/product/create-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token.startsWith("Bearer ") ? token : `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      })

      const resData = await response.json()
      if (!response.ok) {
        throw new Error(resData.error || resData.message || "Failed to create product.")
      }

      triggerToast("Product created successfully in database!")
      setIsAdding(false)
      await fetchProjects()
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : "Error creating product."
      console.error("Product creation error:", err)
      triggerToast(`Error: ${errMsg}`)
    }
  }

  const handleCreateCategory = async (data: Partial<TCategory>) => {
    try {
      const token = localStorage.getItem("arzuma_token")
      if (!token) {
        throw new Error("Your authentication session has expired or is invalid. Please log out and log in again.")
      }
      const response = await fetch("/api/category/create-category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token.startsWith("Bearer ") ? token : `Bearer ${token}`
        },
        body: JSON.stringify(data)
      })

      const resData = await response.json()
      if (!response.ok) {
        throw new Error(resData.error || resData.message || "Failed to create category.")
      }

      triggerToast("Category created successfully in database!")
      setIsAdding(false)
      await fetchCategories()
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : "Error creating category."
      console.error("Category creation error:", err)
      triggerToast(`Error: ${errMsg}`)
    }
  }

  const handleCreateBlog = async (data: Partial<Blog>) => {
    try {
      const token = localStorage.getItem("arzuma_token")
      if (!token) {
        throw new Error("Your authentication session has expired or is invalid. Please log out and log in again.")
      }

      const payload: CreateNewsPayload = {
        title: data.title || "",
        content: data.content || data.excerpt || data.title || "",
        excerpt: data.excerpt,
        image: formatImageUrl(data.image),
        category: data.category || "Programming",
        tags: data.tags || ["typescript", "node"],
        isPopular: data.isPopular ?? true,
        views: Number(data.views) || 100
      }

      const res = await createNews(payload)
      if (res && res.success !== false) {
        triggerToast("Blog/news created successfully in database!")
        setIsAdding(false)
        await fetchBlogs()
      } else {
        throw new Error(res?.message || "Failed to create news post.")
      }
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : "Error creating news/blog."
      console.error("News creation error:", err)
      triggerToast(`Error: ${errMsg}`)
    }
  }

  // Update Handlers
  const handleUpdateProject = (data: Partial<Project>) => {
    const updated = projects.map(p => p.id === editingId ? { ...p, ...data } : p)
    saveProjects(updated)
    triggerToast("Project item updated successfully.")
    setEditingId(null)
  }

  const handleUpdateCategory = (data: Partial<TCategory>) => {
    const updated = categories.map(c => c.id === editingId ? { ...c, ...data } : c)
    saveCategories(updated)
    triggerToast("Category updated successfully.")
    setEditingId(null)
  }

  const handleUpdateBlog = async (data: Partial<Blog>) => {
    try {
      if (!editingId) return
      const idStr = String(editingId)

      const payload: UpdateNewsPayload = {
        title: data.title,
        content: data.content,
        excerpt: data.excerpt,
        image: data.image ? formatImageUrl(data.image) : undefined,
        category: data.category,
        tags: data.tags,
        isPopular: data.isPopular,
        views: data.views
      }

      const res = await updateNews(idStr, payload)
      if (res && res.success !== false) {
        triggerToast("Blog post updated successfully!")
        setEditingId(null)
        await fetchBlogs()
      } else {
        const updated = blogs.map(b => (b.id === editingId || b._id === editingId) ? { ...b, ...data } : b)
        saveBlogs(updated)
        triggerToast("Blog post updated locally.")
        setEditingId(null)
      }
    } catch (err) {
      console.error("Failed to update blog:", err)
      const updated = blogs.map(b => (b.id === editingId || b._id === editingId) ? { ...b, ...data } : b)
      saveBlogs(updated)
      triggerToast("Blog post updated locally.")
      setEditingId(null)
    }
  }

  // Delete Handlers
  const handleDelete = async (id: string | number) => {
    if (!canDelete) {
      triggerToast("Permission Denied: You cannot delete items.")
      return
    }

    if (activeSubTab === "projects") {
      saveProjects(projects.filter(p => p.id !== id))
      triggerToast("Item removed successfully.")
    } else if (activeSubTab === "categories") {
      saveCategories(categories.filter(c => c.id !== id))
      triggerToast("Item removed successfully.")
    } else if (activeSubTab === "blogs") {
      try {
        await deleteNews(String(id))
        triggerToast("News post deleted from server.")
        await fetchBlogs()
      } catch (err) {
        console.error("Failed to delete news from backend:", err)
        saveBlogs(blogs.filter(b => b.id !== id && b._id !== id))
        triggerToast("Blog post deleted locally.")
      }
    }
  }

  const activeEditingProject = projects.find(p => p.id === editingId) || null
  const activeEditingCategory = categories.find(c => c.id === editingId) || null
  const activeEditingBlog = blogs.find(b => b.id === editingId || b._id === editingId) || null

  return (
    <div className="space-y-6">
      
      {/* Sub tabs list switcher */}
      <div className="flex border-b border-zinc-200 dark:border-zinc-800 gap-4 pb-2.5">
        {(["projects", "categories", "blogs"] as const).map(tab => (
          <button
            key={tab}
            onClick={() => { setActiveSubTab(tab); setEditingId(null); setIsAdding(false); }}
            className={`text-xs font-black uppercase tracking-wider py-1.5 px-3 transition-colors cursor-pointer rounded-lg ${
              activeSubTab === tab 
                ? "bg-[#3eb075] text-white"
                : "text-zinc-500 hover:text-zinc-850 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-855"
            }`}
          >
            {tab === "projects" ? "Projects (Rich Product)" : tab === "categories" ? "Categories (TCategory)" : "Blog Posts"}
          </button>
        ))}
      </div>

      {/* Action panel (Create item trigger) */}
      <div className="flex justify-between items-center bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/80 p-4 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.01)]">
        <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
          Operational panel: {activeSubTab} management
        </span>
        
        {isAdding ? (
          <button
            onClick={() => setIsAdding(false)}
            className="flex items-center gap-1.5 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" /> Cancel
          </button>
        ) : (
          canAdd ? (
            <button
              onClick={() => { setIsAdding(true); setEditingId(null); }}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#3eb075] hover:bg-emerald-600 text-white rounded-full text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <Plus className="h-4 w-4" /> Add new {activeSubTab === "projects" ? "project" : activeSubTab === "categories" ? "category" : "blog"}
            </button>
          ) : (
            <span className="text-[10px] text-zinc-400 font-bold uppercase flex items-center gap-1.5 select-none border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 rounded-full bg-zinc-50 dark:bg-zinc-850">
              <Lock className="h-3.5 w-3.5" /> Locked
            </span>
          )
        )}
      </div>

      {/* Adding / Editing Views */}
      {isAdding && activeSubTab === "projects" && (
        <ProjectForm categoriesList={categories} onSubmit={handleCreateProject} onCancel={() => setIsAdding(false)} />
      )}
      {editingId !== null && activeSubTab === "projects" && (
        <ProjectForm categoriesList={categories} initialData={activeEditingProject} onSubmit={handleUpdateProject} onCancel={() => setEditingId(null)} />
      )}

      {isAdding && activeSubTab === "categories" && (
        <CategoryForm categories={categories} onSubmit={handleCreateCategory} onCancel={() => setIsAdding(false)} />
      )}
      {editingId !== null && activeSubTab === "categories" && (
        <CategoryForm categories={categories} initialData={activeEditingCategory} onSubmit={handleUpdateCategory} onCancel={() => setEditingId(null)} />
      )}

      {isAdding && activeSubTab === "blogs" && (
        <BlogForm onSubmit={handleCreateBlog} onCancel={() => setIsAdding(false)} />
      )}
      {editingId !== null && activeSubTab === "blogs" && (
        <BlogForm initialData={activeEditingBlog} onSubmit={handleUpdateBlog} onCancel={() => setEditingId(null)} />
      )}

      {/* Directory lists */}
      {editingId === null && !isAdding && (
        <>
          {activeSubTab === "projects" && (
            <ProjectList 
              projects={projects} 
              canEdit={canEdit} 
              canDelete={canDelete} 
              onEdit={(p) => setEditingId(p.id)} 
              onDelete={handleDelete} 
            />
          )}
          {activeSubTab === "categories" && (
            <CategoryList 
              categories={categories} 
              canEdit={canEdit} 
              canDelete={canDelete} 
              onEdit={(c) => setEditingId(c.id)} 
              onDelete={handleDelete} 
            />
          )}
          {activeSubTab === "blogs" && (
            <BlogList 
              blogs={blogs} 
              canEdit={canEdit} 
              canDelete={canDelete} 
              onEdit={(b) => setEditingId(b._id || b.id || "")} 
              onDelete={handleDelete} 
            />
          )}
        </>
      )}

    </div>
  )
}
