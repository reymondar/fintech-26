import { SmoothScroll } from "@/components/smooth-scroll"
import { Navbar } from "@/components/navbar"
import { ServicesHero } from "@/components/services-hero"
import { TheStack } from "@/components/the-stack"
import { TechnicalHonesty } from "@/components/technical-honesty"
import { EngagementLadder } from "@/components/engagement-ladder"
import { ServicesCTA } from "@/components/services-cta"
import { Footer } from "@/components/footer"

export default function ServicesPage() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-zinc-950">
        <Navbar />
        <ServicesHero />
        <TheStack />
        <TechnicalHonesty />
        <EngagementLadder />
        <ServicesCTA />
        <Footer />
      </main>
    </SmoothScroll>
  )
}
