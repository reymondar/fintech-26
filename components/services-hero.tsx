"use client"

import { motion } from "framer-motion"

export function ServicesHero() {
  return (
    <section className="relative px-4 pt-36 pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-950 to-zinc-900 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-2 mb-6"
        >
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-400">Services</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6"
          style={{ fontFamily: "var(--font-cal-sans)" }}
        >
          <span className="text-white">What we actually build.</span>{" "}
          <span className="text-zinc-500">GEO is the foundation. Engineering is everything we build on top.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg text-zinc-400 max-w-3xl leading-relaxed"
        >
          Not a prettier website. The data layer, the authority, and the systems that make AI read you, trust you, and
          choose you.
        </motion.p>
      </div>
    </section>
  )
}
