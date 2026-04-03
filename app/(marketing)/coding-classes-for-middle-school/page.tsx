import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Coding Classes for Middle School | Learn Coding Skills",
  description:
    "Coding classes for middle school students. Learn Python, game design, and real-world coding skills in fun, structured lessons.",
  keywords: [
    "coding classes for middle school students",
    "coding for 11 year olds",
    "coding for 12 year olds",
    "coding for teens beginner",
    "python coding for kids",
    "middle school programming classes",
  ],
}

export default function CodingClassesForMiddleSchool() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-sprout-green to-sprout-blue py-20 px-4 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Coding Classes for Middle School
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Real Python programming for 6th, 7th, and 8th graders — skills that open doors to real careers.
          </p>
          <Link
            href="/classes"
            className="bg-white text-sprout-green font-bold px-8 py-4 rounded-full text-lg hover:bg-gray-100 transition"
          >
            View Middle School Classes
          </Link>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Python Coding for Middle School Students
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Our <strong>coding classes for middle school students</strong> are where block coding
          ends and real programming begins. Students in 6th, 7th, and 8th grade are ready
          to write actual Python code — the same language used by Google, NASA, and Instagram.
        </p>
        <p className="text-lg text-gray-600 mb-6">
          <strong>Python coding for kids</strong> at the middle school level starts with the
          basics — variables, data types, loops, and functions — and builds toward complete
          programs that solve real problems. Students work in Replit, a browser-based coding
          environment that requires no installation.
        </p>
        <p className="text-lg text-gray-600">
          If your child is <strong>coding for 11 year olds</strong> level or already has
          some programming experience, our Python Pioneers course meets them where they are
          and pushes them forward.
        </p>
      </section>

      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            What Middle Schoolers Learn
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Python Programming",
                description: "Real Python code — variables, loops, conditionals, functions, and lists. Students write programs that actually run and solve problems.",
              },
              {
                title: "Game Development",
                description: "Students build text-based adventure games, trivia apps, and command-line tools using everything they've learned.",
              },
              {
                title: "Debugging & Problem Solving",
                description: "Middle schoolers learn to read error messages, debug their code, and think systematically — skills that apply far beyond coding.",
              },
              {
                title: "Middle School Programming Classes",
                description: "Our structured 8-week curriculum takes students from Hello World to a complete capstone project they're proud to share.",
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
          Coding for Teens — Starting the Right Way
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Middle school is the perfect time to start <strong>coding for teens beginner</strong>
          level. Students are old enough to handle the logic of text-based programming but
          young enough that the habits and mindsets they build now will shape their entire
          relationship with technology.
        </p>
        <p className="text-lg text-gray-600">
          Our instructors are patient, encouraging, and experienced with this age group.
          We make Python feel achievable — not intimidating — and celebrate every small
          win along the way.
        </p>
      </section>

      <section className="py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Give Your Middle Schooler a Real Coding Foundation
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Python is the most in-demand programming language in the world. Start building that skill today.
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