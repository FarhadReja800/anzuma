"use client"

import * as React from "react"
import { Edit2, Trash2, Lock, Eye } from "lucide-react"
import { Blog } from "./types"

interface BlogListProps {
  blogs: Blog[]
  canEdit: boolean
  canDelete: boolean
  onEdit: (b: Blog) => void
  onDelete: (id: string | number) => void
}

export function BlogList({ blogs, canEdit, canDelete, onEdit, onDelete }: BlogListProps) {
  if (!blogs || blogs.length === 0) {
    return (
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/80 rounded-2xl p-8 text-center text-xs text-zinc-400">
        No blog or news items found. Click &quot;Add New&quot; above to create one.
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/80 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.01)] overflow-hidden">
      <table className="w-full text-left text-xs border-collapse">
        <thead>
          <tr className="border-b border-zinc-100 dark:border-zinc-850 text-zinc-400 font-bold uppercase tracking-wider text-[10px] bg-zinc-50/50 dark:bg-zinc-900/50">
            <th className="p-4">Blog Title</th>
            <th className="p-4">Category</th>
            <th className="p-4">Tags</th>
            <th className="p-4">Views</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-850 font-medium">
          {blogs.map(b => {
            const blogId = b._id || b.id || ""
            return (
              <tr key={String(blogId)} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-850/30 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    {b.image && (
                      <img 
                        src={b.image} 
                        alt={b.title} 
                        className="w-10 h-10 object-cover rounded-lg border border-zinc-200 dark:border-zinc-800 shrink-0"
                      />
                    )}
                    <div>
                      <div className="font-bold text-zinc-800 dark:text-zinc-200 tracking-wide line-clamp-1">{b.title}</div>
                      <div className="text-[11px] text-zinc-400 font-normal line-clamp-1">{b.excerpt || b.content}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="bg-emerald-50 dark:bg-emerald-950/50 text-[#3eb075] border border-emerald-200 dark:border-emerald-800/50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md">
                    {b.category || "General"}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-1">
                    {b.tags && b.tags.length > 0 ? (
                      b.tags.slice(0, 3).map((t, idx) => (
                        <span key={idx} className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 px-1.5 py-0.5 text-[9px] rounded font-mono">
                          #{t}
                        </span>
                      ))
                    ) : (
                      <span className="text-[11px] text-zinc-400 font-mono">-</span>
                    )}
                  </div>
                </td>
                <td className="p-4 font-mono text-[11px] text-zinc-500">
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3 text-zinc-400" />
                    <span>{b.views ?? 0}</span>
                  </div>
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end items-center gap-2">
                    {canEdit ? (
                      <button 
                        onClick={() => onEdit(b)}
                        className="p-2 text-zinc-400 hover:text-[#3eb075] hover:bg-emerald-50 dark:hover:bg-zinc-800 rounded-lg cursor-pointer transition-colors"
                        title="Edit News"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                    ) : (
                      <span className="text-[10px] text-zinc-355 dark:text-zinc-650 cursor-not-allowed select-none"><Lock className="h-3 w-3 inline" /></span>
                    )}

                    {canDelete ? (
                      <button 
                        onClick={() => onDelete(blogId)}
                        className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-zinc-800 rounded-lg cursor-pointer transition-colors"
                        title="Delete News"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    ) : (
                      <span className="text-[10px] text-zinc-355 dark:text-zinc-650 cursor-not-allowed select-none"><Lock className="h-3 w-3 inline" /></span>
                    )}
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
