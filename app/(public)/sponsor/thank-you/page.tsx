import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, Home, BookOpen, CheckCircle } from "lucide-react"
import { stripe } from "@/lib/stripe"

export const metadata: Metadata = {
  title: "Thank You! | Coding Sprout",
  description: "Thank you for sponsoring a student at Coding Sprout.",
}

interface ThankYouPageProps {
  searchParams: Promise<{ session_id?: string }>
}

export default async function SponsorThankYouPage({ searchParams }: ThankYouPageProps) {
  const params = await searchParams
  let sponsorshipAmount: number | null = null
  let customerEmail: string | null = null
  let studentName: string | null = null

  // Verify the Stripe session if session_id is provided
  if (params.session_id) {
    try {
      const session = await stripe.checkout.sessions.retrieve(params.session_id)
      if (session.payment_status === "paid") {
        sponsorshipAmount = (session.amount_total || 0) / 100
        customerEmail = session.customer_details?.email || null
        studentName = session.metadata?.student_name || null
      }
    } catch (error) {
      console.error("Error retrieving session:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-off-white to-sprout-green/5 flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full text-center">
        {/* Success Icon */}
        <div className="mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-sprout-green">
          <CheckCircle className="h-10 w-10 text-white" />
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-deep-navy sm:text-4xl">
          Thank You for Your Sponsorship!
        </h1>
        
        {/* Amount */}
        {sponsorshipAmount && (
          <div className="mt-4 inline-flex items-center gap-2 bg-sprout-green/10 px-4 py-2 rounded-full">
            <Heart className="h-5 w-5 text-sprout-green" />
            <span className="text-lg font-semibold text-sprout-green">
              ${sponsorshipAmount.toFixed(2)} Sponsored
            </span>
          </div>
        )}

        {/* Student Name */}
        {studentName && (
          <p className="mt-4 text-lg text-deep-navy">
            You're helping <strong>{studentName}</strong> learn to code! 🎉
          </p>
        )}
        
        {/* Message */}
        <p className="mt-4 text-lg text-muted-foreground">
          Your sponsorship makes a real difference in a child's life. Together, we're helping kids grow into confident coders.
        </p>

        {/* Confirmation */}
        <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-border">
          {customerEmail ? (
            <p className="text-sm text-muted-foreground">
              A confirmation email has been sent to <strong>{customerEmail}</strong> with your receipt.
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              A confirmation email has been sent to your inbox with your receipt.
            </p>
          )}
        </div>

        {/* Impact Message */}
        <div className="mt-6 rounded-2xl bg-sky-blue/10 p-6 ring-1 ring-sky-blue/20">
          <p className="text-sm text-deep-navy font-medium">
            🌱 Your support helps us provide scholarships, equipment, and expanded programming to reach more children in our community.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <Link href="/classes">
            <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-sprout-green-dark">
              <BookOpen className="mr-2 h-4 w-4" />
              Explore Classes
            </Button>
          </Link>
        </div>

        {/* Social Share */}
        <p className="mt-8 text-sm text-muted-foreground">
          Help spread the word! Share your support for coding education.
        </p>
      </div>
    </div>
  )
}