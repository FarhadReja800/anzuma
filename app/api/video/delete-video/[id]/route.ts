import { NextResponse } from "next/server";

/**
 * DELETE /api/video/delete-video/[id]
 * Proxies request to the Express backend.
 */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const backendUrl = `${process.env.NEXT_PUBLIC_API_URL || "https://arzuma-backend.vercel.app/api/v1"}/video/delete-video/${id}`;

    const response = await fetch(backendUrl, {
      method: "DELETE",
      headers: {
        ...(request.headers.get("authorization") ? { "Authorization": request.headers.get("authorization")! } : {}),
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Error proxying delete-video to backend:", error);
    const errorMessage = error instanceof Error ? error.message : "Server error while communicating with backend.";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
