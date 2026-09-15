"use client"

import { useTranslation } from "@/components/locale-provider"

import { m, useInView } from "framer-motion"
import { useRef } from "react"
import { Search } from "lucide-react"

const queries = [
  "¿Qué cafetera profesional me conviene para abrir una cafetería?",
  "¿Dónde comprar equipamiento de gimnasio con instalación y garantía?",
  "¿Qué diferencia hay entre estos dos equipos de depilación láser?",
  "¿Qué proveedor de herramientas industriales tiene servicio técnico?",
  "¿Qué portátil elegir para editar vídeo sin gastar de más?",
  "¿Dónde comprar una silla ergonómica con envío a mi ciudad?",
  "¿Qué cámara me recomiendas para fotografiar productos?",
  "¿Qué tienda ofrece repuestos compatibles con esta máquina?"
]

function QueryTile({ text }: { text: string }) {
  const { t, locale, localizeHref } = useTranslation()

  return (
    <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-5 py-4 shadow-sm">
      <Search className="h-4 w-4 text-zinc-400 shrink-0" strokeWidth={1.5} />
      <span className="text-sm text-zinc-700 whitespace-nowrap">{t("“")}{t(text)}{t("”")}</span>
    </div>
  )
}

function Marquee({ items }: { items: string[] }) {
  const { t, locale, localizeHref } = useTranslation()

  return (
    <div className="flex overflow-hidden">
      <div className="flex shrink-0 gap-5 pr-5 animate-marquee">
        {items.map((item) => (
          <QueryTile key={item} text={item} />
        ))}
      </div>
      <div className="flex shrink-0 gap-5 pr-5 animate-marquee" aria-hidden="true">
        {items.map((item) => (
          <QueryTile key={item} text={item} />
        ))}
      </div>
    </div>
  )
}

export function Integrations() {
  const { t, locale, localizeHref } = useTranslation()

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="overflow-hidden py-8 sm:py-10 px-4">
      <div className="mx-auto max-w-3xl text-center mb-16">
        <m.h2
          initial={{ opacity: 1, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl sm:text-4xl font-bold tracking-tight mb-6"
          style={{ fontFamily: "var(--font-instrument-sans)" }}
        >
          <span className="block text-zinc-900">{t("~29.000 preguntas cada segundo.")}</span>
          <span className="block text-zinc-400">{t("La única pregunta es si tú estás en ellas.")}</span>
        </m.h2>
      </div>

      <m.div
        initial={{ opacity: 1 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative"
      >
        <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-24 bg-gradient-to-r from-zinc-50 to-transparent sm:w-40" />
        <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-24 bg-gradient-to-l from-zinc-50 to-transparent sm:w-40" />

        <Marquee items={queries} />
      </m.div>

      <m.p
        initial={{ opacity: 1, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="text-center text-lg text-zinc-500 mt-12 max-w-2xl mx-auto leading-relaxed"
      > {t("Entra en la conversación. Deja que tus clientes te encuentren.")} </m.p>
    </section>
  )
}
