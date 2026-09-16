import type { Metadata } from "next"
import { headers } from "next/headers"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ServiciosContent } from "@/components/servicios-content"
import { LocaleProvider } from "@/components/locale-provider"
import { type Locale } from "@/lib/locale"

const SITE = "https://thestackhouse.io"

async function resolveLocale(): Promise<Locale> {
  return (await headers()).get("x-sh-locale") === "en" ? "en" : "es"
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await resolveLocale()
  const title = locale === "en" ? "Services — The Stack House" : "Servicios — The Stack House"
  const description =
    locale === "en"
      ? "Product visibility, store personalization and sales automation for ecommerce. See what we implement and what you receive."
      : "Posicionamiento de productos, personalización y automatización comercial para ecommerce. Descubre qué implementamos y qué recibes."
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `${SITE}/servicios?lang=${locale}`, languages: { es: `${SITE}/servicios?lang=es`, en: `${SITE}/servicios?lang=en`, "x-default": `${SITE}/servicios` } },
    openGraph: { title, description, type: "website", siteName: "The Stack House", url: `${SITE}/servicios?lang=${locale}`, locale: locale === "en" ? "en_US" : "es_ES", images: [{ url: "/og-default.png", width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title, description, images: ["/og-default.png"] },
  }
}

export default async function ServiciosPage() {
  const locale = await resolveLocale()
  return (
    <LocaleProvider locale={locale}>
      <Navbar />
      <ServiciosContent />
      <Footer />
    </LocaleProvider>
  )
}
