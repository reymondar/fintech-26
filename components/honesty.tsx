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

const majoriaChecks = [
  "Te dicen si apareces en ChatGPT.",
  "Te muestran dashboards y listas de menciones.",
  "Te dan recomendaciones genéricas.",
]

const majoriaCrosses = [
  "No pueden decirte por qué está cayendo tu tráfico.",
  "No pueden separar el impacto de la IA del resto de factores.",
  "Nunca te dirán que la IA no es el problema.",
]

const nosotrosChecks = [
  "Analizamos tus propios datos.",
  "Medimos cuánto de tu caída es atribuible a la IA y cuánto no.",
  "Priorizamos únicamente las tres acciones con mayor impacto.",
  "Si la IA no es el problema, lo dejamos por escrito.",
  "Solo recomendamos más trabajo cuando los datos lo justifican.",
]

const neverPromise = [
  "Citaciones garantizadas.",
  "Resultados de la noche a la mañana.",
  "Soluciones mágicas.",
  "Venderte tecnología que todavía no necesitas.",
]

export function Honesty() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="honesty" ref={ref} className="py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* 1. Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2
            className="text-3xl sm:text-4xl font-bold text-zinc-900 mb-5"
            style={{ fontFamily: "var(--font-instrument-sans)" }}
          >
            <span className="block">Te diremos la verdad.</span>
            <span className="block text-zinc-400">Incluso si la verdad es que tu problema no es la IA.</span>
          </h2>
          <p className="text-zinc-500 max-w-2xl mx-auto leading-relaxed">
            El sector está lleno de promesas vacías. Nosotros solo prometemos aquello que podemos demostrar.
          </p>
        </motion.div>

        {/* 2. Cambio de perspectiva */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-3xl mx-auto text-center mb-20"
        >
          <p className="text-zinc-500 mb-4 leading-relaxed">
            La mayoría de empresas empiezan preguntándose:
          </p>
          <p className="text-lg text-zinc-400 italic mb-6">
            &ldquo;¿Me menciona ChatGPT?&rdquo;
          </p>
          <p className="text-zinc-500 mb-4 leading-relaxed">
            Nosotros empezamos por una pregunta mucho más importante:
          </p>
          <p
            className="text-xl sm:text-2xl font-semibold text-zinc-900"
            style={{ fontFamily: "var(--font-instrument-sans)" }}
          >
            ¿La IA está afectando realmente a tu negocio?
          </p>
          <p className="text-zinc-500 mt-4 leading-relaxed">
            Porque si la respuesta es no, preferimos decirlo antes que venderte un servicio que no necesitas.
          </p>
        </motion.div>

        {/* 3. Comparativa — dos tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-20">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="p-7 rounded-2xl bg-white border border-zinc-200 shadow-sm"
          >
            <h3
              className="text-lg font-semibold text-zinc-900 mb-6"
              style={{ fontFamily: "var(--font-instrument-sans)" }}
            >
              Lo que hace la mayoría
            </h3>
            <ul className="flex flex-col gap-3.5 mb-5">
              {majoriaChecks.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" strokeWidth={2} />
                  <span className="text-sm text-zinc-600">{item}</span>
                </li>
              ))}
            </ul>
            <div className="border-t border-zinc-100 pt-5">
              <ul className="flex flex-col gap-3.5">
                {majoriaCrosses.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <X className="w-4 h-4 text-red-400/70 shrink-0 mt-0.5" strokeWidth={2} />
                    <span className="text-sm text-zinc-500">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.1 }}
            className="p-7 rounded-2xl bg-white border border-emerald-200 shadow-sm"
          >
            <h3
              className="text-lg font-semibold text-zinc-900 mb-6"
              style={{ fontFamily: "var(--font-instrument-sans)" }}
            >
              Lo que hacemos nosotros
            </h3>
            <ul className="flex flex-col gap-3.5">
              {nosotrosChecks.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" strokeWidth={2} />
                  <span className="text-sm text-zinc-700">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* 4. Lo que nunca prometeremos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto mb-20"
        >
          <h3
            className="text-lg font-semibold text-zinc-900 mb-5 text-center"
            style={{ fontFamily: "var(--font-instrument-sans)" }}
          >
            Lo que nunca prometeremos
          </h3>
          <ul className="flex flex-col gap-3 mb-5">
            {neverPromise.map((item) => (
              <li key={item} className="flex items-center gap-3 justify-center">
                <X className="w-4 h-4 text-red-400/60 shrink-0" strokeWidth={2} />
                <span className="text-sm text-zinc-500">{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-zinc-400 text-center leading-relaxed">
            Los modelos cambian constantemente. Cualquiera que garantice resultados fijos sobre un sistema que se actualiza cada semana está vendiendo humo.
          </p>
        </motion.div>

      </div>
    </section>
  )
}
