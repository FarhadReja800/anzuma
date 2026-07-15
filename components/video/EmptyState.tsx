import * as React from "react"
import { Video as VideoIcon } from "lucide-react"

interface EmptyStateProps {
  onAddFirst: () => void
}

export function EmptyState({ onAddFirst }: EmptyStateProps) {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-850/80 rounded-3xl p-12 text-center flex flex-col items-center justify-center min-h-[300px] space-y-4">
      <div className="h-12 w-12 bg-zinc-50 dark:bg-zinc-955 rounded-2xl flex items-center justify-center text-zinc-400">
        <VideoIcon className="h-6 w-6" />
      </div>
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
          No Video Banners Loaded
        </h3>
        <p className="text-[10px] text-zinc-400 dark:text-zinc-550 mt-1 max-w-sm mx-auto">
          Create beautiful looping videos to display on the storefront landing banner.
        </p>
      </div>
      <button
        onClick={onAddFirst}
        className="px-5 py-2 bg-[#047857] text-white hover:bg-emerald-700 text-[10px] font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
      >
        Add Your First Video
      </button>
    </div>
  )
}
