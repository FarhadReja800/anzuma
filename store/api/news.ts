import { apiFetch } from "@/lib/api";
import { NewsItem, CreateNewsPayload, UpdateNewsPayload, NewsAPIResponse } from "@/data/news";

/**
 * Create a new news/blog post (Admin / SuperAdmin)
 * Endpoint: POST /news/create-news
 */
export async function createNews(payload: CreateNewsPayload): Promise<NewsAPIResponse<NewsItem>> {
  return apiFetch<NewsAPIResponse<NewsItem>>("/news/create-news", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/**
 * Get all news/blog items
 * Endpoint: GET /news/all-news
 */
export async function getAllNews(): Promise<NewsAPIResponse<NewsItem[]> | NewsItem[]> {
  try {
    const response = await apiFetch<NewsAPIResponse<NewsItem[]> | NewsItem[]>("/news/all-news");
    return response;
  } catch (error) {
    console.warn("Failed to fetch /news/all-news, trying fallback /news...", error);
    return apiFetch<NewsAPIResponse<NewsItem[]> | NewsItem[]>("/news");
  }
}

/**
 * Get a single news item by slug or ID
 * Endpoint: GET /news/single-news/:slug
 */
export async function getSingleNews(slugOrId: string): Promise<NewsAPIResponse<NewsItem> | NewsItem> {
  return apiFetch<NewsAPIResponse<NewsItem> | NewsItem>(`/news/single-news/${encodeURIComponent(slugOrId)}`);
}

/**
 * Update an existing news post by ID
 * Endpoint: PATCH /news/update-news/:id
 */
export async function updateNews(id: string, payload: UpdateNewsPayload): Promise<NewsAPIResponse<NewsItem>> {
  return apiFetch<NewsAPIResponse<NewsItem>>(`/news/update-news/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

/**
 * Delete a news post by ID
 * Endpoint: DELETE /news/delete-news/:id
 */
export async function deleteNews(id: string): Promise<{ success: boolean; message?: string }> {
  return apiFetch<{ success: boolean; message?: string }>(`/news/delete-news/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
}
