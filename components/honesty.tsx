"use client"

import { FeatureStack } from "@/components/feature-stack"
import { useTranslation } from "@/components/locale-provider"

import { m, useInView } from "framer-motion"
import { useRef } from "react"
import { Hourglass, Zap } from "lucide-react"

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
}

const comparisonRows = [
  {
    "category": "Producto",
    "mayoria": "El comprador llega y sigue sin saber qué modelo necesita.",
    "nosotros": "Aclaramos usos, diferencias y compatibilidades en las páginas donde decide."
  },
  {
    "category": "Confianza",
    "mayoria": "Tiene que buscar garantías, entregas o soporte antes de avanzar.",
    "nosotros": "Acercamos las condiciones y la evidencia comercial a la decisión de compra."
  },
  {
    "category": "Experiencia",
    "mayoria": "Ve el mismo mensaje aunque esté comparando productos distintos.",
    "nosotros": "Adaptamos mensajes y productos al comprador."
  },
  {
    "category": "Contacto",
    "mayoria": "Pide información y el contexto se pierde entre formularios y vendedores.",
    "nosotros": "Conectamos cada consulta con tu equipo de ventas."
  },
  {
    "category": "Mejora",
    "mayoria": "Se hacen cambios en la tienda sin comprobar qué pasa con las ventas.",
    "nosotros": "Probamos mejoras y medimos su impacto en ventas."
  }
]


export function Honesty() {
  const { t, locale, localizeHref } = useTranslation()

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="honesty" ref={ref} className="py-8 sm:py-10 px-4 overflow-x-clip">
      <div className="max-w-[1440px] mx-auto">
        {/* 1. Hero */}
        <m.div
          initial={{ opacity: 1, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2
            className="text-3xl sm:text-4xl font-bold text-zinc-900 mb-5"
            style={{ fontFamily: "var(--font-instrument-sans)" }}
          >
            <span className="block">{t("La recomendación abre la puerta.")}</span>
            <span className="block text-zinc-400">{t("Tu tienda tiene que cerrar la compra.")}</span>
          </h2>
          <p className="text-zinc-500 max-w-2xl mx-auto leading-relaxed"> {t("Cuidamos cada paso, desde el primer interés hasta la compra.")} </p>
        </m.div>

        <FeatureStack />

        {/* Comparison panels */}
        <div id="comparison" className="relative max-w-5xl mx-auto mb-6 scroll-mt-28">
          <div className="relative mb-8 hidden grid-cols-2 items-center rounded-full border border-zinc-200 bg-zinc-100/80 px-6 py-4 md:grid">
            <h3 className="flex items-center gap-3 text-lg font-semibold text-zinc-500"><Hourglass className="h-5 w-5" aria-hidden="true" />{t("Dónde se frena la compra")}</h3>
            <h3 className="flex items-center justify-end gap-3 text-lg font-semibold text-zinc-900"><Zap className="h-5 w-5 text-emerald-600" aria-hidden="true" />{t("Qué hacemos")}</h3>
            <span aria-hidden="true" className="absolute left-1/2 top-1/2 z-10 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-200 bg-white text-2xl font-bold tracking-tight text-zinc-900 shadow-sm">VS</span>
          </div>
          <div className="relative grid gap-6 md:grid-cols-2 md:gap-16">
            <div aria-hidden="true" className="absolute bottom-0 left-1/2 top-0 hidden w-px bg-gradient-to-b from-zinc-300 to-transparent md:block" />
            {(["mayoria", "nosotros"] as const).map(side => {
              const improved = side === "nosotros"
              return (
                <div key={side} className={`rounded-[2rem] border p-6 sm:p-8 ${improved ? "border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-white shadow-[0_8px_40px_-24px_rgba(16,185,129,0.3)]" : "border-zinc-200 bg-gradient-to-bl from-zinc-100 via-white to-white shadow-sm"}`}>
                  <h3 className={`mb-6 flex items-center gap-2 text-lg font-semibold md:hidden ${improved ? "text-emerald-700" : "text-zinc-500"}`}>
                    {improved ? <Zap className="h-5 w-5" aria-hidden="true" /> : <Hourglass className="h-5 w-5" aria-hidden="true" />}
                    {t(improved ? "Qué hacemos" : "Dónde se frena la compra")}
                  </h3>
                  <ul className="space-y-6">
                    {comparisonRows.map(row => (
                      <li key={row.category} className="flex items-start gap-3 md:min-h-24 lg:min-h-20">
                        <span aria-hidden="true" className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${improved ? "bg-emerald-500" : "bg-zinc-300"}`} />
                        <div>
                          <p className={`mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] ${improved ? "text-emerald-600" : "text-zinc-400"}`}>{t(row.category)}</p>
                          <p className={`text-sm leading-relaxed ${improved ? "font-medium text-zinc-800" : "text-zinc-500"}`}>{t(row[side])}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
