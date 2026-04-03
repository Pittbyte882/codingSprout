import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Coding Classes for High School Students | Learn Coding",
  description:
    "Advanced coding classes for high school students. Learn Python, web development, and real-world programming skills.",
  keywords: [
    "coding classes for high school students",
    "coding for teens",
    "advanced coding classes for kids",
    "python classes for teens",
    "coding bootcamp for teens",
    "high school programming courses",
  ],
}

export default function CodingClassesForHighSchool() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-sprout-green to-sprout-blue py-20 px-4 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Coding Classes for High School Students
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Professional-level Python and programming skills for teens ready to build real applications.
          </p>
          <Link
            href="/classes"
            className="bg-white text-sprout-green font-bold px-8 py-4 rounded-full text-lg hover:bg-gray-100 transition"
          >
            View High School Classes
          </Link>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Advanced Python Classes for High School Teens
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Our <strong>coding classes for high school students</strong> go beyond the basics.
          Students in 9th through 12th grade work with professional tools, follow industry
          coding standards, and build complete applications with real-world structure.
        </p>
        <p className="text-lg text-gray-600 mb-6">
          Our <strong>Python classes for teens</strong> cover object-oriented programming,
          file I/O, data structures, algorithms, and error handling — the same skills
          taught in college computer science courses. Students work in VS Code, the same
          editor used by professional developers worldwide.
        </p>
        <p className="text-lg text-gray-600">
          This isn't a <strong>coding bootcamp for teens</strong> that rushes through surface-level
          content. It's a structured, 8-week deep dive into professional Python that gives
          students a genuine foundation for college CS programs and tech careers.
        </p>
      </section>

      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            What High Schoolers Learn
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Professional Python",
                description: "PEP 8 style standards, functions with docstrings, object-oriented programming, inheritance, and clean code practices used in industry.",
              },
              {
                title: "Data Structures",
                description: "Lists, dictionaries, nested data structures, and file I/O with JSON — the building blocks of every real application.",
              },
              {
                title: "Algorithms",
                description: "Sorting algorithms, Big O notation basics, and computational thinking — giving students the vocabulary and skills for technical interviews.",
              },
              {
                title: "Capstone Projects",
                description: "Every student builds a complete application — task manager, quiz game, inventory system, or custom project — that they can add to their portfolio.",
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
          High School Programming Courses That Build Real Skills
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Our <strong>high school programming courses</strong> are designed for teens who
          are serious about technology. Whether your student wants to study computer science
          in college, land a tech internship, or simply build apps they've always imagined —
          our Python Developers course gives them the skills to do it.
        </p>
        <p className="text-lg text-gray-600 mb-6">
          <strong>Advanced coding classes for teens</strong> at Coding Sprout follow the
          same professional standards used in real software companies. Students learn not
          just how to write code that works, but code that is clean, documented, and
          maintainable.
        </p>
        <p className="text-lg text-gray-600">
          Our instructors are patient mentors who treat high school students like the capable
          young developers they are. We challenge them, celebrate their wins, and prepare
          them for whatever comes next.
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
                q: "Do students need prior coding experience?",
                a: "Our Python Pioneers course (grades 6-8) is the recommended prerequisite. Students with equivalent Python experience are also welcome.",
              },
              {
                q: "What tools do students use?",
                a: "Students work in VS Code or Replit — both professional, industry-standard tools. No special software purchases required.",
              },
              {
                q: "Can this help with AP Computer Science?",
                a: "Absolutely. The concepts covered in our high school course align closely with AP CS Principles and AP CS A curriculum.",
              },
              {
                q: "How long are classes?",
                a: "High school classes are 90 minutes per session — long enough to complete meaningful work and build real applications.",
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
            Start Your Teen's Coding Journey Today
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Python is the language of AI, data science, and the future. Give your teen the skills they need to thrive.
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