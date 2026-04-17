import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Heart, GraduationCap, Laptop, Users } from "lucide-react"

export const metadata: Metadata = {
  title: "Sponsor a Student | Coding Sprout",
  description: "Help a child learn to code by sponsoring their education at Coding Sprout.",
}

const impactAreas = [
  {
    icon: GraduationCap,
    title: "Scholarships",
    description: "Help provide coding education to students who couldn't otherwise afford it.",
  },
  {
    icon: Laptop,
    title: "Equipment",
    description: "Fund laptops and technology for students who need them.",
  },
  {
    icon: Users,
    title: "Program Expansion",
    description: "Help us reach more communities and serve more families.",
  },
]

export default function SponsorPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-off-white to-warm-yellow/10 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary">
                <Heart className="h-8 w-8 text-primary-foreground" />
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-secondary sm:text-5xl">Sponsor a Student</h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Your sponsorship helps us provide quality coding education to children in our community, giving them the skills they need for the future.
              </p>
              <div className="mt-8">
                <Link href="/sponsor/checkout">
                  <Button size="lg" className="bg-primary hover:bg-sprout-green-dark text-lg px-12 py-6 h-auto">
                    <Heart className="mr-2 h-5 w-5" />
                    Sponsor Now
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1585314540237-13cb52fe9998?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&dl=annie-spratt-ITE_nXIDQ_A-unsplash.jpg"
                alt="Child learning to code"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Impact Areas */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-secondary">Your Impact</h2>
            <p className="mt-4 text-muted-foreground">
              Every sponsorship, big or small, makes a difference in a child's life.
            </p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {impactAreas.map((area) => (
              <div key={area.title} className="rounded-2xl bg-card p-8 text-center shadow-sm ring-1 ring-border">
                <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <area.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{area.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo + Quote section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1727473704274-3fbad0dbbd60?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&dl=salah-darwish-6hl__HAWP4w-unsplash.jpg"
                alt="Kids being supported in education"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-secondary">Every Child Deserves to Code</h2>
              <p className="mt-4 text-muted-foreground">
                Many talented kids don't have access to quality tech education simply because of financial barriers. Your sponsorship breaks down those walls and opens doors to careers in technology, engineering, and beyond.
              </p>
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <p className="text-sm text-muted-foreground">One sponsorship covers a full 4-week session</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <p className="text-sm text-muted-foreground">Students learn real, marketable skills</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <p className="text-sm text-muted-foreground">100% goes toward student education</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsorship CTA */}
      <section className="bg-secondary py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
          <h2 className="text-3xl font-bold text-secondary-foreground">Ready to Make a Difference?</h2>
          <p className="mt-4 text-secondary-foreground/80">
            Coding Sprout is dedicated to making coding education accessible to all children. Your generous sponsorship helps us continue this important work.
          </p>
          <div className="mt-8">
            <Link href="/sponsor/checkout">
              <Button size="lg" className="bg-primary hover:bg-sprout-green-dark text-lg px-12 py-6 h-auto">
                <Heart className="mr-2 h-5 w-5" />
                Sponsor Now
              </Button>
            </Link>
          </div>
          <p className="mt-6 text-sm text-secondary-foreground/60">
            For questions about sponsorships, please contact us at hello@codingsprout.com
          </p>
        </div>
      </section>
    </div>
  )
}