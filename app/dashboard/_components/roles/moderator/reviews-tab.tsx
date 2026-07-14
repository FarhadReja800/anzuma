"use client"

import { Lock } from "lucide-react"
import { RolePermissions } from "../rbac-config"

interface ReviewItem {
  id: string
  productName: string
  rating: number
  comment: string
  user: string
  status: "Pending" | "Approved" | "Flagged"
}

interface ReviewsTabProps {
  reviews: ReviewItem[]
  handleReviewAction: (id: string, action: "Approved" | "Flagged") => void
  permissions: RolePermissions | null
}

export function ReviewsTab({ reviews, handleReviewAction, permissions }: ReviewsTabProps) {
  return (
    <div className="space-y-6 animate-fadeInFast">
      <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-200">
        Review Moderation Center
      </h2>

      <div className="bg-zinc-900 border border-zinc-800 overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-zinc-800 text-zinc-400 font-bold uppercase tracking-widest text-[9px] bg-zinc-950">
              <th className="p-4">Review ID</th>
              <th className="p-4">Customer Name</th>
              <th className="p-4">Product Name</th>
              <th className="p-4">Rating</th>
              <th className="p-4">Review Comments</th>
              <th className="p-4">Current Status</th>
              <th className="p-4 text-right">Moderation Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-850">
            {reviews.map((r) => (
              <tr key={r.id} className="hover:bg-zinc-850/50 transition">
                <td className="p-4 font-mono text-zinc-500 text-[10px]">{r.id}</td>
                <td className="p-4 font-bold text-zinc-300 uppercase tracking-wide">{r.user}</td>
                <td className="p-4 text-zinc-450">{r.productName}</td>
                <td className="p-4 font-mono font-bold text-amber-500">★ {r.rating} / 5</td>
                <td className="p-4 text-zinc-400 max-w-sm font-medium italic">"{r.comment}"</td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                    r.status === "Approved" 
                      ? "bg-emerald-950 text-emerald-400 border border-emerald-500/20"
                      : r.status === "Flagged"
                      ? "bg-red-955 text-red-400 border border-red-500/20"
                      : "bg-zinc-950 text-zinc-500 border border-zinc-800"
                  }`}>
                    {r.status}
                  </span>
                </td>
                <td className="p-4 text-right space-x-2">
                  {r.status === "Pending" && (
                    permissions && !permissions.editProject ? (
                      <span className="text-[10px] text-zinc-550 font-bold uppercase tracking-wider inline-flex items-center gap-1.5 select-none pr-4">
                        <Lock className="h-3.5 w-3.5 text-zinc-650" />
                        Locked
                      </span>
                    ) : (
                      <>
                        <button
                          onClick={() => handleReviewAction(r.id, "Approved")}
                          className="bg-emerald-600 hover:bg-emerald-500 text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-1.5 transition select-none cursor-pointer"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReviewAction(r.id, "Flagged")}
                          className="bg-red-600 hover:bg-red-500 text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-1.5 transition select-none cursor-pointer"
                        >
                          Flag
                        </button>
                      </>
                    )
                  )}
                  {r.status !== "Pending" && (
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider pr-4">Resolved</span>
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
