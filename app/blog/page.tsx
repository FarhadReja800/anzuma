"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { BlogPost } from "./_components/types"
import { BlogDetail } from "./_components/blog-detail"
import { BlogList } from "./_components/blog-list"
import { BlogSidebar } from "./_components/blog-sidebar"

// Blog Posts Data matching the user's screenshots exactly
const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Best Products That Shape Fashion",
    excerpt: "Donec rhoncus quis diam sit amet faucibus. Vivamus pellentesque, sem sed convallis ultricies, ante eros laoreet libero, vitae suscipit lorem turpis sit amet lectus. Quisque egestas lorem ut mauris ultrices, vitae sollicitudin quam facilisis. Vivamus rutrum urna non ligula tempor aliquet. Fusce tincidunt est magna, id malesuada massa imperdiet ut. Nunc non nisi urna. Nam",
    date: "April 25, 2022",
    category: "Collection",
    tags: ["products", "woocommerce", "fashion"],
    image: "/news_fashion_model.png",
    paragraphs: [
      "Donec rhoncus quis diam sit amet faucibus. Vivamus pellentesque, sem sed convallis ultricies, ante eros laoreet libero, vitae suscipit lorem turpis sit amet lectus. Quisque egestas lorem ut mauris ultrices, vitae sollicitudin quam facilisis. Vivamus rutrum urna non ligula tempor aliquet. Fusce tincidunt est magna, id malesuada massa imperdiet ut. Nunc non nisi urna. Nam consequat est nec turpis eleifend ornare. Vestibulum eu justo lobortis mauris commodo efficitur. Nunc pulvinar pulvinar cursus.",
      "Nulla id nibh ligula. Etiam finibus elit nec nisl faucibus, vel auctor tortor iaculis. Vivamus aliquet ipsum purus, vel auctor felis interdum at. Praesent quis fringilla justo. Ut non dui at mi laoreet gravida vitae eu elit. Aliquam in elit eget purus scelerisque efficitur vel ac sem. Etiam ante magna, vehicula et vulputate in, aliquam sit amet metus. Donec mauris eros, aliquet in nibh quis, semper suscipit nunc. Phasellus ornare nibh vitae dapibus tempor.",
      "Vivamus libero leo, tincidunt eget lectus rhoncus, finibus interdum neque. Curabitur aliquet dolor purus, id molestie purus elementum vitae. Sed quis aliquet eros. Morbi condimentum ornare nibh, et tincidunt ante interdum facilisis. Praesent sagittis tortor at felis finibus vestibulum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus dapibus turpis sit amet turpis tincidunt, sit amet mollis turpis suscipit. Proin arcu diam, pretium nec tempus eu, feugiat non ex."
    ],
    blockquote: "Fashion is not something that exists in dresses only. Fashion is in the sky, in the street, fashion has to do with ideas, the way we live, what is happening."
  },
  {
    id: 2,
    title: "New Finds From Tuckernuck",
    excerpt: "Discover the latest arrivals from Tuckernuck that are perfect for your seasonal wardrobe update. From flowy dresses to crisp linen shirts, explore our top picks.",
    date: "April 25, 2022",
    category: "Clothing",
    tags: ["clothing", "fashion", "store"],
    image: "/news_smiling_girl.png",
    paragraphs: [
      "Donec rhoncus quis diam sit amet faucibus. Vivamus pellentesque, sem sed convallis ultricies, ante eros laoreet libero, vitae suscipit lorem turpis sit amet lectus. Quisque egestas lorem ut mauris ultrices, vitae sollicitudin quam facilisis. Vivamus rutrum urna non ligula tempor aliquet. Fusce tincidunt est magna, id malesuada massa imperdiet ut. Nunc non nisi urna. Nam consequat est nec turpis eleifend ornare. Vestibulum eu justo lobortis mauris commodo efficitur. Nunc pulvinar pulvinar cursus.",
      "Nulla id nibh ligula. Etiam finibus elit nec nisl faucibus, vel auctor tortor iaculis. Vivamus aliquet ipsum purus, vel auctor felis interdum at. Praesent quis fringilla justo. Ut non dui at mi laoreet gravida vitae eu elit. Aliquam in elit eget purus scelerisque efficitur vel ac sem. Etiam ante magna, vehicula et vulputate in, aliquam sit amet metus. Donec mauris eros, aliquet in nibh quis, semper suscipit nunc. Phasellus ornare nibh vitae dapibus tempor."
    ],
    blockquote: "Style is a way to say who you are without having to speak."
  },
  {
    id: 3,
    title: "Sunset Sets From Saks",
    excerpt: "Get ready for golden hour with these gorgeous sunset-inspired sets from Saks. Perfect for beachside dinners or rooftop parties.",
    date: "April 25, 2022",
    category: "Clothing",
    tags: ["kibitheme", "themeforest"],
    image: "/news_red_sofa.png",
    paragraphs: [
      "Donec rhoncus quis diam sit amet faucibus. Vivamus pellentesque, sem sed convallis ultricies, ante eros laoreet libero, vitae suscipit lorem turpis sit amet lectus. Quisque egestas lorem ut mauris ultrices, vitae sollicitudin quam facilisis. Vivamus rutrum urna non ligula tempor aliquet. Fusce tincidunt est magna, id malesuada massa imperdiet ut. Nunc non nisi urna. Nam consequat est nec turpis eleifend ornare. Vestibulum eu justo lobortis mauris commodo efficitur. Nunc pulvinar pulvinar cursus.",
      "Nulla id nibh ligula. Etiam finibus elit nec nisl faucibus, vel auctor tortor iaculis. Vivamus aliquet ipsum purus, vel auctor felis interdum at. Praesent quis fringilla justo. Ut non dui at mi laoreet gravida vitae eu elit. Aliquam in elit eget purus scelerisque efficitur vel ac sem. Etiam ante magna, vehicula et vulputate in, aliquam sit amet metus. Donec mauris eros, aliquet in nibh quis, semper suscipit nunc. Phasellus ornare nibh vitae dapibus tempor.",
      "Vivamus libero leo, tincidunt eget lectus rhoncus, finibus interdum neque. Curabitur aliquet dolor purus, id molestie purus elementum vitae. Sed quis aliquet eros. Morbi condimentum ornare nibh, et tincidunt ante interdum facilisis. Praesent sagittis tortor at felis finibus vestibulum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus dapibus turpis sit amet turpis tincidunt, sit amet mollis turpis suscipit. Proin arcu diam, pretium nec tempus eu, feugiat non ex.",
      "Nulla id nibh ligula. Etiam finibus elit nec nisl faucibus, vel auctor tortor iaculis. Vivamus aliquet ipsum purus, vel auctor felis interdum at. Praesent quis fringilla justo. Ut non dui at mi laoreet gravida vitae eu elit. Aliquam in elit eget purus scelerisque efficitur vel ac sem. Etiam ante magna, vehicula et vulputate in, aliquam sit amet metus. Donec mauris eros, aliquet in nibh quis, semper suscipit nunc. Phasellus ornare nibh vitae dapibus tempor.",
      "Donec feugiat tincidunt eros, ac aliquam purus egestas condimentum. Curabitur imperdiet at leo pellentesque mattis. Fusce a dignissim est. In enim nisi, hendrerit placerat nunc quis, porttitor lobortis neque. Donec nec nulla arcu. Proin felis augue, volutpat ac nunc a, semper egestas dolor. Sed varius magna non lacus viverra, at dapibus sem interdum. Proin urna nibh, maximus nec interdum ut, hendrerit et arcu. Nunc venenatis eget nulla at tempor. Duis sed tellus placerat, bibendum felis quis, efficitur nisi. Morbi porta placerat urna et pharetra. Proin condimentum, libero ac feugiat efficitur, est orci consectetur sapien, a pretium leo leo in elit. Quisque fringilla finibus arcu, pretium posuere urna posuere sit amet. Nullam quis sapien a augue aliquet accumsan eget eu risus. Ut at mi velit condimentum porta. Proin vestibulum congue ullamcorper.",
      "Nunc blandit ligula mi, quis commodo dolor fermentum sit amet. Nam vehicula pharetra lacus a vulputate. Duis pulvinar vestibulum dolor, vel commodo arcu laoreet ac. Vestibulum sed consequat purus, vitae auctor metus. Duis ut aliquet odio, at tincidunt nunc. Vestibulum dignissim aliquet orci, rutrum malesuada ipsum facilisis vel. Morbi tempor dignissim nisi. Maecenas scelerisque maximus justo eget sodales. Sed finibus consectetur vulputate. Pellentesque id pellentesque nulla. Sed ut viverra eros. Vestibulum ut ligula quam."
    ],
    blockquote: "Aliquam purus enim, fringilla vel nunc imperdiet, consequat ultricies massa. Praesent sed turpis sollicitudin, dignissim justo vel, fringilla mi."
  }
]

const categories = ["Clothing", "Collection", "Dresses", "Fashion"]

const allTags = [
  "clothing",
  "fashion",
  "kibitheme",
  "products",
  "store",
  "themeforest",
  "woocommerce"
]

function BlogPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const urlId = searchParams.get("id")

  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null)
  const [selectedTag, setSelectedTag] = React.useState<string | null>(null)

  // Memoized selected post derived directly from URL parameter to avoid cascading renders
  const selectedPost = React.useMemo(() => {
    if (!urlId) return null
    const parsedId = Number(urlId)
    if (isNaN(parsedId)) return null
    return blogPosts.find((post) => post.id === parsedId) || null
  }, [urlId])

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
  }, [searchQuery, selectedCategory, selectedTag])

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

  const handlePostClick = (postId: number) => {
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
      <div className="flex-1 bg-white text-zinc-950 dark:bg-black dark:text-zinc-50 font-sans py-20 text-center">
        Loading Blog...
      </div>
    }>
      <BlogPageContent />
    </React.Suspense>
  )
}
