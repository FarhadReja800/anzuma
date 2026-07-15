import { NextResponse } from "next/server";

/**
 * POST /api/video/upload-video
 * Proxies multipart video upload requests to the Express backend.
 */
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const backendUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api/v1"}/video/upload-video`;

    const response = await fetch(backendUrl, {
      method: "POST",
      headers: {
        ...(request.headers.get("authorization") ? { "Authorization": request.headers.get("authorization")! } : {}),
      },
      body: formData,
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error("Error proxying upload-video to backend:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Server error while communicating with backend." },
      { status: 500 }
    );
  }
}
