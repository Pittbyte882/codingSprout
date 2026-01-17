"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"

export async function submitVolunteerApplication(formData: FormData) {
  const supabase = await createServerSupabaseClient()

  const data = {
    first_name: formData.get("firstName") as string,
    last_name: formData.get("lastName") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    availability: JSON.parse(formData.get("availability") as string),
    experience: formData.get("experience") as string | null,
    motivation: formData.get("motivation") as string,
  }

  const { error } = await supabase.from("volunteer_applications").insert([data])

  if (error) {
    console.error("Volunteer application error:", error)
    return { success: false, error: "Failed to submit application" }
  }

  return { success: true }
}
