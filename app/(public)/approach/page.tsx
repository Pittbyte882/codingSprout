import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Gamepad2, Lightbulb, Rocket, Users } from "lucide-react"

export const metadata: Metadata = {
  title: "Our Approach | Coding Sprout",
  description:
    "Learn about Coding Sprout's research-backed teaching methodology that makes coding fun and accessible for kids of all ages.",
}

const principles = [
  {
    icon: Gamepad2,
    title: "Learning Through Play",
    description:
      "We use games, puzzles, and creative projects to make learning feel like play, especially for our younger students.",
  },
  {
    icon: Users,
    title: "Small Class Sizes",
    description: "With a maximum of 8 students per class, every child gets the attention and support they need.",
  },
  {
    icon: Lightbulb,
    title: "Project-Based Learning",
    description: "Students work on real projects they care about, from games to websites to apps.",
  },
  {
    icon: Rocket,
    title: "Progressive Curriculum",
    description: "Our curriculum builds on itself, taking students from basic concepts to advanced programming.",
  },
]

const ageApproaches = [
  {
    grade: "TK - 2nd Grade",
    title: "Foundation Building",
    points: [
      "Unplugged activities to teach coding concepts",
      "Visual block-based programming",
      "Short, engaging 30-45 minute sessions",
      "Focus on sequencing and patterns",
      "Creative storytelling with code",
    ],
  },
  {
    grade: "3rd - 5th Grade",
    title: "Exploration & Creation",
    points: [
      "Scratch and block-based coding",
      "Game design and animation",
      "Longer projects with multiple sessions",
      "Introduction to computational thinking",
      "Collaborative coding activities",
    ],
  },
  {
    grade: "6th - 8th Grade",
    title: "Transition to Text",
    points: [
      "Python and JavaScript fundamentals",
      "Web development basics (HTML/CSS)",
      "Problem-solving challenges",
      "Real-world application projects",
      "Introduction to debugging",
    ],
  },
  {
    grade: "9th - 12th Grade",
    title: "Advanced Development",
    points: [
      "Full-stack web development",
      "Data science and visualization",
      "AP Computer Science preparation",
      "Portfolio-building projects",
      "College and career preparation",
    ],
  },
]

export default function ApproachPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-off-white to-primary/5 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-secondary sm:text-5xl">Our Teaching Approach</h1>
            <p className="mt-6 text-lg text-muted-foreground">
              We've developed a research-backed methodology that meets students where they are and helps them grow at
              their own pace.
            </p>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-secondary">Our Teaching Principles</h2>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((principle) => (
              <div key={principle.title} className="rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <principle.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">{principle.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Age-Specific Approaches */}
      <section className="bg-muted/50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-secondary">Age-Appropriate Learning</h2>
            <p className="mt-4 text-muted-foreground">
              Our curriculum is carefully designed for each developmental stage.
            </p>
          </div>
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {ageApproaches.map((approach) => (
              <div key={approach.grade} className="rounded-2xl bg-card p-8 shadow-sm ring-1 ring-border">
                <div className="mb-2 text-sm font-medium text-primary">{approach.grade}</div>
                <h3 className="text-xl font-bold text-foreground">{approach.title}</h3>
                <ul className="mt-4 space-y-2">
                  {approach.points.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <span className="text-sm text-muted-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
          <h2 className="text-3xl font-bold text-secondary">See Our Approach in Action</h2>
          <p className="mt-4 text-muted-foreground">
            Browse our available classes to find the perfect fit for your child.
          </p>
          <Link href="/classes" className="mt-8 inline-block">
            <Button size="lg" className="bg-primary hover:bg-sprout-green-dark">
              View Classes
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
