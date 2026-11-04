"use client"

import { useTranslation } from "@/components/locale-provider"

import { m, useInView } from "framer-motion"
import { useRef } from "react"
import { Check } from "lucide-react"

const entregables = [
  {
    "bold": "Hacé crecer las categorías con más potencial",
    "desc": "identifica dónde captar demanda y dónde recuperar conversión."
  },
  {
    "bold": "Invierte en los canales que aportan valor",
    "desc": "compará adquisición, ventas y contribución para orientar el presupuesto."
  },
  {
    "bold": "Protegé el margen de cada venta",
    "desc": "detecta productos afectados por descuentos, devoluciones y costos variables."
  },
  {
    "bold": "Reconoce a tus clientes más rentables",
    "desc": "encuentra segmentos con mayor recompra y oportunidades para retenerlos."
  },
  {
    "bold": "Anticipá tus decisiones de inventario",
    "desc": "identifica riesgo de faltantes y productos de baja rotación."
  },
  {
    "bold": "Avanzá con prioridades claras",
    "desc": "sabé qué mejoras rindieron y dónde enfocar el siguiente mes."
  }
]

function ReportMockup() {
  const { t } = useTranslation()
  return (
    <div className="relative mx-auto w-full max-w-[380px] md:max-w-[480px]">
      <div className="absolute -right-2 -top-2 h-full w-full rounded-[10px] border border-zinc-200/60 bg-white" aria-hidden="true" />
      <div className="relative rounded-[10px] border border-zinc-200 bg-white p-7 shadow-sm">
        <p className="mb-2 text-[13px] uppercase tracking-[0.06em] text-zinc-400">{t("Tu reporte ejecutivo mensual")}</p>
        <p className="mb-6 text-[22px] font-medium leading-snug text-zinc-900">{t("Dónde crecer. Qué corregir. Qué sigue.")}</p>
        <div className="divide-y divide-zinc-100">
          {[
            ["Categorías prioritarias", "Demanda · ventas · conversión"],
            ["Rentabilidad", "Productos · canales · segmentos"],
            ["Próximas decisiones", "Inversión · recompra · stock"],
          ].map(([title, detail]) => <div key={title} className="py-4">
            <p className="text-sm font-medium text-emerald-700">{t(title)}</p>
            <p className="mt-1 text-[13px] text-zinc-500">{t(detail)}</p>
          </div>)}
        </div>
        <p className="mt-4 border-t border-zinc-100 pt-4 text-xs text-zinc-400">{t("Vista ilustrativa del reporte · sin datos de clientes")}</p>
      </div>
    </div>
  )
}

export function QueRecibes() {
  const { t } = useTranslation()

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="que-recibes" ref={ref} className="py-9 sm:py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <m.div
          initial={{ opacity: 1, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className="text-[1.3125rem] sm:text-4xl font-bold text-zinc-900 mb-4"
            style={{ fontFamily: "var(--font-instrument-sans)" }}
          > {t("Cada mes, una visión clara de dónde crecer y qué corregir.")} </h2>
          <p className="text-zinc-500 max-w-2xl mx-auto"> {t("Descubre qué categorías impulsan tus ventas, dónde se pierde margen y qué decisiones pueden mejorar el próximo mes.")} </p>
        </m.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Mockup */}
          <m.div
            initial={{ opacity: 1, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex justify-center"
          >
            <ReportMockup />
          </m.div>

          {/* Lista de entregables */}
          <m.div
            initial={{ opacity: 1, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ul className="flex flex-col gap-3">
              {entregables.map((item) => (
                <li key={t(item.bold)} className="flex items-start gap-3">
                  <Check
                    className="w-4 h-4 shrink-0 mt-0.5"
                    strokeWidth={2}
                    style={{ color: "#009967" }}
                  />
                  <span className="text-[15px] leading-relaxed">
                    <span className="font-medium text-zinc-900">{t(item.bold)}</span>
                    <span className="text-zinc-500"> — {t(item.desc)}</span>
                  </span>
                </li>
              ))}
            </ul>
          </m.div>
        </div>
      </div>
    </section>
  )
}
