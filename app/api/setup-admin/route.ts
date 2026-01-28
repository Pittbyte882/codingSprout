import { NextResponse } from "next/server"
import { createAdminUser } from "@/app/actions/admin-auth"

export async function GET() {
  const result = await createAdminUser(
    "crystal@codingsprout.com",  
    "Question1@@#",               // YOUR PASSWORD
    "Crystal Pittman",               // YOUR NAME
    "super_admin"
  )

  return NextResponse.json(result)
}