import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Coding Classes for 4th & 5th Grade | Kids Programming",
  description:
    "Coding classes for 4th and 5th graders. Learn Scratch, game design, and problem-solving with engaging online lessons.",
  keywords: [
    "coding classes for 4th graders",
    "coding classes for 5th graders",
    "coding for 9 year olds",
    "coding for 10 year olds",
    "intermediate coding for kids",
    "kids programming classes",
  ],
}

export default function CodingClassesFor4thAnd5thGrade() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-sprout-green to-sprout-blue py-20 px-4 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Coding Classes for 4th & 5th Grade
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Intermediate kids programming classes for 9 and 10 year olds ready to level up their skills.
          </p>
          <Link
            href="/classes"
            className="bg-white text-sprout-green font-bold px-8 py-4 rounded-full text-lg hover:bg-gray-100 transition"
          >
            View 4th & 5th Grade Classes
          </Link>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Intermediate Coding for Kids in 4th and 5th Grade
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Our <strong>coding classes for 4th graders</strong> and <strong>coding classes for
          5th graders</strong> bridge the gap between beginner block coding and real-world
          programming. Students work with both Scratch and Code.org's App Lab to build
          projects that feel like actual apps and games.
        </p>
        <p className="text-lg text-gray-600 mb-6">
          <strong>Intermediate coding for kids</strong> at this level focuses on complexity:
          multi-scene games, data storage with variables, functions, and the beginning of
          text-based programming logic. Students who complete this program are fully prepared
          to move into Python programming.
        </p>
        <p className="text-lg text-gray-600">
          Whether your child is <strong>coding for 9 year olds</strong> level or already
          has some Scratch experience, our instructors customize the pace to challenge
          every student appropriately.
        </p>
      </section>

      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            What 4th & 5th Graders Learn
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Advanced Scratch Projects",
                description: "Multi-level games, complex animations, and interactive stories using Scratch's full feature set including clones, custom blocks, and data.",
              },
              {
                title: "Code.org App Lab",
                description: "An introduction to text-based programming using Code.org's App Lab — students build real apps with buttons, screens, and data.",
              },
              {
                title: "Game Design Thinking",
                description: "Students learn to plan before they code — designing game mechanics, player experience, and user interface before writing a single line.",
              },
              {
                title: "Kids Programming Classes",
                description: "Our structured curriculum ensures every student masters foundational concepts while having enough creative freedom to make each project their own.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-sprout-green mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Ready to Level Up Your Child's Coding Skills?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Our 4th and 5th grade coding classes build real programming skills that will serve your child for life.
          </p>
          <Link
            href="/classes"
            className="bg-sprout-green text-white font-bold px-8 py-4 rounded-full text-lg hover:bg-sprout-green-dark transition"
          >
            View Available Classes
          </Link>
        </div>
      </section>
    </main>
  )
}