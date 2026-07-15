import * as React from "react"
import { Edit, Trash2, Play, Eye, EyeOff } from "lucide-react"
import { Video } from "@/data/video"

interface VideoCardProps {
  video: Video
  onEdit: (video: Video) => void
  onDelete: (id: string) => void
  onToggleStatus: (id: string) => void
}

export function VideoCard({ video, onEdit, onDelete, onToggleStatus }: VideoCardProps) {
  const videoId = video.id || video._id || ""

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/80 rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 relative flex flex-col group">
      {/* Active/Inactive state indicator overlay */}
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <span className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-wider select-none ${
          video.isActive
            ? "bg-emerald-500/90 text-white shadow-xs"
            : "bg-zinc-900/90 text-zinc-300 dark:bg-zinc-800/90 dark:text-zinc-400"
        }`}>
          {video.isActive ? "Active" : "Disabled"}
        </span>
      </div>

      {/* Controls Actions overlay */}
      <div className="absolute top-4 right-4 z-10 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          type="button"
          onClick={() => onEdit(video)}
          className="p-1.5 bg-white/90 text-zinc-700 hover:text-zinc-955 dark:bg-zinc-900/90 dark:text-zinc-300 hover:bg-white rounded-lg shadow-sm cursor-pointer transition-colors"
          title="Edit Video"
        >
          <Edit className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={() => onDelete(videoId)}
          className="p-1.5 bg-red-500/95 text-white hover:bg-red-650 rounded-lg shadow-sm cursor-pointer transition-colors"
          title="Delete Video"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Preview video container */}
      <div className="aspect-video bg-black relative overflow-hidden flex items-center justify-center">
        <video
          src={video.videoUrl}
          className="w-full h-full object-cover pointer-events-none"
          muted
          preload="metadata"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-70 group-hover:opacity-30 transition-opacity pointer-events-none">
          <Play className="h-7 w-7 text-white opacity-85" />
        </div>
      </div>

      {/* Text Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-1.5">
          <h4 className="text-xs font-black tracking-tight text-zinc-800 dark:text-zinc-155 line-clamp-1">
            {video.title || "No Title"}
          </h4>
          <span className="block text-[9px] text-zinc-450 dark:text-zinc-500 truncate font-mono">
            {video.videoUrl.startsWith("data:") ? "Local File (Base64)" : video.videoUrl}
          </span>
        </div>

        <div className="mt-4 pt-3.5 border-t border-zinc-50 dark:border-zinc-850 flex items-center justify-end">
          {/* Quick state toggle */}
          <button
            type="button"
            onClick={() => onToggleStatus(videoId)}
            className="text-[9px] font-extrabold uppercase tracking-wider flex items-center gap-1 text-zinc-405 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
          >
            {video.isActive ? (
              <>
                <EyeOff className="h-3 w-3" />
                Deactivate
              </>
            ) : (
              <>
                <Eye className="h-3 w-3" />
                Activate
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
