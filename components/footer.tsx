import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, Facebook, Instagram, Linkedin, Youtube } from "lucide-react"

const footerLinks = {
  programs: [
    { label: "Classes", href: "/classes" },
    { label: "Events", href: "/events" },
    { label: "Online Learning", href: "/classes?type=online" },
    { label: "One-on-One", href: "/classes?type=individual" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Approach", href: "/approach" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
  ],
  support: [
    { label: "Volunteer", href: "/volunteer" },
    { label: "Donate", href: "/donate" },
    { label: "FAQ", href: "/faq" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/logo.png"
                alt="Coding Sprout Logo"
                width={40}
                height={40}
                className="h-10 w-auto brightness-0 invert"
              />
              <span className="text-lg font-bold">Coding Sprout</span>
            </Link>
            <p className="text-sm text-secondary-foreground/80">
              Helping kids grow into confident coders. Programming education for TK through 12th grade.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-secondary-foreground/60 hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-secondary-foreground/60 hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-secondary-foreground/60 hover:text-primary transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-secondary-foreground/60 hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Programs */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">Programs</h3>
            <ul className="space-y-2">
              {footerLinks.programs.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-secondary-foreground/80 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-secondary-foreground/80 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">Support</h3>
            <ul className="space-y-2 mb-6">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-secondary-foreground/80 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="space-y-2 text-sm text-secondary-foreground/80">
              <a
                href="mailto:hello@codingsprout.com"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4" />
                hello@codingsprout.com
              </a>
              <a href="tel:+15551234567" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone className="h-4 w-4" />
                (555) 123-4567
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-secondary-foreground/20 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-secondary-foreground/60">
              &copy; {new Date().getFullYear()} Coding Sprout. All rights reserved.
            </p>
            <p className="text-sm text-primary font-medium">Charter School Friendly - We Accept Educational Funds</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
