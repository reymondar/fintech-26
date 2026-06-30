"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Code, ShieldCheck, ChartLine, Bot, Plug } from "lucide-react"

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

function SystemStatus() {
  const [dots, setDots] = useState([true, true, true, false, true])

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => prev.map(() => Math.random() > 0.2))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center gap-2">
      {dots.map((active, i) => (
        <motion.div
          key={i}
          className={`w-2 h-2 rounded-full ${active ? "bg-emerald-500" : "bg-zinc-700"}`}
          animate={active ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: i * 0.2 }}
        />
      ))}
    </div>
  )
}

function AnimatedChart() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const points = [
    { x: 0, y: 60 },
    { x: 20, y: 45 },
    { x: 40, y: 55 },
    { x: 60, y: 30 },
    { x: 80, y: 40 },
    { x: 100, y: 15 },
  ]

  const pathD = points.reduce((acc, point, i) => {
    return i === 0 ? `M ${point.x} ${point.y}` : `${acc} L ${point.x} ${point.y}`
  }, "")

  return (
    <svg ref={ref} viewBox="0 0 100 70" className="w-full h-24">
      <defs>
        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgb(255,255,255)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="rgb(255,255,255)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {isInView && (
        <>
          <path d={`${pathD} L 100 70 L 0 70 Z`} fill="url(#chartGradient)" className="opacity-50" />
          <path d={pathD} fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" className="draw-line" />
        </>
      )}
    </svg>
  )
}

export function BentoGrid() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="features" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
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
            <span className="block">Readable. Trustworthy. Eligible.</span>
            <span className="block text-zinc-500">The layers that make AI pick you.</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Not a prettier website. The data infrastructure and authority an AI engine needs to read you, trust you, and
            choose you.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {/* Large card - Machine-readable */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-2 group relative p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-600 hover:scale-[1.02] transition-all duration-300 overflow-hidden"
          >
            <div className="flex items-start justify-between mb-8">
              <div>
                <div className="p-2 rounded-lg bg-zinc-800 w-fit mb-4">
                  <Code className="w-5 h-5 text-zinc-400" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Readable for machines</h3>
                <p className="text-zinc-400 text-sm max-w-md">
                  We structure your data — catalog, specs, capabilities — so engines read you without guessing. Schema,
                  entities and feeds, kept in sync.
                </p>
              </div>
              <SystemStatus />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { value: "100%", label: "machine-readable" },
                { value: "JSON-LD", label: "schema layer" },
                { value: "0", label: "schema drift" },
                { value: "24/7", label: "kept in sync" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-xs text-zinc-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Authority */}
          <motion.div
            variants={itemVariants}
            className="group relative p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-600 hover:scale-[1.02] transition-all duration-300"
          >
            <div className="p-2 rounded-lg bg-zinc-800 w-fit mb-4">
              <ShieldCheck className="w-5 h-5 text-zinc-400" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Trustworthy as a source</h3>
            <p className="text-zinc-400 text-sm">
              AI cites who it trusts. We build the authority — content, entity, freshness, third-party signals — that
              turns structure into real citations.
            </p>
          </motion.div>

          {/* Share of Model */}
          <motion.div
            variants={itemVariants}
            className="group relative p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-600 hover:scale-[1.02] transition-all duration-300"
          >
            <div className="p-2 rounded-lg bg-zinc-800 w-fit mb-4">
              <ChartLine className="w-5 h-5 text-zinc-400" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">A position we defend</h3>
            <p className="text-zinc-400 text-sm mb-4">
              We measure how often AI names you vs your competitors, every month, and defend that position as the models
              shift.
            </p>
            <AnimatedChart />
            <div className="flex items-center gap-2 text-emerald-500 text-sm mt-2">
              <span className="font-mono">monthly report</span>
            </div>
          </motion.div>

          {/* Agent-ready */}
          <motion.div
            variants={itemVariants}
            className="group relative p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-600 hover:scale-[1.02] transition-all duration-300"
          >
            <div className="p-2 rounded-lg bg-zinc-800 w-fit mb-4">
              <Bot className="w-5 h-5 text-zinc-400" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Eligible for agents</h3>
            <p className="text-zinc-400 text-sm mb-4">
              What&apos;s next is already coming: agents that don&apos;t just cite you, they act with you. We get your
              data ready for an agent to query — and tomorrow, to buy.
            </p>
            <div className="flex items-center gap-2 text-emerald-500 text-sm">
              <span className="font-mono">agent-ready · MCP</span>
            </div>
          </motion.div>

          {/* Engines covered */}
          <motion.div
            variants={itemVariants}
            className="group relative p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-600 hover:scale-[1.02] transition-all duration-300"
          >
            <div className="p-2 rounded-lg bg-zinc-800 w-fit mb-4">
              <Plug className="w-5 h-5 text-zinc-400" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Where we make you visible</h3>
            <p className="text-zinc-400 text-sm mb-4">
              We track and optimize across the engines your buyers actually ask.
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-1 text-xs bg-zinc-800 rounded text-zinc-400">ChatGPT</span>
              <span className="px-2 py-1 text-xs bg-zinc-800 rounded text-zinc-400">Perplexity</span>
              <span className="px-2 py-1 text-xs bg-zinc-800 rounded text-zinc-400">Gemini</span>
              <span className="px-2 py-1 text-xs bg-zinc-800 rounded text-zinc-400">Claude</span>
              <span className="px-2 py-1 text-xs bg-zinc-800 rounded text-zinc-400">Google AI Overviews</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
