import { NextResponse } from "next/server";

/**
 * POST /api/video/create-video
 * Proxies request to the Express backend to persist in MongoDB.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const backendUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api/v1"}/video/create-video`;

    const response = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(request.headers.get("authorization") ? { "Authorization": request.headers.get("authorization")! } : {}),
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Error proxying create-video to backend:", error);
    return NextResponse.json(
      { success: false, error: "Server error while communicating with backend." },
      { status: 500 }
    );
  }
}
