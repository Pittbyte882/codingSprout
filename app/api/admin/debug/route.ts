import { NextResponse } from "next/server"

export async function GET() {
  const salt = process.env.ADMIN_PASSWORD_SALT
  return NextResponse.json({ 
    saltLength: salt?.length,
    firstChar: salt?.[0],
    lastChar: salt?.[salt.length - 1],
  })
}