"use client"

import { motion, useInView } from "framer-motion"
import { useEffect, useMemo, useRef, useState } from "react"

const stats = [
  { value: "−33%", label: "Google search traffic to websites, last year" },
  { value: "~60%", label: "Searches that end with zero clicks" },
  { value: "<1%", label: "Of that lost traffic chatbots send back" },
  { value: "−97%", label: "Traffic drop at some leading publishers" },
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

// Seeded PRNG (mulberry32) — deterministic output so server and client
// markup match, while still producing organic, non-gridded distributions.
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
    // Bias horizontal positions toward clustering: square the random value
    // so gaps and clusters emerge instead of even spacing.
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
  useEffect(() => setMounted(true), [])

  const columnDrops = useMemo(() => generateDrops(28, 1337), [])
  const ambientDrops = useMemo(() => generateDrops(22, 90210), [])

  return (
    <section id="infrastructure" ref={ref} className="relative overflow-hidden px-4 py-24 sm:py-32">
      {mounted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1.2 }}
          className="pointer-events-none absolute inset-0 z-0 lg:hidden"
        >
          <Rain drops={ambientDrops} className="opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/40 to-zinc-950/70" />
        </motion.div>
      )}

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-8">
          {/* Left: copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-2"
            >
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-400">The Shift</span>
              <span className="h-2 w-2 rounded-full bg-emerald-500 pulse-glow" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 text-balance text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl"
              style={{ fontFamily: "var(--font-cal-sans)" }}
            >
              The click is dying.{" "}
              <span className="text-zinc-500">Google stopped sending traffic — and no one is getting it back.</span>
            </motion.h2>

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

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 gap-x-6 gap-y-10 lg:mt-28 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.value}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <p
                className="text-4xl font-bold tracking-tight text-emerald-400 sm:text-5xl"
                style={{ fontFamily: "var(--font-cal-sans)" }}
              >
                {stat.value}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-500 sm:text-base">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
