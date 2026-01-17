import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, Target, Users, Sparkles } from "lucide-react"

export const metadata: Metadata = {
  title: "About Us | Coding Sprout",
  description:
    "Learn about Coding Sprout's mission to help kids grow into confident coders through engaging, age-appropriate programming education.",
}

const values = [
  {
    icon: Heart,
    title: "Passion for Teaching",
    description: "We love what we do and it shows in every class we teach.",
  },
  {
    icon: Target,
    title: "Student-Centered",
    description: "Every decision we make puts our students' learning first.",
  },
  {
    icon: Users,
    title: "Inclusive Environment",
    description: "We welcome all students regardless of background or experience.",
  },
  {
    icon: Sparkles,
    title: "Growth Mindset",
    description: "We believe every child can learn to code with the right support.",
  },
]

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-off-white to-sky-blue/10 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-secondary sm:text-5xl">About Coding Sprout</h1>
            <p className="mt-6 text-lg text-muted-foreground">
              We're on a mission to make coding education accessible, engaging, and fun for every child from TK through
              12th grade.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold text-secondary">Our Story</h2>
              <div className="mt-6 space-y-4 text-muted-foreground">
                <p>
                  Coding Sprout was founded with a simple belief: every child deserves the opportunity to learn the
                  language of technology.
                </p>
                <p>
                  We saw too many kids being left behind in an increasingly digital world, not because they lacked
                  ability, but because they lacked access to quality coding education.
                </p>
                <p>
                  Today, we're proud to serve hundreds of families across our community, working with both traditional
                  schools and charter schools to make coding education accessible to all.
                </p>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/coding-instructor-teaching-children-in-a-bright-mo.jpg"
                alt="Coding Sprout classroom"
                width={500}
                height={400}
                className="rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-muted/50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-secondary">Our Values</h2>
            <p className="mt-4 text-muted-foreground">These principles guide everything we do at Coding Sprout.</p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div key={value.title} className="rounded-2xl bg-card p-6 shadow-sm">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">{value.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
          <h2 className="text-3xl font-bold text-secondary">Join Our Community</h2>
          <p className="mt-4 text-muted-foreground">
            Ready to help your child discover the joy of coding? We'd love to meet you!
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/classes">
              <Button size="lg" className="bg-primary hover:bg-sprout-green-dark">
                View Classes
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
