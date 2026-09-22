"use client"

import { useTranslation } from "@/components/locale-provider"

import { m, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

import { landingFaqs as faqs } from "@/lib/landing-copy"

export function FAQ() {
  const { t, locale } = useTranslation()

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  // Controlado: click abre/cierra como siempre; en desktop también se abre al pasar por encima.
  const [value, setValue] = useState<string>("")
  const canHover = useRef(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    canHover.current =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches
    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [])

  const hoverOpen = (v: string) => {
    if (!canHover.current) return
    if (timer.current) clearTimeout(timer.current)
    // pequeño retardo de intención para no abrir "de pasada"
    timer.current = setTimeout(() => setValue(v), 120)
  }
  const cancelHover = () => {
    if (timer.current) clearTimeout(timer.current)
  }

  return (
    <section id="faq" ref={ref} className="py-10 sm:py-14 px-4 scroll-mt-28">
      <div className="max-w-6xl mx-auto grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <m.div
          initial={{ opacity: 1, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="lg:sticky lg:top-32"
        >
          <span className="mb-6 inline-flex rounded-full border border-zinc-200 bg-white px-4 py-1.5 text-sm text-zinc-500 shadow-sm">FAQs</span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] text-zinc-900 mb-6"
            style={{ fontFamily: "var(--font-instrument-sans)" }}
          >
            <span className="block">{t("Lo que necesitas saber")}</span>
            <span className="block text-zinc-400">{t("antes de empezar.")}</span>
          </h2>
          <p className="text-sm leading-relaxed text-zinc-500">{locale === "es" ? "¿Tienes otra pregunta?" : "Have another question?"}{" "}<a href="mailto:contact@thestackhouse.io" className="font-medium text-emerald-700 underline-offset-4 hover:underline">{locale === "es" ? "Escríbenos" : "Get in touch"}</a></p>
        </m.div>

        <m.div
          initial={{ opacity: 1, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Accordion type="single" collapsible value={value} onValueChange={setValue} className="w-full space-y-3">
            {faqs.map((faq, i) => {
              const itemValue = `item-${i}`
              return (
                <AccordionItem
                  key={i}
                  value={itemValue}
                  onMouseEnter={() => hoverOpen(itemValue)}
                  onMouseLeave={cancelHover}
                  className="rounded-2xl border border-zinc-200 last:border-b bg-gradient-to-br from-white to-zinc-100/60 shadow-sm transition-colors data-[state=open]:border-emerald-200 data-[state=open]:bg-emerald-50/40"
                >
                  <AccordionTrigger className="rounded-2xl px-5 py-6 sm:px-6 text-left text-zinc-900 hover:text-emerald-700 hover:no-underline text-base font-medium focus-visible:ring-emerald-500/40 [&>svg]:text-zinc-400 [&[data-state=open]>svg]:text-emerald-600">
                    {t(faq.question)}
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-6 sm:px-6 text-zinc-500 text-sm leading-relaxed">
                    {t(faq.answer)}
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
        </m.div>
      </div>
    </section>
  )
}
