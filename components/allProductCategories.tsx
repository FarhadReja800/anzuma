"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"

import { LayoutGrid, List, Plus, Minus, Check, ShoppingBag, ChevronRight, Star } from "lucide-react"
import { products, Product } from "@/lib/data"
import { FeaturedProductCard } from "@/components/featured-product-card"


// Helper to extend products with attributes for filters
const getProductDetailsExtended = (product: Product) => {
  const hash = product.id;

  const COLORS_LIST = [
    "Apple Red", "Bio Blue", "Sweet Orange", "Blue", 
    "Green", "Pink", "Red", "Black", "White"
  ];
  const colors: string[] = [];
  const primaryColorIdx = hash % COLORS_LIST.length;
  colors.push(COLORS_LIST[primaryColorIdx]);
  if (hash % 3 === 0) {
    const secondaryColorIdx = (hash + 3) % COLORS_LIST.length;
    if (secondaryColorIdx !== primaryColorIdx) {
      colors.push(COLORS_LIST[secondaryColorIdx]);
    }
  }

  const SIZES_LIST = ["XXS", "XS", "S", "M", "L", "XL", "XXL"];
  const sizes: string[] = [];
  const sizeStartIdx = hash % SIZES_LIST.length;
  const sizeCount = (hash % 3) + 2; // 2 to 4 sizes per product
  for (let i = 0; i < sizeCount; i++) {
    sizes.push(SIZES_LIST[(sizeStartIdx + i) % SIZES_LIST.length]);
  }

  const inStock = (hash % 12) !== 0; // 91% in stock
  const onSale = !!product.originalPrice || !!product.discountPercent;

  return {
    ...product,
    colors,
    sizes,
    inStock,
    onSale
  };
};

const AVAILABLE_COLORS = [
  { name: "Apple Red", hex: "#9B111E" },
  { name: "Bio Blue", hex: "#0047AB" },
  { name: "Sweet Orange", hex: "#E28743" },
  { name: "Blue", hex: "#4682B4" },
  { name: "Green", hex: "#1E5631" },
  { name: "Pink", hex: "#EC97A8" },
  { name: "Red", hex: "#D32F2F" },
  { name: "Black", hex: "#18181B" },
  { name: "White", hex: "#F4F4F5", border: "border-zinc-200 dark:border-zinc-700" }
];

// Sidebar category lists
export const MAIN_CATEGORIES = [
  { id: "men", name: "Men", subcategories: ["Jackets & coats", "Jeans", "Pants", "Shirts", "Shorts", "Sweatshirts & Hoodies", "Swimwear", "T-shirts"] },
  { id: "women", name: "Women", subcategories: ["Dresses", "Skirts", "Tops", "Jeans"] },
  { id: "bags", name: "Bags" },
  { id: "belts", name: "Belts" },
  { id: "shoes", name: "Shoes" },
  { id: "outerwear", name: "Outerwear" },
  { id: "cargo-trousers", name: "Cargo Trousers" },
  { id: "accessories", name: "Accessories" },
  { id: "baby", name: "Baby" },
  { id: "kids", name: "Kids" },
  { id: "wallets", name: "Wallets" },
  { id: "watches", name: "Watches" }
]

export const AllProductCategories = ({ initialCategory }: { initialCategory?: string } = {}) => {
  // Sidebar accordion states (Men is expanded/checked by default)
  const [expandedCategories, setExpandedCategories] = React.useState<Record<string, boolean>>({
    [initialCategory || "men"]: true
  })

  // Selected categories/subcategories filters (Men is checked by default)
  const [selectedMainCategories, setSelectedMainCategories] = React.useState<string[]>([initialCategory || "men"])
  const [selectedSubcategories, setSelectedSubcategories] = React.useState<string[]>([])

  // Price range states
  const [priceSliderVal, setPriceSliderVal] = React.useState<number>(270)
  const [appliedMaxPrice, setAppliedMaxPrice] = React.useState<number>(270)

  // Layout and toolbar states
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = React.useState<string>("latest")
  const [itemsPerPage, setItemsPerPage] = React.useState<number>(16)

  // Color, Size, and Status states
  const [selectedColors, setSelectedColors] = React.useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = React.useState<string[]>([])
  const [selectedStatuses, setSelectedStatuses] = React.useState<string[]>([])

  const toggleColor = (colorName: string) => {
    setSelectedColors(prev => 
      prev.includes(colorName) ? prev.filter(c => c !== colorName) : [...prev, colorName]
    )
  }

  const toggleSize = (sizeName: string) => {
    setSelectedSizes(prev => 
      prev.includes(sizeName) ? prev.filter(s => s !== sizeName) : [...prev, sizeName]
    )
  }

  const toggleStatus = (statusName: string) => {
    setSelectedStatuses(prev => 
      prev.includes(statusName) ? prev.filter(s => s !== statusName) : [...prev, statusName]
    )
  }

  // Toggle category expansion
  const toggleExpand = (catId: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setExpandedCategories(prev => ({
      ...prev,
      [catId]: !prev[catId]
    }))
  }

  // Toggle main category selection (Single-select behavior)
  const toggleMainCategory = (catId: string) => {
    if (selectedMainCategories.includes(catId)) {
      // If clicking the already selected one, optionally clear it, or keep it.
      // We will allow unchecking it so they can see all products again.
      setSelectedMainCategories([])
      setSelectedSubcategories([])
    } else {
      // Select ONLY this category, clearing others
      setSelectedMainCategories([catId])
      setSelectedSubcategories([]) // Clear subcategories from previous selections
      // Auto expand when checked
      setExpandedCategories(prev => ({ ...prev, [catId]: true }))
    }
  }

  // Toggle subcategory selection (single-select)
  const toggleSubcategory = (subName: string, parentId: string) => {
    // If parent is not checked, select it first (single-select)
    if (!selectedMainCategories.includes(parentId)) {
      setSelectedMainCategories([parentId])
    }

    if (selectedSubcategories.includes(subName)) {
      // Clicking the same one again deselects it
      setSelectedSubcategories([])
    } else {
      // Replace any previously selected subcategory with only this one
      setSelectedSubcategories([subName])
    }
  }

  // Extend products with attributes for filters
  const extendedProducts = React.useMemo(() => {
    return products.map(getProductDetailsExtended)
  }, [])

  // ─── Unified category matching helper ───────────────────────────────────────
  // Determines if a product belongs to the active main category + optional subcategory.
  // When a subcategory is selected the product must ALSO belong to the parent collection
  // (e.g. "Shirts" under Men → men's shirts only, not women's shirts).
  const matchesCategory = React.useCallback(
    (product: ReturnType<typeof getProductDetailsExtended>): boolean => {
      // No filter active → show everything
      if (selectedMainCategories.length === 0 && selectedSubcategories.length === 0) return true

      // Active parent category id (we use single-select so at most 1)
      const parentId = selectedMainCategories[0] ?? null

      // ── Subcategory is selected ──────────────────────────────────────────
      if (selectedSubcategories.length > 0) {
        const sub = selectedSubcategories[0].toLowerCase()
        const prodCat = product.category.toLowerCase()

        // Check product category matches the selected subcategory label
        const subcatMatch =
          sub.includes(prodCat) ||
          prodCat.includes(sub) ||
          (sub === "jackets & coats" && prodCat === "outerwear") ||
          (sub === "sweatshirts & hoodies" && prodCat === "outerwear") ||
          (sub === "t-shirts" && prodCat === "shirts") ||
          (sub === "tops" && prodCat === "shirts") ||
          (sub === "cargo trousers" && prodCat === "pants") ||
          (sub === "shorts" && prodCat === "pants")

        if (!subcatMatch) return false

        // Additionally the product must belong to the parent collection
        if (parentId === "men") return product.collections.includes("men")
        if (parentId === "women") return product.collections.includes("women")
        return true
      }

      // ── Only main category is selected ──────────────────────────────────
      if (!parentId) return false

      if (parentId === "men")           return product.collections.includes("men")
      if (parentId === "women")         return product.collections.includes("women")
      if (parentId === "outerwear")     return product.category === "Outerwear"
      if (parentId === "accessories")   return product.category === "Accessories"
      if (parentId === "bags")          return product.category === "Accessories"
      if (parentId === "belts")         return product.category === "Accessories"
      if (parentId === "shoes")         return product.category === "Accessories"
      if (parentId === "cargo-trousers") return product.category === "Pants"
      if (parentId === "wallets")       return product.category === "Accessories"
      if (parentId === "watches")       return product.category === "Accessories"
      if (parentId === "baby")          return false // no baby products yet
      if (parentId === "kids")          return false // no kids products yet

      return false
    },
    [selectedMainCategories, selectedSubcategories]
  )

  // Calculate counts dynamically based on category & price filters, but BEFORE applying color, size, and status filters.
  // This is standard UX behavior so that the user sees how many items would remain if they click a filter.
  const counts = React.useMemo(() => {
    const baseProducts = extendedProducts.filter((product) => {
      if (product.price > appliedMaxPrice) return false
      return matchesCategory(product)
    })

    const colorCounts: Record<string, number> = {}
    const sizeCounts: Record<string, number> = {}

    baseProducts.forEach((product) => {
      product.colors.forEach((color) => {
        colorCounts[color] = (colorCounts[color] || 0) + 1
      })
      product.sizes.forEach((size) => {
        sizeCounts[size] = (sizeCounts[size] || 0) + 1
      })
    })

    return { colorCounts, sizeCounts }
  }, [extendedProducts, matchesCategory, appliedMaxPrice])

  // Filter products based on selected categories, subcategories, colors, sizes, status and price range
  const filteredProducts = React.useMemo(() => {
    return extendedProducts.filter((product) => {
      // 1. Price Filter
      if (product.price > appliedMaxPrice) return false

      // 2. Category Filter (uses shared matchesCategory helper)
      if (!matchesCategory(product)) return false

      // 3. Color Filter
      if (selectedColors.length > 0) {
        const hasColor = product.colors.some(c => selectedColors.includes(c))
        if (!hasColor) return false
      }

      // 4. Size Filter
      if (selectedSizes.length > 0) {
        const hasSize = product.sizes.some(s => selectedSizes.includes(s))
        if (!hasSize) return false
      }

      // 5. Status Filter
      if (selectedStatuses.length > 0) {
        if (selectedStatuses.includes("In Stock") && !product.inStock) return false
        if (selectedStatuses.includes("On Sale") && !product.onSale) return false
      }

      return true
    })
  }, [extendedProducts, matchesCategory, selectedColors, selectedSizes, selectedStatuses, appliedMaxPrice])

  // Sort products
  const sortedProducts = React.useMemo(() => {
    const list = [...filteredProducts]
    if (sortBy === "price-low") {
      return list.sort((a, b) => a.price - b.price)
    }
    if (sortBy === "price-high") {
      return list.sort((a, b) => b.price - a.price)
    }
    if (sortBy === "rating") {
      return list.sort((a, b) => b.rating - a.rating)
    }
    // "latest" or default
    return list.sort((a, b) => b.id - a.id)
  }, [filteredProducts, sortBy])

  // Paginated list
  const paginatedProducts = React.useMemo(() => {
    return sortedProducts.slice(0, itemsPerPage)
  }, [sortedProducts, itemsPerPage])

  const handlePriceFilterSubmit = () => {
    setAppliedMaxPrice(priceSliderVal)
  }

  // Featured products for the top section (first 4)
  const featuredProducts = React.useMemo(() => products.slice(0, 4), [])

  // Category pills data


  return (
    <div className="bg-white text-zinc-900 dark:bg-black dark:text-zinc-50 min-h-screen">

      {/* ── Category Pills + Featured Products ─────────────────────────────── */}
      <section className="border-b border-zinc-100 dark:border-zinc-900 py-10">
        <div className="max-w-400 mx-auto px-6 sm:px-12 lg:px-20 space-y-10">



        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6  py-10" id="product-grid">
        
        {/* Main Grid Layout - Sidebar (left) and Content (right) */}
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* Column 1: Sidebar Filter Panel (Left) */}
          <aside className="w-full lg:w-64 xl:w-72 shrink-0 space-y-10 select-none">
            
            {/* Category Section */}
            <div className="space-y-5">
              <h2 className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 border-b border-zinc-100 dark:border-zinc-900 pb-3">
                Product Categories
              </h2>

              <ul className="space-y-4">
                {MAIN_CATEGORIES.map((cat) => {
                  const isChecked = selectedMainCategories.includes(cat.id)
                  const isExpanded = !!expandedCategories[cat.id]
                  const hasSubs = !!cat.subcategories

                  return (
                    <li key={cat.id} className="space-y-2">
                      <div className="flex items-center justify-between group">
                        
                        {/* Checkbox and Label */}
                        <div 
                          onClick={() => toggleMainCategory(cat.id)}
                          className="flex items-center gap-3 cursor-pointer text-xs font-medium text-zinc-800 hover:text-zinc-950 dark:text-zinc-350 dark:hover:text-zinc-100 transition-colors"
                        >
                          <div className={`w-3.5 h-3.5 border rounded-sm flex items-center justify-center transition-all ${
                            isChecked 
                              ? "bg-[#D61C2C] border-[#D61C2C] text-white" 
                              : "border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900"
                          }`}>
                            {isChecked && <Check className="h-2.5 w-2.5 stroke-[3]" />}
                          </div>
                          <span className={isChecked ? "text-[#D61C2C] font-semibold" : ""}>{cat.name}</span>
                        </div>

                        {/* Expand/Collapse Toggle */}
                        {hasSubs && (
                          <button
                            onClick={(e) => toggleExpand(cat.id, e)}
                            className="p-1 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 cursor-pointer transition-colors"
                          >
                            {isExpanded ? (
                              <Minus className="h-3 w-3 stroke-[2.5]" />
                            ) : (
                              <Plus className="h-3 w-3 stroke-[2.5]" />
                            )}
                          </button>
                        )}
                      </div>

                      {/* Subcategories (Indented checklist) */}
                      {hasSubs && isExpanded && (
                        <ul className="pl-6 space-y-2.5 pt-1 border-l border-zinc-100 dark:border-zinc-900 ml-1.5">
                          {cat.subcategories!.map((sub) => {
                            const isSubChecked = selectedSubcategories.includes(sub)
                            return (
                              <li key={sub}>
                                <div
                                  onClick={() => toggleSubcategory(sub, cat.id)}
                                  className="flex items-center gap-3 cursor-pointer text-[11px] text-zinc-500 hover:text-zinc-900 dark:text-zinc-450 dark:hover:text-zinc-200 transition-colors"
                                >
                                  <div className={`w-3.5 h-3.5 border rounded-xs flex items-center justify-center transition-all ${
                                    isSubChecked
                                      ? "bg-zinc-900 border-zinc-900 text-white dark:bg-zinc-100 dark:border-zinc-100 dark:text-black"
                                      : "border-zinc-250 dark:border-zinc-800 bg-white dark:bg-zinc-900"
                                  }`}>
                                    {isSubChecked && <Check className="h-2.5 w-2.5 stroke-[3]" />}
                                  </div>
                                  <span>{sub}</span>
                                </div>
                              </li>
                            )
                          })}
                        </ul>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* Price Filter Section */}
            <div className="space-y-5 pt-4 border-t border-zinc-100 dark:border-zinc-900">
              <h2 className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                Filter by price
              </h2>

              <div className="space-y-4">
                <input
                  type="range"
                  min="0"
                  max="300"
                  value={priceSliderVal}
                  onChange={(e) => setPriceSliderVal(Number(e.target.value))}
                  className="w-full h-1 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#D61C2C]"
                />
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-650 dark:text-zinc-400 font-medium">
                    Price: <span className="font-semibold text-zinc-900 dark:text-zinc-100">${0} — ${priceSliderVal}</span>
                  </span>
                  
                  <button
                    onClick={handlePriceFilterSubmit}
                    className="bg-zinc-950 text-white dark:bg-zinc-100 dark:text-black hover:bg-zinc-850 dark:hover:bg-zinc-200 font-bold text-[10px] tracking-wider uppercase px-4 py-1.5 transition duration-300 cursor-pointer shadow-xs rounded-sm"
                  >
                    Filter
                  </button>
                </div>
              </div>
            </div>

            {/* Filter by Color Section */}
            <div className="space-y-5 pt-6 border-t border-zinc-100 dark:border-zinc-900">
              <h2 className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                Filter by Color
              </h2>
              <ul className="space-y-3">
                {AVAILABLE_COLORS.map((color) => {
                  const isColorChecked = selectedColors.includes(color.name)
                  const count = counts.colorCounts[color.name] || 0
                  
                  return (
                    <li key={color.name}>
                      <div
                        onClick={() => toggleColor(color.name)}
                        className="flex items-center justify-between text-xs cursor-pointer select-none py-0.5 group"
                      >
                        <div className="flex items-center gap-3">
                          {/* Color Swatch with Check */}
                          <div className="relative flex items-center justify-center">
                            <span 
                              className={`w-3.5 h-3.5 rounded-full inline-block border shrink-0 transition-transform ${
                                color.border || "border-transparent"
                              } ${isColorChecked ? "scale-110 shadow-xs" : "group-hover:scale-105"}`}
                              style={{ backgroundColor: color.hex }}
                            />
                            {isColorChecked && (
                              <Check 
                                className={`absolute h-2.5 w-2.5 stroke-[4.5] ${
                                  color.name === "White" ? "text-zinc-950" : "text-white"
                                }`} 
                              />
                            )}
                          </div>
                          
                          <span className={`transition-colors ${
                            isColorChecked 
                              ? "text-[#D61C2C] font-semibold" 
                              : "text-zinc-700 dark:text-zinc-350 hover:text-zinc-950 dark:hover:text-white"
                          }`}>
                            {color.name}
                          </span>
                        </div>
                        
                        <span className="text-[11px] text-zinc-400 dark:text-zinc-500 font-medium">
                          ({count})
                        </span>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* Filter by Size Section */}
            <div className="space-y-5 pt-6 border-t border-zinc-100 dark:border-zinc-900">
              <h2 className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                Filter by Size
              </h2>
              <ul className="space-y-3">
                {["XXS", "XS", "S", "M", "L", "XL", "XXL"].map((size) => {
                  const isSizeChecked = selectedSizes.includes(size)
                  const count = counts.sizeCounts[size] || 0
                  
                  return (
                    <li key={size}>
                      <div
                        onClick={() => toggleSize(size)}
                        className="flex items-center justify-between text-xs cursor-pointer select-none py-0.5 group"
                      >
                        <div className="flex items-center gap-3">
                          {/* Checkbox */}
                          <div className={`w-3.5 h-3.5 border rounded-xs flex items-center justify-center transition-all ${
                            isSizeChecked 
                              ? "bg-[#D61C2C] border-[#D61C2C] text-white" 
                              : "border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900"
                          }`}>
                            {isSizeChecked && <Check className="h-2.5 w-2.5 stroke-[3]" />}
                          </div>
                          <span className={`transition-colors ${
                            isSizeChecked 
                              ? "text-[#D61C2C] font-semibold" 
                              : "text-zinc-700 dark:text-zinc-350 hover:text-zinc-950 dark:hover:text-white"
                          }`}>
                            {size}
                          </span>
                        </div>
                        
                        <span className="text-[11px] text-zinc-400 dark:text-zinc-500 font-medium">
                          ({count})
                        </span>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* Product Status Section */}
            <div className="space-y-5 pt-6 border-t border-zinc-100 dark:border-zinc-900">
              <h2 className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                Product Status
              </h2>
              <ul className="space-y-3">
                {["In Stock", "On Sale"].map((status) => {
                  const isStatusChecked = selectedStatuses.includes(status)
                  
                  return (
                    <li key={status}>
                      <div
                        onClick={() => toggleStatus(status)}
                        className="flex items-center gap-3 text-xs cursor-pointer select-none py-0.5 group"
                      >
                        {/* Checkbox */}
                        <div className={`w-3.5 h-3.5 border rounded-xs flex items-center justify-center transition-all ${
                          isStatusChecked 
                            ? "bg-[#D61C2C] border-[#D61C2C] text-white" 
                            : "border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900"
                        }`}>
                          {isStatusChecked && <Check className="h-2.5 w-2.5 stroke-[3]" />}
                        </div>
                        <span className={`transition-colors ${
                          isStatusChecked 
                            ? "text-[#D61C2C] font-semibold" 
                            : "text-zinc-700 dark:text-zinc-350 hover:text-zinc-950 dark:hover:text-white"
                        }`}>
                          {status}
                        </span>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>

          </aside>

          {/* Right Panel: Banner & Main catalog (Right) */}
          <main className="flex-1 w-full space-y-10">
            
            {/* Column 2: Promo Banner (Top Right) */}
           <section className="relative w-full overflow-hidden flex flex-col md:flex-row items-center justify-between p-8 md:p-12 min-h-[420px] border border-zinc-100 dark:border-zinc-900">

  {/* Background Image */}
    <Image
      src="/banner.png"
      alt="Background"
      fill
      priority
      className="object-top w-full h-[600px]"
    />

  {/* Optional Dark Overlay */}
    <div className="absolute inset-0 bg-black/20" />

  {/* Left text column */}
  <div className="space-y-4 max-w-md md:pr-6 z-10 text-left">
    <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-white leading-tight">
      Plus-Size Styles for <br />
      Every Season
    </h1>

    <p className="text-sm text-gray-200 leading-relaxed">
      Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas
      accumsan lacus vel facilisis.
    </p>
  </div>

</section>

            {/* Column 3: Product display area (Bottom Right) */}
            <div className="space-y-6">
              
              {/* Product list toolbar filters */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-t border-b border-zinc-100 dark:border-zinc-900 py-3 gap-4">
                
                {/* Left side info: Toggles & Results */}
                <div className="flex items-center gap-4">
                  {/* Grid/List layout icons */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-1.5 rounded-sm hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors cursor-pointer ${
                        viewMode === "grid" ? "text-zinc-900 dark:text-white" : "text-zinc-350 dark:text-zinc-650"
                      }`}
                    >
                      <LayoutGrid className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-1.5 rounded-sm hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors cursor-pointer ${
                        viewMode === "list" ? "text-zinc-900 dark:text-white" : "text-zinc-350 dark:text-zinc-650"
                      }`}
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Results range text */}
                  <span className="text-xs text-zinc-400 dark:text-zinc-500">
                    Showing 1–{paginatedProducts.length} of {sortedProducts.length} results
                  </span>
                </div>

                {/* Right side dropdown selectors */}
                <div className="flex flex-wrap items-center gap-4">
                  {/* Items count select */}
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-zinc-450 dark:text-zinc-500 font-medium">Show:</span>
                    <select
                      value={itemsPerPage}
                      onChange={(e) => setItemsPerPage(Number(e.target.value))}
                      className="text-xs bg-transparent border-b border-zinc-200 dark:border-zinc-800 py-0.5 outline-none font-semibold cursor-pointer"
                    >
                      <option value={8}>8 items</option>
                      <option value={12}>12 items</option>
                      <option value={16}>16 items</option>
                      <option value={24}>24 items</option>
                    </select>
                  </div>

                  {/* Sorting criteria select */}
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-zinc-450 dark:text-zinc-500 font-medium">Sort by:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="text-xs bg-transparent border-b border-zinc-200 dark:border-zinc-800 py-0.5 outline-none font-semibold cursor-pointer"
                    >
                      <option value="latest">latest</option>
                      <option value="price-low">price: low to high</option>
                      <option value="price-high">price: high to low</option>
                      <option value="rating">rating</option>
                    </select>
                  </div>
                </div>

              </div>

              {/* Dynamic products list representation (Grid / List view modes) */}
              {paginatedProducts.length === 0 ? (
                <div className="text-center py-20 border border-dashed rounded-3xl border-zinc-200 dark:border-zinc-800 flex flex-col items-center justify-center gap-3">
                  <ShoppingBag className="h-10 w-10 text-zinc-300 dark:text-zinc-700 stroke-[1.5]" />
                  <h3 className="text-sm font-bold">No Products Match Filters</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-xs leading-normal">
                    Try adjusting the categories checklist, raising the price range, or choosing a different category.
                  </p>
                </div>
              ) : viewMode === "grid" ? (
                
                // Grid layout — same FeaturedProductCard as home page
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
                  {paginatedProducts.map((product) => (
                    <FeaturedProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                
                // List layout matches standard modern lists
                <div className="flex flex-col gap-6">
                  {paginatedProducts.map((product) => {
                    const discount = product.discountPercent || ((product.id * 7) % 20) + 10 // Deterministic mock discount if not specified
                    return (
                      <div key={product.id} className="group flex flex-col sm:flex-row gap-6 border-b border-zinc-100 dark:border-zinc-900 pb-6 text-left">
                        
                        {/* List Image */}
                        <div className="relative w-full sm:w-44 aspect-[4/8] overflow-hidden bg-[#F5F5F5] dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shrink-0">
                          <span className="absolute left-3 top-3 z-20 bg-[#EEFCF3] text-[#10B981] px-2 py-0.5 text-[11px] font-bold rounded-xs shadow-xs">
                            {discount}%
                          </span>
                          
                          <Link href={`/shop?id=${product.id}`} className="absolute inset-0 z-0">
                            {product.imageUrl ? (
                              <Image
                                src={product.imageUrl}
                                alt={product.name}
                                fill
                                className="object-cover"
                                sizes="250px"
                              />
                            ) : (
                              <div className={`w-full h-full bg-gradient-to-br ${product.imageBg}`} />
                            )}
                          </Link>
                        </div>

                        {/* List Details text */}
                        <div className="flex-1 flex flex-col justify-between py-1 space-y-3">
                          <div className="space-y-2">
                            <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
                              <Star className="h-2 w-2 fill-amber-400 text-amber-400" />
                              <span className="text-[10px]">{product.rating} ({product.reviews} reviews)</span>
                            </div>
                            
                            <h3 className="text-base font-medium text-zinc-850 dark:text-zinc-50">
                              <Link href={`/shop?id=${product.id}`} className="hover:opacity-80 transition-opacity">
                                {product.name}
                              </Link> 
                            </h3>
                            
                            <p className="text-xs text-zinc-450 dark:text-zinc-400 font-light leading-relaxed max-w-xl">
                              Elegant, comfortable construction designed for every season. Features premium fabric structure and detailed finishes suitable for daily layouts.
                            </p>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-baseline gap-2">
                              {product.originalPrice && (
                                <span className="text-xs text-zinc-400 line-through">
                                  ${product.originalPrice.toFixed(2)}
                                </span>
                              )}
                              <span className="text-sm font-extrabold text-zinc-950 dark:text-zinc-55">
                                ${product.price.toFixed(2)}
                              </span>
                            </div>

                            <button className="h-8 border border-zinc-250 dark:border-zinc-800 hover:border-zinc-900 dark:hover:border-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900 px-4 text-[10px] font-bold uppercase tracking-wider transition duration-300 cursor-pointer shadow-xs rounded-sm">
                              Add to Bag
                            </button>
                          </div>
                        </div>

                      </div>
                    )
                  })}
                </div>
              )}

            </div>

          </main>

        </div>
  {/* Featured Products Row — same FeaturedProductCard as home page */}
          <div className="space-y-6 mt-20">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                Featured Products
              </h2>
              <Link
                href="#product-grid"
                className="flex items-center gap-1 text-xs font-semibold text-zinc-950 dark:text-zinc-100 hover:opacity-70 transition-opacity"
              >
                View all
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <FeaturedProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
      </div>
        
    </div>
  )
}
