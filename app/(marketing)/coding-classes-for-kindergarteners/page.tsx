import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Coding Classes for Kindergarteners | Fun Beginner Coding",
  description:
    "Fun coding classes for kindergarteners. Help your child learn logic, creativity, and problem-solving with beginner-friendly lessons.",
  keywords: [
    "coding classes for kindergarteners",
    "coding for 5 year olds",
    "beginner coding for kids",
    "coding classes for young kids",
    "coding for kindergarten online",
    "kids coding basics",
  ],
}

export default function CodingClassesForKindergarteners() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-sprout-green to-sprout-blue py-20 px-4 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Coding Classes for Kindergarteners
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Spark your child's love of coding with fun, beginner-friendly lessons designed for kids ages 5–6.
          </p>
          <Link
            href="/classes"
            className="bg-white text-sprout-green font-bold px-8 py-4 rounded-full text-lg hover:bg-gray-100 transition"
          >
            View Kindergarten Classes
          </Link>
        </div>
      </section>

      {/* Intro */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Beginner Coding for Kids in TK and Kindergarten
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          At Coding Sprout, our <strong>coding classes for kindergarteners</strong> are designed
          to introduce young learners to the world of technology through play, creativity, and
          storytelling. We believe that even the youngest kids can learn coding basics when
          lessons are fun, visual, and age-appropriate.
        </p>
        <p className="text-lg text-gray-600 mb-6">
          Our TK–K coding program uses <strong>ScratchJr</strong> — a visual, block-based
          coding tool specifically built for kids ages 5 and up. Children drag and drop
          colorful coding blocks to make characters move, talk, and dance. No reading required!
        </p>
        <p className="text-lg text-gray-600">
          Whether your child is exploring <strong>coding for 5 year olds</strong> for the
          first time or has dabbled with tablets and apps, our beginner coding classes meet
          every child where they are and help them grow.
        </p>
      </section>

      {/* What They Learn */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            What Kindergarteners Learn in Our Coding Classes
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Kids Coding Basics",
                description:
                  "Children learn sequences, loops, and events using ScratchJr's visual interface — the same fundamental concepts professional developers use.",
              },
              {
                title: "Creative Storytelling",
                description:
                  "Kids build animated stories and simple games, combining creativity with coding logic in a way that feels like play.",
              },
              {
                title: "Problem Solving",
                description:
                  "Every coding challenge teaches children to think critically, try new approaches, and persist through difficulty — skills that last a lifetime.",
              },
              {
                title: "Confidence Building",
                description:
                  "When a kindergartener makes a character dance on screen, the pride on their face is priceless. Our classes build real confidence.",
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

      {/* Online Option */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Coding for Kindergarten Online
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Can't make it to an in-person class? Our <strong>coding for kindergarten online</strong>{" "}
          option brings the same fun, interactive experience directly to your home. Students
          join live video sessions with a real instructor, use ScratchJr in their browser,
          and interact with classmates — all from your living room.
        </p>
        <p className="text-lg text-gray-600 mb-6">
          Our online <strong>coding classes for young kids</strong> are kept small — 8 students
          maximum — so every child gets individual attention from their teacher.
        </p>
        <p className="text-lg text-gray-600">
          All you need is a tablet or computer and an internet connection. We handle the rest!
        </p>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Common Questions About Kindergarten Coding Classes
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "Is my kindergartener too young to learn coding?",
                a: "Not at all! Research shows that children as young as 4 can learn foundational coding concepts when taught through play. Our curriculum is specifically designed for this age group.",
              },
              {
                q: "Does my child need to know how to read?",
                a: "No reading is required. ScratchJr uses colorful picture-based blocks that children interact with visually.",
              },
              {
                q: "How long are the classes?",
                a: "Our TK–K coding classes are 45 minutes — the perfect length to keep young learners engaged without overwhelming them.",
              },
              {
                q: "How many kids are in each class?",
                a: "We keep classes to a maximum of 8 students so every child gets the attention they deserve.",
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

      {/* CTA */}
      <section className="py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Ready to Get Your Kindergartener Started?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Browse our upcoming coding classes for kindergarteners and reserve your child's spot today.
            Spots fill up fast!
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