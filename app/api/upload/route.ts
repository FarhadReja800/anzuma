import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file uploaded." },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Create public/uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), "public", "uploads")
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true })
    }

    // Create a unique filename
    const uniqueFilename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, "_")}`
    const filePath = path.join(uploadsDir, uniqueFilename)

    // Write file to filesystem
    fs.writeFileSync(filePath, buffer)

    // Determine host origin for absolute URL validation
    const host = request.headers.get("host")
    const proto = request.headers.get("x-forwarded-proto") || "http"
    const origin = host ? `${proto}://${host}` : ""
    const fileUrl = origin ? `${origin}/uploads/${uniqueFilename}` : `/uploads/${uniqueFilename}`

    return NextResponse.json({
      success: true,
      url: fileUrl
    })
  } catch (error) {
    console.error("Error in file upload API:", error)
    const errMsg = error instanceof Error ? error.message : "Server error during upload."
    return NextResponse.json(
      { success: false, error: errMsg },
      { status: 500 }
    )
  }
}
