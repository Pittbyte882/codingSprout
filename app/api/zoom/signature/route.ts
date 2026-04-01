import { NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    // Verify user is authenticated
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { meetingNumber, role } = await request.json()

    // Get ZAK token from Zoom API
    const zakResponse = await fetch(
      "https://api.zoom.us/v2/users/me/zak",
      {
        headers: {
          Authorization: `Bearer ${await getZoomAccessToken()}`,
          "Content-Type": "application/json",
        },
      }
    )

    if (!zakResponse.ok) {
      throw new Error("Failed to get ZAK token")
    }

    const zakData = await zakResponse.json()
    const zakToken = zakData.token

    return NextResponse.json({
      signature: zakToken,
      sdkKey: process.env.ZOOM_SDK_KEY,
      zakToken,
    })
  } catch (error) {
    console.error("Zoom signature error:", error)
    return NextResponse.json(
      { error: "Failed to generate signature" },
      { status: 500 }
    )
  }
}

async function getZoomAccessToken(): Promise<string> {
  const clientId = process.env.ZOOM_SDK_KEY!
  const clientSecret = process.env.ZOOM_SDK_SECRET!

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64")

  const response = await fetch(
    "https://zoom.us/oauth/token?grant_type=account_credentials&account_id=" + process.env.ZOOM_ACCOUNT_ID,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  )

  if (!response.ok) {
    throw new Error("Failed to get Zoom access token")
  }

  const data = await response.json()
  return data.access_token
}
