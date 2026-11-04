"use client"

import { useTranslation } from "@/components/locale-provider"

import { Hourglass, Zap } from "lucide-react"

const comparisonRows = [
  {
    "category": [
      "Captación · SEO / GEO",
      "Acquisition · SEO / GEO"
    ],
    "problem": [
      "Tus categorías más rentables no captan suficiente demanda orgánica.",
      "Your high-value categories are not capturing enough organic demand."
    ],
    "outcome": [
      "Más visibilidad en búsquedas con intención de compra, desde páginas de categoría y fichas hasta reseñas y reputación de producto.",
      "Greater visibility in searches with purchase intent, from category and product pages to reviews and product reputation."
    ]
  },
  {
    "category": [
      "Conversión",
      "Conversion"
    ],
    "problem": [
      "El tráfico se mantiene, pero cae la tasa de conversión.",
      "Traffic holds steady, but conversion rates are falling."
    ],
    "outcome": [
      "Menos fricción en navegación y checkout, con merchandising y recomendaciones relevantes para cada segmento.",
      "Less friction in navigation and checkout, with relevant merchandising and recommendations for each segment."
    ]
  },
  {
    "category": [
      "Rentabilidad",
      "Profitability"
    ],
    "problem": [
      "La facturación no te muestra qué productos pierden dinero y cuáles dejaron de crecer.",
      "Revenue does not show you which products are losing money and which have stopped growing."
    ],
    "outcome": [
      "Concentra tu inversión en los productos y clientes que hacen crecer tu margen.",
      "Focus your investment on the products and customers that grow your margin."
    ]
  },
  {
    "category": [
      "Inversión publicitaria",
      "Advertising investment"
    ],
    "problem": [
      "Meta y Google reportan ventas, pero no tienes claro cuánto es incremental.",
      "Meta and Google report sales, but you do not know how much is incremental."
    ],
    "outcome": [
      "Escalá la inversión que trae ventas nuevas.",
      "Scale the investment that brings in new sales."
    ]
  },
  {
    "category": [
      "Inventario",
      "Inventory"
    ],
    "problem": [
      "Quiebres de inventario en productos de alta demanda y capital inmovilizado en baja rotación.",
      "Stockouts on high-demand products and cash tied up in slow-moving inventory."
    ],
    "outcome": [
      "Sostené la demanda sin inmovilizar capital en stock que no rota.",
      "Meet demand without tying up cash in slow-moving stock."
    ]
  },
  {
    "category": [
      "Devoluciones",
      "Returns"
    ],
    "problem": [
      "Las devoluciones y sus costos asociados erosionan tu margen.",
      "Returns and their associated costs erode your margin."
    ],
    "outcome": [
      "Visibilidad sobre referencias y motivos de devolución para corregir compatibilidad, información y expectativas de compra.",
      "Visibility into returned SKUs and return reasons to address compatibility, product information and purchase expectations."
    ]
  }
]



export function Honesty() {
  const { locale } = useTranslation()


  return (
    <section id="honesty" className="py-9 sm:py-8 px-4 overflow-x-clip">
      <div className="max-w-[1440px] mx-auto">
        {/* Comparison panels */}
        <div id="comparison" className="relative max-w-5xl mx-auto scroll-mt-28">
          <div role="table" aria-label={locale === "en" ? "Ecommerce challenges and business outcomes" : "Desafíos de ecommerce y resultados para tu negocio"} className="overflow-hidden rounded-2xl border border-zinc-200 bg-white sm:rounded-[2rem]">
            <div role="row" className="grid grid-cols-2 border-b border-zinc-200">
              <div role="columnheader" className="flex items-center gap-2 bg-zinc-50 px-4 py-4 text-xs font-semibold text-zinc-500 sm:px-7 sm:text-lg"><Hourglass className="hidden h-5 w-5 shrink-0 sm:block" aria-hidden="true"/>{locale === "en" ? "What holds you back" : "Qué frena tu crecimiento"}</div>
              <div role="columnheader" className="flex items-center gap-2 border-l border-emerald-100 bg-emerald-50 px-4 py-4 text-xs font-semibold text-emerald-700 sm:px-7 sm:text-lg"><Zap className="hidden h-5 w-5 shrink-0 sm:block" aria-hidden="true"/>{locale === "en" ? "Where things start to change" : "Dónde empieza a cambiar"}</div>
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
