import * as React from "react"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CartItem } from "@/lib/data"

interface ConfirmStepProps {
  cartItems: CartItem[]
  onConfirm: () => void
}

export function ConfirmStep({ cartItems, onConfirm }: ConfirmStepProps) {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/80 p-6 sm:p-8 shadow-[0_1px_6px_rgba(0,0,0,0.02)] rounded-2xl space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold text-zinc-955 dark:text-white tracking-tight">Confirm Your Order</h2>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">Review items currently in your shopping cart.</p>
      </div>
      
      <div className="divide-y divide-zinc-100 dark:divide-zinc-800 max-h-96 overflow-y-auto pr-1">
        {cartItems.map((item, idx) => (
          <div key={idx} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
            <div className="h-14 w-14 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900 flex items-center justify-center text-xs font-bold text-zinc-655 dark:text-zinc-450 uppercase">
              {item.name.substring(0, 3)}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-zinc-950 dark:text-white truncate">{item.name}</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Size: {item.size} | Color: {item.color}</p>
              <p className="text-xs text-zinc-450 dark:text-zinc-500 mt-0.5">Qty: {item.qty} × ${item.price.toFixed(2)}</p>
            </div>
            <span className="text-sm font-bold text-zinc-900 dark:text-white">${(item.qty * item.price).toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div className="pt-4">
        <Button 
          onClick={onConfirm}
          className="w-full py-6 text-sm bg-zinc-955 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200 rounded-xl font-bold uppercase tracking-wider"
        >
          Confirm Order Details <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
