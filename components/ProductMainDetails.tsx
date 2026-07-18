"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, Maximize2, Heart, Share2, Ruler, Minus, Plus } from "lucide-react"
import { products, getProductDetails, CartItem } from "@/lib/data"

interface ProductMainDetailsProps {
  productId: number
  col?: string
}

export default function ProductMainDetails({ productId, col = "" }: ProductMainDetailsProps) {
  const product = products.find((p) => p.id === productId) || products[0]
  const meta = getProductDetails(product)

  const collections = product.collections || []
  const activeCollection = (col === "men" || col === "women")
    ? col
    : (collections.includes("men") ? "men" : "women")

  const [activeImage, setActiveImage] = React.useState<string>(
    product.imageUrl || "/products/orange-hoodie.png"
  )
  const [selectedColor, setSelectedColor] = React.useState<string>(
    meta.colors[0]?.name || "black"
  )
  const [selectedSize, setSelectedSize] = React.useState<string | null>(
    meta.defaultSize
  )
  const [qty, setQty] = React.useState<number>(1)
  const [zoomPos, setZoomPos] = React.useState({ x: 0, y: 0 })
  const [isZooming, setIsZooming] = React.useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100
    setZoomPos({ x, y })
  }

  const handleAddToCart = () => {
    const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]")
    const existingIndex = cart.findIndex(
      (item: CartItem) => item.id === product.id && item.color === selectedColor && item.size === selectedSize
    )

    if (existingIndex > -1) {
      cart[existingIndex].qty += qty
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        qty: qty,
        color: selectedColor,
        size: selectedSize || "M"
      })
    }

    localStorage.setItem("cart", JSON.stringify(cart))
    window.dispatchEvent(new Event("cart-updated"))
    alert("Product added to cart successfully!")
  }

  const handleAddToWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
    if (!wishlist.includes(product.id)) {
      wishlist.push(product.id)
      localStorage.setItem("wishlist", JSON.stringify(wishlist))
      window.dispatchEvent(new Event("wishlist-updated"))
      alert("Product added to wishlist successfully!")
    } else {
      alert("Product is already in your wishlist.")
    }
  }


  // Select 2 items for recent views (dynamically pick other items)
  const recentProducts = products.filter((p) => p.id !== product.id).slice(0, 2)

  // Sub images for gallery
  const galleryImages = [
    product.imageUrl,
    product.hoverImageUrl,
    product.imageUrl,
    product.hoverImageUrl
  ].filter(Boolean) as string[]

  const getCategoryLink = (category: string, collection: string) => {
    const cat = category.toLowerCase()
    if (cat === "outerwear") {
      return `/allProductCategories?category=${collection}&sub=Jackets %26 coats`
    }
    if (cat === "shirts") {
      return `/allProductCategories?category=${collection}&sub=${collection === "men" ? "Shirts" : "Tops"}`
    }
    if (cat === "pants") {
      return `/allProductCategories?category=${collection}&sub=${collection === "men" ? "Pants" : "Jeans"}`
    }
    return `/allProductCategories?category=${cat}`
  }

  return (
    <section className="py-12 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
        
        {/* Breadcrumb Navigation */}
        <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest mb-8">
          <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition">Home</Link>
          <span className="mx-2">/</span>
          <Link href={`/allProductCategories?category=${activeCollection === "men" ? "men" : "women"}`}>
            <span className="hover:text-zinc-900 dark:hover:text-zinc-100 transition">
              {activeCollection === "men" ? "Men" : "Women"}
            </span>
          </Link>
          <span className="mx-2">/</span>
          <Link href={getCategoryLink(product.category, activeCollection)}>
            <span className="hover:text-zinc-900 dark:hover:text-zinc-100 transition">{product.category}</span>
          </Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-900 dark:text-zinc-100">{product.name}</span>
        </div>

        {/* 3-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column - Image Gallery (Aspect Ratio 4/5) */}
          <div className="lg:col-span-5 flex flex-col">
            <div 
              className="relative w-full aspect-[4/5] bg-zinc-50 dark:bg-zinc-900 overflow-hidden border border-zinc-100 dark:border-zinc-900 cursor-zoom-in"
              onMouseEnter={() => setIsZooming(true)}
              onMouseLeave={() => setIsZooming(false)}
              onMouseMove={handleMouseMove}
            >
              <Image
                src={activeImage}
                alt={product.name}
                fill
                priority
                className="object-cover transition-transform duration-100 ease-out"
                style={{
                  transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                  transform: isZooming ? "scale(2.2)" : "scale(1)",
                }}
                sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 42vw, 540px"
              />
              
              {/* Maximize Icon */}
              <button className="absolute top-4 right-4 h-10 w-10 bg-white hover:bg-zinc-50 border border-zinc-100 shadow-sm rounded-full flex items-center justify-center transition cursor-pointer select-none z-10">
                <Maximize2 className="h-4 w-4 text-zinc-900" />
              </button>
            </div>

            {/* Thumbnails Row */}
            <div className="flex items-center gap-3 mt-4 overflow-x-auto pb-1">
              {galleryImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(img)}
                  className={`relative w-20 aspect-[4/5] bg-zinc-50 border-2 overflow-hidden transition cursor-pointer ${
                    activeImage === img
                      ? "border-zinc-950 dark:border-zinc-50"
                      : "border-transparent hover:border-zinc-300 dark:hover:border-zinc-700"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} gallery image ${i + 1}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Middle Column - Configurator */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <div>
              <h1 className="text-3xl font-medium tracking-tight text-zinc-950 dark:text-zinc-50 leading-[1.15] font-sans">
                {product.name}
              </h1>

              {/* Reviews Stars */}
              <div className="flex items-center gap-2 mt-3 select-none">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current stroke-none" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500">
                  [{product.reviews} reviews]
                </span>
              </div>

              {/* Prices */}
              <div className="flex items-baseline gap-3 mt-4 font-sans">
                {product.originalPrice && (
                  <span className="text-sm line-through text-zinc-400 font-light">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                <span className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            </div>

            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-light">
              {meta.description}
            </p>

            {/* Colors Section */}
            <div className="space-y-2.5">
              <div className="text-xs font-bold text-zinc-950 dark:text-zinc-50 uppercase tracking-wider">
                Color: <span className="font-light text-zinc-550 dark:text-zinc-400 lowercase capitalize">{selectedColor}</span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {meta.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`h-6 w-6 rounded-full cursor-pointer transition ${
                      c.name === "white" ? "border border-zinc-250" : ""
                    } ${
                      selectedColor === c.name
                        ? "ring-2 ring-red-500 ring-offset-2 dark:ring-offset-black"
                        : "hover:scale-105"
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Sizes Section */}
            <div className="space-y-2.5">
              <div className="text-xs font-bold text-zinc-950 dark:text-zinc-50 uppercase tracking-wider">
                Size: <span className="font-light text-zinc-550 dark:text-zinc-400">{selectedSize || "None"}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {meta.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`h-10 px-4 border text-xs font-semibold flex items-center justify-center transition cursor-pointer select-none ${
                      selectedSize === s
                        ? "bg-red-500 text-white border-red-500 hover:bg-red-600 hover:border-red-600"
                        : "border-zinc-200 hover:border-zinc-950 dark:border-zinc-800 dark:hover:border-zinc-50 text-zinc-800 dark:text-zinc-200"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* Clear button */}
              {selectedSize && (
                <button
                  onClick={() => setSelectedSize(null)}
                  className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest hover:text-zinc-950 dark:hover:text-zinc-100 transition flex items-center gap-1 mt-1 cursor-pointer select-none"
                >
                  ✕ Clear
                </button>
              )}
            </div>

            {/* Stock Badge */}
            <div className="pt-1">
              <span className="inline-flex items-center px-3 py-1 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 text-xs font-semibold rounded-md border border-emerald-100 dark:border-emerald-950/40 select-none">
                In Stock
              </span>
            </div>

            {/* Add to Cart Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <div className="flex items-center self-start border border-zinc-200 dark:border-zinc-850 rounded-none bg-white dark:bg-zinc-900 select-none">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="h-10 w-10 flex items-center justify-center text-zinc-500 hover:text-zinc-950 hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer transition-colors"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <div className="h-10 w-12 flex items-center justify-center text-xs font-semibold text-zinc-950 dark:text-zinc-50 font-sans">
                  {qty}
                </div>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="h-10 w-10 flex items-center justify-center text-zinc-500 hover:text-zinc-950 hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer transition-colors"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>

              <button 
                onClick={handleAddToCart}
                className="flex-1 h-10 bg-black text-white hover:bg-zinc-900 dark:bg-white dark:text-black dark:hover:bg-zinc-100 text-xs font-bold uppercase tracking-widest flex items-center justify-center transition-colors cursor-pointer select-none"
              >
                Add to cart
              </button>
            </div>

            {/* Size Guide, Wishlist & Share Section */}
            <div className="flex flex-wrap gap-x-6 gap-y-3 pt-6 border-t border-zinc-100 dark:border-zinc-900/50 text-xs font-semibold text-zinc-550 dark:text-zinc-450 select-none">
              <button className="flex items-center gap-1.5 hover:text-zinc-950 dark:hover:text-zinc-50 cursor-pointer transition">
                <Ruler className="h-3.5 w-3.5 stroke-[1.5]" />
                Size Guide
              </button>
              <button 
                onClick={handleAddToWishlist}
                className="flex items-center gap-1.5 hover:text-zinc-950 dark:hover:text-zinc-50 cursor-pointer transition"
              >
                <Heart className="h-3.5 w-3.5 stroke-[1.5]" />
                Add to wishlist
              </button>
              <button className="flex items-center gap-1.5 hover:text-zinc-950 dark:hover:text-zinc-50 cursor-pointer transition">
                <Share2 className="h-3.5 w-3.5 stroke-[1.5]" />
                Share this Product
              </button>
            </div>

            {/* Product Meta Section */}
            <div className="space-y-1.5 pt-6 border-t border-zinc-100 dark:border-zinc-900/50 text-xs text-zinc-450 dark:text-zinc-500 font-sans tracking-wide">
              <div>
                <span className="font-semibold text-zinc-700 dark:text-zinc-300">SKU:</span> BE{product.id}GRT
              </div>
              <div>
                <span className="font-semibold text-zinc-700 dark:text-zinc-300">Categories:</span> {product.category.toUpperCase()}, {product.collections.map((c) => c.toUpperCase()).join(", ")}
              </div>
              <div>
                <span className="font-semibold text-zinc-700 dark:text-zinc-300">Tags:</span> {meta.tags.join(", ")}
              </div>
            </div>

          </div>

          {/* Right Column - Recent Views */}
          <div className="lg:col-span-2 flex flex-col border-t lg:border-t-0 lg:border-l border-zinc-100 dark:border-zinc-900/50 pt-8 lg:pt-0 lg:pl-8">
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-zinc-950 dark:text-zinc-50 border-b border-zinc-100 dark:border-zinc-900 pb-3 mb-5 select-none">
              Recent Views
            </h4>
            <div className="flex flex-col gap-6">
              {recentProducts.map((p) => (
                <div key={p.id} className="flex gap-3 group">
                  <div className="relative w-12 aspect-[4/5] shrink-0 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-900 overflow-hidden">
                    <Image
                      src={p.imageUrl || "/products/orange-hoodie.png"}
                      alt={p.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col space-y-1 justify-center">
                    <Link
                      href={`/shop?id=${p.id}`}
                      className="text-[11px] font-semibold leading-snug hover:underline text-zinc-900 dark:text-zinc-100 line-clamp-2"
                    >
                      {p.name}
                    </Link>
                    <div className="flex items-baseline gap-1.5 text-[10px] font-semibold font-sans">
                      {p.originalPrice && (
                        <span className="text-zinc-400 line-through">${p.originalPrice.toFixed(2)}</span>
                      )}
                      <span className="text-zinc-900 dark:text-zinc-50">${p.price.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
