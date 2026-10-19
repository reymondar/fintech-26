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
      ? "AEO/SEO, data analysis and segmented ecommerce personalization. Discover how we analyze, improve and test your store."
      : "AEO/SEO, análisis de datos y personalización segmentada para ecommerce. Descubre cómo analizamos, mejoramos y testeamos tu tienda."
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
      <section aria-label={locale === "en" ? "Explore CRO" : "Explora el servicio CRO"} className="border-t border-zinc-200 bg-zinc-50 px-5 py-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-medium tracking-tight text-zinc-900">{locale === "en" ? "CRO and ecommerce personalization" : "CRO y personalización de ecommerce"}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-zinc-600">{locale === "en" ? "See how we analyze, implement and measure improvements to the shopping journey." : "Conoce cómo analizamos, implementamos y medimos las mejoras del recorrido de compra."}</p>
          </div>
          <a href="/servicios/cro" className="shrink-0 text-sm font-medium text-emerald-800 underline underline-offset-4">{locale === "en" ? "Explore the process (ES) →" : "Ver el proceso CRO →"}</a>
        </div>
      </section>
      <Footer />
    </LocaleProvider>
  )
}
