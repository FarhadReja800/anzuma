"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, User, Heart, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Product } from "@/lib/data"

interface SidebarProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: { name: string; email: string; tier: string; role?: string } | null
  wishlistCount: number
  wishlistItems: Product[]
  isActive: (href: string) => boolean
  onRemoveFromWishlist: (id: number) => void
  onAddToCart: () => void
  onAddToWishlist: () => void
}

export function Sidebar({
  open,
  onOpenChange,
  user,
  wishlistCount,
  wishlistItems,
  isActive,
  onRemoveFromWishlist,
  onAddToCart,
  onAddToWishlist,
}: SidebarProps) {
  const pathname = usePathname()
  const adminRoles = ["superAdmin", "admin", "manager", "moderator"]
  const isAdminOnDashboard = user && user.role && adminRoles.includes(user.role) && pathname?.startsWith("/dashboard")
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
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
        <div className="flex-1 overflow-y-auto py-6 px-6 space-y-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-none]">
          {!isAdminOnDashboard && (
            <div className="space-y-4">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Categories</h3>
              <nav className="flex flex-col gap-3">
                <Link 
                  href="/" 
                  onClick={() => onOpenChange(false)}
                  className="group flex items-center justify-between text-base font-semibold text-zinc-950 hover:text-zinc-600 transition-colors dark:text-zinc-50 dark:hover:text-zinc-300"
                >
                  Home
                  <ChevronDown className="h-4 w-4 -rotate-90 text-zinc-400 group-hover:text-zinc-600" />
                </Link>
                <Link 
                  href="/shop" 
                  onClick={() => onOpenChange(false)}
                  className="group flex items-center justify-between text-base font-semibold text-zinc-950 hover:text-zinc-600 transition-colors dark:text-zinc-50 dark:hover:text-zinc-300"
                >
                  Shop
                  <ChevronDown className="h-4 w-4 -rotate-90 text-zinc-400 group-hover:text-zinc-600" />
                </Link>
                <Link 
                  href="/allProductCategories?category=women" 
                  onClick={() => onOpenChange(false)}
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
                  onClick={() => onOpenChange(false)}
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
                  onClick={() => onOpenChange(false)}
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
                  onClick={() => onOpenChange(false)}
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
                  onClick={() => onOpenChange(false)}
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
          )}

          <div className="pt-6 space-y-4">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Account & Wishlist</h3>
            <div className="flex flex-col gap-3">
              <Link
                href={user ? "/dashboard" : "/auth?mode=login"}
                onClick={() => onOpenChange(false)}
                className="flex w-full items-center justify-between rounded-lg bg-zinc-50 px-4 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-100 transition dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
              >
                <span>{user ? "My Dashboard" : "My Account / Login"}</span>
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
                          onClick={() => onOpenChange(false)}
                          className="text-zinc-800 dark:text-zinc-200 hover:underline truncate max-w-37.5"
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => onRemoveFromWishlist(item.id)}
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
                onClick={() => { onAddToCart(); onOpenChange(false); }}
                className="flex w-full items-center justify-between rounded-lg bg-zinc-50 px-4 py-3 text-sm font-medium text-zinc-900 hover:bg-zinc-100 transition dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
              >
                <span>Add Demo Item to Cart</span>
                <span className="text-zinc-400 text-xs">$49.99</span>
              </button>
              <button 
                onClick={() => { onAddToWishlist(); onOpenChange(false); }}
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
              <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{user ? user.name : "Guest User"}</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">{user ? user.email : "welcome@clotya.com"}</p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
