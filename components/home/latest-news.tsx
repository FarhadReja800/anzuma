"use client"

import * as React from "react"
import NextImage from "next/image"
import Link from "next/link"
import type { ComponentProps, ComponentType } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { getAllNews } from "@/store/api/news"
import { NewsItem } from "@/data/news"
import { SafeImage } from "@/components/ui/safe-image"

interface NewsPost {
  id: string | number
  category: string
  date: string
  title: string
  excerpt: string
  image: string
}

export function LatestNews() {
  const [posts, setPosts] = React.useState<NewsPost[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    async function loadNews() {
      setLoading(true)
      try {
        const response = await getAllNews()
        const rawList = Array.isArray(response) 
          ? response 
          : Array.isArray(response?.data) 
          ? response.data 
          : []

        if (Array.isArray(rawList)) {
          const mapped: NewsPost[] = rawList.slice(0, 3).map((item) => ({
            id: item._id || item.id || item.slug || Math.random().toString(),
            category: (item.category || "General").toUpperCase(),
            date: item.createdAt ? new Date(item.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "Recent",
            title: item.title,
            excerpt: item.excerpt || (item.content ? item.content.substring(0, 100) : ""),
            image: item.image || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
          }))
          setPosts(mapped)
        }
      } catch (err) {
        console.error("Failed to load latest news for homepage:", err)
      } finally {
        setLoading(false)
      }
    }
    loadNews()
  }, [])

  if (!loading && posts.length === 0) {
    return null
  }

  return (
    <section className="py-20 lg:py-28 bg-white dark:bg-black border-t border-zinc-100 dark:border-zinc-900">
      <div className="max-w-9xl mx-auto px-6 sm:px-12 lg:px-20">
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-semibold tracking-tight text-zinc-955 dark:text-zinc-50 font-serif italic">
            Our Latest News
          </h2>
          <p className="text-sm sm:text-base text-zinc-550 dark:text-zinc-400 leading-relaxed font-light">
            Stay up to date with our newest blog posts and announcements.
          </p>
        </div>

        {loading ? (
          <div className="py-12 text-center text-xs font-bold uppercase tracking-widest text-zinc-400 animate-pulse">
            Loading latest news...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog?id=${post.id}`} className="block">
                <Card
                  className="border-none shadow-none bg-transparent flex flex-col group cursor-pointer"
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-zinc-50 dark:bg-zinc-900">
                    <SafeImage
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                  <CardContent className="p-0 pt-6 space-y-3">
                    <div className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-zinc-450 dark:text-zinc-500">
                      {post.category} — {post.date}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 leading-snug group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm font-light text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
