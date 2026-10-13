"use client"

import { useTranslation } from "@/components/locale-provider"

import { Hourglass, Zap } from "lucide-react"

const comparisonRows = [
  { category: ["AEO / SEO", "AEO / SEO"], problem: ["Buscan lo que vendés, pero no te encuentran.", "Shoppers search for what you sell, but don’t find you."], outcome: ["Optimizamos tu catálogo y contenido para buscadores e IA.", "Optimize your catalog and content for search engines and AI."] },
  { category: ["Datos", "Data"], problem: ["Datos dispersos. No sabés dónde invertir.", "Scattered data. Unclear where to invest."], outcome: ["Conectamos tienda y marketing para priorizar tu inversión.", "Connect store and marketing data to prioritize your investment."] },
  { category: ["Personalización", "Personalization"], problem: ["Cada cliente ve las mismas ofertas.", "Every shopper sees the same offers."], outcome: ["Adaptamos campañas y recomendaciones a cada segmento.", "Tailor in-store campaigns and recommendations to each segment."] },
  { category: ["Testing", "Testing"], problem: ["Cambiás la tienda sin saber qué funciona.", "Store changes rely on guesswork."], outcome: ["Testeamos experiencias y medimos qué genera más compras.", "Test shopping experiences and measure what drives more purchases."] },
]



export function Honesty() {
  const { t, locale } = useTranslation()


  return (
    <section id="honesty" className="py-9 sm:py-8 px-4 overflow-x-clip">
      <div className="max-w-[1440px] mx-auto">
        {/* Comparison panels */}
        <div id="comparison" className="relative max-w-5xl mx-auto scroll-mt-28">
          <div role="table" aria-label={locale === "en" ? "Ecommerce challenges and our services" : "Desafíos de ecommerce y nuestros servicios"} className="overflow-hidden rounded-2xl border border-zinc-200 bg-white sm:rounded-[2rem]">
            <div role="row" className="grid grid-cols-2 border-b border-zinc-200">
              <h3 role="columnheader" className="flex items-center gap-2 bg-zinc-50 px-4 py-4 text-xs font-semibold text-zinc-500 sm:px-7 sm:text-lg"><Hourglass className="hidden h-5 w-5 shrink-0 sm:block" aria-hidden="true"/>{locale === "en" ? "What holds you back" : "Qué frena tu crecimiento"}</h3>
              <h3 role="columnheader" className="flex items-center gap-2 border-l border-emerald-100 bg-emerald-50 px-4 py-4 text-xs font-semibold text-emerald-700 sm:px-7 sm:text-lg"><Zap className="hidden h-5 w-5 shrink-0 sm:block" aria-hidden="true"/>{t("Qué hacemos")}</h3>
            </div>
            {comparisonRows.map(row => {
              const language = locale === "en" ? 1 : 0
              return <div role="row" key={row.category[0]} className="grid grid-cols-2 border-b border-zinc-100 last:border-b-0">
                <div role="cell" className="px-4 py-4 sm:px-7 sm:py-6">
                  <p className="mb-2 text-[9px] font-semibold uppercase tracking-wider text-zinc-400 sm:text-[10px]">{row.category[language]}</p>
                  <p className="text-xs leading-relaxed text-zinc-500 sm:text-sm">{row.problem[language]}</p>
                </div>
                <div role="cell" className="border-l border-emerald-100 bg-emerald-50/40 px-4 py-4 sm:px-7 sm:py-6">
                  <p className="mb-2 text-[9px] font-semibold uppercase tracking-wider text-emerald-600 sm:text-[10px]">{row.category[language]}</p>
                  <p className="text-xs font-medium leading-relaxed text-zinc-800 sm:text-sm">{row.outcome[language]}</p>
                </div>
              </div>
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
