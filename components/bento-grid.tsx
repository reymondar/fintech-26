"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { FileSearch, FileText, Inbox, PenLine, Plug } from "lucide-react"

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
            We build where you already work
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            No new platform, no migration. We meet your operation inside the tools your team already opens every day.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {/* Large card - Payment Operations */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-2 group relative p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-600 hover:scale-[1.02] transition-all duration-300 overflow-hidden"
          >
            <div className="flex items-start justify-between mb-8">
              <div>
                <div className="p-2 rounded-lg bg-zinc-800 w-fit mb-4">
                  <FileSearch className="w-5 h-5 text-zinc-400" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Contract analysis</h3>
                <p className="text-zinc-400 text-sm max-w-md">
                  Read every contract. Miss nothing. Your team stops scanning 40-page agreements for the three clauses
                  that matter. Contracts come back flagged, summarized, and ready to review.
                </p>
              </div>
              <SystemStatus />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { value: "2 min", label: "per 40 pages" },
                { value: "100%", label: "clauses checked" },
                { value: "0", label: "missed renewals" },
                { value: "24/7", label: "turnaround" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-xs text-zinc-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Process Automation */}
          <motion.div
            variants={itemVariants}
            className="group relative p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-600 hover:scale-[1.02] transition-all duration-300"
          >
            <div className="p-2 rounded-lg bg-zinc-800 w-fit mb-4">
              <FileText className="w-5 h-5 text-zinc-400" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Document summaries</h3>
            <p className="text-zinc-400 text-sm">
              The summary, not the stack. Long documents come back as the version your team actually needs to read. Key
              points, risks, and numbers, pulled out and ready.
            </p>
          </motion.div>

          {/* Integrations */}
          <motion.div
            variants={itemVariants}
            className="group relative p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-600 hover:scale-[1.02] transition-all duration-300"
          >
            <div className="p-2 rounded-lg bg-zinc-800 w-fit mb-4">
              <Inbox className="w-5 h-5 text-zinc-400" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Intake &amp; approvals</h3>
            <p className="text-zinc-400 text-sm mb-4">
              Requests in. Approvals out. No more chasing sign-offs across inboxes. Requests route themselves, approvals
              happen on time, and nothing sits forgotten in someone&apos;s folder.
            </p>
            <AnimatedChart />
          </motion.div>

          {/* Phase 2 Development */}
          <motion.div
            variants={itemVariants}
            className="group relative p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-600 hover:scale-[1.02] transition-all duration-300"
          >
            <div className="p-2 rounded-lg bg-zinc-800 w-fit mb-4">
              <PenLine className="w-5 h-5 text-zinc-400" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Clause &amp; document drafting</h3>
            <p className="text-zinc-400 text-sm mb-4">
              First drafts in minutes. Standard clauses, letters, and documents, drafted from your own templates and
              language. Your team edits instead of starting from a blank page.
            </p>
            <div className="flex items-center gap-2 text-emerald-500 text-sm">
              <span className="font-mono">~2 min</span>
              <span className="text-zinc-500">to first draft</span>
            </div>
          </motion.div>

          {/* Compliance */}
          <motion.div
            variants={itemVariants}
            className="group relative p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-600 hover:scale-[1.02] transition-all duration-300"
          >
            <div className="p-2 rounded-lg bg-zinc-800 w-fit mb-4">
              <Plug className="w-5 h-5 text-zinc-400" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Integrations</h3>
            <p className="text-zinc-400 text-sm mb-4">
              Everything, where you already work. All of this lives inside the tools your team opens every morning. No
              new platform, no migration, nothing to relearn.
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-1 text-xs bg-zinc-800 rounded text-zinc-400">Microsoft 365</span>
              <span className="px-2 py-1 text-xs bg-zinc-800 rounded text-zinc-400">Power BI</span>
              <span className="px-2 py-1 text-xs bg-zinc-800 rounded text-zinc-400">SharePoint</span>
              <span className="px-2 py-1 text-xs bg-zinc-800 rounded text-zinc-400">Outlook</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
