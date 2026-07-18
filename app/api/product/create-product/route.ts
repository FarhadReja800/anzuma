import { NextResponse } from "next/server"

function decodeJwt(token: string) {
  try {
    const parts = token.split(".")
    if (parts.length !== 3) return null
    const payload = parts[1]
    const decoded = Buffer.from(payload, "base64").toString("utf-8")
    return JSON.parse(decoded)
  } catch (error) {
    return null
  }
}

/**
 * POST /api/product/create-product
 * Proxies request to the Express backend to create a product.
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
        { success: false, error: "Forbidden: Only Admin or Super Admin can create products." },
        { status: 403 }
      )
    }

    const body = await request.json()
    const backendUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api/v1"}/product/create-product`

    const response = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": authHeader,
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error("Error proxying create-product to backend:", error)
    const errorMessage = error instanceof Error ? error.message : "Server error while communicating with backend."
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    )
  }
}
