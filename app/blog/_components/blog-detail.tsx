"use client"

import * as React from "react"
import { SafeImage } from "@/components/ui/safe-image"
import { ArrowLeft } from "lucide-react"
import { BlogPost } from "./types"

interface BlogDetailProps {
  post: BlogPost
  onBack: () => void
  onCategoryClick: (category: string) => void
  onTagClick: (tag: string) => void
}

export function BlogDetail({ post, onBack, onCategoryClick, onTagClick }: BlogDetailProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    alert("Comment posted successfully!")
  }

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors mb-4"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Journal
      </button>

      {/* Main Article */}
      <article className="space-y-6">
        {/* Blog Image */}
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-zinc-100 dark:bg-zinc-900">
          <SafeImage
            src={post.image}
            alt={post.title}
            fill
            priority
            className="object-cover"
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
          <div className="flex gap-1 normal-case lowercase text-zinc-500 font-semibold">
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
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 leading-tight font-sans">
          {post.title}
        </h1>

        {/* Article Paragraphs & Blockquote */}
        <div className="space-y-6 text-sm leading-relaxed text-zinc-600 dark:text-zinc-350 font-sans font-light">
          {/* Render Paragraphs and insert blockquote after Paragraph 2 */}
          {post.paragraphs.map((paragraph, index) => (
            <React.Fragment key={index}>
              <p>{paragraph}</p>
              
              {index === 1 && post.blockquote && (
                <blockquote className="my-8 pl-6 border-l-2 border-zinc-200 dark:border-zinc-800 italic text-zinc-500 dark:text-zinc-400 text-sm">
                  {post.blockquote}
                </blockquote>
              )}
            </React.Fragment>
          ))}
        </div>
      </article>

      {/* Separator */}
      <hr className="border-t border-zinc-100 dark:border-zinc-900 my-10" />

      {/* LEAVE A REPLY Form */}
      <div className="space-y-6 pt-4">
        <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-950 dark:text-zinc-50">
          Leave a Reply
        </h3>
        <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
          Your email address will not be published. Required fields are marked <span className="text-red-500">*</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Comment Textarea */}
          <div className="space-y-2">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-950 dark:text-zinc-50">
              Comment <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={6}
              className="w-full border border-zinc-200 dark:border-zinc-800 bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-zinc-950 dark:focus:border-zinc-50 transition-colors"
            />
          </div>

          {/* Inputs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-950 dark:text-zinc-50">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                className="w-full border border-zinc-200 dark:border-zinc-800 bg-transparent px-4 py-2.5 text-sm focus:outline-none focus:border-zinc-950 dark:focus:border-zinc-50 transition-colors"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-950 dark:text-zinc-50">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                className="w-full border border-zinc-200 dark:border-zinc-800 bg-transparent px-4 py-2.5 text-sm focus:outline-none focus:border-zinc-950 dark:focus:border-zinc-50 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-950 dark:text-zinc-50">
                Website
              </label>
              <input
                type="text"
                className="w-full border border-zinc-200 dark:border-zinc-800 bg-transparent px-4 py-2.5 text-sm focus:outline-none focus:border-zinc-950 dark:focus:border-zinc-50 transition-colors"
              />
            </div>
          </div>

          {/* Save checkbox */}
          <div className="flex items-start gap-2.5">
            <input
              type="checkbox"
              id="save-info"
              className="mt-1 h-3.5 w-3.5 border-zinc-300 text-zinc-900 focus:ring-zinc-900 rounded-none cursor-pointer"
            />
            <label htmlFor="save-info" className="text-[11px] text-zinc-500 dark:text-zinc-400 select-none cursor-pointer leading-tight">
              Save my name, email, and website in this browser for the next time I comment.
            </label>
          </div>

          {/* Post Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="bg-[#f0f0f0] border border-zinc-300 dark:bg-zinc-900 dark:border-zinc-800 px-6 py-3.5 text-[10px] font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-50 hover:bg-zinc-950 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all cursor-pointer"
            >
              Post Comment
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
