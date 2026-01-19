import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  Code, 
  Users, 
  Heart, 
  Clock, 
  MapPin, 
  GraduationCap,
  CheckCircle,
  Mail,
  Sparkles
} from "lucide-react"

export const metadata: Metadata = {
  title: "Join Our Team | Coding Sprout",
  description: "Join Coding Sprout and help kids grow into confident coders. View our open positions.",
}

const benefits = [
  {
    icon: Heart,
    title: "Make an Impact",
    description: "Help shape the next generation of coders and problem-solvers.",
  },
  {
    icon: Clock,
    title: "Flexible Schedule",
    description: "Part-time positions with hours that work around your availability.",
  },
  {
    icon: GraduationCap,
    title: "Growth Opportunities",
    description: "Develop your teaching skills and advance within our programs.",
  },
  {
    icon: Users,
    title: "Supportive Team",
    description: "Join a passionate community dedicated to coding education.",
  },
]

const openPositions = [
  {
    title: "Coding Instructor",
    type: "Part-Time",
    location: "In-Person & Online",
    description: "Lead engaging coding classes for students from TK through 12th grade. You'll teach programming concepts, guide projects, and inspire the next generation of coders.",
    responsibilities: [
      "Teach coding classes to groups of 4-12 students",
      "Prepare lesson materials and hands-on projects",
      "Track student progress and provide feedback to parents",
      "Create a fun, encouraging learning environment",
    ],
    requirements: [
      "Proficiency in at least one programming language (Python, JavaScript, Scratch, etc.)",
      "Experience working with children or teens",
      "Excellent communication and patience",
      "Reliable transportation (for in-person classes)",
      "Must pass background check",
    ],
  },
  {
    title: "Teaching Assistant",
    type: "Part-Time",
    location: "In-Person & Online",
    description: "Support our lead instructors during coding classes by helping students one-on-one, managing classroom activities, and ensuring every child has a great experience.",
    responsibilities: [
      "Assist lead instructor during classes",
      "Provide one-on-one help to students who need extra support",
      "Help set up and clean up classroom materials",
      "Monitor student engagement and report to instructor",
    ],
    requirements: [
      "Basic understanding of coding concepts",
      "Experience working with children or teens preferred",
      "Patient, friendly, and encouraging demeanor",
      "Reliable and punctual",
      "Must pass background check",
    ],
  },
]

export default function CareersPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-off-white to-sky-blue/10 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary">
              <Sparkles className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-secondary sm:text-5xl">
              Join Our Team
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Help kids grow into confident coders. We're looking for passionate individuals 
              who love technology and working with young learners.
            </p>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary">Why Work With Us?</h2>
            <p className="mt-4 text-muted-foreground">
              At Coding Sprout, you're more than an employee—you're part of a mission.
            </p>
          </div>
          
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => (
              <div 
                key={benefit.title} 
                className="rounded-2xl bg-card p-6 text-center shadow-sm ring-1 ring-border"
              >
                <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <benefit.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{benefit.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="bg-light-gray/30 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary">Open Positions</h2>
            <p className="mt-4 text-muted-foreground">
              Find the role that's right for you.
            </p>
          </div>

          <div className="space-y-8">
            {openPositions.map((position) => (
              <div 
                key={position.title}
                className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-border"
              >
                {/* Position Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-deep-navy">{position.title}</h3>
                    <div className="flex flex-wrap gap-3 mt-2">
                      <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {position.type}
                      </span>
                      <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {position.location}
                      </span>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 bg-sprout-green/10 px-3 py-1 rounded-full">
                    <span className="w-2 h-2 bg-sprout-green rounded-full"></span>
                    <span className="text-sm font-medium text-sprout-green">Now Hiring</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground mb-6">{position.description}</p>

                {/* Two Column Layout */}
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Responsibilities */}
                  <div>
                    <h4 className="font-semibold text-deep-navy mb-3">What You'll Do</h4>
                    <ul className="space-y-2">
                      {position.responsibilities.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-sprout-green mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Requirements */}
                  <div>
                    <h4 className="font-semibold text-deep-navy mb-3">What We're Looking For</h4>
                    <ul className="space-y-2">
                      {position.requirements.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-sky-blue mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Apply */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
          <div className="rounded-2xl bg-secondary p-8 lg:p-12 text-secondary-foreground">
            <div className="mx-auto mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary">
              <Mail className="h-7 w-7 text-primary-foreground" />
            </div>
            <h2 className="text-2xl font-bold sm:text-3xl">Interested in Joining Us?</h2>
            <p className="mt-4 text-secondary-foreground/80 max-w-xl mx-auto">
              We'd love to hear from you! Send us an email with your resume and a brief introduction 
              about why you'd be a great fit for Coding Sprout.
            </p>
            <div className="mt-8">
              <a href="mailto:careers@codingsprout.com?subject=Job Application - [Position Name]">
                <Button size="lg" className="bg-primary hover:bg-sprout-green-dark text-lg px-8 py-6 h-auto">
                  <Mail className="mr-2 h-5 w-5" />
                  careers@codingsprout.com
                </Button>
              </a>
            </div>
            <p className="mt-6 text-sm text-secondary-foreground/60">
              Please include which position you're applying for in the subject line.
            </p>
          </div>
        </div>
      </section>

      {/* Background Check Notice */}
<section className="pb-16 lg:pb-24">
  <div className="mx-auto max-w-3xl px-4 lg:px-8">
    <div className="rounded-xl bg-sky-blue/10 p-6 ring-1 ring-sky-blue/20">
      <p className="text-sm text-deep-navy text-center">
        <strong>Note:</strong> All our positions working with children require a{" "}
        <a 
          href="https://www.cdss.ca.gov/inforesources/community-caregiver-background-check/livescan"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sky-blue hover:text-sprout-green underline font-medium"
        >
          Live Scan Background Check
        </a>
        . We are committed to providing a safe learning environment for all students.
      </p>
    </div>
  </div>
</section>
    </div>
  )
}