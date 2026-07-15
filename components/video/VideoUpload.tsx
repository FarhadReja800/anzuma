import * as React from "react"
import { Video as VideoIcon } from "lucide-react"

interface VideoUploadProps {
  onFileSelect: (file: File) => void
  onDragOver: (e: React.DragEvent) => void
  onDrop: (e: React.DragEvent) => void
}

export function VideoUpload({ onFileSelect, onDragOver, onDrop }: VideoUploadProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onFileSelect(file)
    }
  }

  return (
    <div
      onDragOver={onDragOver}
      onDrop={onDrop}
      className="flex-1 min-h-[160px] border-2 border-dashed border-zinc-200 dark:border-zinc-850 hover:border-[#047857] rounded-3xl flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-colors relative group bg-zinc-50/50 dark:bg-zinc-955/20"
    >
      <input
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      <VideoIcon className="h-8 w-8 text-zinc-300 group-hover:text-[#047857] mb-3 transition-colors" />
      <span className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300">
        Drag & drop video here or click to browse
      </span>
      <span className="block text-[9px] text-zinc-400 mt-1 uppercase tracking-wider">
        Supports MP4, WebM (Max 20MB)
      </span>
    </div>
  )
}
