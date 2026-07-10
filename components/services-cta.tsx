"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ServicesCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-24 px-4">
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
          <span className="text-zinc-900">Empieza con la auditoría.</span>{" "}
          <span className="text-zinc-400">Mira exactamente dónde estás.</span>
        </h2>
        <p className="text-lg sm:text-xl text-zinc-500 mb-10 max-w-2xl mx-auto">
          Prompts reales, motores reales, tus competidores reales. Sin compromiso — solo una imagen clara de si la IA te ve.
        </p>

        <div className="flex items-center justify-center">
          <Button
            asChild
            size="lg"
            className="shimmer-btn bg-zinc-900 text-white hover:bg-zinc-800 rounded-full px-8 h-14 text-base font-medium shadow-lg shadow-zinc-900/10"
          >
            <a href="/#audit">
              Obtén tu auditoría gratis
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </Button>
        </div>

        <p className="mt-8 text-sm text-zinc-500">Gratis · sin tarjeta de crédito · resultados en días.</p>
      </motion.div>
    </section>
  )
}
