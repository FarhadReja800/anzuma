import * as React from "react"
import { Play, Loader2 } from "lucide-react"

interface VideoPreviewProps {
  videoUrl: string
  previewLoading: boolean
  onLoadedData: () => void
  onError: () => void
}

export function VideoPreview({ videoUrl, previewLoading, onLoadedData, onError }: VideoPreviewProps) {
  return (
    <div className="relative border border-zinc-150 dark:border-zinc-800 rounded-3xl overflow-hidden aspect-video bg-black flex items-center justify-center min-h-[180px]">
      {videoUrl ? (
        <video
          src={videoUrl}
          controls
          muted
          className="absolute inset-0 w-full h-full object-cover"
          onLoadedData={onLoadedData}
          onError={onError}
        />
      ) : (
        <div className="text-center p-4">
          <Play className="h-6 w-6 text-zinc-650 dark:text-zinc-550 mx-auto mb-2" />
          <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
            No Live Preview
          </span>
        </div>
      )}

      {previewLoading && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center gap-2.5 z-10">
          <Loader2 className="h-6 w-6 text-[#047857] animate-spin" />
          <span className="text-[9px] text-zinc-200 uppercase font-black tracking-widest">
            Pre-Buffering Media...
          </span>
        </div>
      )}
    </div>
  )
}
