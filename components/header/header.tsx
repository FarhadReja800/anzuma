"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useSearchParams, useRouter } from "next/navigation"
import { 
  Menu, 
  Search, 
  User, 
  Heart, 
  ShoppingBag, 
  ChevronDown,
  Sparkles,
  X
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { announcement, products, Product, CartItem } from "@/lib/data"
import Image from "next/image"

export function Header() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  const [wishlistCount, setWishlistCount] = React.useState(0)
  const [wishlistItems, setWishlistItems] = React.useState<Product[]>([])
  const [cartCount, setCartCount] = React.useState(0)
  const [cartTotal, setCartTotal] = React.useState(0.0)
  const [cartItems, setCartItems] = React.useState<CartItem[]>([])
  const [searchQuery, setSearchQuery] = React.useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  const isActive = (href: string) => {
    const normalize = (path: string) => path.replace(/\/$/, "") || "/"
    const normPathname = normalize(pathname)

    // Special case for outerwear: active on /outerwear and /allProductCategories?category=outerwear
    if (href === "/outerwear") {
      if (normPathname === "/outerwear") return true
      if (normPathname === "/allProductCategories" && searchParams.get("category") === "outerwear") return true
      return false
    }

    if (href.includes("?")) {
      const [basePath, searchStr] = href.split("?")
      if (normPathname !== normalize(basePath)) return false
      
      const categoryParam = searchParams.get("category")
      const hrefParam = new URLSearchParams(searchStr).get("category")
      return categoryParam === hrefParam
    }
    return normPathname === normalize(href)
  }

  // Load and synchronize cart and wishlist state
  React.useEffect(() => {
    const syncStorage = () => {
      // Sync Cart
      const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]")
      const count = cart.reduce((sum: number, item: CartItem) => sum + item.qty, 0)
      const total = cart.reduce((sum: number, item: CartItem) => sum + (item.price * item.qty), 0)
      setCartCount(count)
      setCartTotal(total)
      setCartItems(cart)

      // Sync Wishlist
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
      const items = products.filter((p) => wishlist.includes(p.id))
      setWishlistCount(wishlist.length)
      setWishlistItems(items)
    }

    syncStorage()

    window.addEventListener("cart-updated", syncStorage)
    window.addEventListener("wishlist-updated", syncStorage)
    window.addEventListener("storage", syncStorage)

    return () => {
      window.removeEventListener("cart-updated", syncStorage)
      window.removeEventListener("wishlist-updated", syncStorage)
      window.removeEventListener("storage", syncStorage)
    }
  }, [])

  const handleClearCart = () => {
    localStorage.removeItem("cart")
    window.dispatchEvent(new Event("cart-updated"))
  }

  const handleClearWishlist = () => {
    localStorage.removeItem("wishlist")
    window.dispatchEvent(new Event("wishlist-updated"))
  }

  const handleRemoveFromWishlist = (id: number) => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
    const updated = wishlist.filter((item: number) => item !== id)
    localStorage.setItem("wishlist", JSON.stringify(updated))
    window.dispatchEvent(new Event("wishlist-updated"))
  }

  const handleAddToCart = () => {
    const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]")
    const demoItem: CartItem = {
      id: 9999,
      name: "Demo Premium Sweatshirt",
      price: 49.99,
      qty: 1,
      color: "Black",
      size: "M"
    }
    const existingIndex = cart.findIndex((item: CartItem) => item.id === demoItem.id)
    if (existingIndex > -1) {
      cart[existingIndex].qty += 1
    } else {
      cart.push(demoItem)
    }
    localStorage.setItem("cart", JSON.stringify(cart))
    window.dispatchEvent(new Event("cart-updated"))
  }

  const handleAddToWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
    if (!wishlist.includes(9999)) {
      wishlist.push(9999)
      localStorage.setItem("wishlist", JSON.stringify(wishlist))
      window.dispatchEvent(new Event("wishlist-updated"))
    }
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/allProductCategories?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery("")
    }
  }

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md transition-all duration-300 dark:border-zinc-800 dark:bg-black/95">
      {/* Top Banner (Optional micro-animation detail for a wowed effect) */}
      <div className="flex h-9 w-full items-center justify-center bg-zinc-950 px-4 text-center text-xs font-medium tracking-wide text-zinc-100 dark:bg-zinc-900">
        <Sparkles className="mr-1.5 h-3 w-3 text-amber-400 animate-pulse" />
        <span>Mid-Season Sale: {announcement.discountText}. Use Code: <span className="font-bold underline text-amber-300">{announcement.code}</span></span>
      </div>

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left Side: Menu Trigger & Logo */}
        <div className="flex items-center gap-4 lg:gap-6">
          {/* Sidebar Drawer Menu (Triggerable on Desktop & Mobile) */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative h-10 w-10 text-zinc-800 hover:bg-zinc-100 hover:text-black dark:text-zinc-200 dark:hover:bg-zinc-900 dark:hover:text-white"
              >
                <Menu className="h-6 w-6 stroke-[1.5]" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[320px] p-0 flex flex-col bg-white dark:bg-zinc-950 border-r dark:border-zinc-850">
              <SheetHeader className="p-6 border-b border-zinc-100 dark:border-zinc-900 flex flex-row items-center justify-between">
                <SheetTitle className="text-xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 flex items-center">
                  <Image
                    src="/ChatGPT Image Jun 27, 2026, 10_41_50 PM.png"
                    alt="Arzuma Logo"
                    width={90}
                    height={30}
                    className="inline-block mr-2"
                  />
                  <span className="text-[10px] font-bold text-zinc-500 align-super">®</span>
                </SheetTitle>
              </SheetHeader>
              
              {/* Mobile Drawer Menu Links */}
              <div className="flex-1 overflow-y-auto py-6 px-6 space-y-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <div className="space-y-4">
                  <h3 className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Categories</h3>
                  <nav className="flex flex-col gap-3">
                    <Link 
                      href="/" 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="group flex items-center justify-between text-base font-semibold text-zinc-950 hover:text-zinc-600 transition-colors dark:text-zinc-50 dark:hover:text-zinc-300"
                    >
                      Home
                      <ChevronDown className="h-4 w-4 -rotate-90 text-zinc-400 group-hover:text-zinc-600" />
                    </Link>
                    <Link 
                      href="/shop" 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="group flex items-center justify-between text-base font-semibold text-zinc-950 hover:text-zinc-600 transition-colors dark:text-zinc-50 dark:hover:text-zinc-300"
                    >
                      Shop
                      <ChevronDown className="h-4 w-4 -rotate-90 text-zinc-400 group-hover:text-zinc-600" />
                    </Link>
                    <Link 
                      href="/allProductCategories?category=women" 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center justify-between text-base font-medium transition-colors ${
                        isActive("/allProductCategories?category=women")
                          ? "text-zinc-950 dark:text-white font-bold border-l-2 border-zinc-950 dark:border-white pl-2"
                          : "text-zinc-800 hover:text-zinc-600 dark:text-zinc-300 dark:hover:text-white"
                      }`}
                    >
                      Women
                    </Link>
                    <Link 
                      href="/allProductCategories?category=men" 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center justify-between text-base font-medium transition-colors ${
                        isActive("/allProductCategories?category=men")
                          ? "text-zinc-950 dark:text-white font-bold border-l-2 border-zinc-950 dark:border-white pl-2"
                          : "text-zinc-800 hover:text-zinc-600 dark:text-zinc-300 dark:hover:text-white"
                      }`}
                    >
                      Men
                    </Link>
                    <Link 
                      href="/outerwear" 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center justify-between text-base font-medium transition-colors ${
                        isActive("/outerwear")
                          ? "text-zinc-950 dark:text-white font-bold border-l-2 border-zinc-950 dark:border-white pl-2"
                          : "text-zinc-800 hover:text-zinc-600 dark:text-zinc-300 dark:hover:text-white"
                      }`}
                    >
                      Outerwear
                    </Link>
                    <Link 
                      href="/blog" 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center justify-between text-base font-medium transition-colors ${
                        isActive("/blog")
                          ? "text-zinc-950 dark:text-white font-bold border-l-2 border-zinc-950 dark:border-white pl-2"
                          : "text-zinc-800 hover:text-zinc-600 dark:text-zinc-300 dark:hover:text-white"
                      }`}
                    >
                      Blog
                    </Link>
                    <Link 
                      href="/contact" 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center justify-between text-base font-medium transition-colors ${
                        isActive("/contact")
                          ? "text-zinc-950 dark:text-white font-bold border-l-2 border-zinc-950 dark:border-white pl-2"
                          : "text-zinc-800 hover:text-zinc-600 dark:text-zinc-300 dark:hover:text-white"
                      }`}
                    >
                      Contact
                    </Link>
                  </nav>
                </div>

                <div className="pt-6 space-y-4">
                  <h3 className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Account & Wishlist</h3>
                  <div className="flex flex-col gap-3">
                    <Link
                      href="/auth?mode=login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex w-full items-center justify-between rounded-lg bg-zinc-50 px-4 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-100 transition dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
                    >
                      <span>My Account / Login</span>
                      <User className="h-4 w-4 text-zinc-500" />
                    </Link>
                    <div className="flex flex-col gap-1.5 bg-zinc-50 dark:bg-zinc-900 rounded-lg p-3">
                      <div className="flex w-full items-center justify-between text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                        <span>My Wishlist ({wishlistCount})</span>
                        <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                      </div>
                      
                      {wishlistCount > 0 ? (
                        <div className="mt-2 space-y-2 border-t border-zinc-200/50 dark:border-zinc-800 pt-2 max-h-40 overflow-y-auto [&::-webkit-scrollbar]:hidden">
                          {wishlistItems.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between py-1 text-xs">
                              <Link 
                                href={`/shop?id=${item.id}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-zinc-800 dark:text-zinc-200 hover:underline truncate max-w-[150px]"
                              >
                                {item.name}
                              </Link>
                              <button
                                onClick={() => handleRemoveFromWishlist(item.id)}
                                className="text-red-500 hover:underline text-[10px]"
                              >
                                Remove
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-[11px] text-zinc-450 dark:text-zinc-550 italic mt-0.5">Your wishlist is empty</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-6 space-y-4">
                  <h3 className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Quick Actions (Demo)</h3>
                  <div className="flex flex-col gap-3">
                    <button 
                      onClick={() => { handleAddToCart(); setIsMobileMenuOpen(false); }}
                      className="flex w-full items-center justify-between rounded-lg bg-zinc-50 px-4 py-3 text-sm font-medium text-zinc-900 hover:bg-zinc-100 transition dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
                    >
                      <span>Add Demo Item to Cart</span>
                      <span className="text-zinc-400 text-xs">$49.99</span>
                    </button>
                    <button 
                      onClick={() => { handleAddToWishlist(); setIsMobileMenuOpen(false); }}
                      className="flex w-full items-center justify-between rounded-lg bg-zinc-50 px-4 py-3 text-sm font-medium text-zinc-900 hover:bg-zinc-100 transition dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
                    >
                      <span>Add Demo Item to Wishlist</span>
                      <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Mobile Drawer Footer */}
              <div className="p-6 border-t border-zinc-100 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-900/50">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Guest User</h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">welcome@clotya.com</p>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="group flex items-center select-none shrink-0">
            <span className="text-2xl font-black tracking-tight text-zinc-950 dark:text-zinc-50 transition-colors duration-200 hover:opacity-85 font-sans whitespace-nowrap flex items-center">
              <Image  
                src="/ChatGPT Image Jun 27, 2026, 10_41_50 PM.png"
                alt="Arzuma Logo"
                width={120}
                height={40}
                className="inline-block mr-1 max-w-[90px] sm:max-w-[120px] h-auto"
              />
              <span className="text-[10px] font-bold text-zinc-500 align-super">®</span>
            </span>
          </Link>
        </div>

        {/* Center: Desktop Navigation Links (Responsive display block on lg screen) */}
        <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
          
          {/* HOME Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="group flex items-center gap-1 text-[13px] font-bold tracking-widest text-zinc-900 hover:text-zinc-500 transition-colors duration-200 dark:text-zinc-100 dark:hover:text-zinc-400 outline-none cursor-pointer">
                <span>HOME</span>
                <ChevronDown className="h-3 w-3 text-zinc-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56 p-2 bg-white dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-800 rounded-xl shadow-xl">
              <DropdownMenuLabel className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 px-3 py-2">Layout Styles</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-zinc-100 dark:bg-zinc-900" />
              <DropdownMenuItem className="rounded-lg px-3 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-900 cursor-pointer">
                <Link href="/" className="w-full text-xs font-semibold text-zinc-700 dark:text-zinc-300">Modern E-commerce</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-lg px-3 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-900 cursor-pointer">
                <Link href="/" className="w-full text-xs font-semibold text-zinc-700 dark:text-zinc-300">Minimalist Showcase</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-lg px-3 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-900 cursor-pointer">
                <Link href="/" className="w-full text-xs font-semibold text-zinc-700 dark:text-zinc-300">Grid Directory</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* SHOP Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="group flex items-center gap-1 text-[13px] font-bold tracking-widest text-zinc-900 hover:text-zinc-500 transition-colors duration-200 dark:text-zinc-100 dark:hover:text-zinc-400 outline-none cursor-pointer">
                <span>SHOP</span>
                <ChevronDown className="h-3 w-3 text-zinc-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64 p-2 bg-white dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-800 rounded-xl shadow-xl">
              <DropdownMenuLabel className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 px-3 py-2">Catalog Grid</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-zinc-100 dark:bg-zinc-900" />
              <DropdownMenuItem className="rounded-lg px-3 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-900 cursor-pointer">
                <Link href="/shop" className="w-full text-xs font-semibold text-zinc-700 dark:text-zinc-300">New Arrivals</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-lg px-3 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-900 cursor-pointer">
                <Link href="/shop" className="w-full text-xs font-semibold text-zinc-700 dark:text-zinc-300">Best Sellers</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-lg px-3 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-900 cursor-pointer">
                <Link href="/shop" className="w-full text-xs font-semibold text-zinc-700 dark:text-zinc-300">Discount & Promotions</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Simple Link Items */}
          <Link
            href="/allProductCategories?category=women"
            className={`relative text-[13px] font-bold tracking-widest transition-colors duration-200 ${
              isActive("/allProductCategories?category=women")
                ? "text-zinc-950 dark:text-white after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-zinc-950 dark:after:bg-white"
                : "text-zinc-900 hover:text-zinc-500 dark:text-zinc-100 dark:hover:text-zinc-400"
            }`}
          >
            WOMEN
          </Link>
          <Link
            href="/allProductCategories?category=men"
            className={`relative text-[13px] font-bold tracking-widest transition-colors duration-200 ${
              isActive("/allProductCategories?category=men")
                ? "text-zinc-950 dark:text-white after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-zinc-950 dark:after:bg-white"
                : "text-zinc-900 hover:text-zinc-500 dark:text-zinc-100 dark:hover:text-zinc-400"
            }`}
          >
            MEN
          </Link>
          <Link
            href="/outerwear"
            className={`relative text-[13px] font-bold tracking-widest transition-colors duration-200 ${
              isActive("/outerwear")
                ? "text-zinc-950 dark:text-white after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-zinc-950 dark:after:bg-white"
                : "text-zinc-900 hover:text-zinc-500 dark:text-zinc-100 dark:hover:text-zinc-400"
            }`}
          >
            OUTERWEAR
          </Link>
          <Link
            href="/blog"
            className={`relative text-[13px] font-bold tracking-widest transition-colors duration-200 ${
              isActive("/blog")
                ? "text-zinc-950 dark:text-white after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-zinc-950 dark:after:bg-white"
                : "text-zinc-900 hover:text-zinc-500 dark:text-zinc-100 dark:hover:text-zinc-400"
            }`}
          >
            BLOG
          </Link>
          <Link
            href="/contact"
            className={`relative text-[13px] font-bold tracking-widest transition-colors duration-200 ${
              isActive("/contact")
                ? "text-zinc-950 dark:text-white after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-zinc-950 dark:after:bg-white"
                : "text-zinc-900 hover:text-zinc-500 dark:text-zinc-100 dark:hover:text-zinc-400"
            }`}
          >
            CONTACT
          </Link>
        </nav>

        {/* Right Side: Account, Search, Wishlist, Cart & Price */}
        <div className="flex items-center gap-3 sm:gap-4 md:gap-5">
                  {/* User Account Link (Redirects to Login form) */}
          <Link href="/auth?mode=login" className="hidden sm:block">
            <Button variant="ghost" size="icon" className="h-10 w-10 text-zinc-800 hover:bg-zinc-100 hover:text-black dark:text-zinc-200 dark:hover:bg-zinc-900 dark:hover:text-white rounded-full">
              <User className="h-[21px] w-[21px] stroke-[1.5]" />
              <span className="sr-only">Account</span>
            </Button>
          </Link>

          {/* Search Icon (Dialog Trigger) */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10 text-zinc-800 hover:bg-zinc-100 hover:text-black dark:text-zinc-200 dark:hover:bg-zinc-900 dark:hover:text-white rounded-full">
                <Search className="h-[21px] w-[21px] stroke-[1.5]" />
                <span className="sr-only">Search</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="fixed top-0 left-0 right-0 translate-x-0 translate-y-0 w-full max-w-7xl mt-25 mx-auto rounded-none border-t-0 border-x-0 border-b border-zinc-200    dark:bg-zinc-950 dark:border-zinc-850 shadow-md focus:outline-none [&>button.absolute]:hidden">
              <div className="mx-auto max-w-7xl w-full">
                {/* Top Row: Title & Close Button */}
                <div className="flex items-center justify-between">
                  <DialogTitle className="text-lg md:text-xl font-medium tracking-tight text-zinc-900 dark:text-zinc-50">
                    What are you looking for?
                  </DialogTitle>
                  <DialogClose className="text-zinc-950 dark:text-zinc-50 hover:opacity-70 transition-opacity outline-none cursor-pointer">
                    <X className="h-6 w-6 stroke-[1.5]" />
                  </DialogClose>
                </div>

                {/* Middle Row: Input form */}
                <form onSubmit={handleSearchSubmit} className="mt-8 relative w-full border-b border-zinc-200 dark:border-zinc-800 pb-2 flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search your favorite product..."
                    className="w-full bg-transparent text-xl md:text-2xl font-light text-zinc-800 dark:text-zinc-100 placeholder-zinc-300 dark:placeholder-zinc-600 outline-none border-none py-1.5 pr-10"
                    autoFocus
                  />
                  <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 text-zinc-800 dark:text-zinc-200 hover:opacity-75 transition-opacity cursor-pointer">
                    <Search className="h-6 w-6 stroke-[1.5]" />
                  </button>
                </form>

                {/* Bottom Row: Instruction text */}
                <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-3 font-light">
                  Please type the word you want to search and press &quot;enter&quot;
                </p>
              </div>
            </DialogContent>
          </Dialog>

          {/* Wishlist Heart Icon Dropdown */}
          <div className="hidden sm:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button 
                  className="group relative flex h-10 w-10 items-center justify-center rounded-full text-zinc-800 hover:bg-zinc-100 hover:text-black dark:text-zinc-200 dark:hover:bg-zinc-900 dark:hover:text-white transition-all cursor-pointer outline-none"
                >
                  <Heart className="h-[21px] w-[21px] stroke-[1.5] transition-transform duration-200 group-hover:scale-110" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#f43f5e] text-[9px] font-bold text-white ring-2 ring-white dark:ring-black animate-scaleIn">
                      {wishlistCount}
                    </span>
                  )}
                  <span className="sr-only">Wishlist ({wishlistCount})</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 p-4 bg-white dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-800 rounded-2xl shadow-2xl">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">My Wishlist</span>
                    <span className="text-xs text-zinc-550 dark:text-zinc-450">{wishlistCount} items</span>
                  </div>
                  
                  {wishlistCount === 0 ? (
                    <div className="py-6 text-center flex flex-col items-center justify-center gap-2">
                      <Heart className="h-8 w-8 text-zinc-350 dark:text-zinc-650 stroke-[1.5]" />
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">Your wishlist is empty.</p>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                      {wishlistItems.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between rounded-lg bg-zinc-50 p-2.5 dark:bg-zinc-900">
                          <div className="flex items-center gap-2">
                            <div className="h-10 w-10 rounded-md bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-zinc-600 dark:text-zinc-400 uppercase">
                              {item.name.substring(0, 3)}
                            </div>
                            <div>
                              <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate max-w-[120px]">{item.name}</p>
                              <p className="text-[10px] text-zinc-500 dark:text-zinc-400">${item.price.toFixed(2)}</p>
                            </div>
                          </div>
                          <button 
                            onClick={() => handleRemoveFromWishlist(item.id)}
                            className="text-[10px] text-red-500 hover:underline font-semibold"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      
                      <button 
                        onClick={handleClearWishlist} 
                        className="w-full mt-2 text-center text-xs font-semibold text-[#df4a4a] hover:underline"
                      >
                        Clear Wishlist
                      </button>
                    </div>
                  )}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Price & Shopping Bag */}
          <div className="flex items-center gap-2 select-none">
            {/* Price Preview */}
            <span className="hidden sm:inline text-sm font-semibold tracking-wide text-zinc-800 dark:text-zinc-200">
              ${cartTotal.toFixed(2)}
            </span>

            {/* Shopping Bag Button */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="group relative flex h-10 w-10 items-center justify-center rounded-full text-zinc-800 hover:bg-zinc-100 hover:text-black dark:text-zinc-200 dark:hover:bg-zinc-900 dark:hover:text-white transition-all cursor-pointer outline-none">
                  <ShoppingBag className="h-[21px] w-[21px] stroke-[1.5] transition-transform duration-200 group-hover:scale-110" />
                  {cartCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-zinc-950 text-[9px] font-bold text-white ring-2 ring-white dark:bg-white dark:text-black dark:ring-black animate-scaleIn">
                      {cartCount}
                    </span>
                  )}
                  <span className="sr-only">Shopping Cart ({cartCount})</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 p-4 bg-white dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-800 rounded-2xl shadow-2xl">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Shopping Cart</span>
                    <span className="text-xs text-zinc-550 dark:text-zinc-450">{cartCount} items</span>
                  </div>
                  
                  {cartCount === 0 ? (
                    <div className="py-6 text-center flex flex-col items-center justify-center gap-2">
                      <ShoppingBag className="h-8 w-8 text-zinc-300 dark:text-zinc-700 stroke-[1.5]" />
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">Your shopping bag is empty.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                        {cartItems.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between rounded-lg bg-zinc-50 p-2.5 dark:bg-zinc-900">
                            <div className="flex items-center gap-2">
                              <div className="h-10 w-10 rounded-md bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-zinc-600 dark:text-zinc-400 uppercase">
                                {item.name.substring(0, 3)}
                              </div>
                              <div>
                                <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate max-w-[120px]">{item.name}</p>
                                <p className="text-[10px] text-zinc-550 dark:text-zinc-450">Size: {item.size} | Color: {item.color}</p>
                                <p className="text-[10px] text-zinc-550 dark:text-zinc-450">Qty: {item.qty} × ${item.price.toFixed(2)}</p>
                              </div>
                            </div>
                            <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">${(item.qty * item.price).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between font-bold pt-2 border-t text-sm text-zinc-950 dark:text-zinc-50">
                        <span>Total:</span>
                        <span>${cartTotal.toFixed(2)}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-2">
                        <Button 
                          onClick={handleClearCart} 
                          variant="outline" 
                          className="h-9 text-xs rounded-xl font-medium"
                        >
                          Clear
                        </Button>
                        <Button 
                          onClick={() => alert("Proceeding to Checkout...")}
                          className="h-9 text-xs bg-zinc-950 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-black dark:hover:bg-zinc-200 rounded-xl font-medium"
                        >
                          Checkout
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

        </div>

      </div>
    </header>
  )
}
