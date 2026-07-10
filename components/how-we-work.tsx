"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Search, Wrench, Shield, ChevronRight } from "lucide-react"

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
    number: "01",
    icon: Search,
    title: "Auditamos",
    description:
      "Pasamos tu marca por ChatGPT, Perplexity, Gemini y Claude con las preguntas reales de tus compradores, y te mostramos exactamente dónde eres invisible.",
    accent: "gratis · 5 min de revelación",
  },
  {
    number: "02",
    icon: Wrench,
    title: "Construimos",
    description:
      "Diseñamos tu capa legible por máquinas y construimos la autoridad que hace posibles las citaciones. Estructura y confianza, juntas.",
    accent: "estructura + autoridad",
  },
  {
    number: "03",
    icon: Shield,
    title: "Defendemos",
    description:
      "La IA cambia constantemente. Medimos tu Share of Model cada mes y defendemos tu posición conforme los modelos cambian.",
    accent: "Share of Model · mensual",
  },
]

export function HowWeWork() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="how-it-works" ref={ref} className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
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
            <span className="block">Tres pasos.</span>
            <span className="block text-zinc-400">De invisible al nombre que la IA elige.</span>
          </h2>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] items-stretch gap-4"
        >
          {steps.map((step, i) => (
            <motion.div key={step.number} variants={itemVariants} className="contents">
              <div className="group relative p-6 rounded-2xl bg-white border border-zinc-200 hover:border-zinc-300 hover:scale-[1.02] transition-all duration-300 flex flex-col shadow-sm">
                <span
                  className="font-mono text-3xl font-bold text-emerald-500 mb-4"
                  style={{ fontFamily: "var(--font-cal-sans)" }}
                >
                  {step.number}
                </span>
                <div className="p-2 rounded-lg bg-zinc-100 w-fit mb-4">
                  <step.icon className="w-5 h-5 text-zinc-500" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 mb-2">{step.title}</h3>
                <p className="text-zinc-500 text-sm mb-4 flex-1">{step.description}</p>
                <div className="flex items-center gap-2 text-emerald-600 text-sm">
                  <span className="font-mono">{step.accent}</span>
                </div>
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
