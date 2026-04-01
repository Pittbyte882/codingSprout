import { NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    console.log("ZOOM_SDK_KEY:", process.env.ZOOM_SDK_KEY ? "exists" : "MISSING")
    console.log("ZOOM_SDK_SECRET:", process.env.ZOOM_SDK_SECRET ? "exists" : "MISSING")
    console.log("ZOOM_ACCOUNT_ID:", process.env.ZOOM_ACCOUNT_ID ? "exists" : "MISSING")

    // Verify user is authenticated
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { meetingNumber, role } = await request.json()

    // Get access token first
    const accessToken = await getZoomAccessToken()
    console.log("Got access token, fetching ZAK...")

    // Get ZAK token from Zoom API
    const zakResponse = await fetch(
      "https://api.zoom.us/v2/users/me/zak",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    )

    console.log("ZAK response status:", zakResponse.status)
    const zakText = await zakResponse.text()
    console.log("ZAK response body:", zakText)

    if (!zakResponse.ok) {
      throw new Error(`Failed to get ZAK token: ${zakText}`)
    }

    const zakData = JSON.parse(zakText)
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
  const accountId = process.env.ZOOM_ACCOUNT_ID!

  console.log("Account ID:", accountId ? "exists" : "MISSING")

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64")

  const response = await fetch(
    `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${accountId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  )

  console.log("Zoom token response status:", response.status)
  const responseText = await response.text()
  console.log("Zoom token response body:", responseText)

  if (!response.ok) {
    throw new Error(`Failed to get Zoom access token: ${responseText}`)
  }

  const data = JSON.parse(responseText)
  return data.access_token
}