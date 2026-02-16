"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"

type ContactFormResult = {
  success: boolean
  error?: string
}

export async function submitContactForm(formData: FormData): Promise<ContactFormResult> {
  try {
    console.log("=== Contact Form Submission Started ===")
    
    const supabase = await createServerSupabaseClient()

    // Combine first and last name into single name field
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const fullName = `${firstName} ${lastName}`.trim()

    const data = {
      name: fullName,
      email: formData.get("email") as string,
      phone: (formData.get("phone") as string) || null,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    }

    console.log("Form data to insert:", data)

    const { error } = await supabase.from("contact_submissions").insert([data])

    if (error) {
      console.error("Supabase error:", error)
      return { success: false, error: `Failed to submit form: ${error.message}` }
    }

    console.log("✅ Contact form submitted successfully!")
    return { success: true }
    
  } catch (error) {
    console.error("Unexpected error in submitContactForm:", error)
    return { success: false, error: "An unexpected error occurred. Please try again." }
  }
}