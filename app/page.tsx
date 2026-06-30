import { SmoothScroll } from "@/components/smooth-scroll"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { BentoGrid } from "@/components/bento-grid"
import { TrustedAtScale } from "@/components/trusted-at-scale"
import { WhyUs } from "@/components/why-us"
import { HowWeWork } from "@/components/how-we-work"
import { Honesty } from "@/components/honesty"
import { Integrations } from "@/components/integrations"
import { FinalCTA } from "@/components/final-cta"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-zinc-950">
        <Navbar />
        <Hero />
        <Services />
        <BentoGrid />
        <TrustedAtScale />
        <WhyUs />
        <HowWeWork />
        <Honesty />
        <Integrations />
        <FinalCTA />
        <Footer />
      </main>
    </SmoothScroll>
  )
}
