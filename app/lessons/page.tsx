import type { Metadata } from "next"
import Link from "next/link"
import { BookOpen, Code, Gamepad2, Sparkles, Rocket, Brain } from "lucide-react"

export const metadata: Metadata = {
  title: "Interactive Lessons | Coding Sprout",
  description: "Try our interactive coding lessons! Learn programming through fun, hands-on activities aligned with California Computer Science Standards.",
}

// Lesson data organized by grade level
const lessonsByGrade = [
  {
    gradeLevel: "TK–K",
    title: "Early Learners",
    description: "Sequencing, patterns, and logical thinking through play",
    icon: Sparkles,
    color: "from-pink-500 to-rose-500",
    standards: ["CS.K–2.AP.1", "CS.K–2.AP.2", "CS.K–2.AP.3"],
    lessons: [
      {
        title: "Pattern Party",
        description: "Learn sequencing and patterns with colorful shapes and sounds",
        difficulty: "Beginner",
        duration: "15 min",
        link: "/lessons/pattern-party.html",
        status: "coming-soon"
      },
      {
        title: "Story Sequencer",
        description: "Put story events in order to learn algorithms",
        difficulty: "Beginner",
        duration: "20 min",
        link: "/lessons/story-sequencer.html",
        status: "coming-soon"
      }
    ]
  },
  {
    gradeLevel: "Grades 1–3",
    title: "Visual Coding",
    description: "Visual coding fundamentals and interactive storytelling",
    icon: BookOpen,
    color: "from-purple-500 to-indigo-500",
    standards: ["CS.3–5.AP.1", "CS.3–5.AP.2", "CS.3–5.AP.3"],
    lessons: [
      {
        title: "Learn to Code with Art",
        description: "Master variables, loops, and conditionals by creating colorful artwork",
        difficulty: "Beginner",
        duration: "30 min",
        link: "/lessons/kids-coding-lesson.html",
        status: "available"
      },
      {
        title: "Bouncing Smileys",
        description: "Explore animation and movement with fun bouncing characters",
        difficulty: "Beginner",
        duration: "25 min",
        link: "/lessons/bouncing-smileys-lesson.html",
        status: "available"
      }
    ]
  },
  {
    gradeLevel: "Grades 4–5",
    title: "Game Design",
    description: "Game design and programming logic",
    icon: Gamepad2,
    color: "from-blue-500 to-cyan-500",
    standards: ["CS.3–5.AP.4", "CS.3–5.AP.5"],
    lessons: [
      {
        title: "Interactive Story Game",
        description: "Build a choose-your-own-adventure game with variables and decisions",
        difficulty: "Intermediate",
        duration: "35 min",
        link: "/lessons/story-game.html",
        status: "coming-soon"
      },
      {
        title: "Maze Runner",
        description: "Create a maze game with collision detection and scoring",
        difficulty: "Intermediate",
        duration: "40 min",
        link: "/lessons/maze-runner.html",
        status: "coming-soon"
      }
    ]
  },
  {
    gradeLevel: "Grades 6–8",
    title: "Python Basics",
    description: "Introduction to Python programming",
    icon: Code,
    color: "from-green-500 to-emerald-500",
    standards: ["CS.6–8.AP.1", "CS.6–8.AP.2"],
    lessons: [
      {
        title: "Python Drawing Turtle",
        description: "Learn Python basics by drawing shapes and patterns",
        difficulty: "Intermediate",
        duration: "30 min",
        link: "/lessons/python-turtle.html",
        status: "coming-soon"
      },
      {
        title: "Text Adventure Game",
        description: "Build a Python text adventure with functions and loops",
        difficulty: "Intermediate",
        duration: "45 min",
        link: "/lessons/python-adventure.html",
        status: "coming-soon"
      }
    ]
  },
  {
    gradeLevel: "Grades 9–12",
    title: "Advanced Programming",
    description: "Python programming and Web Development",
    icon: Rocket,
    color: "from-orange-500 to-red-500",
    standards: ["CS.9–12.AP.1", "CS.9–12.AP.2", "CS.9–12.AP.3"],
    lessons: [
      {
        title: "Build Your Own Arcade Game",
        description: "Create a complete game with collision detection, scoring, and power-ups",
        difficulty: "Advanced",
        duration: "45 min",
        link: "/lessons/arcade-game-tutorial.html",
        status: "available"
      },
      {
        title: "Web Portfolio Builder",
        description: "Build a personal portfolio website with HTML, CSS, and JavaScript",
        difficulty: "Advanced",
        duration: "60 min",
        link: "/lessons/web-portfolio.html",
        status: "coming-soon"
      }
    ]
  }
]

export default function InteractiveLessonsPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-off-white to-sky-blue/10 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-primary/10 p-3">
                <Brain className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-secondary sm:text-5xl">
              Interactive Coding Lessons
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Learn to code through fun, hands-on activities! All lessons are aligned with California Computer Science Standards and free to try.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-b bg-muted/30 py-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="rounded-full bg-primary/10 p-3">
                  <Gamepad2 className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="font-semibold text-secondary">Choose Your Level</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Pick a lesson that matches your grade and skill level
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="rounded-full bg-primary/10 p-3">
                  <Code className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="font-semibold text-secondary">Learn by Doing</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Interactive lessons teach coding through hands-on projects
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="rounded-full bg-primary/10 p-3">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="font-semibold text-secondary">See Results Instantly</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Watch your code come to life with immediate visual feedback
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Lessons by Grade Level */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="space-y-16">
            {lessonsByGrade.map((grade, index) => {
              const Icon = grade.icon
              return (
                <div key={index} className="scroll-mt-24" id={grade.gradeLevel.toLowerCase().replace(/[^a-z0-9]/g, '-')}>
                  {/* Grade Level Header */}
                  <div className="mb-8 flex items-start gap-4">
                    <div className={`rounded-xl bg-gradient-to-br ${grade.color} p-3 text-white shadow-lg`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h2 className="text-3xl font-bold text-secondary">{grade.gradeLevel}</h2>
                        <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                          {grade.title}
                        </span>
                      </div>
                      <p className="mt-2 text-muted-foreground">{grade.description}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {grade.standards.map((standard) => (
                          <span 
                            key={standard}
                            className="rounded-md bg-blue-50 px-2 py-1 text-xs font-mono text-blue-700"
                          >
                            {standard}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Lessons Grid */}
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
                    {grade.lessons.map((lesson, lessonIndex) => (
                      <div
                        key={lessonIndex}
                        className="group relative overflow-hidden rounded-2xl border-2 border-border bg-card transition-all hover:border-primary/50 hover:shadow-lg"
                      >
                        <div className="p-6">
                          {/* Status Badge */}
                          <div className="mb-4 flex items-center justify-between">
                            {lesson.status === "available" ? (
                              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                                ✓ Available Now
                              </span>
                            ) : (
                              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                                Coming Soon
                              </span>
                            )}
                            <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                          </div>

                          {/* Lesson Info */}
                          <h3 className="text-xl font-bold text-secondary group-hover:text-primary transition-colors">
                            {lesson.title}
                          </h3>
                          <p className="mt-2 text-sm text-muted-foreground">
                            {lesson.description}
                          </p>

                          {/* Difficulty */}
                          <div className="mt-4 flex items-center gap-2">
                            <span className="text-xs font-medium text-muted-foreground">Difficulty:</span>
                            <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                              lesson.difficulty === "Beginner" 
                                ? "bg-green-100 text-green-700"
                                : lesson.difficulty === "Intermediate"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-purple-100 text-purple-700"
                            }`}>
                              {lesson.difficulty}
                            </span>
                          </div>

                          {/* CTA Button */}
                          <div className="mt-6">
                            {lesson.status === "available" ? (
                              <a
                                href={lesson.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                              >
                                Start Lesson
                                <Rocket className="h-4 w-4" />
                              </a>
                            ) : (
                              <button
                                disabled
                                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-muted px-6 py-3 text-sm font-semibold text-muted-foreground cursor-not-allowed"
                              >
                                Coming Soon
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Gradient overlay on hover */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${grade.color} opacity-0 transition-opacity group-hover:opacity-5 pointer-events-none`} />
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-primary to-primary-dark py-16 text-primary-foreground lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">Ready to Learn More?</h2>
            <p className="mt-4 text-lg opacity-90">
              Join Coding Sprout for personalized instruction, group projects, and a complete curriculum designed for your child's success.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/enroll"
                className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 text-base font-semibold text-primary transition-colors hover:bg-off-white"
              >
                Enroll Now
              </Link>
              <Link
                href="/curriculum"
                className="inline-flex items-center justify-center rounded-lg border-2 border-white px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-white/10"
              >
                View Full Curriculum
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}