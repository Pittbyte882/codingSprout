import { NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import crypto from "crypto"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { meetingNumber, role } = await request.json()

    const sdkKey = process.env.ZOOM_SDK_KEY!
    const sdkSecret = process.env.ZOOM_SDK_SECRET!

    // Generate JWT signature
    const iat = Math.round(new Date().getTime() / 1000) - 30
    const exp = iat + 60 * 60 * 2 // 2 hours

    const header = Buffer.from(
      JSON.stringify({ alg: "HS256", typ: "JWT" })
    ).toString("base64url")

    const payload = Buffer.from(
      JSON.stringify({
        sdkKey,
        appKey: sdkKey,
        mn: meetingNumber,
        role,
        iat,
        exp,
        tokenExp: exp,
      })
    ).toString("base64url")

    const signature = crypto
      .createHmac("sha256", sdkSecret)
      .update(`${header}.${payload}`)
      .digest("base64url")

    const token = `${header}.${payload}.${signature}`

    return NextResponse.json({ signature: token, sdkKey })
  } catch (error) {
    console.error("Signature error:", error)
    return NextResponse.json(
      { error: "Failed to generate signature" },
      { status: 500 }
    )
  }
}