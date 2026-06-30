"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Search, Code, Trophy, Shield, Bot, Layers3 } from "lucide-react"

const layers = [
  {
    number: "05",
    icon: Layers3,
    title: "Expansion",
    descriptor:
      "Automation, agents, custom development and internal systems — built on top of your new data layer.",
    chip: "what crowns it",
    highlight: true,
  },
  {
    number: "04",
    icon: Bot,
    title: "Agent-ready",
    descriptor:
      "Structured content API, prepared for MCP so an agent can query you — and tomorrow, transact.",
    chip: "future",
  },
  {
    number: "03",
    icon: Shield,
    title: "Defended",
    descriptor:
      "Monthly Share of Model measurement, drift control, and position defense as the models shift.",
    chip: "retainer",
  },
  {
    number: "02",
    icon: Trophy,
    title: "Trustworthy",
    descriptor:
      "Authority, content, entity consistency and freshness — the trust signals that turn structure into citations.",
    chip: "SEO",
  },
  {
    number: "01",
    icon: Code,
    title: "Readable",
    descriptor:
      "Structured data, entity mapping and machine-readable feeds so AI reads you without guessing.",
    chip: "engineering",
  },
  {
    number: "00",
    icon: Search,
    title: "Audit",
    descriptor:
      "Visibility diagnostic — exactly where you're invisible today, and why.",
    chip: "free · start here",
    dashed: true,
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
            <span className="block text-white">We build you a stack.</span>
            <span className="block text-zinc-500">Layer by layer, from invisible to chosen.</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Each layer is something we engineer. Together they make you readable, trustworthy, and eligible — and
            they&apos;re the foundation everything else is built on.
          </p>
        </motion.div>

        {/* Stack */}
        <div className="relative">
          {/* Left rail */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-zinc-800 hidden sm:block" aria-hidden="true" />

          <div className="flex flex-col gap-3">
            {layers.map((layer, i) => (
              <motion.div
                key={layer.number}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className={`relative flex items-center gap-4 sm:gap-6 p-5 sm:pl-16 rounded-2xl bg-zinc-900 transition-all duration-300 ${
                  layer.dashed
                    ? "border border-dashed border-zinc-700"
                    : layer.highlight
                      ? "border border-emerald-500/30"
                      : "border border-zinc-800"
                }`}
              >
                {/* Rail dot */}
                <div
                  className={`absolute left-[1.3rem] hidden sm:flex items-center justify-center w-3 h-3 rounded-full ${
                    layer.highlight ? "bg-emerald-500" : layer.dashed ? "bg-zinc-700" : "bg-zinc-600"
                  }`}
                  aria-hidden="true"
                />

                {/* Number */}
                <span className="font-mono text-sm text-zinc-600 shrink-0 w-6 text-right">{layer.number}</span>

                {/* Icon */}
                <div
                  className={`p-2 rounded-lg shrink-0 ${
                    layer.highlight ? "bg-emerald-500/10" : "bg-zinc-800"
                  }`}
                >
                  <layer.icon
                    className={`w-5 h-5 ${layer.highlight ? "text-emerald-400" : "text-zinc-400"}`}
                    strokeWidth={1.5}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className={`text-base font-semibold mb-1 ${layer.highlight ? "text-emerald-400" : "text-white"}`}>
                    {layer.title}
                  </h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{layer.descriptor}</p>
                </div>

                {/* Chip */}
                <span
                  className={`hidden sm:inline-block shrink-0 px-3 py-1 rounded-full text-xs font-mono ${
                    layer.dashed
                      ? "bg-emerald-500/10 text-emerald-400"
                      : layer.highlight
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-zinc-800 text-zinc-500"
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
          GEO is the foundation. Development is what you build on it.
        </motion.p>
      </div>
    </section>
  )
}
