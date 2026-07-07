import * as React from "react"
import { Truck, ShieldCheck } from "lucide-react"

interface PriceSummaryProps {
  cartTotal: number
}

export function PriceSummary({ cartTotal }: PriceSummaryProps) {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/80 p-6 sm:p-8 shadow-[0_1px_6px_rgba(0,0,0,0.02)] rounded-2xl space-y-6">
      <h3 className="text-lg font-bold text-zinc-955 dark:text-white tracking-wide uppercase border-b pb-3">Price Summary</h3>
      
      <div className="space-y-3.5">
        <div className="flex justify-between text-sm">
          <span className="text-zinc-500">Subtotal:</span>
          <span className="font-semibold text-zinc-850 dark:text-zinc-200">${cartTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-zinc-500">Shipping:</span>
          <span className="font-semibold text-emerald-500">FREE</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-zinc-500">Estimated Taxes:</span>
          <span className="font-semibold text-zinc-850 dark:text-zinc-200">$0.00</span>
        </div>
        
        <div className="border-t border-zinc-100 dark:border-zinc-800 pt-3.5 flex justify-between font-bold text-base text-zinc-950 dark:text-white">
          <span>Grand Total:</span>
          <span>${cartTotal.toFixed(2)}</span>
        </div>
      </div>

      {/* Security info cards */}
      <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800 space-y-3.5">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 bg-zinc-50 dark:bg-zinc-955 text-zinc-655 dark:text-zinc-400 flex items-center justify-center rounded-lg">
            <Truck className="h-5.25 w-5.25" />
          </div>
          <div>
            <h5 className="text-xs font-bold text-zinc-900 dark:text-white">Free Express Delivery</h5>
            <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-light mt-0.5">Estimated delivery: 2-3 business days.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 bg-zinc-50 dark:bg-zinc-955 text-zinc-655 dark:text-zinc-400 flex items-center justify-center rounded-lg">
            <ShieldCheck className="h-5.25 w-5.25" />
          </div>
          <div>
            <h5 className="text-xs font-bold text-zinc-900 dark:text-white">Secure Checkout</h5>
            <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-light mt-0.5">Your personal credentials are fully encrypted.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default PriceSummary
