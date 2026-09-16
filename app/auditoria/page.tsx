import type { Metadata } from "next"
import { headers } from "next/headers"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AuditFlow } from "@/components/audit-flow"
import { LocaleProvider } from "@/components/locale-provider"
import { type Locale } from "@/lib/locale"
import { translate } from "@/lib/translate"

const SITE = "https://thestackhouse.io"

async function resolveLocale(): Promise<Locale> {
  return (await headers()).get("x-sh-locale") === "en" ? "en" : "es"
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await resolveLocale()
  const title = locale === "en" ? "Audit your store — The Stack House" : "Audita tu tienda — The Stack House"
  const description =
    locale === "en"
      ? "Tell us about your store and book a free review: what AI answers in your category, who it recommends, and where you stand."
      : "Cuéntanos sobre tu tienda y reserva una revisión gratis: qué responde la IA en tu categoría, a quién recomienda y dónde estás tú."
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `${SITE}/auditoria?lang=${locale}`, languages: { es: `${SITE}/auditoria?lang=es`, en: `${SITE}/auditoria?lang=en`, "x-default": `${SITE}/auditoria` } },
    openGraph: { title, description, type: "website", siteName: "The Stack House", url: `${SITE}/auditoria?lang=${locale}`, locale: locale === "en" ? "en_US" : "es_ES", images: [{ url: "/og-default.png", width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title, description, images: ["/og-default.png"] },
  }
}

export default async function AuditoriaPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams
  const preview = process.env.NODE_ENV === "development" && query.preview === "1"
  const locale = await resolveLocale()
  const t = (s: string) => translate(locale, s)

  return (
    <LocaleProvider locale={locale}>
      <div className="min-h-screen bg-zinc-50">
        <Navbar />
        <main className="pt-32 pb-24 px-4">
          <div className="max-w-xl mx-auto text-center mb-8">
            <p className="text-xs font-medium tracking-widest text-zinc-400 uppercase mb-3">{t("The Stack House")}</p>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-zinc-900 tracking-tight mb-4">
              {t("Audita tu tienda.")}
            </h1>
            <p className="text-[15px] leading-relaxed text-zinc-500">
              {t("Cuéntanos sobre tu tienda y elige cuándo revisarla juntos.")}
            </p>
            <p className="mt-4 text-sm text-zinc-400">{t("Sin costo · sin compromiso")}</p>
          </div>

          <div className="max-w-xl mx-auto rounded-3xl border border-zinc-200 bg-white/60 p-6 sm:p-8 shadow-sm">
            <AuditFlow preview={preview} />
          </div>
        </main>
        <Footer />
      </div>
    </LocaleProvider>
  )
}
