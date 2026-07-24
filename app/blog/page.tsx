"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { BlogPost } from "./_components/types"
import { BlogDetail } from "./_components/blog-detail"
import { BlogList } from "./_components/blog-list"
import { BlogSidebar } from "./_components/blog-sidebar"
import { getAllNews } from "@/store/api/news"
import { NewsItem } from "@/data/news"

function BlogPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const urlId = searchParams.get("id")

  const [blogPosts, setBlogPosts] = React.useState<BlogPost[]>([])
  const [loading, setLoading] = React.useState(true)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null)
  const [selectedTag, setSelectedTag] = React.useState<string | null>(null)

  // Fetch real blog posts from API
  React.useEffect(() => {
    async function loadNews() {
      setLoading(true)
      try {
        const response = await getAllNews()
        const rawList: NewsItem[] = Array.isArray(response)
          ? response
          : Array.isArray(response?.data)
          ? response.data
          : []

        if (Array.isArray(rawList)) {
          const formatted: BlogPost[] = rawList.map((item) => {
            const paragraphs = item.content 
              ? item.content.split("\n\n").filter(Boolean)
              : [item.excerpt || item.title]
            
            return {
              id: item._id || item.id || item.slug || Math.random().toString(),
              _id: item._id || item.id,
              title: item.title,
              excerpt: item.excerpt || (item.content ? item.content.substring(0, 150) : ""),
              content: item.content,
              date: item.createdAt ? new Date(item.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "Recent",
              category: item.category || "General",
              tags: item.tags || [],
              image: item.image || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
              paragraphs: paragraphs,
              blockquote: item.excerpt,
              views: item.views,
              isPopular: item.isPopular,
              slug: item.slug
            }
          })
          setBlogPosts(formatted)
        }
      } catch (err) {
        console.error("Failed to load news for blog page:", err)
      } finally {
        setLoading(false)
      }
    }
    loadNews()
  }, [])

  // Derive dynamic categories and tags from actual API posts
  const categories = React.useMemo(() => {
    const set = new Set<string>()
    blogPosts.forEach(p => {
      if (p.category) set.add(p.category)
    })
    return Array.from(set)
  }, [blogPosts])

  const allTags = React.useMemo(() => {
    const set = new Set<string>()
    blogPosts.forEach(p => {
      p.tags?.forEach(t => set.add(t))
    })
    return Array.from(set)
  }, [blogPosts])

  // Selected post derived from URL parameter (matches string or number ID)
  const selectedPost = React.useMemo(() => {
    if (!urlId) return null
    return blogPosts.find((post) => String(post.id) === String(urlId) || String(post._id) === String(urlId) || post.slug === urlId) || null
  }, [urlId, blogPosts])

  // Filter logic for main blog feed listing
  const filteredPosts = React.useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesCategory =
        !selectedCategory || post.category.toLowerCase() === selectedCategory.toLowerCase()

      const matchesTag =
        !selectedTag || post.tags.some((tag) => tag.toLowerCase() === selectedTag.toLowerCase())

      return matchesSearch && matchesCategory && matchesTag
    })
  }, [blogPosts, searchQuery, selectedCategory, selectedTag])

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory(null)
    setSelectedTag(null)
  }

  const handleTagClick = (tag: string) => {
    router.push("/blog")
    setSelectedTag(tag === selectedTag ? null : tag)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleCategoryClick = (category: string) => {
    router.push("/blog")
    setSelectedCategory(category === selectedCategory ? null : category)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handlePostClick = (postId: string | number) => {
    router.push(`/blog?id=${postId}`)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleSearchChange = (query: string) => {
    router.push("/blog")
    setSearchQuery(query)
  }

  const handleBack = () => {
    router.push("/blog")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (loading) {
    return (
      <div className="flex-1 bg-white text-zinc-950 dark:bg-black dark:text-zinc-50 font-sans py-24 text-center">
        <div className="animate-pulse text-xs font-bold uppercase tracking-widest text-zinc-400">
          Loading live journal posts...
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 bg-white text-zinc-950 dark:bg-black dark:text-zinc-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Left Column: Main Content (List View or Detail View) */}
          <div className="lg:col-span-3">
            {selectedPost ? (
              <BlogDetail
                post={selectedPost}
                onBack={handleBack}
                onCategoryClick={handleCategoryClick}
                onTagClick={handleTagClick}
              />
            ) : (
              <BlogList
                filteredPosts={filteredPosts}
                searchQuery={searchQuery}
                selectedCategory={selectedCategory}
                selectedTag={selectedTag}
                onSearchQueryChange={handleSearchChange}
                onCategoryClick={handleCategoryClick}
                onTagClick={handleTagClick}
                onPostClick={handlePostClick}
                clearFilters={clearFilters}
              />
            )}
          </div>

          {/* Right Column: Sidebar */}
          <BlogSidebar
            searchQuery={searchQuery}
            onSearchQueryChange={handleSearchChange}
            selectedCategory={selectedCategory}
            onCategoryClick={handleCategoryClick}
            selectedTag={selectedTag}
            onTagClick={handleTagClick}
            onPostClick={handlePostClick}
            blogPosts={blogPosts}
            categories={categories}
            allTags={allTags}
          />
        </div>
      </div>
    </div>
  )
}

export default function BlogPage() {
  return (
    <React.Suspense fallback={
      <div className="py-24 text-center text-xs text-zinc-400 font-bold uppercase tracking-widest">
        Loading...
      </div>
    }>
      <BlogPageContent />
    </React.Suspense>
  )
}
