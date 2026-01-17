"use client"

import { Play } from "lucide-react"
import { Button } from "@/components/ui/button"

export function MissionSection() {
  return (
    <section className="bg-muted/30 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Video Placeholder */}
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-secondary shadow-xl">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Button
                  size="lg"
                  className="h-16 w-16 rounded-full bg-primary hover:bg-sprout-green-dark"
                  aria-label="Play video"
                >
                  <Play className="h-8 w-8 text-primary-foreground ml-1" />
                </Button>
                <p className="mt-4 text-secondary-foreground/60">Video Coming Soon</p>
              </div>
            </div>
          </div>

          {/* Mission Statement */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-secondary sm:text-4xl">Our Mission</h2>
            <div className="mt-6 space-y-4 text-lg text-muted-foreground">
              <p>
                At Coding Sprout, we believe every child has the potential to become a creator, not just a consumer, of
                technology.
              </p>
              <p>
                Our mission is to nurture young minds through engaging, age-appropriate coding education that builds
                confidence, creativity, and critical thinking skills.
              </p>
              <p>
                We're committed to making coding education accessible to all families, which is why we proudly work with
                charter schools and offer flexible payment options.
              </p>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <div className="h-1 w-12 rounded-full bg-primary" />
              <p className="font-semibold text-primary">Growing minds, one line of code at a time</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
