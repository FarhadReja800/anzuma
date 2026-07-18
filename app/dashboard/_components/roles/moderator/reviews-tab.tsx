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
      <h2 className="text-xs font-bold uppercase tracking-widest text-black dark:text-zinc-200">
        Review Moderation Center
      </h2>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-x-auto shadow-[0_1px_3px_rgba(0,0,0,0.01)] rounded-2xl">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-800 text-black dark:text-zinc-400 font-bold uppercase tracking-widest text-[9px] bg-zinc-50/50 dark:bg-zinc-900/50">
              <th className="p-4">Review ID</th>
              <th className="p-4">Customer Name</th>
              <th className="p-4">Product Name</th>
              <th className="p-4">Rating</th>
              <th className="p-4">Review Comments</th>
              <th className="p-4">Current Status</th>
              <th className="p-4 text-right">Moderation Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/80">
            {reviews.map((r) => (
              <tr key={r.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-850/30 transition-colors">
                <td className="p-4 font-mono text-black/70 dark:text-zinc-400 text-[10px]">{r.id}</td>
                <td className="p-4 font-bold text-black dark:text-zinc-200 uppercase tracking-wide">{r.user}</td>
                <td className="p-4 text-black/85 dark:text-zinc-400">{r.productName}</td>
                <td className="p-4 font-mono font-bold text-amber-650 dark:text-amber-500">★ {r.rating} / 5</td>
                <td className="p-4 text-black dark:text-zinc-300 max-w-sm font-medium italic">{r.comment}</td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider border rounded ${
                    r.status === "Approved" 
                      ? "bg-emerald-50 text-emerald-700 border-emerald-250 dark:bg-emerald-955 dark:text-emerald-450 dark:border-emerald-500/20"
                      : r.status === "Flagged"
                      ? "bg-red-50 text-red-700 border-red-200 dark:bg-red-955 dark:text-red-455 dark:border-red-500/20"
                      : "bg-zinc-50 text-zinc-500 border-zinc-200 dark:bg-zinc-955 dark:text-zinc-500 dark:border-zinc-800"
                  }`}>
                    {r.status}
                  </span>
                </td>
                <td className="p-4 text-right space-x-2">
                  {r.status === "Pending" && (
                    permissions && !permissions.editProject ? (
                      <span className="text-[10px] text-black/60 dark:text-zinc-450 font-bold uppercase tracking-wider inline-flex items-center gap-1.5 select-none pr-4">
                        <Lock className="h-3.5 w-3.5 text-black/50" />
                        Locked
                      </span>
                    ) : (
                      <>
                        <button
                          onClick={() => handleReviewAction(r.id, "Approved")}
                          className="bg-emerald-600 hover:bg-emerald-500 text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-1.5 transition select-none cursor-pointer rounded-lg"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReviewAction(r.id, "Flagged")}
                          className="bg-red-600 hover:bg-red-500 text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-1.5 transition select-none cursor-pointer rounded-lg"
                        >
                          Flag
                        </button>
                      </>
                    )
                  )}
                  {r.status !== "Pending" && (
                    <span className="text-[10px] text-black/60 dark:text-zinc-550 font-bold uppercase tracking-wider pr-4">Resolved</span>
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
