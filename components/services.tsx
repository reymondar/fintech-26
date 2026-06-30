"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Code, ShieldCheck, Bot } from "lucide-react"

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

const services = [
  {
    icon: Code,
    title: "Readable by machines",
    description:
      "We structure your data — catalog, specs, capabilities — so AI can read it without guessing. Schema, entities, and feeds that engines understand on the first pass.",
    accent: "JSON-LD · schema · feeds",
  },
  {
    icon: ShieldCheck,
    title: "Trustworthy as a source",
    description:
      "AI cites those it trusts. We build the authority — content, entity, freshness, third-party signals — that turns your infrastructure into real citations.",
    accent: "authority · E-E-A-T · citability",
  },
  {
    icon: Bot,
    title: "Eligible for agents",
    description:
      "The next step is already here: agents that don't just cite you, but transact with you. We make your data ready so an agent can query you — and tomorrow, buy from you.",
    accent: "agent-ready · MCP",
  },
]

export function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="services" className="py-24 px-4">
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
            <span className="block text-zinc-500">The three things AI needs to choose you.</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Having a great website isn&apos;t enough. AI has to be able to read you, trust you, and soon, transact with
            you. We build all three layers.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className="group relative p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-600 hover:scale-[1.02] transition-all duration-300"
            >
              <div className="p-2 rounded-lg bg-zinc-800 w-fit mb-4">
                <service.icon className="w-5 h-5 text-zinc-400" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{service.title}</h3>
              <p className="text-zinc-400 text-sm mb-4">{service.description}</p>
              <div className="flex items-center gap-2 text-emerald-500 text-sm">
                <span className="font-mono">{service.accent}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
