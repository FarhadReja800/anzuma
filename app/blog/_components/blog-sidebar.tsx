"use client"

import * as React from "react"
import Image from "next/image"
import { Search } from "lucide-react"
import { BlogPost } from "./types"

interface BlogSidebarProps {
  searchQuery: string
  onSearchQueryChange: (query: string) => void
  selectedCategory: string | null
  onCategoryClick: (category: string) => void
  selectedTag: string | null
  onTagClick: (tag: string) => void
  onPostClick: (postId: number) => void
  blogPosts: BlogPost[]
  categories: string[]
  allTags: string[]
}

export function BlogSidebar({
  searchQuery,
  onSearchQueryChange,
  selectedCategory,
  onCategoryClick,
  selectedTag,
  onTagClick,
  onPostClick,
  blogPosts,
  categories,
  allTags,
}: BlogSidebarProps) {
  return (
    <aside className="lg:col-span-1 space-y-12">
      
      {/* Search Box Widget */}
      <div className="space-y-4">
        <div className="relative border border-zinc-200 dark:border-zinc-800 px-4 py-2 bg-transparent flex items-center justify-between w-full">
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-transparent text-xs text-zinc-950 dark:text-zinc-50 placeholder-zinc-400 focus:outline-none border-none py-1"
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
          />
          <Search className="h-4.5 w-4.5 text-zinc-400 cursor-pointer hover:text-zinc-600 transition-colors" />
        </div>
      </div>

      {/* Popular Posts Widget */}
      <div className="space-y-6">
        <div className="border-b border-zinc-100 dark:border-zinc-900 pb-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-950 dark:text-zinc-50">
            Popular Posts
          </h3>
        </div>
        <div className="space-y-5">
          {blogPosts.map((post) => (
            <div 
              key={post.id} 
              className="flex gap-4 items-start group cursor-pointer"
              onClick={() => onPostClick(post.id)}
            >
              {/* Thumbnail Image */}
              <div className="relative w-16 h-16 bg-zinc-50 dark:bg-zinc-900 flex-shrink-0 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              {/* Text Details */}
              <div className="flex-1 space-y-0.5 min-w-0">
                <p className="text-[10px] text-zinc-400 tracking-wide font-sans">{post.date}</p>
                <h4 className="text-xs font-bold text-zinc-950 dark:text-zinc-50 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors leading-snug line-clamp-2">
                  {post.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories Widget */}
      <div className="space-y-6">
        <div className="border-b border-zinc-100 dark:border-zinc-900 pb-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-950 dark:text-zinc-50">
            Categories
          </h3>
        </div>
        <ul className="space-y-2">
          {categories.map((cat) => {
            const isActive = selectedCategory?.toLowerCase() === cat.toLowerCase()
            return (
              <li 
                key={cat}
                onClick={() => onCategoryClick(cat)}
                className={`flex items-center text-xs font-semibold hover:text-zinc-650 cursor-pointer py-1.5 transition-colors group ${
                  isActive ? "text-zinc-950 dark:text-white" : "text-zinc-500 dark:text-zinc-400"
                }`}
              >
                <span className="text-[10px] text-zinc-400 mr-2.5 font-light font-sans group-hover:text-zinc-800 transition-colors">
                  &gt;
                </span>
                {cat}
              </li>
            )
          })}
        </ul>
      </div>

      {/* Tags Widget */}
      <div className="space-y-6">
        <div className="border-b border-zinc-100 dark:border-zinc-900 pb-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-950 dark:text-zinc-50">
            Tags
          </h3>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {allTags.map((tag) => {
            const isActive = selectedTag?.toLowerCase() === tag.toLowerCase()
            return (
              <span
                key={tag}
                onClick={() => onTagClick(tag)}
                className={`px-3 py-1.5 border text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? "bg-zinc-950 text-white border-zinc-950 dark:bg-white dark:text-black dark:border-white"
                    : "border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-450 hover:bg-zinc-950 hover:text-white hover:border-zinc-950 dark:hover:bg-white dark:hover:text-black dark:hover:border-white"
                }`}
              >
                {tag}
              </span>
            )
          })}
        </div>
      </div>

    </aside>
  )
}
