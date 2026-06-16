import { SmoothScroll } from "@/components/smooth-scroll"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { BentoGrid } from "@/components/bento-grid"
import { TrustedAtScale } from "@/components/trusted-at-scale"
import { Integrations } from "@/components/integrations"
import { FinalCTA } from "@/components/final-cta"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-zinc-950">
        <Navbar />
        <Hero />
        <BentoGrid />
        <TrustedAtScale />
        <Integrations />
        <FinalCTA />
        <Footer />
      </main>
    </SmoothScroll>
  )
}
