"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ChevronRight } from "lucide-react"

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

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

const steps = [
  {
    title: "Auditoría",
    descriptor: "Pasamos tu marca por los motores de IA y te mostramos dónde eres invisible.",
    price: "Gratis",
  },
  {
    title: "Construir",
    descriptor: "Diseñamos tu capa legible y construimos la autoridad que genera citaciones.",
    price: "Desde $1,500 · proyecto",
  },
  {
    title: "Defender",
    descriptor: "Seguimiento mensual de Share of Model y defensa de posición conforme los modelos cambian.",
    price: "Desde $500/mes · retainer",
  },
  {
    title: "Expandir",
    descriptor: "Una vez que tu capa de datos existe, construimos sobre ella — automatizaciones de citación, agentes de IA que responden con tu catálogo, herramientas internas. Se define después de Defensa.",
    price: "Custom",
  },
]

export function EngagementLadder() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="px-4 py-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
            style={{ fontFamily: "var(--font-instrument-sans)" }}
          >
            <span className="block text-zinc-900">Cómo trabajamos contigo.</span>
          </h2>
          <p className="text-zinc-500 max-w-2xl mx-auto">
            Empieza con una auditoría gratis. Cada paso desbloquea el siguiente.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-stretch gap-4"
        >
          {steps.map((step, i) => (
            <motion.div key={step.title} variants={itemVariants} className="contents">
              <div className="group relative p-6 rounded-2xl bg-white border border-zinc-200 hover:border-zinc-300 shadow-sm transition-all duration-300 flex flex-col">
                <h3 className="text-lg font-semibold text-zinc-900 mb-2">{step.title}</h3>
                <p className="text-zinc-500 text-sm mb-4 flex-1">{step.descriptor}</p>
                <span className="font-mono text-sm text-emerald-400">{step.price}</span>
              </div>

              {i < steps.length - 1 && (
                <div className="hidden md:flex items-center justify-center">
                  <ChevronRight className="w-5 h-5 text-zinc-300" strokeWidth={1.5} />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
