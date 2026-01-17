import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#F8FAFC] via-[#F8FAFC] to-sky-blue/10">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5" />
        <div className="absolute top-1/2 -left-20 h-60 w-60 rounded-full bg-sky-blue/10" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:py-24 lg:px-8 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="mb-4 inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <span className="mr-2 h-2 w-2 rounded-full bg-primary animate-pulse" />
              Now Enrolling for 2026
            </div>

            <h1 className="text-balance text-4xl font-bold tracking-tight text-secondary sm:text-5xl lg:text-6xl">
              Helping Kids Grow Into <span className="text-primary">Confident Coders</span>
            </h1>

            <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
              From TK through 12th grade, we nurture young minds with age-appropriate coding education that builds
              problem-solving skills, creativity, and confidence for the digital future.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Link href="/classes">
                <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-sprout-green-dark text-lg px-8">
                  Enroll Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground text-lg px-8 bg-transparent"
                >
                  Learn More
                </Button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 lg:justify-start">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <svg className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Charter School Approved
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <svg className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Online & In-Person
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <svg className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Small Class Sizes
              </div>
            </div>
          </div>

          {/* Image/Visual */}
          <div className="relative">
            <div className="relative mx-auto aspect-square max-w-md lg:max-w-none">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 to-sky-blue/20 blur-3xl" />
              <div className="relative rounded-3xl bg-card p-4 shadow-2xl ring-1 ring-border">
                <Image
                  src="/happy-diverse-children-learning-coding-on-computer.jpg"
                  alt="Kids learning to code at Coding Sprout"
                  width={500}
                  height={500}
                  className="rounded-2xl object-cover"
                  priority
                />
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-4 -left-4 rounded-2xl bg-card p-4 shadow-lg ring-1 ring-border">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-2xl font-bold text-primary">5+</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Years Teaching</p>
                    <p className="text-xs text-muted-foreground">Kids to Code</p>
                  </div>
                </div>
              </div>
              {/* Floating Badge 2 */}
              <div className="absolute -top-4 -right-4 rounded-2xl bg-primary p-4 shadow-lg">
                <div className="text-center text-primary-foreground">
                  <p className="text-2xl font-bold">500+</p>
                  <p className="text-xs">Students Taught</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
