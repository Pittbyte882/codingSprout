import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Users, Video, MapPin, CheckCircle2 } from "lucide-react"

export function LearningFormatsSection() {
  return (
    <section className="bg-muted/50 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-secondary sm:text-4xl">
            Learning That Fits Your Schedule
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">Choose the format that works best for your family</p>
        </div>

        {/* Split Layout */}
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* In-Person */}
          <div className="group relative overflow-hidden rounded-3xl bg-card p-8 shadow-lg ring-1 ring-border transition-all hover:shadow-xl">
            <div className="absolute top-0 right-0 h-40 w-40 translate-x-10 -translate-y-10 rounded-full bg-primary/10" />

            <div className="relative">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                <MapPin className="h-7 w-7 text-primary" />
              </div>

              <h3 className="text-2xl font-bold text-foreground">In-Person Classes</h3>
              <p className="mt-2 text-muted-foreground">Hands-on learning in a supportive classroom environment</p>

              <ul className="mt-6 space-y-3">
                {[
                  "Small class sizes (max 8 students)",
                  "Hands-on projects and activities",
                  "Direct instructor interaction",
                  "Social learning with peers",
                  "Convenient local locations",
                ].map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Link href="/classes?type=in-person">
                  <Button className="bg-primary hover:bg-sprout-green-dark">View In-Person Classes</Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Online */}
          <div className="group relative overflow-hidden rounded-3xl bg-card p-8 shadow-lg ring-1 ring-border transition-all hover:shadow-xl">
            <div className="absolute top-0 right-0 h-40 w-40 translate-x-10 -translate-y-10 rounded-full bg-sky-blue/10" />

            <div className="relative">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-blue/10">
                <Video className="h-7 w-7 text-sky-blue" />
              </div>

              <h3 className="text-2xl font-bold text-foreground">Online Classes</h3>
              <p className="mt-2 text-muted-foreground">Live interactive sessions from the comfort of home</p>

              <ul className="mt-6 space-y-3">
                {[
                  "Live Zoom sessions with instructor",
                  "Interactive screen sharing",
                  "Flexible scheduling options",
                  "No commute required",
                  "Same quality curriculum",
                ].map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-sky-blue" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Link href="/classes?type=online">
                  <Button className="bg-sky-blue hover:bg-sky-blue/90 text-secondary">View Online Classes</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* One-on-One Option */}
        <div className="mt-8 rounded-2xl bg-secondary p-8 text-center">
          <div className="mx-auto flex max-w-2xl flex-col items-center">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary">
              <Users className="h-6 w-6 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-bold text-secondary-foreground">Need One-on-One Attention?</h3>
            <p className="mt-2 text-secondary-foreground/80">
              We offer personalized private lessons tailored to your child's pace and interests. Perfect for focused
              learning or catching up.
            </p>
            <Link href="/classes?type=individual" className="mt-6">
              <Button
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-secondary bg-transparent"
              >
                Learn About Private Lessons
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
