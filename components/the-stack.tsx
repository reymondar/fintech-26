"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Search, Code, Trophy, Shield, Bot, Layers3 } from "lucide-react"

const layers = [
  {
    number: "05",
    icon: Layers3,
    title: "Expansión",
    descriptor:
      "Una vez que tu capa de datos existe, construimos sobre ella — automatizaciones de citación, agentes de IA que responden con tu catálogo, herramientas internas. Se define después de Defensa.",
    chip: "lo que lo corona",
    highlight: true,
  },
  {
    number: "04",
    icon: Bot,
    title: "Agent-ready",
    descriptor:
      "API de contenido estructurado, preparada para MCP para que un agente pueda consultarte — y mañana, operar contigo.",
    chip: "futuro",
  },
  {
    number: "03",
    icon: Shield,
    title: "Defendido",
    descriptor:
      "Medición mensual de Share of Model, control de drift y defensa de posición conforme los modelos cambian.",
    chip: "retainer",
  },
  {
    number: "02",
    icon: Trophy,
    title: "Confiable",
    descriptor:
      "Autoridad, contenido, consistencia de entidad y actualización — las señales de confianza que convierten estructura en citaciones.",
    chip: "autoridad",
  },
  {
    number: "01",
    icon: Code,
    title: "Legible",
    descriptor:
      "Datos estructurados, mapeo de entidades y feeds legibles por máquinas para que la IA te lea sin adivinar.",
    chip: "ingeniería",
  },
  {
    number: "00",
    icon: Search,
    title: "Auditoría",
    descriptor:
      "Diagnóstico de visibilidad — exactamente dónde eres invisible hoy, y por qué.",
    chip: "gratis · empieza aquí",
    accent: true,
  },
]

export function TheStack() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="px-4 py-24">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
            style={{ fontFamily: "var(--font-instrument-sans)" }}
          >
            <span className="block text-zinc-900">Te construimos un stack.</span>
            <span className="block text-zinc-500">Capa por capa, de invisible a elegido.</span>
          </h2>
          <p className="text-zinc-500 max-w-2xl mx-auto">
            Cada capa es algo que diseñamos. Juntas te hacen legible, confiable y elegible — y son la base sobre la que se construye todo lo demás.
          </p>
        </motion.div>

        {/* Stack */}
        <div className="relative">
          {/* Left rail */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-zinc-200 hidden sm:block" aria-hidden="true" />

          <div className="flex flex-col gap-3">
            {layers.map((layer, i) => (
              <motion.div
                key={layer.number}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className={`relative flex items-center gap-4 sm:gap-6 p-5 sm:pl-16 rounded-2xl shadow-sm transition-all duration-300 ${
                  layer.accent
                    ? "bg-emerald-50 border-2 border-emerald-500/40"
                    : layer.highlight
                      ? "bg-white border border-emerald-500/30"
                      : "bg-white border border-zinc-200"
                }`}
              >
                {/* Rail dot */}
                <div
                  className={`absolute left-[1.3rem] hidden sm:flex items-center justify-center w-3 h-3 rounded-full ${
                    layer.accent ? "bg-emerald-500 ring-2 ring-emerald-500/30" : layer.highlight ? "bg-emerald-500" : "bg-zinc-400"
                  }`}
                  aria-hidden="true"
                />

                {/* Number */}
                <span className="font-mono text-sm text-zinc-600 shrink-0 w-6 text-right">{layer.number}</span>

                {/* Icon */}
                <div
                  className={`p-2 rounded-lg shrink-0 ${
                    layer.accent ? "bg-emerald-500/20" : layer.highlight ? "bg-emerald-500/10" : "bg-zinc-100"
                  }`}
                >
                  <layer.icon
                    className={`w-5 h-5 ${layer.accent ? "text-emerald-600" : layer.highlight ? "text-emerald-400" : "text-zinc-500"}`}
                    strokeWidth={1.5}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className={`text-base font-semibold mb-1 ${layer.accent ? "text-emerald-700" : layer.highlight ? "text-emerald-400" : "text-zinc-900"}`}>
                    {layer.title}
                  </h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{layer.descriptor}</p>
                </div>

                {/* Chip */}
                <span
                  className={`hidden sm:inline-block shrink-0 px-3 py-1 rounded-full text-xs font-mono font-semibold ${
                    layer.accent
                      ? "bg-emerald-600 text-white"
                      : layer.highlight
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-zinc-100 text-zinc-500"
                  }`}
                >
                  {layer.chip}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Closing line */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center text-sm text-zinc-500 mt-16"
        >
          La visibilidad en IA es la base. El desarrollo es lo que construyes encima.
        </motion.p>
      </div>
    </section>
  )
}
