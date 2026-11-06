import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { LandingPage } from "@/components/landing-page"
import { isLocale } from "@/lib/locale"

const SITE = "https://thestackhouse.io"
type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const title = locale === "en" ? "B2B Ecommerce, GEO & CRO | The Stack House" : "Ecommerce B2B, GEO y CRO | The Stack House"
  const description = locale === "en"
    ? "SEO/GEO, CRO and analytics for B2B ecommerce with large catalogs. We optimize categories, product data, orders and quote requests."
    : "SEO/GEO, CRO y analítica para ecommerce B2B con catálogos grandes. Optimizamos categorías, datos de producto, pedidos y cotizaciones."
  return {
    title: { absolute: title }, description,
    alternates: { canonical: `${SITE}/${locale}`, languages: { es: `${SITE}/es`, en: `${SITE}/en`, "x-default": SITE } },
    openGraph: { title, description, type: "website", siteName: "The Stack House", url: `${SITE}/${locale}`, locale: locale === "en" ? "en_US" : "es_ES", alternateLocale: locale === "en" ? "es_ES" : "en_US", images: [{ url: "/branding/social-card.png", width: 1200, height: 630, alt: "The Stack House" }] },
    twitter: { card: "summary_large_image", title, description, images: ["/branding/social-card.png"] },
  }
}

export default async function LocalizedLanding({ params }: Props) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  return <LandingPage locale={locale} />
}
