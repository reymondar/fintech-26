import type { Metadata } from "next"
import { headers, cookies } from "next/headers"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ServiciosContent } from "@/components/servicios-content"
import { LocaleProvider } from "@/components/locale-provider"
import { detectLocale, LOCALE_COOKIE, type Locale } from "@/lib/locale"

const SITE = "https://thestackhouse.io"

async function resolveLocale(): Promise<Locale> {
  const h = await headers()
  const c = await cookies()
  return detectLocale(h.get("x-vercel-ip-country"), c.get(LOCALE_COOKIE)?.value, h.get("accept-language") ?? "")
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await resolveLocale()
  const title = locale === "en" ? "Services — The Stack House" : "Servicios — The Stack House"
  const description =
    locale === "en"
      ? "A data layer over your store plus AI to turn AI recommendations into direct sales — from diagnosis to conversion, measurement and growth."
      : "Una capa de datos sobre tu tienda y la IA para convertir las recomendaciones en ventas directas — del diagnóstico a la conversión, la medición y el crecimiento."
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `${SITE}/servicios` },
    openGraph: { title, description, type: "website", siteName: "The Stack House", url: `${SITE}/servicios`, images: [{ url: "/og-default.png", width: 1200, height: 630 }] },
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
