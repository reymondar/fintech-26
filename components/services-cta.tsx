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
          <span className="text-white">Start with the audit.</span>{" "}
          <span className="text-zinc-500">See exactly where you stand.</span>
        </h2>
        <p className="text-lg sm:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto">
          Real prompts, real engines, your real competitors. No commitment — just a clear picture of whether AI sees
          you.
        </p>

        <div className="flex items-center justify-center">
          <Button
            asChild
            size="lg"
            className="shimmer-btn bg-white text-zinc-950 hover:bg-zinc-200 rounded-full px-8 h-14 text-base font-medium shadow-lg shadow-white/20"
          >
            <a href="#audit">
              Get your free audit
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </Button>
        </div>

        <p className="mt-8 text-sm text-zinc-500">Free · no credit card · results in days.</p>
      </motion.div>
    </section>
  )
}
