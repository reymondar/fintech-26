"use client"

// NOTA: página en BORRADOR. Copy pendiente de pulido final.
// 3 bloques de resultado + banda de posicionamiento tecnológico.
// No expone la metodología interna ni herramientas; sin cifras ni garantías.

import { m, useInView } from "framer-motion"
import { useRef } from "react"
import { Sparkles, ShoppingBag, Gauge, Check, ArrowRight } from "lucide-react"
import { useTranslation } from "@/components/locale-provider"

const blocks = [
  {
    num: "01",
    icon: Sparkles,
    title: "Que la IA te recomiende",
    outcome: "Entramos en las respuestas donde hoy recomiendan a tu competencia.",
    points: [
      "Diagnóstico de cómo te ve la IA en las preguntas de compra de tu categoría.",
      "Catálogo y contenido preparados para que los modelos te entiendan y te citen.",
      "Autoridad y presencia en las fuentes que la IA consulta.",
    ],
  },
  {
    num: "02",
    icon: ShoppingBag,
    title: "Que la demanda termine en venta",
    outcome: "Cuidamos al comprador que llega decidido para que no se pierda en el camino.",
    points: [
      "Captación y atención para que ninguna consulta caiga en el vacío.",
      "Páginas y experiencia adaptadas a cada visitante para convertir.",
      "Conexión con tu equipo comercial y tu CRM, con el origen trazado.",
    ],
  },
  {
    num: "03",
    icon: Gauge,
    title: "Tu capa de optimización, siempre encendida",
    outcome: "Una capa de IA sobre tu negocio que mide, aprende y mejora sola.",
    points: [
      "Automatizaciones y agentes de IA que trabajan alrededor de tu operación.",
      "Medición que conecta lo que hacemos con lo que vendes.",
      "Mejora continua: qué mantener, qué probar y qué sigue.",
    ],
  },
]

const capabilities = [
  "IA aplicada",
  "Automatización",
  "Agentes de IA",
  "Integración de datos",
  "Conversión",
  "Analítica",
]

function Block({ b, i }: { b: (typeof blocks)[number]; i: number }) {
  const { t } = useTranslation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const Icon = b.icon
  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.05 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col rounded-2xl bg-white border border-zinc-200 shadow-sm p-6 sm:p-7"
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-sm text-zinc-400 w-6 shrink-0">{b.num}</span>
        <div className="p-2 rounded-lg bg-zinc-100 shrink-0">
          <Icon className="w-5 h-5 text-emerald-600" strokeWidth={1.5} />
        </div>
      </div>
      <h3 className="text-lg font-semibold text-zinc-900 leading-snug mb-2">{t(b.title)}</h3>
      <p className="text-[15px] text-zinc-600 leading-relaxed mb-5">{t(b.outcome)}</p>
      <ul className="mt-auto flex flex-col gap-3">
        {b.points.map(p => (
          <li key={p} className="flex items-start gap-2.5">
            <Check className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" strokeWidth={2} />
            <span className="text-sm text-zinc-500 leading-relaxed">{t(p)}</span>
          </li>
        ))}
      </ul>
    </m.div>
  )
}

export function ServiciosContent() {
  const { t } = useTranslation()
  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true, margin: "-100px" })
  const bandRef = useRef(null)
  const bandInView = useInView(bandRef, { once: true, margin: "-80px" })

  return (
    <main className="min-h-screen bg-zinc-50">
      {/* Hero */}
      <section className="relative px-4 pt-36 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-50 via-zinc-50 to-zinc-100 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto" ref={heroRef}>
          <m.span
            initial={{ opacity: 0, y: 12 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-600 mb-6 block"
          >
            {t("Servicios")}
          </m.span>
          <m.h1
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6"
            style={{ fontFamily: "var(--font-cal-sans)" }}
          >
            <span className="text-zinc-900">{t("Tu socio de tecnología e IA.")}</span>{" "}
            <span className="text-zinc-400">{t("Para que tu negocio venda más.")}</span>
          </m.h1>
          <m.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-zinc-500 max-w-2xl leading-relaxed"
          >
            {t("Construimos una capa de IA a medida alrededor de tu negocio — de la recomendación en los modelos hasta la venta — y la mantenemos aprendiendo mientras tu equipo se dedica a vender.")}
          </m.p>
        </div>
      </section>

      {/* 3 outcome blocks */}
      <section className="px-4 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          {blocks.map((b, i) => (
            <Block key={b.title} b={b} i={i} />
          ))}
        </div>
      </section>

      {/* Tech positioning band */}
      <section className="px-4 py-12">
        <m.div
          ref={bandRef}
          initial={{ opacity: 0, y: 24 }}
          animate={bandInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-6xl mx-auto rounded-3xl bg-zinc-900 p-8 sm:p-12"
        >
          <div className="max-w-3xl">
            <h2
              className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-4"
              style={{ fontFamily: "var(--font-instrument-sans)" }}
            >
              {t("El equipo de tecnología e IA que tu negocio no tiene dentro.")}
            </h2>
            <p className="text-[15px] sm:text-base text-zinc-400 leading-relaxed mb-8">
              {t("Montamos los sistemas que hacen que te encuentren, te elijan y te compren: IA aplicada, automatización y datos, conectados a tu operación comercial. Todo a medida, todo medido contra ventas.")}
            </p>
            <div className="flex flex-wrap gap-2.5">
              {capabilities.map(c => (
                <span
                  key={c}
                  className="px-3.5 py-1.5 rounded-full border border-zinc-700 bg-zinc-800/60 text-xs font-medium text-zinc-300"
                >
                  {t(c)}
                </span>
              ))}
            </div>
          </div>
        </m.div>
      </section>

      {/* Honesty */}
      <section className="px-4 py-10">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[15px] text-zinc-500 leading-relaxed">
            {t("Trabajamos con método y medimos cada paso. Lo que no hacemos es prometerte una posición fija en la IA ni un número de ventas: los modelos cambian, y quien te garantice eso te está mintiendo.")}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6"
            style={{ fontFamily: "var(--font-cal-sans)" }}
          >
            <span className="text-zinc-900">{t("Empieza por saber dónde estás.")}</span>
          </h2>
          <p className="text-lg text-zinc-500 mb-10 max-w-2xl mx-auto">
            {t("La revisión de 20 minutos es gratis: vemos tu tienda y qué recomienda la IA en tu categoría. De ahí sale el resto.")}
          </p>
          <a
            href="/auditoria"
            className="inline-flex items-center justify-center px-8 h-14 rounded-full bg-zinc-900 text-white text-base font-medium hover:bg-zinc-800 shadow-lg shadow-zinc-900/10 transition-colors"
          >
            {t("Audita tu tienda")} <ArrowRight className="ml-2 w-5 h-5" />
          </a>
        </div>
      </section>
    </main>
  )
}
