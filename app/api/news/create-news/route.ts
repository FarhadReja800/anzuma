import { NextResponse } from "next/server"

function decodeJwt(token: string) {
  try {
    const parts = token.split(".")
    if (parts.length !== 3) return null
    const payload = parts[1]
    const decoded = Buffer.from(payload, "base64").toString("utf-8")
    return JSON.parse(decoded)
  } catch {
    return null
  }
}

/**
 * POST /api/news/create-news
 * Proxies request to the Express backend to create news/blog entries.
 * Restricted to superAdmin and admin.
 */
export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Missing Authorization header." },
        { status: 401 }
      )
    }

    const token = authHeader.startsWith("Bearer ") ? authHeader.substring(7) : authHeader
    const decoded = decodeJwt(token)
    const role = decoded?.role || decoded?.user?.role || decoded?.data?.role
    const roleLower = String(role || "").toLowerCase()

    if (roleLower !== "superadmin" && roleLower !== "super-admin" && roleLower !== "admin") {
      return NextResponse.json(
        { success: false, error: "Forbidden: Only Admin or Super Admin can create news." },
        { status: 403 }
      )
    }

    const body = await request.json()
    const backendUrl = `${process.env.NEXT_PUBLIC_API_URL || "https://arzuma-backend.vercel.app/api/v1"}/news/create-news`

    const response = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
      body: JSON.stringify(body),
    })

    let data: unknown = null
    try {
      data = await response.json()
    } catch {
      data = null
    }

    return NextResponse.json(data ?? { success: true }, { status: response.status })
  } catch (error) {
    console.error("Error proxying create-news to backend:", error)
    const errorMessage = error instanceof Error ? error.message : "Server error while communicating with backend."
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    )
  }
}
