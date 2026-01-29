import { NextResponse } from "next/server"
import { sendEmail, getWelcomeEmailHtml } from "@/lib/email"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, parentName } = body

    if (!email || !parentName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    await sendEmail({
      to: email,
      subject: "Welcome to Coding Sprout! 🌱",
      html: getWelcomeEmailHtml(parentName),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error sending welcome email:", error)
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    )
  }
}