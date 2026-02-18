import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, Facebook, Instagram, Linkedin, Youtube } from "lucide-react"

const footerLinks = {
  programs: [
    { label: "Classes", href: "/classes" },
    { label: "Events", href: "/events" },
    { label: "Blog", href: "/blog" },
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
     { label: "Join Our Team", href: "/careers" },  // HIDDEN - Uncomment when ready to hire
    { label: "Sponsor a Student", href: "/sponsor" },
    { label: "FAQ", href: "/faq" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand - Full width on mobile */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/logo.png"
                alt="Coding Sprout Logo"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <span className="text-lg font-bold">Coding Sprout</span>
            </Link>
            <p className="text-sm text-secondary-foreground/80 max-w-xs">
              Helping kids grow into confident coders. Programming education for TK through 12th grade.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-foreground/60 hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-foreground/60 hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-foreground/60 hover:text-primary transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-foreground/60 hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Programs */}
          <div>
            <h3 className="mb-3 sm:mb-4 text-sm font-semibold uppercase tracking-wider text-primary">Programs</h3>
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
            <h3 className="mb-3 sm:mb-4 text-sm font-semibold uppercase tracking-wider text-primary">Company</h3>
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
          <div className="col-span-2 sm:col-span-1">
            <h3 className="mb-3 sm:mb-4 text-sm font-semibold uppercase tracking-wider text-primary">Support</h3>
            <ul className="space-y-2 mb-4 sm:mb-6">
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
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span className="break-all">hello@codingsprout.com</span>
              </a>
              <a 
                href="tel:+15551234567" 
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4 flex-shrink-0" />
                (951) 530-9660
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 sm:mt-12 border-t border-secondary-foreground/20 pt-6 sm:pt-8">
          <div className="flex flex-col items-center justify-between gap-3 sm:gap-4 md:flex-row">
            <p className="text-xs sm:text-sm text-secondary-foreground/60 text-center md:text-left">
              &copy; {new Date().getFullYear()} Coding Sprout. All rights reserved.
            </p>
            <p className="text-xs sm:text-sm text-primary font-medium text-center md:text-right">
              Charter School Friendly - We Accept Educational Funds
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}