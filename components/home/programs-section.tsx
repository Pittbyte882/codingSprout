import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Blocks, Code2, Gamepad2, Rocket, ArrowRight } from "lucide-react"

const programs = [
  {
    icon: Blocks,
    title: "TK - 2nd Grade",
    subtitle: "Little Coders",
    description:
      "Introduction to coding concepts through fun, interactive games and visual programming. Building foundational logic skills through play.",
    skills: ["Sequencing", "Pattern Recognition", "Basic Logic"],
    color: "bg-warm-yellow/10 text-warm-yellow",
    borderColor: "hover:border-warm-yellow",
  },
  {
    icon: Gamepad2,
    title: "3rd - 5th Grade",
    subtitle: "Code Explorers",
    description:
      "Dive into block-based coding with Scratch and create your own games, animations, and interactive stories.",
    skills: ["Scratch", "Game Design", "Problem Solving"],
    color: "bg-sky-blue/10 text-sky-blue",
    borderColor: "hover:border-sky-blue",
  },
  {
    icon: Code2,
    title: "6th - 8th Grade",
    subtitle: "Junior Developers",
    description:
      "Transition to text-based programming with Python and JavaScript. Build real projects and learn computational thinking.",
    skills: ["Python", "JavaScript", "Web Basics"],
    color: "bg-primary/10 text-primary",
    borderColor: "hover:border-primary",
  },
  {
    icon: Rocket,
    title: "9th - 12th Grade",
    subtitle: "Tech Innovators",
    description:
      "Advanced programming, web development, and computer science concepts. Prepare for college and career opportunities.",
    skills: ["Full Stack Dev", "Data Science", "AP CS Prep"],
    color: "bg-secondary/10 text-secondary",
    borderColor: "hover:border-secondary",
  },
]

export function ProgramsSection() {
  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-secondary sm:text-4xl">Programs by Grade Level</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Age-appropriate curriculum designed to meet students where they are and help them grow into confident
            coders.
          </p>
        </div>

        {/* Program Cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {programs.map((program) => (
            <Card
              key={program.title}
              className={`group relative overflow-hidden border-2 border-transparent transition-all duration-300 ${program.borderColor} hover:shadow-lg`}
            >
              <CardHeader>
                <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${program.color}`}>
                  <program.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg">{program.title}</CardTitle>
                <CardDescription className="font-medium text-primary">{program.subtitle}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">{program.description}</p>
                <div className="flex flex-wrap gap-2">
                  {program.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link href="/classes">
            <Button size="lg" className="bg-primary hover:bg-sprout-green-dark">
              View All Classes
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
