import { SmoothScroll } from "@/components/smooth-scroll"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Integrations } from "@/components/integrations"
import { BentoGrid } from "@/components/bento-grid"
import { TrustedAtScale } from "@/components/trusted-at-scale"
import { Honesty } from "@/components/honesty"
import { FAQ } from "@/components/faq"
import { FinalCTA } from "@/components/final-cta"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-zinc-50">
        <Navbar />
        <Hero />
        <Integrations />
        <BentoGrid />
        <TrustedAtScale />
        <Honesty />
        <FAQ />
        <FinalCTA />
        <Footer />
      </main>
    </SmoothScroll>
  )
}
