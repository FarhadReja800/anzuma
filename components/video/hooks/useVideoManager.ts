import * as React from "react"
import { Video } from "@/data/video"
import { 
  getHomeVideoContainer, 
  createHomeVideoContainer, 
  updateHomeVideoContainer, 
  deleteHomeVideoContainer,
  uploadVideoFile
} from "@/store/api/video"
import { sampleVideos, isValidVideoFile } from "../utils/video"

interface FormState {
  title: string
  videoUrl: string
  videoFile: File | null
  isActive: boolean
  uploadMethod: "upload" | "url"
}

interface VideoState {
  videos: Video[]
  containerId: string | null
  loading: boolean
  isAdding: boolean
  editingVideoId: string | null
  previewLoading: boolean
  isSubmitting: boolean
  form: FormState
}

const initialFormState: FormState = {
  title: "",
  videoUrl: "",
  videoFile: null,
  isActive: true,
  uploadMethod: "upload",
}

const initialState: VideoState = {
  videos: [],
  containerId: null,
  loading: true,
  isAdding: false,
  editingVideoId: null,
  previewLoading: false,
  isSubmitting: false,
  form: initialFormState,
}

type VideoAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_SUBMITTING"; payload: boolean }
  | { type: "SET_PREVIEW_LOADING"; payload: boolean }
  | { type: "SET_IS_ADDING"; payload: boolean }
  | { type: "FETCH_SUCCESS"; payload: { videos: Video[]; containerId: string | null } }
  | { type: "START_EDIT"; payload: { video: Video; editingVideoId: string; uploadMethod: "upload" | "url" } }
  | { type: "CANCEL_FORM" }
  | { type: "UPDATE_FORM_FIELD"; payload: Partial<FormState> }
  | { type: "SYNC_VIDEOS"; payload: { videos: Video[]; containerId?: string | null } }

function videoReducer(state: VideoState, action: VideoAction): VideoState {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload }
    case "SET_SUBMITTING":
      return { ...state, isSubmitting: action.payload }
    case "SET_PREVIEW_LOADING":
      return { ...state, previewLoading: action.payload }
    case "SET_IS_ADDING":
      return { ...state, isAdding: action.payload }
    case "FETCH_SUCCESS":
      return {
        ...state,
        videos: action.payload.videos,
        containerId: action.payload.containerId,
        loading: false,
      }
    case "START_EDIT":
      return {
        ...state,
        isAdding: true,
        editingVideoId: action.payload.editingVideoId,
        previewLoading: !!action.payload.video.videoUrl,
        form: {
          title: action.payload.video.title || "",
          videoUrl: action.payload.video.videoUrl || "",
          videoFile: null,
          isActive: action.payload.video.isActive ?? true,
          uploadMethod: action.payload.uploadMethod,
        },
      }
    case "CANCEL_FORM":
      return {
        ...state,
        isAdding: false,
        editingVideoId: null,
        previewLoading: false,
        form: initialFormState,
      }
    case "UPDATE_FORM_FIELD":
      return {
        ...state,
        form: {
          ...state.form,
          ...action.payload,
        },
      }
    case "SYNC_VIDEOS":
      return {
        ...state,
        videos: action.payload.videos,
        containerId: action.payload.containerId !== undefined ? action.payload.containerId : state.containerId,
      }
    default:
      return state
  }
}

interface UseVideoManagerProps {
  triggerToast: (msg: string) => void
}

export function useVideoManager({ triggerToast }: UseVideoManagerProps) {
  const [state, dispatch] = React.useReducer(videoReducer, initialState)

  const loadVideosData = React.useCallback(async () => {
    try {
      const container = await getHomeVideoContainer()
      if (container) {
        dispatch({
          type: "FETCH_SUCCESS",
          payload: { videos: container.videos || [], containerId: container._id || null },
        })
      } else {
        dispatch({
          type: "FETCH_SUCCESS",
          payload: { videos: [], containerId: null },
        })
      }
    } catch (error) {
      console.error("Failed to fetch videos from API:", error)
      triggerToast("Failed to fetch videos from server.")
      dispatch({
        type: "FETCH_SUCCESS",
        payload: { videos: [], containerId: null },
      })
    }
  }, [triggerToast])

  React.useEffect(() => {
    loadVideosData()
  }, [loadVideosData])

  const setFormTitle = (title: string) => {
    dispatch({ type: "UPDATE_FORM_FIELD", payload: { title } })
  }

  const setFormIsActive = (isActive: boolean) => {
    dispatch({ type: "UPDATE_FORM_FIELD", payload: { isActive } })
  }

  const setUploadMethod = (uploadMethod: "upload" | "url") => {
    dispatch({ type: "UPDATE_FORM_FIELD", payload: { uploadMethod } })
  }

  const setFormVideoUrl = (videoUrl: string) => {
    dispatch({ type: "UPDATE_FORM_FIELD", payload: { videoUrl } })
  }

  const setPreviewLoading = (previewLoading: boolean) => {
    dispatch({ type: "SET_PREVIEW_LOADING", payload: previewLoading })
  }

  const setIsAdding = (isAdding: boolean) => {
    dispatch({ type: "SET_IS_ADDING", payload: isAdding })
  }

  const cancelForm = React.useCallback(() => {
    if (state.form.videoUrl && state.form.videoUrl.startsWith("blob:")) {
      URL.revokeObjectURL(state.form.videoUrl)
    }
    dispatch({ type: "CANCEL_FORM" })
  }, [state.form.videoUrl])

  const handleStartEdit = (video: Video) => {
    const videoId = video.id || video._id || ""
    
    // Auto-detect upload method based on video URL
    let uploadMethod: "upload" | "url" = "upload"
    if (video.videoUrl && !(video.videoUrl.startsWith("blob:") || video.videoUrl.startsWith("data:") || video.videoUrl.includes("res.cloudinary.com"))) {
      uploadMethod = "url"
    }

    dispatch({
      type: "START_EDIT",
      payload: { video, editingVideoId: videoId, uploadMethod },
    })
  }

  const handleFileChange = (file: File) => {
    const validation = isValidVideoFile(file)
    if (!validation.valid) {
      triggerToast(validation.error || "Invalid file")
      return
    }

    dispatch({ type: "SET_PREVIEW_LOADING", payload: true })
    if (state.form.videoUrl && state.form.videoUrl.startsWith("blob:")) {
      URL.revokeObjectURL(state.form.videoUrl)
    }

    const objectUrl = URL.createObjectURL(file)
    dispatch({
      type: "UPDATE_FORM_FIELD",
      payload: {
        videoFile: file,
        videoUrl: objectUrl,
      },
    })
    triggerToast("Video loaded successfully")
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (!file) return

    handleFileChange(file)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { title, videoUrl, videoFile, isActive, uploadMethod } = state.form

    if (!title.trim() || !videoUrl.trim()) {
      triggerToast("Title and Video URL are required")
      return
    }

    dispatch({ type: "SET_SUBMITTING", payload: true })

    let finalVideoUrl = videoUrl.trim()

    try {
      if (uploadMethod === "upload" && videoFile) {
        triggerToast("Uploading video file...")
        const uploadRes = await uploadVideoFile(videoFile)
        if (uploadRes && uploadRes.success && uploadRes.data && uploadRes.data.url) {
          finalVideoUrl = uploadRes.data.url
        } else {
          throw new Error("Failed to upload video file to server.")
        }
      }

      const newVideoPayload = {
        title: title.trim(),
        videoUrl: finalVideoUrl,
        isActive,
      }

      if (state.editingVideoId) {
        const updatedVideos = state.videos.map(v => {
          const id = v.id || v._id
          if (id === state.editingVideoId) {
            return newVideoPayload
          }
          return {
            title: v.title,
            videoUrl: v.videoUrl,
            isActive: v.isActive,
          }
        })

        if (state.containerId) {
          const response = await updateHomeVideoContainer(state.containerId, updatedVideos)
          dispatch({
            type: "SYNC_VIDEOS",
            payload: { videos: response.videos || [] },
          })
          triggerToast("Video updated successfully!")
        } else {
          const response = await createHomeVideoContainer(updatedVideos)
          dispatch({
            type: "SYNC_VIDEOS",
            payload: { videos: response.videos || [], containerId: response._id || null },
          })
          triggerToast("Video updated successfully!")
        }
      } else {
        if (state.videos.length >= 5) {
          triggerToast("Maximum 5 videos allowed. Please delete one first.")
          dispatch({ type: "SET_SUBMITTING", payload: false })
          return
        }

        const updatedVideos = [
          ...state.videos.map(v => ({ title: v.title, videoUrl: v.videoUrl, isActive: v.isActive })),
          newVideoPayload,
        ]

        if (state.containerId) {
          const response = await updateHomeVideoContainer(state.containerId, updatedVideos)
          dispatch({
            type: "SYNC_VIDEOS",
            payload: { videos: response.videos || [] },
          })
          triggerToast("Video added successfully!")
        } else {
          const response = await createHomeVideoContainer(updatedVideos)
          dispatch({
            type: "SYNC_VIDEOS",
            payload: { videos: response.videos || [], containerId: response._id || null },
          })
          triggerToast("Video container created successfully!")
        }
      }
      cancelForm()
    } catch (error: any) {
      console.error("Could not sync video data with backend:", error)
      triggerToast(error.message || "Failed to update video configuration.")
    } finally {
      dispatch({ type: "SET_SUBMITTING", payload: false })
    }
  }

  const toggleStatus = async (id: string) => {
    if (!id || !state.containerId) return

    const updatedVideos = state.videos.map(v => {
      const vidId = v.id || v._id
      return {
        title: v.title,
        videoUrl: v.videoUrl,
        isActive: vidId === id ? !v.isActive : v.isActive,
      }
    })

    try {
      const response = await updateHomeVideoContainer(state.containerId, updatedVideos)
      dispatch({
        type: "SYNC_VIDEOS",
        payload: { videos: response.videos || [] },
      })
      triggerToast("Video status updated!")
    } catch (error: any) {
      console.error("Could not toggle status:", error)
      triggerToast(error.message || "Failed to toggle status.")
    }
  }

  const deleteVideo = async (id: string) => {
    if (!id || !state.containerId) return
    if (!confirm("Are you sure you want to delete this video?")) return

    try {
      if (state.videos.length === 1) {
        await deleteHomeVideoContainer(state.containerId)
        dispatch({
          type: "SYNC_VIDEOS",
          payload: { videos: [], containerId: null },
        })
        triggerToast("Last video deleted. Video container removed.")
      } else {
        const updatedVideos = state.videos
          .filter(v => (v.id || v._id) !== id)
          .map(v => ({
            title: v.title,
            videoUrl: v.videoUrl,
            isActive: v.isActive,
          }))

        const response = await updateHomeVideoContainer(state.containerId, updatedVideos)
        dispatch({
          type: "SYNC_VIDEOS",
          payload: { videos: response.videos || [] },
        })
        triggerToast("Video deleted successfully!")
      }
    } catch (error: any) {
      console.error("Could not delete video:", error)
      triggerToast(error.message || "Failed to delete video.")
    }
  }

  const loadSamples = async () => {
    try {
      if (state.containerId) {
        const response = await updateHomeVideoContainer(state.containerId, sampleVideos)
        dispatch({
          type: "SYNC_VIDEOS",
          payload: { videos: response.videos || [] },
        })
        triggerToast("Sample videos loaded successfully!")
      } else {
        const response = await createHomeVideoContainer(sampleVideos)
        dispatch({
          type: "SYNC_VIDEOS",
          payload: { videos: response.videos || [], containerId: response._id || null },
        })
        triggerToast("Sample videos created successfully!")
      }
    } catch (error: any) {
      console.error("Failed to load sample videos:", error)
      triggerToast(error.message || "Failed to load sample videos.")
    }
  }

  return {
    videos: state.videos,
    containerId: state.containerId,
    loading: state.loading,
    isAdding: state.isAdding,
    editingVideoId: state.editingVideoId,
    previewLoading: state.previewLoading,
    isSubmitting: state.isSubmitting,
    form: state.form,
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
  }
}
