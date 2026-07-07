import * as React from "react"
import Link from "next/link"
import { Heart, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Product } from "@/lib/data"

interface WishlistTabProps {
  wishlist: Product[]
  handleRemoveFromWishlist: (productId: number) => void
  handleAddToCart: (product: Product) => void
}

export function WishlistTab({
  wishlist,
  handleRemoveFromWishlist,
  handleAddToCart
}: WishlistTabProps) {
  return (
    <div className="space-y-6 animate-fadeInFast">
      <div>
        <h2 className="text-xl font-normal tracking-tight font-serif text-zinc-900 dark:text-white">
          Saved Wishlist
        </h2>
        <p className="text-[11px] text-zinc-400 mt-1 uppercase tracking-widest font-semibold">
          Your curated items saved for quick access
        </p>
      </div>

      {wishlist.length === 0 ? (
        <div className="border border-zinc-150 dark:border-zinc-805 p-12 bg-white dark:bg-zinc-900 text-center flex flex-col items-center justify-center gap-4">
          <Heart className="h-10 w-10 text-zinc-350 dark:text-zinc-750 stroke-[1.5]" />
          <div>
            <h3 className="font-bold text-sm">Your wishlist is currently empty</h3>
            <p className="text-xs text-zinc-400 mt-1">Click the heart icon on any products to save them to your account.</p>
          </div>
          <Link href="/shop">
            <Button className="h-8.5 rounded-none bg-zinc-950 text-white hover:bg-zinc-800 text-[10px] font-bold uppercase tracking-widest mt-2 px-6 cursor-pointer">
              Browse Catalog
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div 
              key={item.id}
              className="border border-zinc-150 dark:border-zinc-805 bg-white dark:bg-zinc-900 shadow-sm relative group flex flex-col justify-between"
            >
              <button 
                onClick={() => handleRemoveFromWishlist(item.id)}
                className="absolute top-3 right-3 z-10 h-7 w-7 rounded-full bg-white/90 border border-zinc-100 hover:bg-red-50 hover:text-red-500 flex items-center justify-center transition shadow-sm cursor-pointer"
              >
                <X className="h-3.5 w-3.5 text-zinc-900" />
              </button>

              <div className="p-4 bg-zinc-50 dark:bg-zinc-950/40 flex items-center justify-center h-48 relative overflow-hidden">
                <div className="h-32 w-28 bg-zinc-200 dark:bg-zinc-805 flex items-center justify-center font-bold text-xs text-zinc-400 uppercase tracking-widest rounded shadow-sm">
                  {item.name.substring(0, 3)}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div className="space-y-1">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#df4a4a] block">{item.category}</span>
                  <h4 className="font-bold text-xs uppercase tracking-wide text-zinc-900 dark:text-white line-clamp-1">
                    {item.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-bold text-zinc-955 dark:text-zinc-50">${item.price.toFixed(2)}</span>
                    {item.originalPrice && (
                      <span className="text-[10px] text-zinc-400 line-through">${item.originalPrice.toFixed(2)}</span>
                    )}
                  </div>
                </div>

                <div className="mt-5 space-y-2">
                  <Button 
                    onClick={() => handleAddToCart(item)}
                    className="w-full h-8.5 rounded-none bg-zinc-950 text-white hover:bg-zinc-800 text-[10px] font-bold uppercase tracking-widest cursor-pointer"
                  >
                    Add to Shopping Bag
                  </Button>
                  <Button 
                    onClick={() => handleRemoveFromWishlist(item.id)}
                    variant="ghost"
                    className="w-full h-8.5 rounded-none text-[10px] font-bold uppercase tracking-wider text-red-500 hover:bg-red-50/50 dark:hover:bg-red-950/10 cursor-pointer"
                  >
                    Remove Item
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
