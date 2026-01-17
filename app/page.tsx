import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/home/hero-section"
import { ProgramsSection } from "@/components/home/programs-section"
import { LearningFormatsSection } from "@/components/home/learning-formats-section"
import { WhyCodingSproutSection } from "@/components/home/why-coding-sprout-section"
import { TrustSection } from "@/components/home/trust-section"
import { MissionSection } from "@/components/home/mission-section"
import { CTASection } from "@/components/home/cta-section"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        <HeroSection />
        <ProgramsSection />
        <LearningFormatsSection />
        <WhyCodingSproutSection />
        <MissionSection />
        <TrustSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}