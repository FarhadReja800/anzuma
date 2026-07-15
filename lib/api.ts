/**
 * Standard API Fetch helper for Arzuma.
 * Automatically prepends the base URL for client-side API requests,
 * sets correct headers (including Bearer Auth token from localStorage),
 * and manages response errors cleanly.
 */

const BASE_URL = "/api";

export async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  // If endpoint is relative (e.g. '/user/login'), prefix it with the base URL.
  // If it's absolute (e.g. 'http://localhost:5000/api/...'), use it directly.
  const url = endpoint.startsWith("http") ? endpoint : `${BASE_URL}${endpoint}`;

  const headers: HeadersInit = {
    ...(options.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
    ...options.headers,
  };

  // If in client context, automatically attach bearer authorization token
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("arzuma_token");
    if (token && !(headers as any)["Authorization"]) {
      (headers as any)["Authorization"] = token.startsWith("Bearer ") ? token : `Bearer ${token}`;
    }
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorMessage = `API Error: ${response.statusText} (${response.status})`;
    const errorResponse = response.clone();
    try {
      const errorBody = await response.json();
      if (errorBody && typeof errorBody.message === 'string') {
        errorMessage = errorBody.message;
      }
    } catch {
      try {
        const text = await errorResponse.text();
        if (text) errorMessage = text;
      } catch {}
    }
    throw new Error(errorMessage);
  }

  return response.json();
}
