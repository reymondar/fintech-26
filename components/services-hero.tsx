"use client"

import { motion } from "framer-motion"

export function ServicesHero() {
  return (
    <section className="relative px-4 pt-36 pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-50 via-zinc-50 to-zinc-100 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-2 mb-6"
        >
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-600">Servicios</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6"
          style={{ fontFamily: "var(--font-cal-sans)" }}
        >
          <span className="text-zinc-900">Lo que realmente construimos.</span>{" "}
          <span className="text-zinc-400">La visibilidad en IA (GEO) es la base. La ingeniería es todo lo que construimos encima.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg text-zinc-500 max-w-3xl leading-relaxed"
        >
          No es un sitio web más bonito. Es la capa de datos, la autoridad y los sistemas que hacen que la IA te lea,
          confíe en ti y te elija.
        </motion.p>
      </div>
    </section>
  )
}
