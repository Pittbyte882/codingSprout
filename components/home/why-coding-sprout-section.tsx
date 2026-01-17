import { Brain, Heart, Lightbulb, Target, Users, Award } from "lucide-react"

const benefits = [
  {
    icon: Brain,
    title: "Problem-Solving Skills",
    description:
      "Coding teaches kids to break down complex problems into manageable steps and find creative solutions.",
  },
  {
    icon: Heart,
    title: "Confidence Building",
    description: "Each project completed builds self-esteem and shows kids they can create amazing things.",
  },
  {
    icon: Lightbulb,
    title: "Creativity & Innovation",
    description: "Programming is a creative outlet where kids can bring their ideas to life through code.",
  },
  {
    icon: Target,
    title: "Future-Ready Skills",
    description: "Technology literacy is essential for success in virtually every career path today.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Students learn to work together, share ideas, and build on each other's work.",
  },
  {
    icon: Award,
    title: "Academic Excellence",
    description: "Coding improves math skills, logical thinking, and academic performance across subjects.",
  },
]

export function WhyCodingSproutSection() {
  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-secondary sm:text-4xl">Why Coding Sprout?</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We're not just teaching code - we're nurturing the next generation of problem solvers, creators, and
            innovators.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="group relative rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border transition-all hover:shadow-md hover:ring-primary/50"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                <benefit.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{benefit.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
