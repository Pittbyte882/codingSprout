"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"

export async function submitContactForm(formData: FormData) {
  const supabase = await createServerSupabaseClient()

  const data = {
    first_name: formData.get("firstName") as string,
    last_name: formData.get("lastName") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string | null,
    subject: formData.get("subject") as string,
    message: formData.get("message") as string,
  }

  const { error } = await supabase.from("contact_submissions").insert([data])

  if (error) {
    console.error("Contact form error:", error)
    return { success: false, error: "Failed to submit form" }
  }

  return { success: true }
}
