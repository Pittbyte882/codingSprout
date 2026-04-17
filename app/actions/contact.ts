"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"
import { sendEmail } from "@/lib/email"

type ContactFormResult = {
  success: boolean
  error?: string
}

export async function submitContactForm(formData: FormData): Promise<ContactFormResult> {
  try {
    const supabase = await createServerSupabaseClient()

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

    const { error } = await supabase.from("contact_submissions").insert([data])

    if (error) {
      console.error("Supabase error:", error)
      return { success: false, error: `Failed to submit form: ${error.message}` }
    }

    // Send notification email to support
    await sendEmail({
      to: "hello@codingsprout.com",
      subject: `New Contact Form Submission - ${data.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #43A047; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">🌱 New Contact Message</h1>
          </div>
          <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px;">
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
            ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ""}
            <p><strong>Subject:</strong> ${data.subject}</p>
            <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #43A047; margin-top: 16px;">
              <p><strong>Message:</strong></p>
              <p style="color: #555;">${data.message}</p>
            </div>
            <hr style="margin: 24px 0; border: none; border-top: 1px solid #eee;">
            <p style="color: #999; font-size: 13px;">This message was submitted via the Contact Us form on codingsprout.com</p>
          </div>
        </div>
      `,
    })

    // Send confirmation email to the person who submitted
    await sendEmail({
      to: data.email,
      subject: "We received your message! | Coding Sprout",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #43A047; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">🌱 Coding Sprout</h1>
          </div>
          <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px;">
            <h2 style="color: #1E293B;">Hi ${firstName}!</h2>
            <p style="color: #555;">Thank you for reaching out to Coding Sprout! We received your message and will get back to you within 24 hours.</p>
            <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #43A047; margin: 20px 0;">
              <p><strong>Your message:</strong></p>
              <p style="color: #555;">${data.message}</p>
            </div>
            <p style="color: #555;">In the meantime, feel free to browse our classes at <a href="https://www.codingsprout.com/classes" style="color: #43A047;">codingsprout.com/classes</a></p>
            <hr style="margin: 24px 0; border: none; border-top: 1px solid #eee;">
            <p style="color: #999; font-size: 13px;">Coding Sprout | hello@codingsprout.com | (951) 530-9660</p>
          </div>
        </div>
      `,
    })

    return { success: true }
    
  } catch (error) {
    console.error("Unexpected error in submitContactForm:", error)
    return { success: false, error: "An unexpected error occurred. Please try again." }
  }
}