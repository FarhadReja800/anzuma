"use client"

import * as React from "react"
import { useVideoManager } from "./hooks/useVideoManager"
import { VideoHeader } from "./VideoHeader"
import { VideoForm } from "./VideoForm"
import { VideoGrid } from "./VideoGrid"
import { EmptyState } from "./EmptyState"

interface VideoTabProps {
  triggerToast: (msg: string) => void
}

export function VideoTab({ triggerToast }: VideoTabProps) {
  const {
    videos,
    loading,
    isAdding,
    previewLoading,
    isSubmitting,
    form,
    setFormTitle,
    setFormIsActive,
    setUploadMethod,
    setFormVideoUrl,
    setPreviewLoading,
    setIsAdding,
    cancelForm,
    handleStartEdit,
    handleFileChange,
    handleDragOver,
    handleDrop,
    handleSubmit,
    toggleStatus,
    deleteVideo,
    loadSamples,
  } = useVideoManager({ triggerToast })

  return (
    <div className="space-y-6 animate-fadeInFast">
      <VideoHeader
        isAdding={isAdding}
        onToggleForm={() => {
          if (isAdding) {
            cancelForm()
          } else {
            setIsAdding(true)
          }
        }}
        onLoadSamples={loadSamples}
      />

      {isAdding ? (
        <VideoForm
          title={form.title}
          setTitle={setFormTitle}
          isActive={form.isActive}
          setIsActive={setFormIsActive}
          uploadMethod={form.uploadMethod}
          setUploadMethod={setUploadMethod}
          videoUrl={form.videoUrl}
          setVideoUrl={setFormVideoUrl}
          previewLoading={previewLoading}
          setPreviewLoading={setPreviewLoading}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
          onCancel={cancelForm}
          onFileSelect={handleFileChange}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          triggerToast={triggerToast}
        />
      ) : (
        <div className="space-y-6">
          {!loading && videos.length === 0 ? (
            <EmptyState onAddFirst={() => setIsAdding(true)} />
          ) : (
            <VideoGrid
              videos={videos}
              loading={loading}
              onEdit={handleStartEdit}
              onDelete={deleteVideo}
              onToggleStatus={toggleStatus}
            />
          )}
        </div>
      )}
    </div>
  )
}
