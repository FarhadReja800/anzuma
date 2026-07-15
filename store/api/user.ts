import { apiFetch } from "@/lib/api";
import { AuthAPIResponse } from "@/data/user.auth";

/**
 * Log in a user.
 */
export async function loginUser(credentials: Record<string, unknown>): Promise<AuthAPIResponse> {
  return apiFetch<AuthAPIResponse>("/user/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

/**
 * Register a new user.
 */
export async function registerUser(userData: Record<string, unknown>): Promise<AuthAPIResponse> {
  return apiFetch<AuthAPIResponse>("/user/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });
}

/**
 * Change user role (Super Admin action).
 */
export async function changeUserRole(payload: { userId: string; role: string }): Promise<unknown> {
  return apiFetch<unknown>("/user/change-role", {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}
