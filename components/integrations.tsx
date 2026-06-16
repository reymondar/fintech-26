"use client"

import type { LucideIcon } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import {
  LayoutGrid,
  AppWindow,
  BarChart3,
  Share2,
  Mail,
  Users,
  Workflow,
  Bot,
  Database,
} from "lucide-react"
import { Button } from "@/components/ui/button"

type Integration = {
  name: string
  Icon: LucideIcon
  color: string
}

const integrations: Integration[] = [
  { name: "Microsoft 365", Icon: LayoutGrid, color: "text-sky-400" },
  { name: "Power Apps", Icon: AppWindow, color: "text-violet-400" },
  { name: "Power BI", Icon: BarChart3, color: "text-amber-400" },
  { name: "SharePoint", Icon: Share2, color: "text-teal-400" },
  { name: "Outlook", Icon: Mail, color: "text-blue-400" },
  { name: "Teams", Icon: Users, color: "text-indigo-400" },
  { name: "n8n", Icon: Workflow, color: "text-orange-400" },
  { name: "OpenAI", Icon: Bot, color: "text-emerald-400" },
  { name: "Supabase", Icon: Database, color: "text-green-400" },
]

function IconTile({ Icon, color, name }: Integration) {
  return (
    <div className="group flex shrink-0 flex-col items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/80 px-6 py-5 shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-600">
      <Icon className={`h-7 w-7 sm:h-8 sm:w-8 ${color}`} strokeWidth={1.5} />
      <span className="text-xs font-medium text-zinc-400 group-hover:text-zinc-200 sm:text-sm">{name}</span>
    </div>
  )
}

function Marquee({ items }: { items: Integration[] }) {
  return (
    <div className="flex overflow-hidden">
      <div className="flex shrink-0 gap-5 pr-5 animate-marquee">
        {items.map((item) => (
          <IconTile key={item.name} {...item} />
        ))}
      </div>
      <div className="flex shrink-0 gap-5 pr-5 animate-marquee" aria-hidden="true">
        {items.map((item) => (
          <IconTile key={item.name} {...item} />
        ))}
      </div>
    </div>
  )
}

export function Integrations() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="integrations" ref={ref} className="overflow-hidden py-24 px-4">
      <div className="mx-auto max-w-3xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
          style={{ fontFamily: "var(--font-cal-sans)" }}
        >
          Integrates with your entire collaboration stack.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-6 max-w-xl text-pretty text-base text-zinc-400 sm:text-lg"
        >
          Connect Apex to Microsoft 365, SharePoint, Power BI, and more to keep your work in sync
          seamlessly.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex justify-center"
        >
          <Button
            variant="outline"
            size="lg"
            className="rounded-full border-zinc-800 bg-transparent px-8 text-base font-medium text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900 hover:text-white"
          >
            Explore Integrations
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative mt-20"
      >
        <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-24 bg-gradient-to-r from-zinc-950 to-transparent sm:w-40" />
        <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-24 bg-gradient-to-l from-zinc-950 to-transparent sm:w-40" />

        <Marquee items={integrations} />
      </motion.div>
    </section>
  )
}
