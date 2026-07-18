"use client"

import * as React from "react"
import { Trash2, Plus, Lock } from "lucide-react"
import { RolePermissions } from "../rbac-config"

interface Coupon {
  code: string
  discount: number
  active: boolean
  usedCount: number
}

interface CouponsTabProps {
  coupons: Coupon[]
  newCouponCode: string
  setNewCouponCode: (code: string) => void
  newCouponDiscount: number
  setNewCouponDiscount: (discount: number) => void
  handleToggleCoupon: (code: string) => void
  handleAddCoupon: (e: React.FormEvent) => void
  handleDeleteCoupon: (code: string) => void
  permissions: RolePermissions | null
}

export function CouponsTab({
  coupons,
  newCouponCode,
  setNewCouponCode,
  newCouponDiscount,
  setNewCouponDiscount,
  handleToggleCoupon,
  handleAddCoupon,
  handleDeleteCoupon,
  permissions
}: CouponsTabProps) {
  const isLocked = permissions && !permissions.siteSettings
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeInFast">
      {/* Left 2 columns: coupons list */}
      <div className="lg:col-span-2 space-y-6">
        <h2 className="text-xs font-bold uppercase tracking-widest text-black dark:text-zinc-200">
          Promo Discount Coupons Registry
        </h2>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-x-auto shadow-[0_1px_3px_rgba(0,0,0,0.01)] rounded-2xl">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800 text-black dark:text-zinc-400 font-bold uppercase tracking-widest text-[9px] bg-zinc-50/50 dark:bg-zinc-900/50">
                <th className="p-4">Promo Code</th>
                <th className="p-4">Value Discount</th>
                <th className="p-4">Times Claimed</th>
                <th className="p-4">Activation Status</th>
                <th className="p-4 text-right">Registry Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/80">
              {coupons.map((c) => (
                <tr key={c.code} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-850/30 transition-colors">
                  <td className="p-4 font-mono font-bold text-black dark:text-zinc-200 tracking-wide text-sm">{c.code}</td>
                  <td className="p-4 font-mono font-semibold text-blue-600 dark:text-blue-400">{c.discount}% Discount</td>
                  <td className="p-4 text-black/85 dark:text-zinc-400 font-medium">{c.usedCount} claims</td>
                  <td className="p-4">
                    <button
                       onClick={() => !isLocked && handleToggleCoupon(c.code)}
                      disabled={!!isLocked}
                      className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider select-none border rounded ${
                        c.active 
                          ? "bg-emerald-50 text-emerald-700 border-emerald-250 dark:bg-emerald-955 dark:text-emerald-400 dark:border-emerald-500/30"
                          : "bg-zinc-50 text-zinc-500 border-zinc-200 dark:bg-zinc-955 dark:text-zinc-500 dark:border-zinc-800"
                      } ${isLocked ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                    >
                      {c.active ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => !isLocked && handleDeleteCoupon(c.code)}
                      disabled={!!isLocked}
                      className={`text-red-500 hover:text-red-650 hover:bg-red-50 dark:hover:bg-red-955/20 p-2 transition rounded-lg ${
                        isLocked ? "opacity-30 cursor-not-allowed" : "cursor-pointer"
                      }`}
                    >
                      <Trash2 className="h-4.5 w-4.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right column: add coupon */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 h-fit rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.01)]">
        <h3 className="text-xs font-bold uppercase tracking-wider text-black dark:text-zinc-200 mb-6 flex items-center gap-2">
          <Plus className="h-4 w-4 text-blue-500" />
          Register New Coupon Code
        </h3>

        {isLocked ? (
          <div className="flex flex-col items-center justify-center p-8 text-center text-black/70 dark:text-zinc-400 border border-dashed border-zinc-200 dark:border-zinc-800/80 uppercase tracking-widest text-[10px] font-bold font-sans">
            <Lock className="h-8 w-8 text-red-500 mb-2.5" />
            Promo registry additions are locked by security settings
          </div>
        ) : (
          <form onSubmit={handleAddCoupon} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-black/70 dark:text-zinc-400">Coupon Code</label>
              <input 
                type="text"
                required
                placeholder="e.g. SUMMER50"
                value={newCouponCode}
                onChange={(e) => setNewCouponCode(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-955 border border-zinc-200 dark:border-zinc-800 px-3.5 py-3 text-xs outline-none focus:border-blue-500 text-black dark:text-zinc-200 uppercase font-mono tracking-wider rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-black/70 dark:text-zinc-400">Discount Percent (%)</label>
              <input 
                type="number"
                required
                min={1}
                max={100}
                value={newCouponDiscount}
                onChange={(e) => setNewCouponDiscount(parseInt(e.target.value) || 0)}
                className="w-full bg-zinc-50 dark:bg-zinc-955 border border-zinc-200 dark:border-zinc-800 px-3.5 py-3 text-xs outline-none focus:border-blue-500 text-black dark:text-zinc-200 font-mono rounded-xl"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold uppercase tracking-widest text-[11px] py-3.5 transition duration-200 select-none cursor-pointer rounded-xl"
            >
              Create promo coupon
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
