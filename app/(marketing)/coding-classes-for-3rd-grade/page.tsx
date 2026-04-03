import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Coding Classes for 3rd Graders | Fun Coding for Kids",
  description:
    "Help your 3rd grader learn coding with engaging classes. Build logic, creativity, and confidence through fun, hands-on lessons.",
  keywords: [
    "coding classes for 3rd graders",
    "coding for 8 year olds",
    "learn coding for kids online",
    "scratch coding classes for kids",
    "coding for elementary students",
    "beginner programming for kids",
  ],
}

export default function CodingClassesFor3rdGrade() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-sprout-green to-sprout-blue py-20 px-4 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Coding Classes for 3rd Graders
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Fun, hands-on Scratch coding classes that build logic, creativity, and confidence in 8 year olds.
          </p>
          <Link
            href="/classes"
            className="bg-white text-sprout-green font-bold px-8 py-4 rounded-full text-lg hover:bg-gray-100 transition"
          >
            View 3rd Grade Classes
          </Link>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Scratch Coding Classes for 3rd Grade Students
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Our <strong>coding classes for 3rd graders</strong> use Scratch — MIT's powerful
          visual coding platform — to help 8 year olds build real games, animations, and
          interactive stories. Students learn the same concepts professional developers use:
          loops, conditionals, variables, and events — all in a fun, drag-and-drop interface.
        </p>
        <p className="text-lg text-gray-600 mb-6">
          <strong>Scratch coding classes for kids</strong> are perfect for 3rd graders because
          the platform is powerful enough to challenge them, visual enough to keep it fun, and
          creative enough to let their personality shine through their projects.
        </p>
        <p className="text-lg text-gray-600">
          Whether your child wants to build a platformer game, an animated music video, or an
          interactive quiz — our instructors help them bring their ideas to life.
        </p>
      </section>

      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            What 3rd Graders Learn
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Beginner Programming for Kids",
                description: "Loops, conditionals, events, and variables — the four pillars of programming — taught through Scratch projects kids actually want to build.",
              },
              {
                title: "Game Design",
                description: "Students design and build their own playable games from scratch, learning about scoring, levels, and player interaction.",
              },
              {
                title: "Debugging Skills",
                description: "When something doesn't work, kids learn to read error messages and fix problems — building resilience and critical thinking.",
              },
              {
                title: "Coding for Elementary Students",
                description: "Every lesson connects coding to subjects kids already love — math, storytelling, art, and science.",
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
          Learn Coding for Kids Online — Live Classes
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Our <strong>learn coding for kids online</strong> program gives 3rd graders access
          to a real Coding Sprout instructor in a live, interactive class. Students share
          their screens, get feedback in real time, and collaborate with classmates — all
          from home.
        </p>
        <p className="text-lg text-gray-600">
          No downloads required. No Scratch account needed to start. Just a computer and
          an internet connection, and your child is ready to code.
        </p>
      </section>

      <section className="py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Help Your 3rd Grader Discover Coding
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join a Coding Sprout class and watch your child build real projects they're proud to share.
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