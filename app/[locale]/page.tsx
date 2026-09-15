import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { LandingPage } from "@/components/landing-page"
import { isLocale } from "@/lib/locale"

const SITE = "https://thestackhouse.io"
type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const title = locale === "en" ? "AI visibility for ecommerce | The Stack House" : "Visibilidad en IA para ecommerce | The Stack House"
  const description = locale === "en"
    ? "Get your store discovered in AI recommendations and turn interest into sales. Catalog, content, authority, conversion and sales tracking."
    : "Ayudamos a tu ecommerce a aparecer en recomendaciones de IA y convertir ese interés en ventas. Catálogo, contenido, autoridad y conversión."
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
