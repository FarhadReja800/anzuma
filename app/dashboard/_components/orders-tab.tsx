import * as React from "react"
import Link from "next/link"
import { ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Order } from "./types"

interface OrdersTabProps {
  orders: Order[]
  handleCancelOrder: (orderId: string) => void
  triggerToast: (msg: string) => void
}

export function OrdersTab({
  orders,
  handleCancelOrder,
  triggerToast
}: OrdersTabProps) {

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "Processing":
        return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-955/20 dark:text-amber-400 dark:border-amber-900/50"
      case "Shipped":
        return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-955/20 dark:text-blue-400 dark:border-blue-900/50"
      case "Delivered":
        return "bg-green-50 text-green-700 border-green-200 dark:bg-green-955/20 dark:text-green-400 dark:border-green-900/50"
      case "Cancelled":
        return "bg-red-50 text-red-700 border-red-200 dark:bg-red-955/20 dark:text-red-400 dark:border-red-900/50"
    }
  }

  const parseOrderDetails = (productStr: string) => {
    let qty = "1"
    let color = "Premium Black"
    let size = "M"

    const qtyMatch = productStr.match(/x\s*(\d+)/)
    if (qtyMatch) {
      qty = qtyMatch[1]
    }

    const parenMatch = productStr.match(/\(([^)]+)\)/)
    if (parenMatch) {
      const parts = parenMatch[1].split(",").map(s => s.trim())
      if (parts.length === 2) {
        const isSize = (str: string) => /^(S|M|L|XL|XXL|XS|2XL|[0-9]+)$/i.test(str)
        if (isSize(parts[0])) {
          size = parts[0]
          color = parts[1]
        } else if (isSize(parts[1])) {
          size = parts[1]
          color = parts[0]
        } else {
          color = parts[0]
          size = parts[1]
        }
      } else if (parts.length === 1) {
        color = parts[0]
        size = "N/A"
      }
    } else {
      if (productStr.toLowerCase().includes("bag")) {
        color = "Tan Leather"
        size = "One Size"
      }
    }

    return { qty, color, size }
  }

  return (
    <div className="space-y-6 animate-fadeInFast">
      <div>
        <h2 className="text-xl font-normal tracking-tight font-serif text-zinc-900 dark:text-white">
          Your Order Log
        </h2>
        <p className="text-[11px] text-zinc-400 mt-1 uppercase tracking-widest font-semibold">
          Manage, cancel, and track package shipments
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="border border-zinc-150 dark:border-zinc-805 p-12 bg-white dark:bg-zinc-900 text-center flex flex-col items-center justify-center gap-4">
          <ShoppingBag className="h-10 w-10 text-zinc-350 dark:text-zinc-750 stroke-[1.5]" />
          <div>
            <h3 className="font-bold text-sm">No orders registered</h3>
            <p className="text-xs text-zinc-400 mt-1">Items you purchase will appear here in chronological order.</p>
          </div>
          <Link href="/shop">
            <Button className="h-8.5 rounded-none bg-zinc-950 text-white hover:bg-zinc-800 text-[10px] font-bold uppercase tracking-widest mt-2 px-6 cursor-pointer">
              Shop Now
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-5">
          {orders.map((o) => {
            const details = parseOrderDetails(o.product)
            return (
              <div 
                key={o.id}
                className="border border-zinc-150 dark:border-zinc-805 bg-white dark:bg-zinc-900/60 shadow-[0_1px_4px_rgba(0,0,0,0.01)]"
              >
                {/* Order Info Bar */}
                <div className="bg-zinc-50 dark:bg-zinc-900/80 px-6 py-4 border-b border-zinc-150 dark:border-zinc-805 flex flex-wrap justify-between items-center gap-4 text-xs font-semibold">
                  <div className="flex items-center gap-6 flex-wrap">
                    <div>
                      <span className="text-[10px] text-zinc-400 dark:text-zinc-550 uppercase block">Order Placed</span>
                      <span className="text-zinc-700 dark:text-zinc-300 font-bold">{o.date}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-zinc-400 dark:text-zinc-555 uppercase block">Total Amount</span>
                      <span className="text-zinc-700 dark:text-zinc-300 font-bold">${o.price.toFixed(2)}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-zinc-400 dark:text-zinc-555 uppercase block">Order ID</span>
                      <span className="font-mono text-zinc-900 dark:text-white font-bold">{o.id}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-bold px-3 py-1 border uppercase tracking-wider ${getStatusColor(o.status)}`}>
                      {o.status}
                    </span>
                  </div>
                </div>

                {/* Order Item Details */}
                <div className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                  <div className="flex items-start gap-4">
                    <div className="h-16 w-14 bg-zinc-100 dark:bg-zinc-800 shrink-0 border dark:border-zinc-700 flex items-center justify-center font-bold text-[10px] text-zinc-450 uppercase">
                      {o.id.substring(0, 3)}
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-zinc-900 dark:text-white hover:underline cursor-pointer">
                        {o.product}
                      </h4>
                      <div className="flex items-center gap-4 text-[11px] text-zinc-450 dark:text-zinc-500 font-medium">
                        <span>Qty: {details.qty}</span>
                        <span>Color: {details.color}</span>
                        <span>Size: {details.size}</span>
                      </div>
                    {o.trackingId && (
                      <div className="text-[10px] text-zinc-400 font-mono mt-1">
                        Tracking ID: <span className="font-bold text-zinc-600 dark:text-zinc-300">{o.trackingId}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto justify-end">
                  {o.status === "Processing" && (
                    <Button 
                      variant="destructive"
                      onClick={() => handleCancelOrder(o.id)}
                      className="h-8.5 rounded-none text-[10px] font-bold uppercase tracking-wider px-4 cursor-pointer"
                    >
                      Cancel Order
                    </Button>
                  )}
                  
                  {o.trackingId && o.status !== "Cancelled" && (
                    <Link href={`/order-tracking?id=${o.id}`}>
                      <Button 
                        variant="outline"
                        className="h-8.5 rounded-none border-zinc-200 hover:bg-zinc-50 text-[10px] font-bold uppercase tracking-wider text-zinc-855 dark:text-zinc-250 dark:border-zinc-750 dark:hover:bg-zinc-800 cursor-pointer"
                      >
                        Track Package
                      </Button>
                    </Link>
                  )}

                  <Button 
                    variant="ghost"
                    onClick={() => triggerToast(`Invoice for ${o.id} downloading...`)}
                    className="h-8.5 rounded-none text-[10px] font-bold uppercase tracking-wider text-zinc-550 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800 cursor-pointer"
                  >
                    Invoice PDF
                  </Button>
                </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
