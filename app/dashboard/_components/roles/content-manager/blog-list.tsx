"use client"

import * as React from "react"
import { Edit2, Trash2, Lock } from "lucide-react"
import { Blog } from "./types"

interface BlogListProps {
  blogs: Blog[]
  canEdit: boolean
  canDelete: boolean
  onEdit: (b: Blog) => void
  onDelete: (id: number) => void
}

export function BlogList({ blogs, canEdit, canDelete, onEdit, onDelete }: BlogListProps) {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/80 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.01)] overflow-hidden">
      <table className="w-full text-left text-xs border-collapse">
        <thead>
          <tr className="border-b border-zinc-100 dark:border-zinc-850 text-zinc-400 font-bold uppercase tracking-wider text-[10px] bg-zinc-50/50 dark:bg-zinc-900/50">
            <th className="p-4">Blog Title</th>
            <th className="p-4">Category</th>
            <th className="p-4">Publication Date</th>
            <th className="p-4">Excerpt</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-850 font-medium">
          {blogs.map(b => (
            <tr key={b.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-850/30 transition-colors">
              <td className="p-4 font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wide">{b.title}</td>
              <td className="p-4">
                <span className="bg-zinc-50 dark:bg-zinc-800 text-zinc-550 border border-zinc-200 dark:border-zinc-800 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md">
                  {b.category}
                </span>
              </td>
              <td className="p-4 font-mono text-[11px] text-zinc-500">{b.date}</td>
              <td className="p-4 text-zinc-450 dark:text-zinc-505 max-w-xs truncate">{b.excerpt}</td>
              <td className="p-4 text-right">
                <div className="flex justify-end items-center gap-2">
                  {canEdit ? (
                    <button 
                      onClick={() => onEdit(b)}
                      className="p-2 text-zinc-400 hover:text-[#3eb075] hover:bg-emerald-50 dark:hover:bg-zinc-800 rounded-lg cursor-pointer transition-colors"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                  ) : (
                    <span className="text-[10px] text-zinc-355 dark:text-zinc-650 cursor-not-allowed select-none"><Lock className="h-3 w-3 inline" /></span>
                  )}

                  {canDelete ? (
                    <button 
                      onClick={() => onDelete(b.id)}
                      className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-zinc-800 rounded-lg cursor-pointer transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  ) : (
                    <span className="text-[10px] text-zinc-355 dark:text-zinc-650 cursor-not-allowed select-none"><Lock className="h-3 w-3 inline" /></span>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
