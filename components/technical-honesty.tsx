"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Lightbulb } from "lucide-react"

const rows = [
  {
    principle: "Schema isn't read at query-time.",
    explanation:
      "Structured data helps indirectly — it improves how crawlers index and classify you, which feeds the retrieval AI engines rely on. Necessary, not magic.",
  },
  {
    principle: "The models are probabilistic, and they shift.",
    explanation:
      "Roughly 70% of cited pages change every 2–3 months with nothing touched. That's why we measure and defend your position every month instead of promising fixed rankings.",
  },
  {
    principle: "Citations need engineering AND authority.",
    explanation:
      "Structured data alone won't get you cited — it takes content, trust and freshness too. That's why we do both, under one roof. Most agencies only do half.",
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
            <span className="block text-white">How this actually works.</span>
            <span className="block text-zinc-500">The parts most agencies won&apos;t explain.</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            AI visibility is full of hype. Here&apos;s the real mechanics — so you know exactly what you&apos;re paying
            for, and what no one can honestly promise.
          </p>
        </motion.div>

        <div className="flex flex-col gap-4">
          {rows.map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-start gap-4 p-6 rounded-2xl bg-zinc-900 border border-zinc-800"
            >
              <div className="p-2 rounded-lg bg-zinc-800 shrink-0 mt-0.5">
                <Lightbulb className="w-4 h-4 text-emerald-400" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white mb-1">{row.principle}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{row.explanation}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
