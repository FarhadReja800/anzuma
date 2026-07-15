import * as React from "react"
import { Sparkles, Loader2 } from "lucide-react"
import { VideoPreview } from "./VideoPreview"
import { VideoUpload } from "./VideoUpload"

interface VideoFormProps {
  title: string
  setTitle: (t: string) => void
  isActive: boolean
  setIsActive: (a: boolean) => void
  uploadMethod: "upload" | "url"
  setUploadMethod: (m: "upload" | "url") => void
  videoUrl: string
  setVideoUrl: (url: string) => void
  previewLoading: boolean
  setPreviewLoading: (l: boolean) => void
  isSubmitting: boolean
  onSubmit: (e: React.FormEvent) => void
  onCancel: () => void
  onFileSelect: (file: File) => void
  onDragOver: (e: React.DragEvent) => void
  onDrop: (e: React.DragEvent) => void
  triggerToast: (msg: string) => void
}

export function VideoForm({
  title,
  setTitle,
  isActive,
  setIsActive,
  uploadMethod,
  setUploadMethod,
  videoUrl,
  setVideoUrl,
  previewLoading,
  setPreviewLoading,
  isSubmitting,
  onSubmit,
  onCancel,
  onFileSelect,
  onDragOver,
  onDrop,
  triggerToast
}: VideoFormProps) {
  return (
    <form onSubmit={onSubmit} className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/85 p-6 rounded-3xl shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Column - Video details */}
      <div className="space-y-5">
        <div className="flex items-center gap-2 text-xs font-extrabold uppercase text-[#047857] tracking-wider mb-2">
          <Sparkles className="h-4 w-4" />
          <span>Video Details</span>
        </div>

        {/* Video Title Input */}
        <div className="space-y-1.5">
          <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-550">
            Video Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Aesthetics in Motion"
            required
            className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs font-semibold focus:outline-hidden focus:ring-1 focus:ring-[#047857] transition-all"
          />
        </div>

        {/* Status Switch */}
        <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-955 border border-zinc-150 dark:border-zinc-800 rounded-2xl">
          <div>
            <span className="block text-xs font-bold text-zinc-800 dark:text-zinc-205 uppercase tracking-wide">
              Active Status
            </span>
            <span className="block text-[9px] text-zinc-400 dark:text-zinc-555">
              Render this video in the active rotation slider.
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsActive(!isActive)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
              isActive ? "bg-emerald-500" : "bg-zinc-200 dark:bg-zinc-800"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                isActive ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Right Column - Media / Assets */}
      <div className="space-y-5 flex flex-col h-full">
        <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
          <span className="text-xs font-extrabold uppercase text-zinc-400 dark:text-zinc-500 tracking-wider">
            Video Assets
          </span>
          <div className="flex bg-zinc-50 dark:bg-zinc-955 p-0.5 rounded-lg border border-zinc-200 dark:border-zinc-800">
            <button
              type="button"
              onClick={() => setUploadMethod("upload")}
              className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider transition-colors ${
                uploadMethod === "upload"
                  ? "bg-[#047857] text-white"
                  : "text-zinc-500 hover:text-zinc-700"
              }`}
            >
              Upload File
            </button>
            <button
              type="button"
              onClick={() => setUploadMethod("url")}
              className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider transition-colors ${
                uploadMethod === "url"
                  ? "bg-[#047857] text-white"
                  : "text-zinc-500 hover:text-zinc-700"
              }`}
            >
              Remote URL
            </button>
          </div>
        </div>

        {uploadMethod === "url" ? (
          <div className="space-y-1.5">
            <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              Video URL Path
            </label>
            <input
              type="text"
              value={videoUrl.startsWith("data:") ? "" : videoUrl}
              onChange={(e) => {
                const url = e.target.value
                setVideoUrl(url)
                setPreviewLoading(!!url)
              }}
              placeholder="https://example.com/assets/intro.mp4"
              required
              className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-955 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs font-semibold focus:outline-hidden focus:ring-1 focus:ring-[#047857] transition-all"
            />
            <span className="block text-[9px] text-zinc-400">
              Provide a hotlink to a public video hosting server (.mp4, .webm format).
            </span>
          </div>
        ) : (
          <VideoUpload
            onFileSelect={onFileSelect}
            onDragOver={onDragOver}
            onDrop={onDrop}
          />
        )}

        {/* Video Preview */}
        <VideoPreview
          videoUrl={videoUrl}
          previewLoading={previewLoading}
          onLoadedData={() => setPreviewLoading(false)}
          onError={() => {
            setPreviewLoading(false)
            triggerToast("Invalid video source URL.")
          }}
        />

        {/* Action Buttons */}
        <div className="flex gap-3.5 pt-4 mt-auto">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-3 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-850 text-[10px] font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer text-center"
          >
            Discard Change
          </button>
          <button
            type="submit"
            disabled={isSubmitting || previewLoading}
            className="flex-1 py-3 bg-[#047857] hover:bg-emerald-700 disabled:bg-zinc-200 dark:disabled:bg-zinc-800 disabled:text-zinc-400 text-white text-[10px] font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer text-center flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Saving Video...
              </>
            ) : (
              "Save Video"
            )}
          </button>
        </div>
      </div>
    </form>
  )
}
