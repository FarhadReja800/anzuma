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
      <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-200">
        Recent Customer Orders Queue
      </h2>

      <div className="bg-zinc-900 border border-zinc-800 overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-zinc-800 text-zinc-400 font-bold uppercase tracking-widest text-[9px] bg-zinc-955">
              <th className="p-4">Order ID</th>
              <th className="p-4">Customer Order Item</th>
              <th className="p-4">Date</th>
              <th className="p-4">Value</th>
              <th className="p-4">Fulfillment Status</th>
              <th className="p-4 text-right">Fulfillment Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-850">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-zinc-500 font-semibold uppercase tracking-wider">
                  No orders recorded in system database
                </td>
              </tr>
            ) : (
              orders.map((o) => (
                <tr key={o.id} className="hover:bg-zinc-850/50 transition">
                  <td className="p-4 font-mono font-bold text-zinc-200">{o.id}</td>
                  <td className="p-4">
                    <div className="font-semibold text-zinc-200">{o.product}</div>
                    {o.trackingId && (
                      <div className="text-[10px] text-zinc-500 font-mono mt-0.5">Tracking: {o.trackingId}</div>
                    )}
                  </td>
                  <td className="p-4 text-zinc-450">{o.date}</td>
                  <td className="p-4 font-mono font-bold text-zinc-150">${o.price.toFixed(2)}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                      o.status === "Delivered" 
                        ? "bg-emerald-950 text-emerald-450 border border-emerald-500/30"
                        : o.status === "Shipped"
                        ? "bg-blue-950 text-blue-400 border border-blue-500/30"
                        : o.status === "Cancelled"
                        ? "bg-red-955 text-red-400 border border-red-500/30"
                        : "bg-amber-955/20 text-amber-400 border border-amber-500/30"
                    }`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    permissions && !permissions.editProject ? (
                      <span className="text-[10px] text-zinc-550 font-bold uppercase tracking-wider inline-flex items-center gap-1.5 select-none pr-4">
                        <Lock className="h-3.5 w-3.5 text-zinc-600" />
                        Locked
                      </span>
                    ) : (
                      <>
                        {o.status === "Processing" && (
                          <>
                            <button 
                              onClick={() => handleUpdateOrderStatus(o.id, "Shipped")}
                              className="bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1.5 transition select-none cursor-pointer"
                            >
                              Ship Order
                            </button>
                            <button 
                              onClick={() => handleUpdateOrderStatus(o.id, "Cancelled")}
                              className="bg-zinc-950 hover:bg-zinc-850 text-zinc-400 border border-zinc-800 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1.5 transition select-none cursor-pointer"
                            >
                              Cancel
                            </button>
                          </>
                        )}
                        {o.status === "Shipped" && (
                          <button 
                            onClick={() => handleUpdateOrderStatus(o.id, "Delivered")}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1.5 transition select-none cursor-pointer"
                          >
                            Deliver Order
                          </button>
                        )}
                        {(o.status === "Delivered" || o.status === "Cancelled") && (
                          <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider pr-4">Archive</span>
                        )}
                      </>
                    )
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
