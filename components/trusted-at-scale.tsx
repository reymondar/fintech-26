"use client"

import { AILayerFunnel } from "@/components/ai-layer-funnel"
import { useTranslation } from "@/components/locale-provider"
import { m, useInView, useReducedMotion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

const steps = [
  {
    "number": "01",
    "title": "Atrae más compradores a tus categorías más rentables.",
    "description": "Desde las fichas y páginas de categoría hasta las reseñas y la reputación de tus productos, fortalecemos tu presencia en Google y asistentes de IA para captar demanda con intención de compra."
  },
  {
    "number": "02",
    "title": "Convierte tu tráfico en oportunidades reales de venta.",
    "description": "El comportamiento de tus usuarios revela dónde se frena la compra. Usamos esas señales para probar mejoras en navegación, merchandising y personalización que aumenten la conversión."
  },
  {
    "number": "03",
    "title": "Descubre dónde aumentar tus márgenes con los datos de tu propio negocio.",
    "description": "Conectamos adquisición, pedidos y costos para entender qué productos, canales y segmentos de clientes aportan más margen. Así puedes decidir dónde invertir, qué promociones sostener y qué pérdidas corregir."
  }
]

const duration = 9000

export function TrustedAtScale() {
  const { t, locale } = useTranslation()
  const ref = useRef<HTMLElement>(null)
  const visible = useInView(ref, { amount: 0.25 })
  const reducedMotion = useReducedMotion()
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [pageVisible, setPageVisible] = useState(true)
  const running = visible && !reducedMotion && !paused && !hovered && !focused && pageVisible
  useEffect(() => {
    const update = () => setPageVisible(!document.hidden)
    update()
    document.addEventListener("visibilitychange", update)
    return () => document.removeEventListener("visibilitychange", update)
  }, [])
  useEffect(() => {
    if (!running) return
    const timer = window.setTimeout(() => setActive(index => (index + 1) % steps.length), duration)
    return () => window.clearTimeout(timer)
  }, [active, running])

  return (
    <section id="how-it-works" ref={ref} className="py-9 sm:py-8 px-4 scroll-mt-28">
      <div id="features" className="mx-auto max-w-6xl">
        <header className="mx-auto mb-12 max-w-4xl text-center lg:mb-16">
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-emerald-600">{t("Cómo funciona")}</p>
          <h2 className="text-balance text-[1.3125rem] font-bold tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl" style={{ fontFamily: "var(--font-instrument-sans)" }}>{t("Construimos el motor de captación que trabaja alrededor de tu infraestructura.")}</h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-500">{t("Tu tienda, tu catálogo y tus herramientas. Un mismo objetivo: captar demanda para tus categorías prioritarias, convertirla en ventas y conocer su contribución al negocio.")}</p>
        </header>
        <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.2fr] lg:gap-12"
          onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
          onFocusCapture={() => setFocused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false) }}>
          <div className="hidden lg:block">
            {steps.map((step, index) => (
              <div key={step.number} className="relative border-t border-zinc-200 last:border-b">
                <h3>
                  <button type="button" id={`process-step-${index}`} aria-expanded={active === index} aria-controls={`process-description-${index}`}
                    onClick={() => setActive(index)} className="flex w-full items-start gap-4 py-6 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-600">
                    <span className={`pt-1 font-mono text-sm ${active === index ? "text-emerald-600" : "text-zinc-400"}`}>{step.number}</span>
                    <span className={`text-lg font-semibold leading-snug sm:text-xl ${active === index ? "text-zinc-900" : "text-zinc-400"}`}>{t(step.title)}</span>
                  </button>
                </h3>
                <div id={`process-description-${index}`} hidden={active !== index} className="pb-7 pl-9 text-sm leading-relaxed text-zinc-500">{t(step.description)}</div>
                {active === index && <m.div key={`${active}-${running}`} className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-emerald-500" initial={{ scaleX: running ? 0 : 1 }} animate={{ scaleX: 1 }} transition={{ duration: running ? duration / 1000 : 0, ease: "linear" }} />}
              </div>
            ))}
          </div>
          <figure className="min-w-0">
            <AILayerFunnel active={active} running={running} locale={locale} />

          </figure>
        </div>
      </div>
    </section>
  )
}
