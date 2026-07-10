"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Lightbulb } from "lucide-react"

const rows = [
  {
    principle: "El schema no se lee en tiempo de consulta.",
    explanation:
      "Los datos estructurados ayudan indirectamente — mejoran cómo los crawlers te indexan y clasifican, lo cual alimenta el retrieval del que dependen los motores de IA. Necesario, no mágico.",
  },
  {
    principle: "Los modelos son probabilísticos, y cambian.",
    explanation:
      "La mayoría de las páginas citadas cambian cada pocos meses sin que nadie toque nada. Por eso medimos y defendemos tu posición cada mes en vez de prometer rankings fijos.",
  },
  {
    principle: "Las citaciones necesitan ingeniería Y autoridad.",
    explanation:
      "Los datos estructurados solos no te van a hacer citar — se necesita contenido, confianza y actualización también. Por eso hacemos ambas cosas, bajo un mismo techo. La mayoría de las agencias solo hace la mitad.",
  },
]

export function TechnicalHonesty() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="px-4 py-24">
      <div className="max-w-4xl mx-auto">
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
            <span className="block text-zinc-900">Cómo funciona realmente.</span>
            <span className="block text-zinc-400">Lo que la mayoría de las agencias no explica.</span>
          </h2>
          <p className="text-zinc-500 max-w-2xl mx-auto">
            La visibilidad en IA está llena de hype. Aquí está la mecánica real — para que sepas exactamente por qué pagas, y qué nadie puede prometer honestamente.
          </p>
        </motion.div>

        <div className="flex flex-col gap-4">
          {rows.map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-zinc-200 shadow-sm"
            >
              <div className="p-2 rounded-lg bg-zinc-100 shrink-0 mt-0.5">
                <Lightbulb className="w-4 h-4 text-emerald-400" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-base font-semibold text-zinc-900 mb-1">{row.principle}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{row.explanation}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
