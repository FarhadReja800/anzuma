import * as React from "react"
import { Plus, X } from "lucide-react"

interface VideoHeaderProps {
  isAdding: boolean
  onToggleForm: () => void
  onLoadSamples: () => void
}

export function VideoHeader({ isAdding, onToggleForm, onLoadSamples }: VideoHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-zinc-150 dark:border-zinc-800/80 pb-5">
      <div>
        <h2 className="text-base font-extrabold uppercase tracking-wider text-zinc-850 dark:text-zinc-100">
          Homepage Hero Videos
        </h2>
        <p className="text-[11px] text-zinc-400 dark:text-zinc-550 mt-1.5">
          Configure background loop video campaigns featured on the storefront homepage (Maximum 5 videos).
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onLoadSamples}
          className="flex items-center gap-2 px-4 py-2 bg-[#1e3a8a] text-white text-[10px] font-extrabold uppercase tracking-wider rounded-xl hover:bg-[#1e40af] transition-all duration-200"
        >
          Load Sample
        </button>
        <button
          type="button"
          onClick={onToggleForm}
          className={`flex items-center justify-center gap-2 px-4 py-2 text-[10px] font-extrabold uppercase tracking-wider transition-all duration-200 cursor-pointer rounded-xl ${
            isAdding
              ? "bg-zinc-100 text-zinc-655 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
              : "bg-[#047857] text-white hover:bg-emerald-700 shadow-md shadow-emerald-500/10"
          }`}
        >
          {isAdding ? (
            <>
              <X className="h-3.5 w-3.5" />
              Cancel Form
            </>
          ) : (
            <>
              <Plus className="h-3.5 w-3.5" />
              Create Video Banner
            </>
          )}
        </button>
      </div>
    </div>
  )
}
