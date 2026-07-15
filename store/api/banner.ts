import { apiFetch } from "@/lib/api";
import { Banner } from "@/data/banner";

/**
 * Fetch all home banners from the backend.
 * Handles multiple response formats and implements fallback logic.
 */
export async function getBanners(): Promise<Banner[]> {
  try {
    // Try singular fallback first (matching Postman "Get Banner" request naming)
    const response = await apiFetch<unknown>("/home-banner/get-banner");
    return parseBannersResponse(response);
  } catch (error) {
    console.warn("Failed to fetch from /home-banner/get-banner, trying /home-banner...", error);
    try {
      // Try the default GET endpoint
      const response = await apiFetch<unknown>("/home-banner");
      return parseBannersResponse(response);
    } catch (fallbackError) {
      console.warn("Failed to fetch from /home-banner, trying /home-banner/get-banners...", fallbackError);
      try {
        // Try plural fallback
        const response = await apiFetch<unknown>("/home-banner/get-banners");
        return parseBannersResponse(response);
      } catch (lastError) {
        console.error("All banner fetch endpoints failed:", lastError);
        throw lastError;
      }
    }
  }
}

/**
 * Create a new home banner.
 */
export async function createBanner(banner: Omit<Banner, "id" | "_id">): Promise<Banner> {
  return apiFetch<Banner>("/home-banner/create-banner", {
    method: "POST",
    body: JSON.stringify(banner),
  });
}

/**
 * Update an existing home banner.
 */
export async function updateBanner(id: string, banner: Partial<Banner>): Promise<Banner> {
  return apiFetch<Banner>(`/home-banner/update-banner/${id}`, {
    method: "PATCH",
    body: JSON.stringify(banner),
  });
}

/**
 * Delete a home banner.
 */
export async function deleteBanner(id: string): Promise<unknown> {
  return apiFetch<unknown>(`/home-banner/delete-banner/${id}`, {
    method: "DELETE",
  });
}

/**
 * Helper to normalize different potential API response bodies to a clean Banner[] list.
 */
function parseBannersResponse(response: unknown): Banner[] {
  if (!response) return [];
  
  if (Array.isArray(response)) {
    return response as Banner[];
  }
  
  if (typeof response === "object") {
    const resObj = response as Record<string, unknown>;
    
    if (resObj.data && Array.isArray(resObj.data)) {
      return resObj.data as Banner[];
    }
    
    if (resObj.banners && Array.isArray(resObj.banners)) {
      return resObj.banners as Banner[];
    }
    
    if (resObj.title || resObj.imageUrl) {
      return [resObj as unknown as Banner];
    }
  }
  
  return [];
}
