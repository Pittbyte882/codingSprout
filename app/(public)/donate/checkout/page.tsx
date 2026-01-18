import type { Metadata } from "next"
import { DonationForm } from "@/components/donate/donation-form"
import { Heart } from "lucide-react"

export const metadata: Metadata = {
  title: "Complete Your Donation | Coding Sprout",
  description: "Complete your donation to support Coding Sprout's mission.",
}

export default function DonateCheckoutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-off-white to-light-gray/30">
      {/* Header */}
      <div className="bg-secondary py-8">
        <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
          <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary">
            <Heart className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-secondary-foreground sm:text-3xl">Complete Your Donation</h1>
          <p className="mt-2 text-secondary-foreground/80">
            Your generosity helps children learn to code
          </p>
        </div>
      </div>

      {/* Donation Form */}
      <div className="mx-auto max-w-4xl px-4 py-12 lg:px-8">
        <DonationForm />
      </div>
    </div>
  )
}