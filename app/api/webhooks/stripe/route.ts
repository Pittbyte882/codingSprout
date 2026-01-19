import { type NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { createClient } from "@supabase/supabase-js"
import type Stripe from "stripe"
import { sendEmail, getRegistrationConfirmationHtml, getPaymentReceivedHtml } from "@/lib/email"

// Use service role for webhook (no user context)
const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get("stripe-signature")

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    console.error("Webhook signature verification failed:", err)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session
    
    // Check if this is a class registration or a sponsorship
    const registrationId = session.metadata?.registrationId
    const isSponsorship = session.metadata?.type === "sponsorship"

    if (isSponsorship) {
      // ============================================
      // HANDLE SPONSORSHIP
      // ============================================
      await handleSponsorship(session)
    } else if (registrationId) {
      // ============================================
      // HANDLE CLASS REGISTRATION
      // ============================================
      await handleClassRegistration(session, registrationId)
    }
  }

  return NextResponse.json({ received: true })
}

// ============================================
// SPONSORSHIP HANDLER
// ============================================
async function handleSponsorship(session: Stripe.Checkout.Session) {
  try {
    const customerDetails = session.customer_details

    // Save sponsorship to database
    const { error } = await supabaseAdmin.from("sponsorships").insert({
      amount: (session.amount_total || 0) / 100, // Convert from cents
      sponsor_first_name: session.metadata?.sponsor_first_name || customerDetails?.name?.split(" ")[0] || "",
      sponsor_last_name: session.metadata?.sponsor_last_name || customerDetails?.name?.split(" ").slice(1).join(" ") || "",
      sponsor_email: session.metadata?.sponsor_email || customerDetails?.email || "",
      student_name: session.metadata?.student_name || null,
      organization_name: session.metadata?.organization_name || null,
      billing_address: customerDetails?.address?.line1 || null,
      billing_city: customerDetails?.address?.city || null,
      billing_state: customerDetails?.address?.state || null,
      billing_zip: customerDetails?.address?.postal_code || null,
      status: "completed",
      payment_method: "stripe",
      payment_intent_id: session.payment_intent as string,
    })

    if (error) {
      console.error("Error saving sponsorship:", error)
    } else {
      console.log("Sponsorship saved successfully:", session.id)
      
      // Send thank you email
      const sponsorEmail = session.metadata?.sponsor_email || customerDetails?.email
      if (sponsorEmail) {
        await sendSponsorshipThankYouEmail({
          email: sponsorEmail,
          name: session.metadata?.sponsor_first_name || customerDetails?.name?.split(" ")[0] || "Friend",
          amount: (session.amount_total || 0) / 100,
          studentName: session.metadata?.student_name,
        })
      }
    }
  } catch (error) {
    console.error("Error handling sponsorship:", error)
  }
}

// ============================================
// CLASS REGISTRATION HANDLER
// ============================================
async function handleClassRegistration(session: Stripe.Checkout.Session, registrationId: string) {
  try {
    // Update registration status
    const { data: registration, error } = await supabaseAdmin
      .from("registrations")
      .update({
        payment_status: "paid",
        status: "confirmed",
        stripe_payment_intent_id: session.payment_intent as string,
      })
      .eq("id", registrationId)
      .select(
        `
        *,
        class:classes(*),
        student:students(*),
        parent:profiles!registrations_parent_id_fkey(*)
      `,
      )
      .single()

    if (!error && registration) {
      const classData = registration.class
      const student = registration.student
      const parent = registration.parent

      // Send payment received email
      if (parent?.email) {
        await sendEmail({
          to: parent.email,
          subject: `Payment Received - ${classData?.name}`,
          html: getPaymentReceivedHtml({
            parentName: parent.full_name || "Parent",
            amount: registration.amount_paid,
            className: classData?.name || "Class",
            paymentMethod: "stripe",
            transactionId: session.payment_intent as string,
          }),
        })

        // Send registration confirmation email
        await sendEmail({
          to: parent.email,
          subject: `Class Registration Confirmed - ${classData?.name}`,
          html: getRegistrationConfirmationHtml({
            parentName: parent.full_name || "Parent",
            studentName: student?.first_name || "Student",
            className: classData?.name || "Class",
            classDate: new Date(classData?.start_date).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
            classTime: classData?.time_slot || "TBD",
            classType: classData?.class_type || "in_person",
            location: classData?.location,
            zoomLink: classData?.zoom_link,
            isOneOnOne: registration.is_one_on_one,
            amountPaid: registration.amount_paid,
          }),
        })
      }
    }
  } catch (error) {
    console.error("Error handling class registration:", error)
  }
}

// ============================================
// SPONSORSHIP THANK YOU EMAIL
// ============================================
async function sendSponsorshipThankYouEmail({ 
  email, 
  name, 
  amount, 
  studentName 
}: { 
  email: string
  name: string
  amount: number
  studentName?: string | null
}) {
  try {
    const dedicationText = studentName 
      ? `<p style="color: #334155; font-size: 16px;">Your sponsorship is helping <strong>${studentName}</strong> learn to code!</p>`
      : ""

    await sendEmail({
      to: email,
      subject: "Thank You for Sponsoring a Student! 🌱",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #43A047; margin: 0;">🌱 Coding Sprout</h1>
          </div>
          
          <h2 style="color: #1E293B;">Thank You, ${name}!</h2>
          
          <p style="color: #334155; font-size: 16px; line-height: 1.6;">
            Your generous sponsorship of <strong style="color: #43A047;">$${amount.toFixed(2)}</strong> has been received.
          </p>
          
          ${dedicationText}
          
          <p style="color: #334155; font-size: 16px; line-height: 1.6;">
            Your support helps us provide quality coding education to children in our community, giving them the skills they need for the future.
          </p>
          
          <p style="color: #334155; font-size: 16px; line-height: 1.6;">
            With gratitude,<br>
            <strong>The Coding Sprout Team</strong>
          </p>
          
          <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 30px 0;">
          
          <p style="color: #94A3B8; font-size: 12px; text-align: center;">
            © ${new Date().getFullYear()} Coding Sprout. All rights reserved.
          </p>
        </div>
      `,
    })
  } catch (error) {
    console.error("Error sending sponsorship thank you email:", error)
  }
}