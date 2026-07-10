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

const platforms = ["ChatGPT", "Claude", "Gemini", "Perplexity", "Grok"]

export function Hero() {
  const [platformIndex, setPlatformIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setPlatformIndex((prev) => (prev + 1) % platforms.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-50 via-zinc-50 to-zinc-100 pointer-events-none" />

      {/* Subtle radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-emerald-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-zinc-200 mb-8 shadow-sm"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 pulse-glow" />
          <span className="text-sm text-zinc-500">Visibilidad en IA · 2026</span>
        </motion.div>

        {/* Headline with text mask animation */}
        <h1
          className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-900 mb-6"
          style={{ fontFamily: "var(--font-cal-sans), sans-serif" }}
        >
          <span className="block overflow-hidden">
            <motion.span className="block" variants={textRevealVariants} initial="hidden" animate="visible" custom={0}>
              Hazte visible para tus
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span className="block" variants={textRevealVariants} initial="hidden" animate="visible" custom={1}>
              futuros clientes en{" "}
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
                    {platforms[platformIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.span>
          </span>
        </h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-lg sm:text-xl text-zinc-500 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Tus compradores le preguntan a ChatGPT a quién contratar. Asegúrate de que responda con tu nombre — no el de tu competencia.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <Button
            size="lg"
            className="shimmer-btn bg-zinc-900 text-white hover:bg-zinc-800 rounded-full px-8 h-12 text-base font-medium shadow-lg shadow-zinc-900/10"
          >
            Descubre si la IA te ve
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </motion.div>

        {/* Chatbot Response Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mx-auto max-w-[440px] rounded-2xl bg-white border border-zinc-200 p-6 text-left shadow-lg shadow-zinc-200/50"
        >
          {/* Query row */}
          <div className="flex items-center gap-2 mb-5">
            <MessageSquare className="w-4 h-4 text-zinc-400 shrink-0" strokeWidth={1.5} />
            <span className="text-sm text-zinc-400">&quot;¿Quién es el mejor proveedor en [tu industria]?&quot;</span>
          </div>

          {/* Results */}
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

          {/* Microcopy */}
          <p className="text-xs text-red-400/70">Hoy, no apareces.</p>
        </motion.div>

        {/* Urgency line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-6 text-sm text-zinc-400 max-w-md mx-auto"
        >
          Y cada mes que no apareces, el modelo aprende que la respuesta es tu competidor.
        </motion.p>
      </div>
    </section>
  )
}
