import { NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const {
      amount,
      studentName,
      organizationName,
      sponsorEmail,
      sponsorFirstName,
      sponsorLastName,
    } = body

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: "Invalid sponsorship amount" },
        { status: 400 }
      )
    }

    // Create metadata for the sponsorship
    const metadata: Record<string, string> = {
      type: "sponsorship",
      sponsor_first_name: sponsorFirstName || "",
      sponsor_last_name: sponsorLastName || "",
      sponsor_email: sponsorEmail || "",
    }

    if (studentName) {
      metadata.student_name = studentName
    }

    if (organizationName) {
      metadata.organization_name = organizationName
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Student Sponsorship",
              description: studentName 
                ? `Sponsorship for ${studentName}`
                : "Sponsoring a student's coding education",
            },
            unit_amount: Math.round(amount * 100), // Stripe uses cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${request.headers.get("origin")}/sponsor/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get("origin")}/sponsor/checkout`,
      customer_email: sponsorEmail || undefined,
      metadata,
      payment_intent_data: {
        metadata,
      },
      billing_address_collection: "required",
    })

    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (error) {
    console.error("Stripe checkout error:", error)
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    )
  }
}