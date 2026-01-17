import { type NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { classId, studentId, isOneOnOne, price, className, classDate } = body

    // Create a pending registration
    const { data: registration, error: regError } = await supabase
      .from("registrations")
      .insert({
        class_id: classId,
        student_id: studentId,
        user_id: user.id,
        is_one_on_one: isOneOnOne,
        amount_paid: price,
        payment_method: "stripe",
        payment_status: "pending",
        status: "pending",
      })
      .select()
      .single()

    if (regError) {
      console.error("Registration error:", regError)
      return NextResponse.json({ error: "Failed to create registration" }, { status: 500 })
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: className,
              description: `Class registration for ${classDate}${isOneOnOne ? " (One-on-One Session)" : ""}`,
            },
            unit_amount: Math.round(price * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || request.headers.get("origin")}/checkout/success?session_id={CHECKOUT_SESSION_ID}&registration_id=${registration.id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || request.headers.get("origin")}/checkout/cancel?registration_id=${registration.id}`,
      customer_email: user.email,
      metadata: {
        registration_id: registration.id,
        class_id: classId,
        student_id: studentId,
        user_id: user.id,
      },
    })

    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (error) {
    console.error("Checkout error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
