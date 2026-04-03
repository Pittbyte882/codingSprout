import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Coding Classes for 1st & 2nd Grade Kids | Learn Coding",
  description:
    "Interactive coding classes for 1st and 2nd graders. Build problem-solving skills with fun, beginner-friendly coding lessons online.",
  keywords: [
    "coding classes for 1st graders",
    "coding classes for 2nd graders",
    "coding for 6 year olds",
    "coding for 7 year olds",
    "elementary coding classes",
    "kids coding programs beginner",
  ],
}

export default function CodingClassesFor1stAnd2ndGrade() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-sprout-green to-sprout-blue py-20 px-4 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Coding Classes for 1st & 2nd Grade
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Engaging, beginner-friendly coding for 6 and 7 year olds that builds real skills through fun.
          </p>
          <Link
            href="/classes"
            className="bg-white text-sprout-green font-bold px-8 py-4 rounded-full text-lg hover:bg-gray-100 transition"
          >
            View 1st & 2nd Grade Classes
          </Link>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Elementary Coding Classes for 1st and 2nd Graders
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Our <strong>coding classes for 1st graders</strong> and <strong>coding classes for
          2nd graders</strong> are designed to take young learners from their first experience
          with block-based coding all the way to building their own interactive projects.
        </p>
        <p className="text-lg text-gray-600 mb-6">
          Students in our 1st and 2nd grade program start with ScratchJr — the same
          visual tool used in our kindergarten classes — and progress to Scratch, where
          they can create more complex animations, stories, and games.
        </p>
        <p className="text-lg text-gray-600">
          Our <strong>kids coding programs for beginners</strong> meet children where they
          are and grow with them. Whether your child is brand new to coding or has explored
          apps at home, our instructors adapt to every level.
        </p>
      </section>

      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            What 1st & 2nd Graders Learn
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Coding for 6 Year Olds",
                description: "Visual block coding with ScratchJr — creating animated stories, making characters move, and building simple sequences.",
              },
              {
                title: "Coding for 7 Year Olds",
                description: "Transitioning to Scratch with more complex projects, loops, and interactive elements that respond to keyboard and mouse.",
              },
              {
                title: "Logic & Sequencing",
                description: "Children learn to think in order — a foundational skill not just for coding but for reading, math, and everyday life.",
              },
              {
                title: "Creative Projects",
                description: "Every student builds something they're proud of — from animated birthday cards to simple adventure games.",
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

      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Online Coding Classes for Elementary Students
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Our <strong>elementary coding classes</strong> are available both in-person and online.
          Live online sessions give 1st and 2nd graders real-time instruction with a Coding
          Sprout teacher — not pre-recorded videos, but interactive, live lessons.
        </p>
        <p className="text-lg text-gray-600">
          Classes are kept small (8 students max) so every child gets individual attention.
          Your child will make friends, build projects, and leave each class feeling proud
          of what they accomplished.
        </p>
      </section>

      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "What coding language do 1st and 2nd graders use?",
                a: "Students start with ScratchJr and progress to Scratch — both visual, block-based tools that teach real coding concepts without requiring typing or reading.",
              },
              {
                q: "How long are classes?",
                a: "Classes are 60 minutes — long enough to complete a real project but short enough to keep young learners engaged.",
              },
              {
                q: "Are online classes as effective as in-person?",
                a: "Yes! Our online classes are live and interactive. Students see and talk to their teacher and classmates in real time.",
              },
            ].map((item) => (
              <div key={item.q} className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-800 mb-2">{item.q}</h3>
                <p className="text-gray-600">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Enroll Your 1st or 2nd Grader Today
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Spots are limited to 8 students per class. Reserve your child's seat before it's gone!
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