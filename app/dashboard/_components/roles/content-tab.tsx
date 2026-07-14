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

  // Sync state on load
  React.useEffect(() => {
    const defaultProjects: Project[] = [
      {
        id: "PROJ-101",
        name: "Premium Cotton T-Shirt",
        slug: "premium-cotton-t-shirt",
        sku: "TSHIRT-001",
        price: 1200,
        salePrice: 999,
        onSale: true,
        description: "Premium quality 100% cotton t-shirt with soft fabric and comfortable fit.",
        shortDescription: "Soft premium cotton t-shirt.",
        images: ["https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=300"],
        categories: ["68748e89d9f9b3d9e4b1a001", "68748e89d9f9b3d9e4b1a002"],
        tags: ["Cotton", "Fashion", "Men", "Summer"],
        colors: [
          { name: "Black", value: "#000000" },
          { name: "White", value: "#FFFFFF" },
          { name: "Blue", value: "#0000FF" }
        ],
        sizes: ["S", "M", "L", "XL"],
        stockQuantity: 50,
        inStock: true,
        ratings: 4.8,
        reviewsCount: 2,
        reviews: [
          { reviewerName: "John Doe", reviewerEmail: "john@example.com", rating: 5, comment: "Excellent.", createdAt: "2026-07-14" },
          { reviewerName: "Jane Smith", reviewerEmail: "jane@example.com", rating: 4, comment: "Nice.", createdAt: "2026-07-13" }
        ],
        additionalInformation: { weight: "250g", dimensions: "30 x 25 x 3 cm" },
        isActive: true
      }
    ]
    const defaultCategories: TCategory[] = [
      { id: "CAT-1", name: "Clothing", slug: "clothing", parent: null, icon: "shirt", order: 1, isActive: true },
      { id: "CAT-2", name: "Dresses", slug: "dresses", parent: "CAT-1", icon: "package", order: 2, isActive: true },
      { id: "CAT-3", name: "Collection", slug: "collection", parent: null, icon: "tag", order: 3, isActive: true }
    ]
    const defaultBlogs: Blog[] = [
      { id: 1, title: "The Best Products That Shape Fashion", category: "Collection", date: "April 25, 2022", excerpt: "Trends shaping modern product curation." },
      { id: 2, title: "New Finds From Tuckernuck", category: "Clothing", date: "April 26, 2022", excerpt: "Seasonal collections for your wardrobe." }
    ]

    const timer = setTimeout(() => {
      const storedProjects = localStorage.getItem("arzuma_content_projects")
      setProjects(storedProjects ? JSON.parse(storedProjects) : defaultProjects)

      const storedCategories = localStorage.getItem("arzuma_content_categories")
      setCategories(storedCategories ? JSON.parse(storedCategories) : defaultCategories)

      const storedBlogs = localStorage.getItem("arzuma_content_blogs")
      setBlogs(storedBlogs ? JSON.parse(storedBlogs) : defaultBlogs)
    }, 0)

    return () => clearTimeout(timer)
  }, [])

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

  // Create Handlers
  const handleCreateProject = (data: Partial<Project>) => {
    const newItem: Project = {
      ...data,
      id: `PROJ-${Date.now()}`,
      reviews: [
        {
          reviewerName: "John Doe",
          reviewerEmail: "john@example.com",
          rating: 5,
          comment: "Excellent quality and comfortable.",
          createdAt: new Date().toISOString()
        }
      ]
    } as Project
    saveProjects([...projects, newItem])
    triggerToast("Project created successfully with standard schema!")
    setIsAdding(false)
  }

  const handleCreateCategory = (data: Partial<TCategory>) => {
    const newItem: TCategory = {
      ...data,
      id: `CAT-${Date.now()}`
    } as TCategory
    saveCategories([...categories, newItem])
    triggerToast("Category created successfully!")
    setIsAdding(false)
  }

  const handleCreateBlog = (data: Partial<Blog>) => {
    const newItem: Blog = {
      ...data,
      id: Date.now(),
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    } as Blog
    saveBlogs([...blogs, newItem])
    triggerToast("Blog post added successfully!")
    setIsAdding(false)
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

  const handleUpdateBlog = (data: Partial<Blog>) => {
    const updated = blogs.map(b => b.id === editingId ? { ...b, ...data } : b)
    saveBlogs(updated)
    triggerToast("Blog post updated successfully.")
    setEditingId(null)
  }

  // Delete Handlers
  const handleDelete = (id: string | number) => {
    if (!canDelete) {
      triggerToast("Permission Denied: You cannot delete items.")
      return
    }

    if (activeSubTab === "projects") {
      saveProjects(projects.filter(p => p.id !== id))
    } else if (activeSubTab === "categories") {
      saveCategories(categories.filter(c => c.id !== id))
    } else if (activeSubTab === "blogs") {
      saveBlogs(blogs.filter(b => b.id !== id))
    }
    triggerToast("Item removed successfully.")
  }

  const activeEditingProject = projects.find(p => p.id === editingId) || null
  const activeEditingCategory = categories.find(c => c.id === editingId) || null
  const activeEditingBlog = blogs.find(b => b.id === editingId) || null

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
        <ProjectForm onSubmit={handleCreateProject} onCancel={() => setIsAdding(false)} />
      )}
      {editingId !== null && activeSubTab === "projects" && (
        <ProjectForm initialData={activeEditingProject} onSubmit={handleUpdateProject} onCancel={() => setEditingId(null)} />
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
              onEdit={(b) => setEditingId(b.id)} 
              onDelete={handleDelete} 
            />
          )}
        </>
      )}

    </div>
  )
}
