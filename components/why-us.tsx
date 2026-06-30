"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Settings, Award } from "lucide-react"

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

export function WhyUs() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="why-us" ref={ref} className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
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
            <span className="block">Engineering meets authority.</span>
            <span className="block text-zinc-500">The combination almost nobody offers.</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Most agencies just write content. Most dev shops just write code. Getting picked by AI takes both — under
            one roof.
          </p>
        </motion.div>

        {/* Two cards with + between them */}
        <div className="flex flex-col md:flex-row items-stretch justify-center gap-4 md:gap-0 mb-16">
          {/* Card A — Engineering */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="group relative p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-600 hover:scale-[1.02] transition-all duration-300 flex-1 max-w-md mx-auto md:mx-0"
          >
            <div className="p-2 rounded-lg bg-zinc-800 w-fit mb-4">
              <Settings className="w-5 h-5 text-zinc-400" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Data engineering</h3>
            <p className="text-zinc-400 text-sm mb-4">
              We structure your data so machines can read it without guessing — schema, entities, feeds, and the path to
              agent-ready.
            </p>
            <div className="flex items-center gap-2 text-emerald-500 text-sm">
              <span className="font-mono">structure</span>
            </div>
          </motion.div>

          {/* Plus sign */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex items-center justify-center md:px-6 py-4 md:py-0"
          >
            <span
              className="text-4xl font-bold text-emerald-500"
              style={{ fontFamily: "var(--font-cal-sans)" }}
            >
              +
            </span>
          </motion.div>

          {/* Card B — Authority */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.1 }}
            className="group relative p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-600 hover:scale-[1.02] transition-all duration-300 flex-1 max-w-md mx-auto md:mx-0"
          >
            <div className="p-2 rounded-lg bg-zinc-800 w-fit mb-4">
              <Award className="w-5 h-5 text-zinc-400" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">SEO authority</h3>
            <p className="text-zinc-400 text-sm mb-4">
              We build the trust signals — content, entity, freshness, third-party mentions — that turn structure into
              real citations.
            </p>
            <div className="flex items-center gap-2 text-emerald-500 text-sm">
              <span className="font-mono">trust</span>
            </div>
          </motion.div>
        </div>

        {/* Closing line */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center text-2xl sm:text-3xl font-bold"
          style={{ fontFamily: "var(--font-cal-sans)" }}
        >
          <span className="text-white">Structure + trust = </span>
          <span className="text-emerald-400">the name the AI picks is yours.</span>
        </motion.p>
      </div>
    </section>
  )
}
