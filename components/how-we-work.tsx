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
    title: "We audit",
    description:
      "We run your brand through ChatGPT, Perplexity, Gemini and Claude with your buyers' real questions, and show you exactly where you're invisible.",
    accent: "free · 5-min aha",
  },
  {
    number: "02",
    icon: Wrench,
    title: "We build",
    description:
      "We engineer your machine-readable layer and build the authority that makes citations possible. Structure and trust, together.",
    accent: "structure + authority",
  },
  {
    number: "03",
    icon: Shield,
    title: "We defend",
    description:
      "AI shifts constantly. We track your Share of Model every month and defend your position as the models change.",
    accent: "Share of Model · monthly",
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
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-instrument-sans)" }}
          >
            <span className="block">Three steps.</span>
            <span className="block text-zinc-500">From invisible to the name AI picks.</span>
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
              <div className="group relative p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-600 hover:scale-[1.02] transition-all duration-300 flex flex-col">
                <span
                  className="font-mono text-3xl font-bold text-emerald-400 mb-4"
                  style={{ fontFamily: "var(--font-cal-sans)" }}
                >
                  {step.number}
                </span>
                <div className="p-2 rounded-lg bg-zinc-800 w-fit mb-4">
                  <step.icon className="w-5 h-5 text-zinc-400" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-zinc-400 text-sm mb-4 flex-1">{step.description}</p>
                <div className="flex items-center gap-2 text-emerald-500 text-sm">
                  <span className="font-mono">{step.accent}</span>
                </div>
              </div>

              {i < steps.length - 1 && (
                <div className="hidden md:flex items-center justify-center">
                  <ChevronRight className="w-5 h-5 text-zinc-700" strokeWidth={1.5} />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
