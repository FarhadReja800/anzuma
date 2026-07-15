import { Video } from "@/data/video";

export const MAX_VIDEO_SIZE = 20 * 1024 * 1024; // 20MB

export function isValidVideoFile(file: File): { valid: boolean; error?: string } {
  if (!file.type.startsWith("video/")) {
    return { valid: false, error: "Please select or drop a valid video file." };
  }
  if (file.size > MAX_VIDEO_SIZE) {
    return { valid: false, error: "File is too large. Max size is 20MB." };
  }
  return { valid: true };
}

export const sampleVideos: Omit<Video, "id" | "_id">[] = [
  {
    title: "Morning Prayer",
    videoUrl: "https://example.com/videos/morning-prayer.mp4",
    isActive: true,
  },
  {
    title: "Evening Prayer",
    videoUrl: "https://example.com/videos/evening-prayer.mp4",
    isActive: true,
  },
  {
    title: "Special Prayer",
    videoUrl: "https://example.com/videos/special-prayer.mp4",
    isActive: false,
  },
];
