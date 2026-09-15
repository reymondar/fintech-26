"use client"

import { useTranslation } from "@/components/locale-provider"

import { useState, useEffect } from "react"
import { m, AnimatePresence } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { HeroBuyerJourney } from "@/components/hero-buyer-journey"
import { Button } from "@/components/ui/button"

const textRevealVariants = {
  hidden: { y: "100%" },
  visible: (i: number) => ({
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
      delay: i * 0.1,
    },
  }),
}

const platforms = ["ChatGPT", "Perplexity", "Claude", "Gemini"]

export function Hero() {
  const { t, locale, localizeHref } = useTranslation()

  const [platformIndex, setPlatformIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setPlatformIndex((prev) => (prev + 1) % platforms.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-32 pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-zinc-50 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-emerald-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Eyebrow */}
        <m.div
          initial={{ opacity: 1, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-zinc-200 mb-5 sm:mb-6 shadow-sm"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 pulse-glow" />
          <span className="text-sm text-zinc-500">{t("Vende a través de la IA sin esfuerzo")}</span>
        </m.div>

        {/* H1 */}
        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-zinc-900 mb-6 leading-[1.1]"
          style={{ fontFamily: "var(--font-instrument-sans), sans-serif" }}
        >
          <span className="block overflow-hidden">
            <m.span className="block" variants={textRevealVariants} initial="hidden" animate="visible" custom={0}> {t("Tu próximo cliente está")} </m.span>
          </span>
          <span className="block overflow-hidden">
            <m.span className="block" variants={textRevealVariants} initial="hidden" animate="visible" custom={1}> {t("buscándote en")}{" "}
              <span className="inline-block relative align-bottom overflow-hidden" style={{ minWidth: "6ch" }}>
                <AnimatePresence mode="wait">
                  <m.span
                    key={platforms[platformIndex]}
                    initial={{ opacity: 1, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="inline-block text-emerald-600"
                  >
                    {platforms[platformIndex]}.
                  </m.span>
                </AnimatePresence>
              </span>
            </m.span>
          </span>
          <span className="block overflow-hidden">
            <m.span className="block" variants={textRevealVariants} initial="hidden" animate="visible" custom={2}> {t("Conviértete en la respuesta.")} </m.span>
          </span>
        </h1>

        {/* Subhead */}
        <m.h2
          initial={{ opacity: 1, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-[11.2px] sm:text-[12.6px] font-normal text-zinc-500 max-w-3xl mx-auto mb-10 leading-relaxed"
        > {t("The Stack House posiciona tu ecommerce en las respuestas de IA y optimiza tu tienda para convertir ese interés en ventas. Trabajamos tu catálogo, contenido y experiencia de compra, y medimos su impacto comercial.")} </m.h2>

        {/* CTA */}
        <m.div
          initial={{ opacity: 1, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col items-center gap-3 mb-12"
        >
          <Button
            asChild
            size="lg"
            className="shimmer-btn bg-zinc-900 text-white hover:bg-zinc-800 rounded-full px-8 h-14 text-base font-medium shadow-lg shadow-zinc-900/10"
          >
            <a href="https://calendar.app.google/aGDRM9XzkQFEndG77" target="_blank" rel="noopener noreferrer"> {t("Audita tu tienda")} <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </Button>
        </m.div>

        <p className="text-xs text-zinc-400 mb-4">{t("20 minutos · primera revisión sin costo")}</p>

        <HeroBuyerJourney />

        {/* Dashboard preview */}
        <m.div
          initial={{ opacity: 1, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="relative mx-auto max-w-4xl mt-4 -mb-16"
        >
          <p className="text-xs text-zinc-400 mb-3">{t("Seguimiento de visibilidad")}</p>
          <div className="relative rounded-t-2xl overflow-hidden">
            <img
              src="/dashboard-preview.webp"
              alt={t("Vista de la herramienta de seguimiento de visibilidad en IA")}
              className="w-full block"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(to bottom, transparent 30%, rgba(250,250,250,0.7) 55%, rgb(250,250,250) 80%)',
              }}
            />
          </div>
        </m.div>
      </div>
    </section>
  )
}
