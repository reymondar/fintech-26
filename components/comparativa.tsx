"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Check, Minus } from "lucide-react"

const rows = [
  {
    feature: "Te dicen si la IA te menciona",
    tools: true,
    us: true,
  },
  {
    feature: "Te dicen por qué pierdes tráfico",
    tools: false,
    us: "Sí, con tus propios datos",
  },
  {
    feature: "Te dicen qué hacer — y en qué orden",
    tools: "Sugerencias genéricas",
    us: "Plan priorizado y accionable",
  },
  {
    feature: "Te dicen la verdad si tu problema no es la IA",
    tools: false,
    us: "Sí, por escrito",
  },
]

export function Comparativa() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className="text-3xl sm:text-4xl font-bold text-zinc-900"
            style={{ fontFamily: "var(--font-instrument-sans)" }}
          >
            Monitorizar no es resolver.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="rounded-2xl border border-zinc-200 overflow-hidden shadow-sm"
        >
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50">
                <th className="text-left py-4 px-5 font-medium text-zinc-500 w-1/2" />
                <th className="text-center py-4 px-5 font-medium text-zinc-500">Herramientas de monitorización</th>
                <th className="text-center py-4 px-5 font-semibold text-zinc-900">The Stack House</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-b border-zinc-100 last:border-0">
                  <td className="py-4 px-5 text-zinc-700 font-medium">{row.feature}</td>
                  <td className="py-4 px-5 text-center">
                    {row.tools === true ? (
                      <Check className="w-4 h-4 text-zinc-400 mx-auto" strokeWidth={2} />
                    ) : row.tools === false ? (
                      <Minus className="w-4 h-4 text-zinc-300 mx-auto" strokeWidth={2} />
                    ) : (
                      <span className="text-zinc-400 text-xs">{row.tools}</span>
                    )}
                  </td>
                  <td className="py-4 px-5 text-center bg-emerald-50/50">
                    {row.us === true ? (
                      <Check className="w-4 h-4 text-emerald-500 mx-auto" strokeWidth={2} />
                    ) : (
                      <span className="text-emerald-700 text-xs font-medium">{row.us}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-sm text-zinc-500 mt-8"
        >
          Los datos son el punto de partida. El valor está en el diagnóstico — y en lo que haces con él.
        </motion.p>
      </div>
    </section>
  )
}
