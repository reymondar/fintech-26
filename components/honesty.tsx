"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Check, X } from "lucide-react"

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const promises = [
  "Hacerte legible, citable y agent-ready",
  "Construir y defender tu posición mes a mes",
  "Darte un número real de Share of Model, medido de la misma manera cada vez",
  "Decirte qué funciona — y qué no",
]

const nopes = [
  "'Citaciones garantizadas' — los modelos son probabilísticos y cambian cada semana",
  "Resultados de la noche a la mañana — la autoridad se compone durante meses",
  "Que el schema o llms.txt solo sean magia — necesarios, pero no suficientes",
  "Venderte MCP que todavía no necesitas",
]

export function Honesty() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="honesty" ref={ref} className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className="text-3xl sm:text-4xl font-bold text-zinc-900 mb-4"
            style={{ fontFamily: "var(--font-instrument-sans)" }}
          >
            <span className="block">Te vamos a decir la verdad.</span>
            <span className="block text-zinc-400">Incluso lo que otras agencias esconden.</span>
          </h2>
          <p className="text-zinc-500 max-w-2xl mx-auto">
            La visibilidad en IA está llena de hype. Esto es exactamente lo que prometemos y lo que no — para que sepas qué estás comprando.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* What we promise */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-zinc-100">
                <Check className="w-5 h-5 text-emerald-500" strokeWidth={2} />
              </div>
              <h3 className="text-lg font-semibold text-zinc-900">Lo que prometemos</h3>
            </div>
            <ul className="flex flex-col gap-4">
              {promises.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" strokeWidth={2} />
                  <span className="text-sm text-zinc-700">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* What we won't promise */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-zinc-100">
                <X className="w-5 h-5 text-red-400/60" strokeWidth={2} />
              </div>
              <h3 className="text-lg font-semibold text-zinc-900">Lo que no prometemos</h3>
            </div>
            <ul className="flex flex-col gap-4">
              {nopes.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <X className="w-4 h-4 text-red-400/60 shrink-0 mt-0.5" strokeWidth={2} />
                  <span className="text-sm text-zinc-500">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
