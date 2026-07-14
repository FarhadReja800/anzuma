"use client"

import * as React from "react"
import { RefreshCw, Lock } from "lucide-react"
import { RolePermissions } from "../rbac-config"

interface StockProduct {
  id: number
  name: string
  category: string
  price: number
  originalPrice?: number
  stockQty: number
  supplier: string
}

interface InventoryTabProps {
  products: StockProduct[]
  restockingId: number | null
  handleRestock: (productId: number) => void
  permissions: RolePermissions | null
}

export function InventoryTab({ products, restockingId, handleRestock, permissions }: InventoryTabProps) {
  return (
    <div className="space-y-6 animate-fadeInFast">
      <div className="flex justify-between items-center">
        <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-200">
          Product Inventory Levels & Suppliers
        </h2>
        {restockingId !== null && (
          <div className="flex items-center gap-2 text-xs text-indigo-400 font-semibold uppercase animate-pulse">
            <RefreshCw className="h-4 w-4 animate-spin" /> Logistics processing restock order...
          </div>
        )}
      </div>

      <div className="bg-zinc-900 border border-zinc-800 overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-zinc-800 text-zinc-400 font-bold uppercase tracking-widest text-[9px] bg-zinc-950">
              <th className="p-4">SKU</th>
              <th className="p-4">Item Details</th>
              <th className="p-4">Supplier</th>
              <th className="p-4">Stock Count</th>
              <th className="p-4">Logistics State</th>
              <th className="p-4 text-right">Replenish Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-850">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-zinc-850/50 transition">
                <td className="p-4 font-mono text-[10px] text-zinc-400">SKU-{p.id}</td>
                <td className="p-4">
                  <div className="font-bold text-zinc-150 uppercase tracking-wide">{p.name}</div>
                  <div className="text-[10px] text-zinc-505 font-mono mt-0.5">Unit price: ${p.price.toFixed(2)}</div>
                </td>
                <td className="p-4 text-zinc-400 font-medium">{p.supplier}</td>
                <td className="p-4 font-mono font-bold text-zinc-100">{p.stockQty} units</td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                    p.stockQty > 20 
                      ? "bg-emerald-955 text-emerald-400 border border-emerald-500/30"
                      : p.stockQty > 5
                      ? "bg-amber-955 text-amber-400 border border-amber-500/30 animate-pulse"
                      : "bg-red-955 text-red-400 border border-red-500/30"
                  }`}>
                    {p.stockQty > 20 ? "Optimized" : p.stockQty > 5 ? "Low Stock" : "Replenish Urgent"}
                  </span>
                </td>
                <td className="p-4 text-right">
                  {permissions && !permissions.addProject ? (
                    <span className="text-[10px] text-zinc-550 font-bold uppercase tracking-wider inline-flex items-center gap-1.5 select-none pr-3">
                      <Lock className="h-3.5 w-3.5 text-zinc-650" />
                      Locked
                    </span>
                  ) : (
                    <button
                      onClick={() => handleRestock(p.id)}
                      disabled={restockingId !== null}
                      className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white font-bold uppercase tracking-widest text-[9px] px-3 py-1.5 transition select-none cursor-pointer disabled:cursor-not-allowed"
                    >
                      {restockingId === p.id ? "Ordering..." : "Restock (+50)"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
