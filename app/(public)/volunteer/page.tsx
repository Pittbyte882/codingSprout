import type { Metadata } from "next"
import { VolunteerForm } from "@/components/volunteer-form"
import { Heart, Users, Calendar, Award } from "lucide-react"

export const metadata: Metadata = {
  title: "Volunteer | Coding Sprout",
  description: "Join our team of volunteers and help inspire the next generation of coders at Coding Sprout.",
}

const benefits = [
  {
    icon: Heart,
    title: "Make a Difference",
    description: "Help shape young minds and inspire future tech leaders.",
  },
  {
    icon: Users,
    title: "Join a Community",
    description: "Connect with other passionate educators and tech professionals.",
  },
  {
    icon: Calendar,
    title: "Flexible Schedule",
    description: "Choose volunteer opportunities that fit your availability.",
  },
  {
    icon: Award,
    title: "Gain Experience",
    description: "Build teaching and mentoring skills in a supportive environment.",
  },
]

export default function VolunteerPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-off-white to-primary/5 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-secondary sm:text-5xl">Volunteer With Us</h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Share your passion for technology and help inspire the next generation of coders.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="text-center">
                <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <benefit.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">{benefit.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="bg-muted/50 py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <div className="rounded-2xl bg-card p-8 shadow-sm ring-1 ring-border">
            <h2 className="text-2xl font-bold text-foreground">Volunteer Application</h2>
            <p className="mt-2 text-muted-foreground">
              Fill out the form below and we'll be in touch about volunteer opportunities.
            </p>
            <VolunteerForm />
          </div>
        </div>
      </section>
    </div>
  )
}
