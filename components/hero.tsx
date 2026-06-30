"use client"

import { motion } from "framer-motion"
import { ArrowRight, MessageSquare, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const textRevealVariants = {
  hidden: { y: "100%" },
  visible: (i: number) => ({
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      delay: i * 0.1,
    },
  }),
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-950 to-zinc-900 pointer-events-none" />

      {/* Subtle radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-zinc-800/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 pulse-glow" />
          <span className="text-sm text-zinc-400">AI Visibility · 2026</span>
        </motion.div>

        {/* Headline with text mask animation */}
        <h1
          className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6"
          style={{ fontFamily: "var(--font-cal-sans), sans-serif" }}
        >
          <span className="block overflow-hidden">
            <motion.span className="block" variants={textRevealVariants} initial="hidden" animate="visible" custom={0}>
              When your client asks the AI,
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="block text-zinc-500"
              variants={textRevealVariants}
              initial="hidden"
              animate="visible"
              custom={1}
            >
              do you show up or your competitor?
            </motion.span>
          </span>
        </h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Google stopped sending traffic. Now your buyers ask and the AI answers with a name. We make you readable,
          trustworthy, and eligible for AI engines — so that name is yours.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <Button
            size="lg"
            className="shimmer-btn bg-white text-zinc-950 hover:bg-zinc-200 rounded-full px-8 h-12 text-base font-medium shadow-lg shadow-white/10"
          >
            Find out if AI sees you
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </motion.div>

        {/* Chatbot Response Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mx-auto max-w-[440px] rounded-2xl bg-zinc-900/80 border border-zinc-800 p-6 text-left"
        >
          {/* Query row */}
          <div className="flex items-center gap-2 mb-5">
            <MessageSquare className="w-4 h-4 text-zinc-500 shrink-0" strokeWidth={1.5} />
            <span className="text-sm text-zinc-500">"Who is the best provider in [your industry]?"</span>
          </div>

          {/* Results */}
          <div className="flex flex-col gap-3 mb-4">
            <div className="flex items-center gap-3">
              <Check className="w-4 h-4 text-emerald-500 shrink-0" strokeWidth={2} />
              <span className="text-sm text-zinc-300">Competitor A</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="w-4 h-4 text-emerald-500 shrink-0" strokeWidth={2} />
              <span className="text-sm text-zinc-300">Competitor B</span>
            </div>
            <div className="flex items-center gap-3">
              <X className="w-4 h-4 text-red-500 shrink-0" strokeWidth={2} />
              <span className="text-sm text-zinc-600 line-through">Your company</span>
            </div>
          </div>

          {/* Microcopy */}
          <p className="text-xs text-red-400/70">Today, you don't show up.</p>
        </motion.div>
      </div>
    </section>
  )
}
