"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Search } from "lucide-react"

const queries = [
  "Cuáles son los mejores hoteles para quedarse en Murcia por menos de 200 euros?",
  "Necesito una cuerda y pies de gato para iniciarme en escalada, dónde compro online que no sea Decathlon?",
  "Cuáles son las tostadoras de café mejor puntuadas para casa?",
  "Alternativas profesionales a HubSpot con soporte nativo en español",
  "Cuánto puede salir hacerse una rinoplastia en Murcia? Dime clínicas",
  "Precio real de un implante dental en Valencia? Ordéname clínicas de mejor a peor",
  "Dónde comprar suplementos deportivos online que no sea Amazon?",
  "Merece la pena pagar 180 la noche en ese hotel de Jávea? Dame alternativas cerca",
]

function QueryTile({ text }: { text: string }) {
  return (
    <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-5 py-4 shadow-sm">
      <Search className="h-4 w-4 text-zinc-400 shrink-0" strokeWidth={1.5} />
      <span className="text-sm text-zinc-700 whitespace-nowrap">&ldquo;{text}&rdquo;</span>
    </div>
  )
}

function Marquee({ items }: { items: string[] }) {
  return (
    <div className="flex overflow-hidden">
      <div className="flex shrink-0 gap-5 pr-5 animate-marquee">
        {items.map((item) => (
          <QueryTile key={item} text={item} />
        ))}
      </div>
      <div className="flex shrink-0 gap-5 pr-5 animate-marquee" aria-hidden="true">
        {items.map((item) => (
          <QueryTile key={item} text={item} />
        ))}
      </div>
    </div>
  )
}

export function Integrations() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="overflow-hidden py-12 px-4">
      <div className="mx-auto max-w-3xl text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl sm:text-4xl font-bold tracking-tight mb-6"
          style={{ fontFamily: "var(--font-instrument-sans)" }}
        >
          <span className="block text-zinc-900">~29.000 preguntas cada segundo.</span>
          <span className="block text-zinc-400">La única pregunta es si tú estás en ellas.</span>
        </motion.h2>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative"
      >
        <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-24 bg-gradient-to-r from-zinc-50 to-transparent sm:w-40" />
        <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-24 bg-gradient-to-l from-zinc-50 to-transparent sm:w-40" />

        <Marquee items={queries} />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="text-center text-lg text-zinc-500 mt-12 max-w-2xl mx-auto leading-relaxed"
      >
        Entra en la conversación. Deja que tus clientes te encuentren.
      </motion.p>
    </section>
  )
}
