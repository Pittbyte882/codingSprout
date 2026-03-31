import { NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import crypto from "crypto"

export async function POST(request: NextRequest) {
  try {
    // Verify user is authenticated and has paid registration
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { meetingNumber, role } = await request.json()

    // Generate Zoom SDK signature
    const sdkKey = process.env.ZOOM_SDK_KEY!
    const sdkSecret = process.env.ZOOM_SDK_SECRET!
    const timestamp = new Date().getTime() - 30000
    const msg = Buffer.from(
      sdkKey + meetingNumber + timestamp + role
    ).toString("base64")
    const hash = crypto
      .createHmac("sha256", sdkSecret)
      .update(msg)
      .digest("base64")
    const signature = Buffer.from(
      `${sdkKey}.${meetingNumber}.${timestamp}.${role}.${hash}`
    ).toString("base64")

    return NextResponse.json({ signature, sdkKey })
  } catch (error) {
    console.error("Zoom signature error:", error)
    return NextResponse.json(
      { error: "Failed to generate signature" },
      { status: 500 }
    )
  }
}