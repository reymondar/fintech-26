"use client"

import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react"
import { SmoothScroll } from "@/components/smooth-scroll"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const metrics = [
  { value: "0%", after: "34%", label: "Share of Model" },
  { value: "0", after: "127", label: "Citaciones IA / mes" },
  { value: "—", after: "4.2×", label: "ROI en 6 meses" },
  { value: "0", after: "38", label: "Leads cualificados desde IA" },
]

const timeline = [
  { month: "Mes 1", event: "Auditoría + capa de datos desplegada" },
  { month: "Mes 2", event: "Contenido de autoridad en vivo, primeras citaciones" },
  { month: "Mes 3", event: "Share of Model medible al 12%" },
  { month: "Mes 4", event: "Infraestructura agent-ready completa" },
  { month: "Mes 6", event: "34% Share of Model, 38 leads cualificados" },
]

export default function CaseStudyTemplate() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-zinc-50">
        <Navbar />

        {/* Hero */}
        <section className="relative px-4 pt-36 pb-16">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <a
                href="/#cases"
                className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-900 transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                Todos los casos
              </a>

              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 text-xs font-mono bg-emerald-50 text-emerald-700 rounded-full">
                  B2B Industrial
                </span>
                <span className="text-xs text-zinc-400">Proyecto de 6 meses</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-zinc-900 mb-6"
              style={{ fontFamily: "var(--font-cal-sans)" }}
            >
              De invisible a la marca que la IA recomienda en manufactura de precisión.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-zinc-500 leading-relaxed max-w-2xl"
            >
              Un fabricante de piezas de precisión estaba perdiendo cotizaciones frente a competidores que aparecían en las respuestas de IA.
              En seis meses, los convertimos en la marca que ChatGPT, Perplexity y Gemini recomiendan primero.
            </motion.p>
          </div>
        </section>

        {/* Hero image */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="px-4 pb-16"
        >
          <div className="max-w-5xl mx-auto">
            <div className="relative aspect-[21/9] rounded-2xl overflow-hidden bg-zinc-200 border border-zinc-200">
              <Image
                src="/placeholder.jpg"
                alt="Caso de estudio"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </motion.section>

        {/* Metrics bar */}
        <section className="px-4 pb-20">
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-6 rounded-2xl bg-white border border-zinc-200 shadow-sm">
              {metrics.map((m) => (
                <div key={m.label} className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <span className="text-sm text-zinc-400 line-through">{m.value}</span>
                    <ChevronRight className="w-3 h-3 text-zinc-300" />
                    <span
                      className="text-2xl font-bold text-emerald-600"
                      style={{ fontFamily: "var(--font-cal-sans)" }}
                    >
                      {m.after}
                    </span>
                  </div>
                  <span className="text-xs text-zinc-500">{m.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Article body */}
        <article className="px-4 pb-24">
          <div className="max-w-3xl mx-auto">

            {/* The Challenge */}
            <section className="mb-16">
              <h2
                className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-4"
                style={{ fontFamily: "var(--font-cal-sans)" }}
              >
                El desafío
              </h2>
              <p className="text-zinc-600 leading-relaxed mb-4">
                [Cliente] llevaba más de 20 años como proveedor de confianza en manufactura CNC de precisión.
                Su reputación estaba basada en el boca a boca y ferias — pero el comportamiento de compra estaba cambiando.
              </p>
              <p className="text-zinc-600 leading-relaxed mb-4">
                Los equipos de compras de sus cuentas objetivo ya no buscaban proveedores en Google.
                Le preguntaban a ChatGPT y Perplexity: <em>"¿Quién fabrica componentes de titanio de precisión
                con certificación AS9100?"</em> — y obtenían respuestas que no incluían a [Cliente].
              </p>
              <p className="text-zinc-600 leading-relaxed">
                Su sitio web tenía la información, pero nada estaba estructurado para que las máquinas lo leyeran.
                La IA no podía interpretar sus capacidades, certificaciones ni catálogo de materiales.
                Para los modelos, simplemente no existían.
              </p>
            </section>

            {/* Inline image */}
            <div className="mb-16 rounded-2xl overflow-hidden border border-zinc-200">
              <div className="relative aspect-[16/9] bg-zinc-100">
                <Image
                  src="/placeholder.jpg"
                  alt="Antes: resultados de IA sin el cliente"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="px-5 py-3 bg-white border-t border-zinc-200">
                <p className="text-xs text-zinc-400 italic">
                  Antes: preguntar a ChatGPT por fabricantes de precisión en su categoría no arrojaba ninguna mención de [Cliente].
                </p>
              </div>
            </div>

            {/* What we built */}
            <section className="mb-16">
              <h2
                className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-4"
                style={{ fontFamily: "var(--font-cal-sans)" }}
              >
                Lo que construimos
              </h2>
              <p className="text-zinc-600 leading-relaxed mb-4">
                Empezamos con nuestra auditoría estándar — pasando su marca por los cuatro motores de IA principales
                con consultas reales de compradores. El resultado confirmó lo que sospechaban: invisibilidad total.
              </p>
              <p className="text-zinc-600 leading-relaxed mb-6">
                A partir de ahí, construimos tres capas:
              </p>

              <div className="flex flex-col gap-4 mb-6">
                <div className="p-5 rounded-xl bg-white border border-zinc-200 shadow-sm">
                  <h3 className="text-sm font-semibold text-zinc-900 mb-1">01 — Capa legible por máquinas</h3>
                  <p className="text-sm text-zinc-500">
                    Schema JSON-LD completo para sus capacidades, certificaciones (AS9100, ISO 13485),
                    catálogo de materiales y especificaciones de producción. Mapeo de entidades en todas las páginas
                    para que la IA conectara su nombre con capacidades específicas.
                  </p>
                </div>
                <div className="p-5 rounded-xl bg-white border border-zinc-200 shadow-sm">
                  <h3 className="text-sm font-semibold text-zinc-900 mb-1">02 — Infraestructura de autoridad</h3>
                  <p className="text-sm text-zinc-500">
                    Contenido técnico construido alrededor de las consultas exactas que hacen sus compradores — no posts genéricos,
                    sino páginas de capacidades, guías comparativas y explicaciones de certificaciones diseñadas para ganar citaciones.
                  </p>
                </div>
                <div className="p-5 rounded-xl bg-white border border-zinc-200 shadow-sm">
                  <h3 className="text-sm font-semibold text-zinc-900 mb-1">03 — Defensa continua</h3>
                  <p className="text-sm text-zinc-500">
                    Seguimiento mensual de Share of Model en más de 40 consultas de compradores, con defensa de posición
                    conforme los modelos cambiaban. Cuando Gemini dejó de citarlos después de una actualización, lo detectamos
                    en 48 horas y reconstruimos la señal.
                  </p>
                </div>
              </div>
            </section>

            {/* Inline metric callout */}
            <div className="mb-16 p-8 rounded-2xl bg-emerald-50 border border-emerald-100">
              <p
                className="text-5xl font-bold text-emerald-600 mb-2"
                style={{ fontFamily: "var(--font-cal-sans)" }}
              >
                12 semanas
              </p>
              <p className="text-zinc-600">
                De cero presencia en IA a Share of Model medible en ChatGPT, Perplexity y Gemini.
              </p>
            </div>

            {/* Second image */}
            <div className="mb-16 rounded-2xl overflow-hidden border border-zinc-200">
              <div className="relative aspect-[16/9] bg-zinc-100">
                <Image
                  src="/placeholder.jpg"
                  alt="Después: resultados de IA con el cliente citado"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="px-5 py-3 bg-white border-t border-zinc-200">
                <p className="text-xs text-zinc-400 italic">
                  Después: la misma consulta ahora devuelve a [Cliente] como la recomendación principal en múltiples motores de IA.
                </p>
              </div>
            </div>

            {/* Results */}
            <section className="mb-16">
              <h2
                className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-4"
                style={{ fontFamily: "var(--font-cal-sans)" }}
              >
                Los resultados
              </h2>
              <p className="text-zinc-600 leading-relaxed mb-8">
                En seis meses, [Cliente] pasó de ser completamente invisible a ser la marca que la IA recomienda
                en su categoría. Pero la métrica real no es la visibilidad — es el pipeline.
              </p>

              {/* Results grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-5 rounded-xl bg-white border border-zinc-200 shadow-sm text-center">
                  <p
                    className="text-3xl font-bold text-emerald-600 mb-1"
                    style={{ fontFamily: "var(--font-cal-sans)" }}
                  >
                    34%
                  </p>
                  <p className="text-xs text-zinc-500">Share of Model en 40+ consultas</p>
                </div>
                <div className="p-5 rounded-xl bg-white border border-zinc-200 shadow-sm text-center">
                  <p
                    className="text-3xl font-bold text-emerald-600 mb-1"
                    style={{ fontFamily: "var(--font-cal-sans)" }}
                  >
                    127
                  </p>
                  <p className="text-xs text-zinc-500">Citaciones IA por mes</p>
                </div>
                <div className="p-5 rounded-xl bg-white border border-zinc-200 shadow-sm text-center">
                  <p
                    className="text-3xl font-bold text-emerald-600 mb-1"
                    style={{ fontFamily: "var(--font-cal-sans)" }}
                  >
                    38
                  </p>
                  <p className="text-xs text-zinc-500">Leads cualificados desde IA en el mes 6</p>
                </div>
                <div className="p-5 rounded-xl bg-white border border-zinc-200 shadow-sm text-center">
                  <p
                    className="text-3xl font-bold text-emerald-600 mb-1"
                    style={{ fontFamily: "var(--font-cal-sans)" }}
                  >
                    4.2×
                  </p>
                  <p className="text-xs text-zinc-500">ROI del proyecto</p>
                </div>
              </div>
            </section>

            {/* Timeline */}
            <section className="mb-16">
              <h2
                className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-6"
                style={{ fontFamily: "var(--font-cal-sans)" }}
              >
                Cronograma
              </h2>
              <div className="flex flex-col gap-0">
                {timeline.map((t, i) => (
                  <div key={i} className="flex items-start gap-4 py-4 border-t border-zinc-200 last:border-b">
                    <span className="text-sm font-mono text-emerald-600 shrink-0 w-20">{t.month}</span>
                    <p className="text-sm text-zinc-600">{t.event}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Quote */}
            <section className="mb-16">
              <blockquote className="p-8 rounded-2xl bg-white border border-zinc-200 shadow-sm">
                <p className="text-lg text-zinc-700 leading-relaxed mb-4 italic">
                  "Habíamos sido invisibles para la IA durante años sin saberlo. The Stack House no solo nos hizo
                  visibles — construyeron un activo que sigue generando leads meses después de la implementación inicial.
                  El ROI habla por sí solo."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-zinc-100 overflow-hidden">
                    <Image
                      src="/professional-headshot-1.png"
                      alt="Foto del cliente"
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-900">[Cliente]</p>
                    <p className="text-xs text-zinc-500">VP de Ventas, [Empresa]</p>
                  </div>
                </div>
              </blockquote>
            </section>

            {/* CTA */}
            <section className="text-center py-8">
              <h2
                className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-3"
                style={{ fontFamily: "var(--font-cal-sans)" }}
              >
                ¿Podría ser tu empresa?
              </h2>
              <p className="text-zinc-500 mb-8 max-w-lg mx-auto">
                Empezamos cada proyecto con una auditoría gratis. Ve exactamente dónde estás — y qué se necesita para ser la marca que la IA elige.
              </p>
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
            </section>

          </div>
        </article>

        <Footer />
      </main>
    </SmoothScroll>
  )
}
