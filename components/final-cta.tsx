"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export function FinalCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="audit" className="py-24 px-4">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2
          className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
          style={{ fontFamily: "var(--font-cal-sans)" }}
        >
          <span className="text-zinc-900">Descubre en 20 minutos si la IA te ve.</span>{" "}
          <span className="text-zinc-400">Gratis, sin tarjeta.</span>
        </h2>
        <p className="text-lg sm:text-xl text-zinc-500 mb-12 max-w-2xl mx-auto">
          Prompts reales, motores reales, tus competidores reales. Mira exactamente dónde estás frente a los nombres que la IA recomienda hoy.
        </p>

        {/* Calendario embebido — reemplazar src con tu link de Cal.com / Calendly */}
        <div className="max-w-xl mx-auto rounded-2xl overflow-hidden border border-zinc-200 shadow-sm bg-white">
          <iframe
            src="https://cal.com"
            className="w-full border-0"
            style={{ height: "600px" }}
            title="Agenda tu auditoría gratis"
          />
        </div>

        <p className="mt-8 text-sm text-zinc-500">Auditoría gratis · sin tarjeta de crédito · resultados en días.</p>
      </motion.div>
    </section>
  )
}
