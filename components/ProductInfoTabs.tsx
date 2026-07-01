"use client"

import * as React from "react"
import { Star } from "lucide-react"
import { products, getProductDetails } from "@/lib/data"

interface ProductInfoTabsProps {
  productId: number
}

type TabType = "description" | "additional" | "reviews"

const secondParagraphs: Record<string, string> = {
  Pants: "Whether you're warming up, cooling down, or having a relaxed day at home, these pants provide unmatched ease of movement. The ribbed waist adjusts to your shape, while elastic cuffs anchor the fit around your ankles.",
  Outerwear: "Engineered for durability and versatility, this jacket features weather-resistant construction. It layers easily over hoodies and sweatshirts, making it an indispensable companion during transitional seasons.",
  Shirts: "Tailored to be soft on the skin and highly resilient, this shirt holds its shape wash after wash. The details are kept simple to let the premium fabric structure stand out as the highlight of your outfit.",
  Accessories: "With classic textures and minimal hardware, this piece adds a refined touch to your everyday wardrobe. Built to withstand daily wear while developing a unique character over time."
}

export default function ProductInfoTabs({ productId }: ProductInfoTabsProps) {
  const product = products.find((p) => p.id === productId) || products[0]
  const meta = getProductDetails(product)
  const [activeTab, setActiveTab] = React.useState<TabType>("description")

  // Capitalize color names helper
  const capitalizedColors = meta.colors
    .map((c) => c.name.charAt(0).toUpperCase() + c.name.slice(1))
    .join(", ")

  const secondPara = secondParagraphs[product.category] || secondParagraphs.Accessories

  return (
    <section className="py-12 border-t border-zinc-100 dark:border-zinc-900 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
        
        {/* Tabs Navigation Header */}
        <div className="flex border-b border-zinc-100 dark:border-zinc-900 select-none overflow-x-auto">
          <button
            onClick={() => setActiveTab("description")}
            className={`py-4 px-6 text-sm font-semibold tracking-wider uppercase transition cursor-pointer relative ${
              activeTab === "description"
                ? "text-zinc-950 dark:text-zinc-50"
                : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
            }`}
          >
            Description
            {activeTab === "description" && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-zinc-950 dark:bg-zinc-50" />
            )}
          </button>
          
          <button
            onClick={() => setActiveTab("additional")}
            className={`py-4 px-6 text-sm font-semibold tracking-wider uppercase transition cursor-pointer relative ${
              activeTab === "additional"
                ? "text-zinc-950 dark:text-zinc-50"
                : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
            }`}
          >
            Additional information
            {activeTab === "additional" && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-zinc-950 dark:bg-zinc-50" />
            )}
          </button>

          <button
            onClick={() => setActiveTab("reviews")}
            className={`py-4 px-6 text-sm font-semibold tracking-wider uppercase transition cursor-pointer relative ${
              activeTab === "reviews"
                ? "text-zinc-950 dark:text-zinc-50"
                : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
            }`}
          >
            Reviews ({product.reviews})
            {activeTab === "reviews" && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-zinc-950 dark:bg-zinc-50" />
            )}
          </button>
        </div>

        {/* Tab Content Panel */}
        <div className="py-8 min-h-[220px]">
          
          {activeTab === "description" && (
            <div className="space-y-6 max-w-5xl text-zinc-600 dark:text-zinc-400 text-sm sm:text-base font-light leading-relaxed">
              <p>
                {meta.description} Quisque varius diam vel metus mattis, id aliquam diam
                rhoncus. Proin vitae magna in dui finibus malesuada et at nulla. Morbi elit
                ex, viverra vitae ante vel, blandit feugiat ligula. Fusce fermentum iaculis
                nibh, at sodales leo maximus a.
              </p>
              <p>
                {secondPara} Morbi ut sapien vitae odio accumsan gravida. Morbi vitae erat
                auctor, eleifend nunc a, lobortis neque. Praesent aliquam dignissim viverra.
                Maecenas lacus odio, feugiat eu nunc sit amet, maximus sagittis dolor.
              </p>
            </div>
          )}

          {activeTab === "additional" && (
            <div className="max-w-2xl border border-zinc-100 dark:border-zinc-900 rounded-xl overflow-hidden bg-zinc-50/30 dark:bg-zinc-950/20">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <tbody>
                  <tr className="border-b border-zinc-100 dark:border-zinc-900">
                    <td className="py-3.5 px-6 font-bold text-zinc-950 dark:text-zinc-50 uppercase tracking-wider bg-zinc-50/50 dark:bg-zinc-900/50 w-1/3">Weight</td>
                    <td className="py-3.5 px-6 font-light text-zinc-650 dark:text-zinc-400">{meta.weight}</td>
                  </tr>
                  <tr className="border-b border-zinc-100 dark:border-zinc-900">
                    <td className="py-3.5 px-6 font-bold text-zinc-950 dark:text-zinc-50 uppercase tracking-wider bg-zinc-50/50 dark:bg-zinc-900/50">Dimensions</td>
                    <td className="py-3.5 px-6 font-light text-zinc-650 dark:text-zinc-400">{meta.dimensions}</td>
                  </tr>
                  <tr className="border-b border-zinc-100 dark:border-zinc-900">
                    <td className="py-3.5 px-6 font-bold text-zinc-950 dark:text-zinc-50 uppercase tracking-wider bg-zinc-50/50 dark:bg-zinc-900/50">Colors</td>
                    <td className="py-3.5 px-6 font-light text-zinc-650 dark:text-zinc-400">{capitalizedColors}</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-6 font-bold text-zinc-950 dark:text-zinc-50 uppercase tracking-wider bg-zinc-50/50 dark:bg-zinc-900/50">Sizes</td>
                    <td className="py-3.5 px-6 font-light text-zinc-650 dark:text-zinc-400">{meta.sizes.join(", ")}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-8 max-w-4xl">
              <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-950 dark:text-zinc-50 select-none">
                Customer Reviews ({product.reviews})
              </h4>
              
              <div className="space-y-6">
                {product.reviews === 0 ? (
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 font-light">
                    There are no reviews for this product yet. Be the first to write a review!
                  </p>
                ) : (
                  <>
                    {/* Review 1 */}
                    <div className="border-b border-zinc-100 dark:border-zinc-900 pb-6 space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <span className="h-8 w-8 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-xs font-bold text-zinc-950 dark:text-zinc-50 uppercase border border-zinc-200 dark:border-zinc-800">
                            JD
                          </span>
                          <div>
                            <h5 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Jane Doe</h5>
                            <span className="text-[10px] text-zinc-400 font-semibold font-sans">May 10, 2026</span>
                          </div>
                        </div>
                        <div className="flex text-amber-500 select-none">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-current stroke-none" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-light pl-11">
                        Very comfortable, fits perfectly! The fabric is high quality and holds up well after multiple washes. Will buy again.
                      </p>
                    </div>

                    {/* Review 2 */}
                    {product.reviews > 1 && (
                      <div className="space-y-2 pb-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <span className="h-8 w-8 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-xs font-bold text-zinc-950 dark:text-zinc-50 uppercase border border-zinc-200 dark:border-zinc-800">
                              JS
                            </span>
                            <div>
                              <h5 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">John Smith</h5>
                              <span className="text-[10px] text-zinc-400 font-semibold font-sans">June 1, 2026</span>
                            </div>
                          </div>
                          <div className="flex text-amber-500 select-none">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-3 w-3 fill-current stroke-none" />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-light pl-11">
                          Great quality material and super soft. Perfect for lounging around the house or running errands. Highly recommend this brand.
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  )
}
