"use client"

import { AILayerFunnel } from "@/components/ai-layer-funnel"
import { useTranslation } from "@/components/locale-provider"
import { m, useInView, useReducedMotion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

const steps = [
  {
    "number": "01",
    "title": "Analizamos tu tienda con agentes de IA",
    "description": "Evaluamos cómo la IA interpreta tu catálogo y responde a las preguntas de tus compradores."
  },
  {
    "number": "02",
    "title": "Construimos tu motor de captación",
    "description": "Anticipa lo que busca cada comprador y adapta la experiencia para convertir su interés en ventas."
  },
  {
    "number": "03",
    "title": "Personalizamos experiencias y te posicionamos",
    "description": "Adaptamos tu tienda a cada comprador y trabajamos tu presencia en las recomendaciones de IA."
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
    <section id="how-it-works" ref={ref} className="px-4 py-10 sm:py-14 scroll-mt-28">
      <div id="features" className="mx-auto max-w-6xl">
        <header className="mx-auto mb-12 max-w-4xl text-center lg:mb-16">
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-emerald-600">{t("Cómo funciona")}</p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl" style={{ fontFamily: "var(--font-instrument-sans)" }}>{t("Un motor de captación que trabaja alrededor de tu infraestructura")}</h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-500">{t("Tu tienda y tus herramientas. Nosotros nos encargamos de hacerlo funcionar.")}</p>
        </header>
        <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.2fr] lg:gap-12"
          onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
          onFocusCapture={() => setFocused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false) }}>
          <div>
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
            <figcaption className="mt-4 flex items-center justify-between gap-3 text-xs text-zinc-400">
              <span>{locale === "es" ? "Ilustración del proceso" : "Process illustration"} · {steps[active].number} / 03</span>
              {!reducedMotion && <button type="button" onClick={() => setPaused(value => !value)} className="rounded-full border border-zinc-200 px-3 py-2 text-zinc-500 hover:text-zinc-900">{locale === "es" ? (paused ? "Reanudar" : "Pausar") : (paused ? "Resume" : "Pause")}</button>}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
