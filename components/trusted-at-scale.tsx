"use client"

import { motion, useInView, AnimatePresence } from "framer-motion"
import { useEffect, useMemo, useRef, useState } from "react"

const steps = [
  {
    number: "01",
    title: "Diagnóstico en vivo · gratis · 20 min",
    description:
      "Ejecutamos delante de ti las preguntas que tus compradores le hacen a la IA, contra tus competidores reales. Sales de la llamada sabiendo si la IA te ve y si tiene sentido ir más allá. Si no lo tiene, te lo decimos y ahí acaba.",
  },
  {
    number: "02",
    title: "Auditoría completa · 7–10 días",
    description:
      "Tu visibilidad medida con método, la atribución de tu caída de tráfico y un plan de 30 días con las acciones que de verdad mueven la aguja. Precio cerrado antes de empezar.",
  },
  {
    number: "03",
    title: "Sesión de entrega · 45 min",
    description:
      "Repasamos el informe contigo y acordamos por dónde empezar. Sin letra pequeña: la auditoría no incluye implementación — por eso el diagnóstico es imparcial.",
  },
]

type Drop = {
  left: number
  top: number
  height: number
  width: number
  opacity: number
  duration: number
  delay: number
  fall: number
  dot: number
}

function makeRng(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function generateDrops(count: number, seed: number): Drop[] {
  const rng = makeRng(seed)
  const range = (min: number, max: number) => min + rng() * (max - min)
  return Array.from({ length: count }, () => ({
    left: Math.pow(rng(), 1.4) * 100,
    top: range(-5, 80),
    height: range(40, 170),
    width: rng() > 0.8 ? 1.5 : 1,
    opacity: range(0.25, 0.85),
    duration: range(3, 7),
    delay: range(0, 4),
    fall: range(6, 22),
    dot: range(4, 8),
  }))
}

function Rain({ drops, className = "" }: { drops: Drop[]; className?: string }) {
  return (
    <div className={`absolute inset-0 ${className}`} aria-hidden="true">
      {drops.map((d, i) => (
        <motion.div
          key={i}
          className="absolute flex flex-col items-center"
          style={{ left: `${d.left}%`, top: `${d.top}%`, opacity: d.opacity }}
          initial={{ opacity: 0, y: -24 }}
          animate={{
            opacity: [0, d.opacity, d.opacity, d.opacity * 0.35],
            y: [-24, 0, 0, d.fall],
          }}
          transition={{
            duration: d.duration,
            delay: d.delay,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          <div
            className="bg-gradient-to-b from-transparent to-emerald-500/70"
            style={{ height: d.height, width: d.width }}
          />
          <span
            className="-mt-px rounded-full bg-emerald-500"
            style={{ height: d.dot, width: d.dot }}
          />
        </motion.div>
      ))}
    </div>
  )
}

export function TrustedAtScale() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [mounted, setMounted] = useState(false)
  const [openStep, setOpenStep] = useState(0)
  useEffect(() => setMounted(true), [])

  const columnDrops = useMemo(() => generateDrops(28, 1337), [])
  const ambientDrops = useMemo(() => generateDrops(22, 90210), [])

  return (
    <section id="how-it-works" ref={ref} className="relative overflow-hidden px-4 py-12">
      {mounted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1.2 }}
          className="pointer-events-none absolute inset-0 z-0 lg:hidden"
        >
          <Rain drops={ambientDrops} className="opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-50/40 to-zinc-50/70" />
        </motion.div>
      )}

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-8">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-2"
            >
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-600">Cómo funciona</span>
              <span className="h-2 w-2 rounded-full bg-emerald-500 pulse-glow" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 text-balance text-4xl font-bold leading-[1.1] tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl"
              style={{ fontFamily: "var(--font-cal-sans)" }}
            >
              De &quot;no sé qué está pasando&quot;{" "}
              <span className="text-zinc-400">a plan de acción, en tres pasos.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 text-zinc-500 text-base sm:text-lg leading-relaxed max-w-lg"
            />
          </div>

          {mounted && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative hidden h-[28rem] lg:block"
            >
              <Rain drops={columnDrops} />
            </motion.div>
          )}
        </div>

        {/* Steps accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 lg:mt-28 flex flex-col gap-0"
        >
          {steps.map((step, i) => {
            const isOpen = openStep === i
            return (
              <button
                key={step.number}
                onClick={() => setOpenStep(i)}
                className="text-left border-t border-zinc-200 last:border-b py-6 flex items-start gap-6 group cursor-pointer"
              >
                <span
                  className={`text-3xl font-bold tracking-tight transition-colors ${isOpen ? "text-emerald-500" : "text-zinc-300"}`}
                  style={{ fontFamily: "var(--font-cal-sans)" }}
                >
                  {step.number}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className={`text-lg font-semibold transition-colors ${isOpen ? "text-zinc-900" : "text-zinc-500"}`}>
                    {step.title}
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.p
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="text-zinc-500 text-sm leading-relaxed mt-2 overflow-hidden"
                      >
                        {step.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </button>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
