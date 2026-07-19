"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function FinalCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="audit" className="py-12 px-4">
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
          <span className="text-zinc-900">Deja de especular:</span>{" "}
          <span className="text-zinc-400">descubre si la IA te está quitando clientes.</span>
        </h2>
        <p className="text-lg sm:text-xl text-zinc-500 mb-12 max-w-2xl mx-auto">
          Reserva la llamada. Ejecutamos delante de ti las preguntas que tus compradores le hacen a la IA, contra tus competidores reales. Si ya te recomienda, te lo diremos y no necesitas nada más. Si no — sabrás exactamente qué te está costando y cuál es el primer paso.
        </p>

        <Button
          asChild
          size="lg"
          className="shimmer-btn bg-zinc-900 text-white hover:bg-zinc-800 rounded-full px-8 h-14 text-base font-medium shadow-lg shadow-zinc-900/10"
        >
          <a href="#audit">
            Reservar diagnóstico gratis
            <ArrowRight className="ml-2 w-5 h-5" />
          </a>
        </Button>

        <p className="mt-8 text-sm text-zinc-500">20 minutos · sin tarjeta · sin compromiso</p>
      </motion.div>
    </section>
  )
}
