import { liquidHomepageMarkdown } from "@/lib/liquid-offer"
import { translate } from "@/lib/translate"
import { NextRequest, NextResponse } from "next/server"
import { landingFaqs } from "@/lib/landing-copy"


const markdownEn = "# The Stack House — AI visibility and conversion for ecommerce\n\nWe help your online store show up when shoppers ask AI for recommendations. We work on your catalog, content and reputation, then improve your store to turn that interest into sales.\n\n## How we help your products get discovered\n\n- Complete product attributes, compatibility, use cases and purchase terms, and improve access to your pages.\n- Create and update comparisons, guides and product pages that answer purchase questions.\n- Identify relevant external sources and work to build visibility and support for your brand.\n- Track recommendations and cited sources for purchase questions using comparable settings.\n- Coordinate with your existing SEO team and keep information current.\n\n## How we improve conversion\n\nWe improve product pages, comparisons, warranties, terms, forms and calls to action. We adapt the experience to available signals and connect inquiries, scheduling and CRM to preserve context and follow up. We work with both direct purchases and assisted sales through inquiries, quotes or demos.\n\n## How we work with you\n\n1. Review your store, catalog, purchase questions and sales journey. Agree on scope, investment and measurement.\n2. Implement on your existing platform and tools. Your team provides access and validates information; we coordinate and carry out the work.\n3. Measure recommendations, visits, purchases and opportunities to decide what to improve next.\n\n## Measurement\n\nWe connect AI visibility, identifiable visits, purchases, inquiries and CRM results. We distinguish trackable sources from influence reported by the shopper, and flag attribution gaps. We do not guarantee recommendations or increased sales.\n\n## First step\n\nA free review of your store and a sample of purchase questions to identify opportunities and assess fit. Implementation scope and investment are proposed afterwards.\n\n- [Let's review your store](https://thestackhouse.io/auditoria)\n- [Blog in Spanish](https://thestackhouse.io/blog)\n- [Contact in Spanish](https://thestackhouse.io/contacto)\n"

export async function GET(request: NextRequest) {
  const locale = request.nextUrl.searchParams.get("lang") === "en" ? "en" : "es"
  const faq = landingFaqs.map(({ question, answer }) => `### ${translate(locale, question)}\n\n${translate(locale, answer)}`).join("\n\n")
  const body = locale === "en" ? markdownEn : liquidHomepageMarkdown()
  const heading = locale === "en" ? "Frequently asked questions" : "Preguntas frecuentes"
  return new NextResponse(`${body}\n## ${heading}\n\n${faq}`, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Language": locale,
      "Cache-Control": "private, no-store",
    },
  })
}
