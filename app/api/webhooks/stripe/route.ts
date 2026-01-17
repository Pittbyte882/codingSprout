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
    const registrationId = session.metadata?.registrationId

    if (registrationId) {
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
    }
  }

  return NextResponse.json({ received: true })
}
