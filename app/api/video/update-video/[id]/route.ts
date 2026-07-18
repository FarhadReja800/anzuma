import { NextResponse } from "next/server";

/**
 * PATCH /api/video/update-video/[id]
 * Proxies request to the Express backend.
 */
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const backendUrl = `${process.env.NEXT_PUBLIC_API_URL || "https://arzuma-backend.vercel.app/api/v1"}/video/update-video/${id}`;

    const response = await fetch(backendUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(request.headers.get("authorization") ? { "Authorization": request.headers.get("authorization")! } : {}),
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Error proxying update-video to backend:", error);
    const errorMessage = error instanceof Error ? error.message : "Server error while communicating with backend.";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
