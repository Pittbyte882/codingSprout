import { NextResponse } from "next/server"

export async function GET() {
  const salt = process.env.ADMIN_PASSWORD_SALT
  const password = "CodingSprout2026!"
  
  const encoder = new TextEncoder()
  const data = encoder.encode(password + salt)
  const hashBuffer = await crypto.subtle.digest("SHA-256", data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hash = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
  
  return NextResponse.json({ hash })
}