"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Check } from "lucide-react"

const entregables = [
  { bold: "Tu score de visibilidad IA", desc: "tu posición en un número, medido igual cada vez" },
  { bold: "Comparativa con tus competidores", desc: "a quién recomienda la IA en tu lugar" },
  { bold: "Atribución de tu caída", desc: "cuánto es culpa de la IA y cuánto no, con tus datos" },
  { bold: "Capturas reales", desc: "lo que responde la IA, pantalla por pantalla" },
  { bold: "Impacto en tu negocio", desc: "qué te está costando hoy en visitas y oportunidades" },
  { bold: "Plan de 30 días", desc: "exactamente 3 acciones, con esfuerzo y responsable" },
  { bold: "Resumen ejecutivo", desc: "una página para decidir, sin tecnicismos" },
]

const bars = [
  { label: "Competidor A", width: 71, highlight: false },
  { label: "Competidor B", width: 52, highlight: false },
  { label: "Tú", width: 34, highlight: true },
]

function ReportMockup() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    if (isInView) setAnimate(true)
  }, [isInView])

  return (
    <div ref={ref} className="relative mx-auto max-w-[380px] md:max-w-[480px]">
      {/* Back page */}
      <div
        className="absolute top-[-8px] right-[-8px] w-full h-full rounded-[10px] bg-white border border-zinc-200/60"
        aria-hidden="true"
      />
      {/* Front page */}
      <div
        className="relative rounded-[10px] bg-white border border-zinc-200 p-7 shadow-sm"
        aria-label="Portada del informe de auditoría con score de visibilidad IA"
        role="img"
      >
        <p className="text-[13px] uppercase tracking-[0.06em] text-zinc-400 mb-1.5">
          Auditoría de visibilidad IA
        </p>
        <p className="text-[17px] font-medium text-zinc-900 mb-6">
          Tu empresa S.L.
        </p>

        <p className="text-[14px] text-zinc-400 mb-1.5">Score de visibilidad IA</p>
        <p className="mb-6">
          <span className="text-[42px] font-medium" style={{ color: "#009967" }}>34</span>
          <span className="text-[20px] text-zinc-400">/100</span>
        </p>

        <div className="flex flex-col gap-3.5 mb-6">
          {bars.map((bar, i) => (
            <div key={bar.label} className="flex items-center gap-4">
              <span className={`text-[13px] w-[100px] shrink-0 ${bar.highlight ? "font-medium text-zinc-900" : "text-zinc-500"}`}>
                {bar.label}
              </span>
              <div className="flex-1 h-3 bg-zinc-100 rounded">
                <div
                  className="h-3 rounded transition-all duration-1000 ease-out"
                  style={{
                    width: animate ? `${bar.width}%` : "0%",
                    backgroundColor: bar.highlight ? "#009967" : "#d4d4d8",
                    transitionDelay: `${i * 150}ms`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-zinc-100 pt-4">
          <p className="text-[13px] text-zinc-400">
            Resumen ejecutivo · pág. 1 de 14
          </p>
        </div>
      </div>

      {/* Fallback: barras a su ancho final sin JS */}
      <noscript>
        <style>{`
          [data-bar] { width: var(--bar-w) !important; }
        `}</style>
      </noscript>
    </div>
  )
}

export function QueRecibes() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="que-recibes" ref={ref} className="py-12 px-4">
      <div className="max-w-5xl mx-auto">
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
            Esto es lo que recibes.
          </h2>
          <p className="text-zinc-500 max-w-2xl mx-auto">
            Un documento de trabajo, no un informe para archivar.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex justify-center"
          >
            <ReportMockup />
          </motion.div>

          {/* Lista de entregables */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ul className="flex flex-col gap-3">
              {entregables.map((item) => (
                <li key={item.bold} className="flex items-start gap-3">
                  <Check
                    className="w-4 h-4 shrink-0 mt-0.5"
                    strokeWidth={2}
                    style={{ color: "#009967" }}
                  />
                  <span className="text-[15px] leading-relaxed">
                    <span className="font-medium text-zinc-900">{item.bold}</span>
                    <span className="text-zinc-500"> — {item.desc}</span>
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
