"use client"

import { Lock } from "lucide-react"
import { Order } from "../../../_components/types"
import { RolePermissions } from "../rbac-config"

interface OrdersTabProps {
  orders: Order[]
  handleUpdateOrderStatus: (orderId: string, status: Order["status"]) => void
  permissions: RolePermissions | null
}

export function OrdersTab({ orders, handleUpdateOrderStatus, permissions }: OrdersTabProps) {
  return (
    <div className="space-y-6 animate-fadeInFast">
      <h2 className="text-xs font-bold uppercase tracking-widest text-black dark:text-zinc-200">
        Recent Customer Orders Queue
      </h2>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-x-auto shadow-[0_1px_3px_rgba(0,0,0,0.01)] rounded-2xl">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-800 text-black dark:text-zinc-400 font-bold uppercase tracking-widest text-[9px] bg-zinc-50/50 dark:bg-zinc-900/50">
              <th className="p-4">Order ID</th>
              <th className="p-4">Customer Order Item</th>
              <th className="p-4">Date</th>
              <th className="p-4">Value</th>
              <th className="p-4">Fulfillment Status</th>
              <th className="p-4 text-right">Fulfillment Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/80">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-black dark:text-zinc-400 font-semibold uppercase tracking-wider">
                  No orders recorded in system database
                </td>
              </tr>
            ) : (
              orders.map((o) => (
                <tr key={o.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-850/30 transition-colors">
                  <td className="p-4 font-mono font-bold text-black dark:text-zinc-200">{o.id}</td>
                  <td className="p-4">
                    <div className="font-semibold text-black dark:text-zinc-200">{o.product}</div>
                    {o.trackingId && (
                      <div className="text-[10px] text-black/70 dark:text-zinc-400 font-mono mt-0.5">Tracking: {o.trackingId}</div>
                    )}
                  </td>
                  <td className="p-4 text-black/80 dark:text-zinc-400">{o.date}</td>
                  <td className="p-4 font-mono font-bold text-black dark:text-zinc-100">${o.price.toFixed(2)}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider border rounded ${
                      o.status === "Delivered" 
                        ? "bg-emerald-50 text-emerald-700 border-emerald-250 dark:bg-emerald-950/20 dark:text-emerald-450 dark:border-emerald-500/30"
                        : o.status === "Shipped"
                        ? "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-955/20 dark:text-blue-400 dark:border-blue-500/30"
                        : o.status === "Cancelled"
                        ? "bg-red-50 text-red-700 border-red-200 dark:bg-red-955/20 dark:text-red-400 dark:border-red-500/30"
                        : "bg-amber-50 text-amber-705 border-amber-250 dark:bg-amber-955/20 dark:text-amber-400 dark:border-amber-500/30"
                    }`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    {permissions && !permissions.editProject ? (
                      <span className="text-[10px] text-black dark:text-zinc-400 font-bold uppercase tracking-wider inline-flex items-center gap-1.5 select-none pr-4">
                        <Lock className="h-3.5 w-3.5 text-black/60" />
                        Locked
                      </span>
                    ) : (
                      <>
                        {o.status === "Processing" && (
                          <>
                            <button 
                              onClick={() => handleUpdateOrderStatus(o.id, "Shipped")}
                              className="bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1.5 transition select-none cursor-pointer rounded-lg"
                            >
                              Ship Order
                            </button>
                            <button 
                              onClick={() => handleUpdateOrderStatus(o.id, "Cancelled")}
                              className="bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-black dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1.5 transition select-none cursor-pointer rounded-lg"
                            >
                              Cancel
                            </button>
                          </>
                        )}
                        {o.status === "Shipped" && (
                          <button 
                            onClick={() => handleUpdateOrderStatus(o.id, "Delivered")}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1.5 transition select-none cursor-pointer rounded-lg"
                          >
                            Deliver Order
                          </button>
                        )}
                        {(o.status === "Delivered" || o.status === "Cancelled") && (
                          <span className="text-[10px] text-black/60 dark:text-zinc-550 font-bold uppercase tracking-wider pr-4">Archive</span>
                        )}
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
