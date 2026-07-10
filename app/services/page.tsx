import type { Metadata } from "next"
import { SmoothScroll } from "@/components/smooth-scroll"

export const metadata: Metadata = {
  title: "Servicios — Stack House | Visibilidad en IA e Ingeniería GEO",
  description:
    "De auditoría a agent-ready: la capa de datos, la autoridad y los sistemas que hacen que la IA te lea, confíe en ti y te elija.",
}
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
      <main className="min-h-screen bg-zinc-50">
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
