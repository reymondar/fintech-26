import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { LandingPage } from "@/components/landing-page"
import { isLocale } from "@/lib/locale"

const SITE = "https://thestackhouse.io"
type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const title = locale === "en" ? "AEO/SEO, Data & Ecommerce | The Stack House" : "AEO/SEO, datos y ecommerce | The Stack House"
  const description = locale === "en"
    ? "AEO/SEO, data analysis and ecommerce personalization. We connect your data, improve your visibility and test your store to turn more visits into sales."
    : "AEO/SEO, análisis de datos y personalización para ecommerce. Conectamos tus datos, mejoramos tu visibilidad y testeamos tu tienda para convertir más."
  return {
    title: { absolute: title }, description,
    alternates: { canonical: `${SITE}/${locale}`, languages: { es: `${SITE}/es`, en: `${SITE}/en`, "x-default": SITE } },
    openGraph: { title, description, type: "website", siteName: "The Stack House", url: `${SITE}/${locale}`, locale: locale === "en" ? "en_US" : "es_ES", alternateLocale: locale === "en" ? "es_ES" : "en_US", images: [{ url: "/og-default.png", width: 1200, height: 630, alt: "The Stack House" }] },
    twitter: { card: "summary_large_image", title, description, images: ["/og-default.png"] },
  }
}

export default async function LocalizedLanding({ params }: Props) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  return <LandingPage locale={locale} />
}
