"use server"

import { cookies } from "next/headers"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

// Simple hash function using Web Crypto API
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password + process.env.ADMIN_PASSWORD_SALT)
  const hashBuffer = await crypto.subtle.digest("SHA-256", data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
}

async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const passwordHash = await hashPassword(password)
  return passwordHash === hash
}

// Admin session token generation
function generateSessionToken(): string {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}

export async function adminLogin(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return { success: false, error: "Email and password are required" }
  }

  const supabase = await createServerSupabaseClient()

  const { data: admin, error } = await supabase
    .from("admin_users")
    .select("*")
    .eq("email", email.toLowerCase())
    .eq("is_active", true)
    .single()

  if (error || !admin) {
    return { success: false, error: "Invalid email or password" }
  }

  // Verify password
  const isValidPassword = await verifyPassword(password, admin.password_hash)

  if (!isValidPassword) {
    return { success: false, error: "Invalid email or password" }
  }

  // Update last login
  await supabase
    .from("admin_users")
    .update({ last_login: new Date().toISOString() })
    .eq("id", admin.id)

  // Create session token
  const sessionToken = generateSessionToken()
  const sessionData = {
    adminId: admin.id,
    email: admin.email,
    fullName: admin.full_name,
    role: admin.role,
    token: sessionToken,
    createdAt: Date.now(),
  }

  // Set secure cookie with session data
  const cookieStore = await cookies()
  cookieStore.set("admin_session", JSON.stringify(sessionData), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 24 hours
    path: "/",
  })

  return { success: true }
}

export async function adminLogout() {
  const cookieStore = await cookies()
  cookieStore.delete("admin_session")
  redirect("/admin/login")
}

export async function getAdminSession() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get("admin_session")

  if (!sessionCookie) {
    return null
  }

  try {
    const session = JSON.parse(sessionCookie.value)
    
    // Check if session is expired (24 hours)
    const sessionAge = Date.now() - session.createdAt
    const maxAge = 60 * 60 * 24 * 1000 // 24 hours in milliseconds
    
    if (sessionAge > maxAge) {
      const cookieStore = await cookies()
      cookieStore.delete("admin_session")
      return null
    }

    return session
  } catch {
    return null
  }
}

export async function createAdminUser(
  email: string,
  password: string,
  fullName: string,
  role: "admin" | "instructor" | "super_admin" = "admin"
) {
  const supabase = await createServerSupabaseClient()

  // Hash the password
  const passwordHash = await hashPassword(password)

  const { data, error } = await supabase
    .from("admin_users")
    .insert({
      email: email.toLowerCase(),
      password_hash: passwordHash,
      full_name: fullName,
      role,
    })
    .select()
    .single()

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true, data }
}

export async function requireAdminAuth() {
  const session = await getAdminSession()
  
  if (!session) {
    redirect("/admin/login")
  }
  
  return session
}