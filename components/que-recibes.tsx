"use client"

import { useTranslation } from "@/components/locale-provider"

import { m, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Check } from "lucide-react"

const entregables = [
  {
    "bold": "Presencia en preguntas de compra",
    "desc": "tu marca, tus competidores y los motores que te recomiendan"
  },
  {
    "bold": "Visitas que podemos identificar",
    "desc": "qué asistentes envían tráfico y a qué páginas llega"
  },
  {
    "bold": "Compras y contactos",
    "desc": "dónde convierten y dónde abandonan"
  },
  {
    "bold": "Oportunidades y ventas",
    "desc": "del primer contacto al cierre en tu CRM"
  },
  {
    "bold": "Influencia declarada por el comprador",
    "desc": "cómo dice el cliente que te encontró"
  },
  {
    "bold": "Decisiones para el siguiente mes",
    "desc": "qué mantener, mejorar o probar"
  }
]

const bars = [
  {
    "label": "Visitas",
    "width": 100,
    "highlight": false
  },
  {
    "label": "Consultas",
    "width": 100,
    "highlight": false
  },
  {
    "label": "Ventas",
    "width": 100,
    "highlight": true
  }
]

function ReportMockup() {
  const { t, locale, localizeHref } = useTranslation()

  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    if (isInView) setAnimate(true)
  }, [isInView])

  return (
    <div ref={ref} className="relative mx-auto max-w-[380px] md:max-w-[480px]">
      {/* Back page */}
      <div
        className="absolute top-[-8px] right-[-8px] w-full h-full rounded-[10px] bg-white border border-zinc-200/60"
        aria-hidden="true"
      />
      {/* Front page */}
      <div
        className="relative rounded-[10px] bg-white border border-zinc-200 p-7 shadow-sm"
        aria-label={t("Ejemplo del recorrido que medimos: visitas, consultas y ventas. Sin cifras de resultados.")}
        role="img"
      >
        <p className="text-[13px] uppercase tracking-[0.06em] text-zinc-400 mb-1.5"> {t("Seguimiento de tu ecommerce")} </p>
        <p className="text-[17px] font-medium text-zinc-900 mb-6"> {t("De la recomendación a la venta")} </p>

        <p className="text-[14px] text-zinc-400 mb-1.5">{t("Un recorrido conectado")}</p>
        <p className="mb-6">
          <span className="text-[42px] font-medium" style={{ color: "#009967" }}>{t("IA → tienda")}</span>
          <span className="text-[20px] text-zinc-400"> {t("→ venta")}</span>
        </p>

        <div className="flex flex-col gap-3.5 mb-6">
          {bars.map((bar, i) => (
            <div key={t(bar.label)} className="flex items-center gap-4">
              <span className={`text-[13px] w-[100px] shrink-0 ${bar.highlight ? "font-medium text-zinc-900" : "text-zinc-500"}`}>
                {t(bar.label)}
              </span>
              <div className="flex-1 h-3 bg-zinc-100 rounded">
                <div
                  className="h-3 rounded transition-all duration-1000 ease-out"
                  style={{
                    width: animate ? `${bar.width}%` : "0%",
                    backgroundColor: bar.highlight ? "#009967" : "#d4d4d8",
                    transitionDelay: `${i * 150}ms`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-zinc-100 pt-4">
          <p className="text-[13px] text-zinc-400"> {t("Esquema ilustrativo · cada etapa se mide por separado")} </p>
        </div>
      </div>

      {/* Fallback: barras a su ancho final sin JS */}
      <noscript>
        <style>{`
          [data-bar] { width: var(--bar-w) !important; }
        `}</style>
      </noscript>
    </div>
  )
}

export function QueRecibes() {
  const { t, locale, localizeHref } = useTranslation()

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="que-recibes" ref={ref} className="py-8 sm:py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <m.div
          initial={{ opacity: 1, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className="text-3xl sm:text-4xl font-bold text-zinc-900 mb-4"
            style={{ fontFamily: "var(--font-instrument-sans)" }}
          > {t("¿Está generando negocio? Vamos a medirlo.")} </h2>
          <p className="text-zinc-500 max-w-2xl mx-auto"> {t("Medimos qué visitas, oportunidades y ventas llegan desde la IA.")} </p>
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
