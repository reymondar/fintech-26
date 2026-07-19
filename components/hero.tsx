"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, MessageSquare, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const textRevealVariants = {
  hidden: { y: "100%" },
  visible: (i: number) => ({
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      delay: i * 0.1,
    },
  }),
}

const platforms = ["ChatGPT", "Perplexity", "Claude", "Gemini"]

export function Hero() {
  const [platformIndex, setPlatformIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setPlatformIndex((prev) => (prev + 1) % platforms.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-32 pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-50 via-zinc-50 to-zinc-100 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-emerald-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-zinc-200 mb-12 shadow-sm"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 pulse-glow" />
          <span className="text-sm text-zinc-500">Visibilidad en IA · España</span>
        </motion.div>

        {/* H1 */}
        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-zinc-900 mb-6 leading-[1.1]"
          style={{ fontFamily: "var(--font-instrument-sans), sans-serif" }}
        >
          <span className="block overflow-hidden">
            <motion.span className="block" variants={textRevealVariants} initial="hidden" animate="visible" custom={0}>
              Tu próximo cliente ya no busca:
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span className="block" variants={textRevealVariants} initial="hidden" animate="visible" custom={1}>
              Le pregunta a{" "}
              <span className="inline-block relative align-bottom overflow-hidden" style={{ minWidth: "4ch" }}>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={platforms[platformIndex]}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="inline-block text-emerald-600"
                  >
                    {platforms[platformIndex]}.
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span className="block" variants={textRevealVariants} initial="hidden" animate="visible" custom={2}>
              Conviértete en la respuesta.
            </motion.span>
          </span>
        </h1>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-base sm:text-lg text-zinc-500 max-w-2xl mx-auto mb-14 leading-relaxed"
        >
          The Stack House hace visible tu empresa en los motores de IA. Empezamos por lo que nadie más responde: cuánta de tu caída es culpa de la IA, cuánto negocio te está costando — y qué hacer para recuperarlo.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col items-center gap-3 mb-12"
        >
          <Button
            asChild
            size="lg"
            className="shimmer-btn bg-zinc-900 text-white hover:bg-zinc-800 rounded-full px-8 h-14 text-base font-medium shadow-lg shadow-zinc-900/10"
          >
            <a href="#audit">
              Agenda tu llamada de diagnóstico
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </Button>
        </motion.div>

        {/* Widget de simulación */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mx-auto max-w-[440px] rounded-2xl bg-white border border-zinc-200 p-6 text-left shadow-lg shadow-zinc-200/50"
        >
          <div className="flex items-center gap-2 mb-5">
            <MessageSquare className="w-4 h-4 text-zinc-400 shrink-0" strokeWidth={1.5} />
            <span className="text-sm text-zinc-400">&quot;¿Quién es el mejor proveedor en [tu industria]?&quot;</span>
          </div>

          <div className="flex flex-col gap-3 mb-4">
            <div className="flex items-center gap-3">
              <Check className="w-4 h-4 text-emerald-500 shrink-0" strokeWidth={2} />
              <span className="text-sm text-zinc-700">Competidor A</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="w-4 h-4 text-emerald-500 shrink-0" strokeWidth={2} />
              <span className="text-sm text-zinc-700">Competidor B</span>
            </div>
            <div className="flex items-center gap-3">
              <X className="w-4 h-4 text-red-500 shrink-0" strokeWidth={2} />
              <span className="text-sm text-zinc-400 line-through">Tu empresa</span>
            </div>
          </div>

          <p className="text-xs text-red-400/70">Hoy, no apareces.</p>
        </motion.div>

        {/* Cierre del widget */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-6 text-sm text-zinc-400 max-w-lg mx-auto leading-relaxed"
        >
          Cada respuesta en la que no estás refuerza que la recomendación es otro. La visibilidad en IA se acumula — a tu favor o en tu contra.
        </motion.p>
      </div>
    </section>
  )
}
