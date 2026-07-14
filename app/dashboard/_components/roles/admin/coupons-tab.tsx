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
        <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-200">
          Promo Discount Coupons Registry
        </h2>

        <div className="bg-zinc-900 border border-zinc-800 overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-400 font-bold uppercase tracking-widest text-[9px] bg-zinc-955">
                <th className="p-4">Promo Code</th>
                <th className="p-4">Value Discount</th>
                <th className="p-4">Times Claimed</th>
                <th className="p-4">Activation Status</th>
                <th className="p-4 text-right">Registry Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-850">
              {coupons.map((c) => (
                <tr key={c.code} className="hover:bg-zinc-850/50 transition">
                  <td className="p-4 font-mono font-bold text-zinc-200 tracking-wide text-sm">{c.code}</td>
                  <td className="p-4 font-mono font-semibold text-blue-400">{c.discount}% Discount</td>
                  <td className="p-4 text-zinc-450 font-medium">{c.usedCount} claims</td>
                  <td className="p-4">
                    <button
                      onClick={() => !isLocked && handleToggleCoupon(c.code)}
                      disabled={!!isLocked}
                      className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider select-none border ${
                        c.active 
                          ? "bg-emerald-955 text-emerald-400 border-emerald-500/30"
                          : "bg-zinc-955 text-zinc-500 border-zinc-800"
                      } ${isLocked ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                    >
                      {c.active ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => !isLocked && handleDeleteCoupon(c.code)}
                      disabled={!!isLocked}
                      className={`text-red-500 hover:text-red-400 hover:bg-red-955/20 p-2 transition ${
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
      <div className="bg-zinc-900 border border-zinc-800 p-6 h-fit">
        <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-200 mb-6 flex items-center gap-2">
          <Plus className="h-4 w-4 text-blue-500" />
          Register New Coupon Code
        </h3>

        {isLocked ? (
          <div className="flex flex-col items-center justify-center p-8 text-center text-zinc-550 border border-dashed border-zinc-800/80 uppercase tracking-widest text-[10px] font-bold font-sans">
            <Lock className="h-8 w-8 text-red-500 mb-2.5" />
            Promo registry additions are locked by security settings
          </div>
        ) : (
          <form onSubmit={handleAddCoupon} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Coupon Code</label>
              <input 
                type="text"
                required
                placeholder="e.g. SUMMER50"
                value={newCouponCode}
                onChange={(e) => setNewCouponCode(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 px-3.5 py-3 text-xs outline-none focus:border-blue-500 text-zinc-200 uppercase font-mono tracking-wider"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Discount Percent (%)</label>
              <input 
                type="number"
                required
                min={1}
                max={100}
                value={newCouponDiscount}
                onChange={(e) => setNewCouponDiscount(parseInt(e.target.value) || 0)}
                className="w-full bg-zinc-950 border border-zinc-800 px-3.5 py-3 text-xs outline-none focus:border-blue-500 text-zinc-200 font-mono"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold uppercase tracking-widest text-[11px] py-3.5 transition duration-200 select-none cursor-pointer"
            >
              Create promo coupon
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
