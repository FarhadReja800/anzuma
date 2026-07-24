"use client"

import * as React from "react"
import { SafeImage } from "@/components/ui/safe-image"
import { X, ArrowRight } from "lucide-react"
import { BlogPost } from "./types"

interface BlogListProps {
  filteredPosts: BlogPost[]
  searchQuery: string
  selectedCategory: string | null
  selectedTag: string | null
  onSearchQueryChange: (query: string) => void
  onCategoryClick: (category: string) => void
  onTagClick: (tag: string) => void
  onPostClick: (postId: string | number) => void
  clearFilters: () => void
}

export function BlogList({
  filteredPosts,
  searchQuery,
  selectedCategory,
  selectedTag,
  onSearchQueryChange,
  onCategoryClick,
  onTagClick,
  onPostClick,
  clearFilters,
}: BlogListProps) {
  return (
    <div className="space-y-16">
      {/* Filter Indicators if filters are active */}
      {(selectedCategory || selectedTag || searchQuery) && (
        <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-none">
          <div className="flex flex-wrap gap-2 items-center text-xs">
            <span className="text-zinc-500 font-medium">Active Filters:</span>
            {searchQuery && (
              <span className="bg-zinc-200 dark:bg-zinc-800 px-2 py-1 flex items-center gap-1 font-semibold">
                Search: &quot;{searchQuery}&quot;
                <X className="h-3 w-3 cursor-pointer" onClick={() => onSearchQueryChange("")} />
              </span>
            )}
            {selectedCategory && (
              <span className="bg-zinc-200 dark:bg-zinc-800 px-2 py-1 flex items-center gap-1 font-semibold uppercase tracking-wider">
                Category: {selectedCategory}
                <X className="h-3 w-3 cursor-pointer" onClick={() => onCategoryClick(selectedCategory)} />
              </span>
            )}
            {selectedTag && (
              <span className="bg-zinc-200 dark:bg-zinc-800 px-2 py-1 flex items-center gap-1 font-semibold">
                Tag: #{selectedTag}
                <X className="h-3 w-3 cursor-pointer" onClick={() => onTagClick(selectedTag)} />
              </span>
            )}
          </div>
          <button 
            onClick={clearFilters}
            className="text-xs font-bold uppercase tracking-widest text-zinc-900 hover:text-zinc-500 dark:text-zinc-100 dark:hover:text-zinc-400 transition-colors"
          >
            Clear All
          </button>
        </div>
      )}

      {filteredPosts.length > 0 ? (
        filteredPosts.map((post) => (
          <article key={post.id} className="group flex flex-col space-y-4">
            {/* Blog Image */}
            <div 
              onClick={() => onPostClick(post.id)}
              className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-zinc-100 dark:bg-zinc-900 cursor-pointer"
            >
              <SafeImage
                src={post.image}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>

            {/* Metadata Row */}
            <div className="flex flex-wrap items-center gap-2 text-[11px] tracking-widest text-zinc-400 uppercase font-sans mt-2">
              <span 
                onClick={() => onCategoryClick(post.category)}
                className="font-bold text-zinc-800 dark:text-zinc-200 hover:text-zinc-500 transition-colors cursor-pointer"
              >
                {post.category}
              </span>
              <span className="text-zinc-300">—</span>
              <span>{post.date}</span>
              <span className="text-zinc-300">—</span>
              <div className="flex gap-1 lowercase text-zinc-500 font-semibold normal-case">
                {post.tags.map((tag, idx) => (
                  <span key={tag}>
                    <span 
                      onClick={() => onTagClick(tag)}
                      className="hover:underline hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer"
                    >
                      {tag}
                    </span>
                    {idx < post.tags.length - 1 && <span className="text-zinc-400 font-normal">, </span>}
                  </span>
                ))}
              </div>
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 leading-tight">
              <button 
                onClick={() => onPostClick(post.id)}
                className="text-left hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors font-sans font-bold"
              >
                {post.title}
              </button>
            </h2>

            {/* Excerpt */}
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans font-light">
              {post.excerpt}
            </p>

            {/* Read More Link */}
            <div className="pt-2">
              <button 
                onClick={() => onPostClick(post.id)}
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-zinc-950 dark:text-zinc-50 border-b border-transparent hover:border-zinc-950 dark:hover:border-zinc-50 pb-0.5 transition-all"
              >
                Read More
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </article>
        ))
      ) : (
        <div className="text-center py-16 border border-dashed border-zinc-200 dark:border-zinc-800">
          <p className="text-sm text-zinc-500">No blog posts found matching your criteria.</p>
          <button 
            onClick={clearFilters}
            className="mt-4 inline-block text-xs font-bold uppercase tracking-widest text-zinc-950 dark:text-zinc-50 border-b border-zinc-950 dark:border-zinc-50 pb-0.5"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  )
}
