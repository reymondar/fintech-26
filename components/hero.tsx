"use client"

import { useTranslation } from "@/components/locale-provider"

import { useState, useEffect } from "react"
import { m, AnimatePresence } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { IndustryMetrics } from "@/components/industry-metrics"
import { LatamGlobe } from "@/components/latam-globe"
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
  const { t, localizeHref, locale } = useTranslation()

  const [platformIndex, setPlatformIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setPlatformIndex((prev) => (prev + 1) % platforms.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="pb-6 sm:pb-8 relative min-h-screen flex flex-col items-center justify-center px-4 pt-40 sm:px-6 lg:pt-48 overflow-hidden">
      <div className="absolute inset-0 bg-zinc-50 pointer-events-none" />
      <LatamGlobe />
      <div className="absolute inset-0 hidden sm:block pointer-events-none bg-[linear-gradient(90deg,#fafafa_0%,rgba(250,250,250,.92)_28%,rgba(250,250,250,0)_64%)]" />

      <div className="relative z-10 w-full max-w-6xl mx-auto text-center lg:text-left">
        {/* H1 */}
        <h1
          className="text-[clamp(1.35rem,6.3vw,1.625rem)] sm:text-4xl lg:text-5xl font-normal tracking-tight text-zinc-900 mb-8 lg:mb-10 leading-[1.18] lg:max-w-[720px]"
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
            <m.span className="block" variants={textRevealVariants} initial="hidden" animate="visible" custom={2}> {t("Te convertimos en la respuesta.")} </m.span>
          </span>
        </h1>

        {/* Subhead */}
        <m.h2
          initial={{ opacity: 1, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-xs sm:text-sm font-medium text-zinc-700 max-w-3xl mx-auto mb-12 lg:mb-14 leading-relaxed lg:mx-0 lg:max-w-xl"
        > {t("The Stack House posiciona tu ecommerce en las respuestas de IA y optimiza tu tienda para convertir ese interés en ventas. Trabajamos tu catálogo, contenido y experiencia de compra, y medimos su impacto comercial.")} </m.h2>

        {/* CTA */}
        <m.div
          initial={{ opacity: 1, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col items-center lg:items-start gap-3"
        >
          <Button
            asChild
            size="lg"
            className="shimmer-btn bg-zinc-900 text-white hover:bg-zinc-800 rounded-full px-8 h-14 text-base font-medium shadow-lg shadow-zinc-900/10"
          >
            <a href={localizeHref("/auditoria")}> {locale === "en" ? "Let’s review your store" : "Revisemos tu tienda"} <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </Button>
        </m.div>

        <IndustryMetrics locale={locale} />

        <div className="relative mt-20 lg:mt-28 text-center">
          <HeroBuyerJourney />
        </div>


      </div>
    </section>
  )
}
