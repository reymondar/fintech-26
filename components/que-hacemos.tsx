"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { TrendingDown, Eye, Target, ShieldCheck } from "lucide-react"

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

const blocks = [
  {
    icon: TrendingDown,
    title: "El porqué de tu caída",
    description:
      "Separamos las causas reales de tu pérdida de tráfico — IA, buscadores, mercado, base técnica — con tus propios datos. Sabrás qué está pasando de verdad, no lo que a alguien le convenía contarte.",
    highlight: true,
  },
  {
    icon: Eye,
    title: "Lo que la IA ve cuando preguntan por ti",
    description:
      "Medimos cómo te describen los modelos ante las preguntas reales de tus compradores: dónde apareces, a quién recomiendan en tu lugar y de qué fuentes se fían en tu sector.",
  },
  {
    icon: Target,
    title: "Lo que te hace elegible",
    description:
      "Convertimos el diagnóstico en posición: contenido que los modelos pueden citar, señales de autoridad en las fuentes que consultan y una base técnica que pueden leer y en la que pueden confiar.",
  },
  {
    icon: ShieldCheck,
    title: "La verdad, aunque no nos convenga",
    description:
      "Si tu problema no es la IA, te lo decimos — con las causas reales sobre la mesa. Un diagnóstico solo vale si es honesto.",
  },
]

export function QueHacemos() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-12 px-4">
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
            <span className="block">Primero entendemos por qué caes.</span>
            <span className="block text-zinc-400">Después construimos tu posición.</span>
          </h2>
          <p className="text-zinc-500 max-w-2xl mx-auto">
            La mayoría del sector mide menciones. Nosotros respondemos la pregunta anterior — la que decide todo lo demás:
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {blocks.map((block, i) => (
            <motion.div
              key={block.title}
              variants={itemVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ delay: i * 0.1 }}
              className={`group relative p-6 rounded-2xl shadow-sm transition-all duration-300 ${
                block.highlight
                  ? "bg-emerald-50 border-2 border-emerald-500/40 md:col-span-2"
                  : "bg-white border border-zinc-200 hover:border-zinc-300"
              }`}
            >
              <div className={`p-2 rounded-lg w-fit mb-4 ${block.highlight ? "bg-emerald-500/20" : "bg-zinc-100"}`}>
                <block.icon
                  className={`w-5 h-5 ${block.highlight ? "text-emerald-600" : "text-zinc-500"}`}
                  strokeWidth={1.5}
                />
              </div>
              <h3 className={`text-lg font-semibold mb-2 ${block.highlight ? "text-emerald-700" : "text-zinc-900"}`}>
                {block.title}
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{block.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
