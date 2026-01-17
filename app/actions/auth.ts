"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"
import { sendEmail, getWelcomeEmailHtml } from "@/lib/email"

export async function sendWelcomeEmail(userId: string) {
  const supabase = await createServerSupabaseClient()

  const { data: profile } = await supabase.from("profiles").select("full_name, email").eq("id", userId).single()

  if (profile?.email) {
    await sendEmail({
      to: profile.email,
      subject: "Welcome to Coding Sprout!",
      html: getWelcomeEmailHtml(profile.full_name || "there"),
    })
  }
}
