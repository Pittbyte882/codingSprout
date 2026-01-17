"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"
import { stripe } from "@/lib/stripe"
import { sendEmail, getCharterPendingHtml } from "@/lib/email"

export async function registerForClass(formData: FormData) {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: "Not authenticated" }
  }

  const { data: profile } = await supabase.from("profiles").select("full_name, email").eq("id", user.id).single()

  const classId = formData.get("classId") as string
  const studentId = formData.get("studentId") as string
  const paymentMethod = formData.get("paymentMethod") as "stripe" | "charter_school"
  const isOneOnOne = formData.get("isOneOnOne") === "true"
  const amount = Number.parseFloat(formData.get("amount") as string)

  // Check if class has spots
  const { data: classItem } = await supabase.from("classes").select("*").eq("id", classId).single()

  if (!classItem) {
    return { success: false, error: "Class not found" }
  }

  if (classItem.spots_taken >= classItem.max_spots) {
    return { success: false, error: "Class is full" }
  }

  // Check if already registered
  const { data: existingReg } = await supabase
    .from("registrations")
    .select("id")
    .eq("class_id", classId)
    .eq("student_id", studentId)
    .single()

  if (existingReg) {
    return { success: false, error: "Student is already registered for this class" }
  }

  const { data: student } = await supabase.from("students").select("first_name, last_name").eq("id", studentId).single()

  if (paymentMethod === "stripe") {
    // Create Stripe checkout session
    try {
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

      // Create pending registration first to get ID
      const { data: registration, error: regError } = await supabase
        .from("registrations")
        .insert([
          {
            class_id: classId,
            student_id: studentId,
            parent_id: user.id,
            is_one_on_one: isOneOnOne,
            payment_method: "stripe",
            payment_status: "pending",
            amount_paid: amount,
          },
        ])
        .select()
        .single()

      if (regError || !registration) {
        return { success: false, error: "Failed to create registration" }
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: classItem.name,
                description: `${isOneOnOne ? "One-on-One Session" : "Group Class"} - ${classItem.grade_levels?.join(", ") || "All grades"}`,
              },
              unit_amount: Math.round(amount * 100),
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}&registration_id=${registration.id}`,
        cancel_url: `${baseUrl}/checkout/cancel?registration_id=${registration.id}`,
        customer_email: user.email || undefined,
        metadata: {
          registrationId: registration.id,
          classId,
          studentId,
          parentId: user.id,
          isOneOnOne: String(isOneOnOne),
        },
      })

      // Update registration with stripe session ID
      await supabase.from("registrations").update({ stripe_payment_intent_id: session.id }).eq("id", registration.id)

      return { success: true, checkoutUrl: session.url }
    } catch (error) {
      console.error("Stripe error:", error)
      return { success: false, error: "Payment processing failed" }
    }
  } else {
    // Charter school payment
    const charterSchoolName = formData.get("charterSchoolName") as string
    const charterSchoolContact = formData.get("charterSchoolContact") as string

    const { error } = await supabase.from("registrations").insert([
      {
        class_id: classId,
        student_id: studentId,
        parent_id: user.id,
        is_one_on_one: isOneOnOne,
        payment_method: "charter_school",
        payment_status: "charter_pending",
        charter_school_name: charterSchoolName,
        charter_school_contact: charterSchoolContact,
        amount_paid: amount,
      },
    ])

    if (error) {
      console.error("Registration error:", error)
      return { success: false, error: "Registration failed" }
    }

    if (profile?.email && student) {
      await sendEmail({
        to: profile.email,
        subject: `Registration Pending - ${classItem.name}`,
        html: getCharterPendingHtml({
          parentName: profile.full_name || "Parent",
          studentName: student.first_name,
          className: classItem.name,
          charterSchoolName,
        }),
      })
    }

    return { success: true }
  }
}
