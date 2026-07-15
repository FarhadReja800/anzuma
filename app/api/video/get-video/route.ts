import { NextResponse } from "next/server";

/**
 * GET /api/video/get-video
 * Proxies request to the Express backend.
 */
export async function GET(request: Request) {
  try {
    const backendUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api/v1"}/video/get-video`;

    const response = await fetch(backendUrl, {
      method: "GET",
      headers: {
        ...(request.headers.get("authorization") ? { "Authorization": request.headers.get("authorization")! } : {}),
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error("Error proxying get-video to backend:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Server error while communicating with backend." },
      { status: 500 }
    );
  }
}
