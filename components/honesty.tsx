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
  "Make you readable, citable and agent-ready",
  "Build and defend your position month over month",
  "Give you a real Share of Model number, measured the same way every time",
  "Tell you what's working — and what isn't",
]

const nopes = [
  "'Guaranteed citations' — the models are probabilistic and shift weekly",
  "Overnight results — authority compounds over months",
  "That schema or llms.txt alone is magic — necessary, not sufficient",
  "To sell you MCP you don't need yet",
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
            <span className="block">We&apos;ll tell you the truth.</span>
            <span className="block text-zinc-400">Even the parts other agencies hide.</span>
          </h2>
          <p className="text-zinc-500 max-w-2xl mx-auto">
            AI visibility is full of hype. Here&apos;s exactly what we will and won&apos;t promise — so you know what
            you&apos;re buying.
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
              <h3 className="text-lg font-semibold text-zinc-900">What we promise</h3>
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
              <h3 className="text-lg font-semibold text-zinc-900">What we won&apos;t promise</h3>
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
