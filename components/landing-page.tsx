import type { Locale } from "@/lib/locale"
import { translate } from "@/lib/translate"
import { LocaleProvider } from "@/components/locale-provider"
import { landingFaqs } from "@/lib/landing-copy"
import { SmoothScroll } from "@/components/smooth-scroll"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Integrations } from "@/components/integrations"
import { TrustedAtScale } from "@/components/trusted-at-scale"
import { Personalization } from "@/components/personalization"
import { Honesty } from "@/components/honesty"
import { FAQ } from "@/components/faq"
import { QueRecibes } from "@/components/que-recibes"
import { FinalCTA } from "@/components/final-cta"
import { Footer } from "@/components/footer"

export function LandingPage({ locale }: { locale: Locale }) {
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: landingFaqs.map(({ question, answer }) => ({
    "@type": "Question",
    name: translate(locale, question),
    acceptedAnswer: { "@type": "Answer", text: translate(locale, answer) },
  })),
}


  return (
    <LocaleProvider locale={locale}>
    <SmoothScroll>
      <main className="min-h-screen bg-zinc-50">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <Navbar />
        <Hero />
        <Integrations />
        <TrustedAtScale />
        <Personalization />
        <Honesty />
        <QueRecibes />
        <FAQ />
        <FinalCTA />
        <Footer />
      </main>
    </SmoothScroll>
    </LocaleProvider>
  )
}
