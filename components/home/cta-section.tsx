import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Phone } from "lucide-react"

export function CTASection() {
  return (
    <section className="bg-gradient-to-br from-primary to-sprout-green-dark py-16 lg:py-24">
      <div className="mx-auto max-w-4xl px-4 text-center lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
          Ready to Help Your Child Grow?
        </h2>
        <p className="mt-4 text-lg text-primary-foreground/90">
          Join hundreds of families who have chosen Coding Sprout for their child's coding education journey.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/classes">
            <Button size="lg" className="w-full sm:w-auto bg-white text-primary hover:bg-off-white text-lg px-8">
              Browse Classes
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/contact">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-white text-white hover:bg-white/10 text-lg px-8 bg-transparent"
            >
              <Phone className="mr-2 h-5 w-5" />
              Contact Us
            </Button>
          </Link>
        </div>

        <p className="mt-8 text-sm text-primary-foreground/70">
          Questions? Call us at (555) 123-4567 or email hello@codingsprout.com
        </p>
      </div>
    </section>
  )
}
