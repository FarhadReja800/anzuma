import { apiFetch } from "@/lib/api";
import { Video } from "@/data/video";

export interface HomeVideoResponse {
  _id?: string;
  videos: Video[];
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Fetch the home video container from the backend.
 */
export async function getHomeVideoContainer(): Promise<HomeVideoResponse | null> {
  try {
    const response = await apiFetch<{ success: boolean; data: HomeVideoResponse | null }>("/video/get-video");
    if (response && response.success && response.data) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.warn("Failed to fetch from /video/get-video, trying fallback /video...", error);
    try {
      const response = await apiFetch<{ success: boolean; data: HomeVideoResponse | null }>("/video");
      if (response && response.success && response.data) {
        return response.data;
      }
      return null;
    } catch (fallbackError) {
      console.error("All video fetch endpoints failed:", fallbackError);
      return null;
    }
  }
}

/**
 * Create a new home video container.
 */
export async function createHomeVideoContainer(videos: Omit<Video, "id" | "_id">[]): Promise<HomeVideoResponse> {
  const response = await apiFetch<{ success: boolean; data: HomeVideoResponse }>("/video/create-video", {
    method: "POST",
    body: JSON.stringify({ videos }),
  });
  return response.data;
}

/**
 * Update the existing home video container.
 */
export async function updateHomeVideoContainer(id: string, videos: Omit<Video, "id" | "_id">[]): Promise<HomeVideoResponse> {
  const response = await apiFetch<{ success: boolean; data: HomeVideoResponse }>(`/video/update-video/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ videos }),
  });
  return response.data;
}

/**
 * Delete the entire home video container.
 */
export async function deleteHomeVideoContainer(id: string): Promise<unknown> {
  return apiFetch<unknown>(`/video/delete-video/${id}`, {
    method: "DELETE",
  });
}

/**
 * Upload a video file to the backend and return the uploaded URL.
 */
export async function uploadVideoFile(file: File): Promise<{ success: boolean; data: { url: string } }> {
  const formData = new FormData();
  formData.append("video", file);

  return apiFetch<{ success: boolean; data: { url: string } }>("/video/upload-video", {
    method: "POST",
    body: formData,
  });
}
