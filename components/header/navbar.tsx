"use client"

import * as React from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface NavbarProps {
  isActive: (href: string) => boolean
}

export function Navbar({ isActive }: NavbarProps) {
  return (
    <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
      {/* HOME Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Link
            href="/"
            className={`group flex items-center gap-1 text-[13px] font-bold tracking-widest transition-colors duration-200 outline-none cursor-pointer ${
              isActive("/")
                ? "text-zinc-950 dark:text-white"
                : "text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
            }`}
          >
            <span>HOME</span>
          </Link>
        </DropdownMenuTrigger>
      </DropdownMenu>

      {/* SHOP Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className={`group flex items-center gap-1 text-[13px] font-bold tracking-widest transition-colors duration-200 outline-none cursor-pointer ${
              isActive("/shop")
                ? "text-zinc-950 dark:text-white"
                : "text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
            }`}
          >
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
        className={`text-[13px] font-bold tracking-widest transition-colors duration-200 ${
          isActive("/allProductCategories?category=women")
            ? "text-zinc-950 dark:text-white"
            : "text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
        }`}
      >
        WOMEN
      </Link>
      <Link
        href="/allProductCategories?category=men"
        className={`text-[13px] font-bold tracking-widest transition-colors duration-200 ${
          isActive("/allProductCategories?category=men")
            ? "text-zinc-950 dark:text-white"
            : "text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
        }`}
      >
        MEN
      </Link>
      <Link
        href="/outerwear"
        className={`text-[13px] font-bold tracking-widest transition-colors duration-200 ${
          isActive("/outerwear")
            ? "text-zinc-950 dark:text-white"
            : "text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
        }`}
      >
        OUTERWEAR
      </Link>
      <Link
        href="/blog"
        className={`text-[13px] font-bold tracking-widest transition-colors duration-200 ${
          isActive("/blog")
            ? "text-zinc-950 dark:text-white"
            : "text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
        }`}
      >
        BLOG
      </Link>
      <Link
        href="/contact"
        className={`text-[13px] font-bold tracking-widest transition-colors duration-200 ${
          isActive("/contact")
            ? "text-zinc-950 dark:text-white"
            : "text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
        }`}
      >
        CONTACT
      </Link>
    </nav>
  )
}
