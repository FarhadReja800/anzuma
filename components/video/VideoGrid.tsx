import * as React from "react"
import { Loader2 } from "lucide-react"
import { Video } from "@/data/video"
import { VideoCard } from "./VideoCard"

interface VideoGridProps {
  videos: Video[]
  loading: boolean
  onEdit: (video: Video) => void
  onDelete: (id: string) => void
  onToggleStatus: (id: string) => void
}

export function VideoGrid({ videos, loading, onEdit, onDelete, onToggleStatus }: VideoGridProps) {
  if (loading) {
    return (
      <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-3xl p-12 flex flex-col items-center justify-center min-h-[300px]">
        <Loader2 className="h-8 w-8 text-[#047857] animate-spin mb-3" />
        <span className="text-xs text-zinc-400 font-bold uppercase tracking-widest animate-pulse">
          Accessing background video pool...
        </span>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video) => (
        <VideoCard
          key={video.id || video._id}
          video={video}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleStatus={onToggleStatus}
        />
      ))}
    </div>
  )
}
