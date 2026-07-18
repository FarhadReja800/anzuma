import { NextResponse } from "next/server"

/**
 * GET /api/category/get-categories
 * Proxies request to the Express backend to fetch all categories.
 */
export async function GET(request: Request) {
  try {
    const backendUrl = `${process.env.NEXT_PUBLIC_API_URL || "https://arzuma-backend.vercel.app/api/v1"}/category/get-categories`

    const response = await fetch(backendUrl, {
      method: "GET",
      headers: {
        ...(request.headers.get("authorization") ? { "Authorization": request.headers.get("authorization")! } : {}),
      },
    })

    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error("Error proxying get-categories to backend:", error)
    const errorMessage = error instanceof Error ? error.message : "Server error while communicating with backend."
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    )
  }
}
