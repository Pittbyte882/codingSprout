import type { Metadata } from "next"
import { ContactForm } from "@/components/contact-form"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact Us | Coding Sprout",
  description:
    "Get in touch with Coding Sprout. We're here to answer your questions about our coding classes for kids.",
}

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    content: "hello@codingsprout.com",
    href: "mailto:hello@codingsprout.com",
  },
  {
    icon: Phone,
    title: "Phone",
    content: "(555) 123-4567",
    href: "tel:+15551234567",
  },
  {
    icon: MapPin,
    title: "Location",
    content: "Serving families throughout the area",
    href: null,
  },
  {
    icon: Clock,
    title: "Office Hours",
    content: "Mon-Fri: 9am-6pm, Sat: 10am-4pm",
    href: null,
  },
]

export default function ContactPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-off-white to-sky-blue/10 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-secondary sm:text-5xl">Contact Us</h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Have questions about our programs? We'd love to hear from you!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-secondary">Get in Touch</h2>
              <p className="mt-4 text-muted-foreground">
                Whether you're interested in enrolling your child, have questions about our curriculum, or want to learn
                more about charter school options, we're here to help.
              </p>

              <div className="mt-8 space-y-6">
                {contactInfo.map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{item.title}</h3>
                      {item.href ? (
                        <a href={item.href} className="text-muted-foreground hover:text-primary">
                          {item.content}
                        </a>
                      ) : (
                        <p className="text-muted-foreground">{item.content}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Charter School Note */}
              <div className="mt-10 rounded-xl bg-primary/10 p-6">
                <h3 className="font-semibold text-foreground">Charter School Families</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  We work directly with charter schools to make enrollment easy. Contact us to learn about our invoicing
                  process and how to use your educational funds for coding classes.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="rounded-2xl bg-card p-8 shadow-sm ring-1 ring-border">
              <h2 className="text-xl font-bold text-foreground">Send Us a Message</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
