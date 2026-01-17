import { GraduationCap, Shield, Star, Clock } from "lucide-react"

const trustSignals = [
  {
    icon: Shield,
    title: "Charter School Approved",
    description:
      "We work directly with charter schools and accept educational funds. Easy invoicing for reimbursement.",
  },
  {
    icon: GraduationCap,
    title: "Experienced Instructors",
    description: "Our teachers are passionate educators with real-world tech experience and background checks.",
  },
  {
    icon: Star,
    title: "Proven Curriculum",
    description: "Research-backed, age-appropriate curriculum that engages students and produces results.",
  },
  {
    icon: Clock,
    title: "Flexible Scheduling",
    description: "After school, weekends, and summer sessions available to fit your family's schedule.",
  },
]

export function TrustSection() {
  return (
    <section className="bg-secondary py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-secondary-foreground sm:text-4xl">
            Trusted by Parents & Schools
          </h2>
          <p className="mt-4 text-lg text-secondary-foreground/80">
            We're committed to providing the highest quality coding education in a safe, supportive environment.
          </p>
        </div>

        {/* Trust Signals */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {trustSignals.map((signal) => (
            <div key={signal.title} className="text-center">
              <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary">
                <signal.icon className="h-7 w-7 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-secondary-foreground">{signal.title}</h3>
              <p className="mt-2 text-sm text-secondary-foreground/70">{signal.description}</p>
            </div>
          ))}
        </div>

        {/* Charter School CTA */}
        <div className="mt-16 rounded-2xl bg-primary/10 p-8 text-center">
          <h3 className="text-xl font-bold text-secondary-foreground">Using Charter School Funds?</h3>
          <p className="mt-2 text-secondary-foreground/80">
            We make it easy! We provide detailed invoices and work directly with your charter school for seamless
            enrollment and payment processing.
          </p>
          <p className="mt-4 text-sm font-medium text-primary">
            Contact us to learn more about charter school enrollment
          </p>
        </div>
      </div>
    </section>
  )
}
