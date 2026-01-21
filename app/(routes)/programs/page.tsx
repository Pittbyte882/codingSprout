import type { Metadata } from "next"
import { CheckCircle2 } from "lucide-react"

export const metadata: Metadata = {
  title: "Programs & Pricing | Coding Sprout",
  description: "K-12 coding curriculum with flexible pricing for charter schools and families.",
}

export default function ProgramsPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-off-white to-sky-blue/10 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-secondary sm:text-5xl">
              K–12 Coding Fundamentals Program
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              8-week instructor-led sessions designed to build confidence and computational thinking skills
            </p>
          </div>
        </div>
      </section>

      {/* Program Overview */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-deep-navy mb-6">Program Overview</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground">
                This program introduces students to foundational computer science concepts through age-appropriate,
                hands-on coding instruction. Students develop problem-solving, logical thinking, and computational
                skills while creating interactive projects such as games, animations, programs, and websites.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-sprout-green shrink-0 mt-1" />
                  <div>
                    <p className="font-medium text-deep-navy">Program Length:</p>
                    <p className="text-muted-foreground">8 weeks, 1 session per week ( Part 1 and Part 2)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-sprout-green shrink-0 mt-1" />
                  <div>
                    <p className="font-medium text-deep-navy">Format:</p>
                    <p className="text-muted-foreground">
                      Instructor-led, hands-on, project-based learning
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-sprout-green shrink-0 mt-1" />
                  <div>
                    <p className="font-medium text-deep-navy">Technology:</p>
                    <p className="text-muted-foreground">
                      Student-provided computers with browser-based tools (Must bring your own Laptop to each Class)
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-sprout-green shrink-0 mt-1" />
                  <div>
                    <p className="font-medium text-deep-navy">Standards Alignment:</p>
                    <p className="text-muted-foreground">
                      California Computer Science Standards and CSTA K–12 Computer Science Standards
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grade-Level Curriculum */}
      <section className="bg-off-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-3xl font-bold text-deep-navy text-center mb-12">Grade-Level Focus</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white p-6 rounded-xl border border-light-gray">
              <h3 className="text-xl font-bold text-sprout-green mb-2">TK–K</h3>
              <p className="text-muted-foreground">
                Sequencing, patterns, and logical thinking through play
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-light-gray">
              <h3 className="text-xl font-bold text-sprout-green mb-2">Grades 1–3</h3>
              <p className="text-muted-foreground">
                Visual coding fundamentals and interactive storytelling
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-light-gray">
              <h3 className="text-xl font-bold text-sprout-green mb-2">Grades 4–5</h3>
              <p className="text-muted-foreground">Game design and programming logic</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-light-gray">
              <h3 className="text-xl font-bold text-sprout-green mb-2">Grades 6–8</h3>
              <p className="text-muted-foreground">Introduction to Python programming</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-light-gray md:col-span-2 lg:col-span-2">
              <h3 className="text-xl font-bold text-sprout-green mb-2">Grades 9–12</h3>
              <p className="text-muted-foreground">
                Python programming or Web Development (HTML/CSS/JavaScript)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-3xl font-bold text-deep-navy text-center mb-4">Program Pricing</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Flexible pricing options for both group classes and one-on-one sessions
          </p>

          <div className="grid gap-8 lg:grid-cols-2 max-w-5xl mx-auto">
            {/* Group Classes */}
            <div className="bg-gradient-to-br from-sprout-green/5 to-sky-blue/5 p-8 rounded-2xl border-2 border-sprout-green/20">
              <h3 className="text-2xl font-bold text-deep-navy mb-6">Group Classes</h3>
              <p className="text-sm text-muted-foreground mb-6">8-week session (Part 1 & 2)  • Once per week</p>

              <div className="space-y-4">
                <div className="flex items-start justify-between p-4 bg-white rounded-lg">
                  <div>
                    <p className="font-semibold text-deep-navy">TK–5th Grade</p>
                    <p className="text-sm text-muted-foreground">45 minutes per class</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-sprout-green">$50</p>
                    <p className="text-xs text-muted-foreground">per class</p>
                  </div>
                </div>

                <div className="flex items-start justify-between p-4 bg-white rounded-lg">
                  <div>
                    <p className="font-semibold text-deep-navy">6th–8th Grade</p>
                    <p className="text-sm text-muted-foreground">60 minutes per class</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-sprout-green">$65</p>
                    <p className="text-xs text-muted-foreground">per class</p>
                  </div>
                </div>

                <div className="flex items-start justify-between p-4 bg-white rounded-lg">
                  <div>
                    <p className="font-semibold text-deep-navy">9th–12th Grade</p>
                    <p className="text-sm text-muted-foreground">90 minutes per class</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-sprout-green">$75</p>
                    <p className="text-xs text-muted-foreground">per class</p>
                  </div>
                </div>
              </div>
<div className="mt-6 p-4 bg-white rounded-lg">
                <p className="text-sm font-medium text-deep-navy mb-3">Session Options:</p>
                
                {/* Part 1 and Part 2 side by side */}
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="text-sm font-semibold text-deep-navy mb-1">Part 1 (4-Week Session):</p>
                    <p className="text-sm font-semibold text-deep-navy mb-1">Includes 4 classes:</p>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>TK–5: $200</p>
                      <p>6–8: $260</p>
                      <p>9–12: $300</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-deep-navy mb-1">Part 2 (4-Week Session):</p>
                    <p className="text-sm font-semibold text-deep-navy mb-1">Includes 4 classes:</p>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>TK–5: $200</p>
                      <p>6–8: $260</p>
                      <p>9–12: $300</p>
                    </div>
                  </div>
                </div>

                {/* Full 8-Week Program */}
                <div className="pt-3 border-t border-light-gray">
                  <p className="text-sm font-semibold text-deep-navy mb-1">Full 8-Week Program: </p>
                  <p className="text-sm font-semibold text-deep-navy mb-1">Includes 8 classes:</p>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>TK–5: $400 per student</p>
                    <p>6–8: $520 per student</p>
                    <p>9–12: $600 per student</p>
                    <p className="text-sm font-semibold text-deep-navy mb-1">Completed Project at the end of Part 2</p>
                  </div>
                </div>
              </div>
            </div>

            {/* One-on-One Sessions */}
            <div className="bg-gradient-to-br from-sky-blue/5 to-sprout-green/5 p-8 rounded-2xl border-2 border-sky-blue/20">
              <h3 className="text-2xl font-bold text-deep-navy mb-6">One-on-One Sessions</h3>
              <p className="text-sm text-muted-foreground mb-6">Tutor based Personalized instruction • As needed </p>

              <div className="space-y-4">
                <div className="flex items-start justify-between p-4 bg-white rounded-lg">
                  <div>
                    <p className="font-semibold text-deep-navy">TK–5th Grade</p>
                    <p className="text-sm text-muted-foreground">45 minutes per session</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-sky-blue">$70</p>
                    <p className="text-xs text-muted-foreground">per session</p>
                  </div>
                </div>

                <div className="flex items-start justify-between p-4 bg-white rounded-lg">
                  <div>
                    <p className="font-semibold text-deep-navy">6th–8th Grade</p>
                    <p className="text-sm text-muted-foreground">60 minutes per session</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-sky-blue">$80</p>
                    <p className="text-xs text-muted-foreground">per session</p>
                  </div>
                </div>

                <div className="flex items-start justify-between p-4 bg-white rounded-lg">
                  <div>
                    <p className="font-semibold text-deep-navy">9th–12th Grade</p>
                    <p className="text-sm text-muted-foreground">90 minutes per session</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-sky-blue">$90</p>
                    <p className="text-xs text-muted-foreground">per session</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-white rounded-lg">
                <p className="text-sm font-medium text-deep-navy">Flexible Scheduling:</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  One-on-one sessions are scheduled as needed based on your child's availability and learning goals.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-12 text-center">
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We accept both credit card payments and charter school funds. Charter schools receive dedicated support
              and invoicing for easy processing.
            </p>
          </div>
        </div>
      </section>

      {/* Learning Outcomes */}
      <section className="bg-off-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-deep-navy mb-8">Learning Outcomes</h2>
            <p className="text-muted-foreground mb-6">By the end of the program, students will:</p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-sprout-green shrink-0 mt-1" />
                <p className="text-muted-foreground">
                  Understand core programming concepts (sequence, loops, conditionals)
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-sprout-green shrink-0 mt-1" />
                <p className="text-muted-foreground">Apply computational thinking to solve problems</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-sprout-green shrink-0 mt-1" />
                <p className="text-muted-foreground">Create a functional coding project</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-sprout-green shrink-0 mt-1" />
                <p className="text-muted-foreground">Develop confidence using technology creatively</p>
              </div>
            </div>

            <div className="mt-12">
              <h3 className="text-2xl font-bold text-deep-navy mb-4">Culminating Project</h3>
              <p className="text-muted-foreground mb-4">
                Students complete and present a final project aligned to their grade level:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-sprout-green">•</span>
                  <span>Animated story or game (TK–5)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sprout-green">•</span>
                  <span>Python program or interactive tool (6–12)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sprout-green">•</span>
                  <span>Website or application (9–12)</span>
                </li>
                <p className="text-sm font-semibold text-deep-navy mb-1">Only Students that complete both Part 1 & 2 will have a completed Project</p>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Standards Alignment */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-deep-navy mb-8 text-center">Standards Alignment</h2>
            <p className="text-center text-muted-foreground mb-12">
              Aligned to California Computer Science Standards and CSTA K–12 Computer Science Standards
            </p>

            <div className="space-y-8">
              {/* CA CS Practices */}
              <div className="bg-off-white p-6 rounded-xl">
                <h3 className="text-xl font-bold text-deep-navy mb-4">CA CS Practices (All Grades)</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• CS.P.1: Fostering an inclusive computing culture</li>
                  <li>• CS.P.2: Collaborating around computing</li>
                  <li>• CS.P.3: Recognizing and defining computational problems</li>
                  <li>• CS.P.4: Developing and using abstractions</li>
                  <li>• CS.P.5: Creating computational artifacts</li>
                  <li>• CS.P.6: Testing and refining computational artifacts</li>
                </ul>
              </div>

              {/* Grade Bands */}
              <div className="grid gap-6 md:grid-cols-2">
                <div className="bg-sprout-green/5 p-6 rounded-xl border border-sprout-green/20">
                  <h3 className="text-lg font-bold text-deep-navy mb-3">TK–K</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• CS.K–2.AP.1: Model daily processes</li>
                    <li>• CS.K–2.AP.2: Decompose simple problems</li>
                    <li>• CS.K–2.AP.3: Create programs with sequences</li>
                  </ul>
                </div>

                <div className="bg-sky-blue/5 p-6 rounded-xl border border-sky-blue/20">
                  <h3 className="text-lg font-bold text-deep-navy mb-3">Grades 1–3</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• CS.3–5.AP.1: Use loops and conditionals</li>
                    <li>• CS.3–5.AP.2: Design programs with I/O</li>
                    <li>• CS.3–5.AP.3: Debug programs</li>
                  </ul>
                </div>

                <div className="bg-sprout-green/5 p-6 rounded-xl border border-sprout-green/20">
                  <h3 className="text-lg font-bold text-deep-navy mb-3">Grades 4–5</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• CS.3–5.AP.4: Use variables</li>
                    <li>• CS.3–5.AP.5: Develop complex programs</li>
                  </ul>
                </div>

                <div className="bg-sky-blue/5 p-6 rounded-xl border border-sky-blue/20">
                  <h3 className="text-lg font-bold text-deep-navy mb-3">Grades 6–8</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• CS.6–8.AP.1: Design with control structures</li>
                    <li>• CS.6–8.AP.2: Decompose and create modular code</li>
                  </ul>
                </div>

                <div className="md:col-span-2 bg-sprout-green/5 p-6 rounded-xl border border-sprout-green/20">
                  <h3 className="text-lg font-bold text-deep-navy mb-3">Grades 9–12</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• CS.9–12.AP.1: Design and develop programs using algorithms</li>
                    <li>• CS.9–12.AP.2: Develop and use abstractions to manage complexity</li>
                    <li>• CS.9–12.AP.3: Evaluate programs for correctness and efficiency</li>
                    <li>• CS.9–12.CS.1: Analyze how computing systems work together</li>
                    <li>• CS.9–12.IC.1: Evaluate the impact of computing technologies</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-sprout-green to-sprout-green-dark py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Bring Coding to Your School?</h2>
          <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
            Contact us to discuss how we can customize this program for your charter school needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-block bg-white text-sprout-green px-8 py-3 rounded-lg font-semibold hover:bg-off-white transition-colors"
            >
            
              Contact Us
            </a>
            <a
              href="/classes"
              className="inline-block bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              View Classes
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}