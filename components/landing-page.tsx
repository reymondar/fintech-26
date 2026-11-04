import { LiquidConcept } from "@/components/liquid-concept"
import type { Locale } from "@/lib/locale"
import { translate } from "@/lib/translate"
import { LocaleProvider } from "@/components/locale-provider"
import { landingFaqs } from "@/lib/landing-copy"

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }} />
      <LiquidConcept />
    </LocaleProvider>
  )
}
