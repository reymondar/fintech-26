"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ChevronRight } from "lucide-react"

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
    title: "Audit",
    descriptor: "We run your brand through the AI engines and show you where you're invisible.",
    price: "Free",
  },
  {
    title: "Build",
    descriptor: "We engineer your readable layer and build the authority that earns citations.",
    price: "From [X] · project",
  },
  {
    title: "Defend",
    descriptor: "Monthly Share of Model tracking and position defense as models shift.",
    price: "From [X]/mo · retainer",
  },
  {
    title: "Expand",
    descriptor: "Automation, agents and custom development built on top of your data layer.",
    price: "Custom",
  },
]

export function EngagementLadder() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="px-4 py-24">
      <div className="max-w-6xl mx-auto">
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
            <span className="block text-white">How you engage.</span>
            <span className="block text-zinc-500">You pay more as you climb the stack.</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Start with a free audit. Build from there. Each step unlocks the next.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-stretch gap-4"
        >
          {steps.map((step, i) => (
            <motion.div key={step.title} variants={itemVariants} className="contents">
              <div className="group relative p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-600 transition-all duration-300 flex flex-col">
                <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-zinc-500 text-sm mb-4 flex-1">{step.descriptor}</p>
                <span className="font-mono text-sm text-emerald-400">{step.price}</span>
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
