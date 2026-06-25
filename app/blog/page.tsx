"use client"

import * as React from "react"
import Link from "next/link"
import { Calendar, Clock, ArrowRight, Sparkles } from "lucide-react"

const blogPosts = [
  {
    id: 1,
    title: "The Art of Minimalist Dressing: Simplicity as a Statement",
    excerpt: "Learn how to build a clean capsule wardrobe that stands the test of time while maximizing style options.",
    date: "June 18, 2026",
    readTime: "4 min read",
    category: "Styling Guide",
    gradient: "from-amber-100 to-rose-100 dark:from-zinc-900 dark:to-zinc-800",
  },
  {
    id: 2,
    title: "Selecting the Perfect Trench Coat for Any Season",
    excerpt: "The trench coat is a true wardrobe classic. We unpack what fabric, length, and detail to look for when choosing yours.",
    date: "May 29, 2026",
    readTime: "6 min read",
    category: "Trend Report",
    gradient: "from-zinc-100 to-indigo-100 dark:from-zinc-850 dark:to-zinc-800",
  },
  {
    id: 3,
    title: "Why Organic Cotton Matters for Everyday Apparel",
    excerpt: "A deep dive into the sustainability benefits, breathability, and skin comfort of switching to certified organic knitwear.",
    date: "April 15, 2026",
    readTime: "5 min read",
    category: "Sustainability",
    gradient: "from-purple-100 to-emerald-100 dark:from-zinc-900 dark:to-zinc-850",
  }
]

export default function BlogPage() {
  return (
    <div className="flex-1 bg-white text-zinc-950 dark:bg-black dark:text-zinc-50 font-sans">
      
      {/* Blog Hero Heading */}
      <section className="relative bg-zinc-50 dark:bg-zinc-900/40 py-16 lg:py-24 overflow-hidden border-b border-zinc-100 dark:border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative flex flex-col items-center text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Editorial</span>
          <h1 className="text-4xl font-extrabold tracking-tight">The Clotya Journal</h1>
          <p className="text-sm text-zinc-500 max-w-lg leading-relaxed">
            Your source for styling inspiration, sustainable lifestyle ideas, design deep dives, and upcoming seasonal trend reviews.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-semibold bg-white px-3 py-1 rounded-full shadow-sm dark:bg-zinc-900 dark:border dark:border-zinc-850">
            <Sparkles className="h-3 w-3 text-amber-500" />
            <span>Weekly Updates & Lookbooks</span>
          </div>
        </div>
      </section>

      {/* Blog Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogPosts.map((post) => (
            <article key={post.id} className="group flex flex-col justify-between border border-zinc-100 dark:border-zinc-900 rounded-2xl overflow-hidden hover:shadow-md transition duration-300">
              
              {/* Cover Gradient/Mockup Block */}
              <div className={`w-full aspect-[16/10] bg-gradient-to-tr ${post.gradient} p-8 flex flex-col justify-between relative`}>
                <span className="self-start rounded-full bg-white/90 backdrop-blur px-3 py-1 text-[9px] font-bold text-zinc-900 shadow-sm uppercase tracking-wider dark:bg-black/90 dark:text-zinc-50">
                  {post.category}
                </span>

                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white/50 group-hover:scale-105 transition-transform">
                  📝
                </div>
              </div>

              {/* Text Area */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-[10px] text-zinc-400 font-semibold">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-zinc-950 dark:text-zinc-50 group-hover:text-zinc-650 dark:group-hover:text-zinc-350 transition-colors leading-snug">
                    <Link href={`/blog`}>{post.title}</Link>
                  </h3>
                  
                  <p className="text-xs text-zinc-500 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-zinc-50 dark:border-zinc-900">
                  <Link href={`/blog`} className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-950 hover:text-zinc-500 transition-colors dark:text-zinc-50 dark:hover:text-zinc-400">
                    Read Article
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

            </article>
          ))}
        </div>
      </section>

    </div>
  )
}
