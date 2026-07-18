import * as React from "react"
import NextImage from "next/image"
import Link from "next/link"
import type { ComponentProps, ComponentType } from "react"
import { Card, CardContent } from "@/components/ui/card"

const Image = NextImage as ComponentType<ComponentProps<typeof NextImage>>

const newsPosts = [
  {
    id: 1,
    category: "COLLECTION",
    date: "25 Apr 2022",
    title: "The Best Products That Shape Fashion",
    excerpt:
      "Donec rhoncus quis diam sit amet faucibus. Vivamus pellentesque, sem sed convallis ultricies, ante eros",
    image: "/news_fashion_model.png",
  },
  {
    id: 2,
    category: "FASHION",
    date: "25 Apr 2022",
    title: "New Finds From Tuckernuck",
    excerpt:
      "Donec rhoncus quis diam sit amet faucibus. Vivamus pellentesque, sem sed convallis ultricies, ante eros",
    image: "/news_smiling_girl.png",
  },
  {
    id: 3,
    category: "CLOTHING",
    date: "25 Apr 2022",
    title: "Sunset Sets From Saks",
    excerpt:
      "Donec rhoncus quis diam sit amet faucibus. Vivamus pellentesque, sem sed convallis ultricies, ante eros",
    image: "/news_red_sofa.png",
  },
]

export function LatestNews() {
  return (
    <section className="py-20 lg:py-28 bg-white dark:bg-black border-t border-zinc-100 dark:border-zinc-900">
      <div className="max-w-9xl mx-auto px-6 sm:px-12 lg:px-20">
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-semibold tracking-tight text-zinc-955 dark:text-zinc-50 font-serif italic">
            Our Latest News
          </h2>
          <p className="text-sm sm:text-base text-zinc-550 dark:text-zinc-400 leading-relaxed font-light">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra vel facilisis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {newsPosts.map((post) => (
            <Link key={post.id} href={`/blog?id=${post.id}`} className="block">
              <Card
                className="border-none shadow-none bg-transparent flex flex-col group cursor-pointer"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-zinc-50 dark:bg-zinc-900">
                  <Image
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
      </div>
    </section>
  )
}
