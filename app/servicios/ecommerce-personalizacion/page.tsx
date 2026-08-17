"use client"

import { m, useInView } from "framer-motion"
import { useRef } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <m.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </m.div>
  )
}

const layers = [
  {
    num: "01",
    title: "Catálogo sincronizado",
    body: "Conectamos tu tienda con el motor de personalización. Productos, precios, stock y variantes se replican en tiempo real. Esto ocurre una sola vez y se mantiene automáticamente.",
  },
  {
    num: "02",
    title: "Comportamiento en tiempo real",
    body: "Un script ligero en tu tienda observa cómo se mueve cada visitante: qué mira, qué busca, qué agrega al carrito. Con esos datos se construye un perfil único para cada persona, en vivo.",
  },
  {
    num: "03",
    title: "La tienda se reescribe sola",
    body: "Con el catálogo y el perfil del visitante, el motor decide qué mostrar y en qué orden. En las versiones actuales, el copy de producto también se genera en el tono de tu marca. Cada visita es distinta.",
  },
]

const platforms = [
  "Shopify", "Shopify Plus", "PrestaShop", "Magento", "WooCommerce", "BigCommerce", "Tiendanube",
]

const results = [
  { metric: "+15 a 20%", label: "Ticket promedio (AOV)", note: "más ingresos por cada orden, sin cambiar precios" },
  { metric: "+20%", label: "Ingresos por visita (RPV)", note: "más conversión del tráfico que ya tenés" },
  { metric: "Semanas", label: "Tiempo de implementación", note: "no meses, no desarrolladores internos" },
]

const steps = [
  { num: "01", title: "Diagnóstico", body: "Revisamos tu stack actual, tu plataforma y qué datos ya existen. Definimos qué partes de la tienda tienen más impacto en la conversión." },
  { num: "02", title: "Configuración", body: "Instalamos el motor en tu plataforma, sincronizamos el catálogo y configuramos los primeros módulos: recomendaciones, búsqueda personalizada y carruseles." },
  { num: "03", title: "Ajuste", body: "Las primeras semanas el motor aprende. Nosotros monitoreamos el comportamiento, ajustamos los criterios y validamos el impacto con datos reales." },
  { num: "04", title: "Escala", body: "Una vez que el baseline está claro, activamos capas adicionales: newsletters segmentadas, cross-selling predictivo, asistente conversacional de producto." },
]

export default function EcommercePersonalizacionPage() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <Navbar />

      {/* Hero */}
      <section className="relative px-4 pt-36 pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-50 via-zinc-50 to-zinc-100 pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-emerald-100/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <m.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-600 mb-6 block"
          >
            Servicios · Ecommerce
          </m.span>

          <m.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6"
            style={{ fontFamily: "var(--font-cal-sans)" }}
          >
            <span className="text-zinc-900">Cada visitante ve una tienda distinta.</span>{" "}
            <span className="text-zinc-400">La tuya, construida para ellos.</span>
          </m.h1>

          <m.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-lg text-zinc-500 max-w-2xl leading-relaxed"
          >
            La mayoría de los ecommerce muestra los mismos productos, en el mismo orden, a todo el mundo.
            El que llega buscando una cafetera de viaje ve lo mismo que el que quiere una máquina para cafetería.
            Eso tiene un costo silencioso en ventas que casi nadie mide.
          </m.p>
        </div>
      </section>

      {/* El problema */}
      <section className="px-4 py-20 bg-white">
        <div className="max-w-4xl mx-auto">
          <Section>
            <m.div variants={fadeUp}>
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-400 mb-4 block">El problema</span>
              <h2
                className="text-3xl sm:text-4xl font-bold text-zinc-900 leading-tight mb-6"
                style={{ fontFamily: "var(--font-cal-sans)" }}
              >
                Una tienda genérica le habla a nadie.
              </h2>
            </m.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
              <m.div variants={fadeUp} custom={1} className="space-y-4">
                <p className="text-[15px] text-zinc-600 leading-relaxed">
                  Cuando alguien entra a tu tienda por primera vez, no sabés nada de él.
                  Le mostrás los mismos destacados, las mismas categorías, los mismos banners que a todos los demás.
                  Si tiene suerte, encuentra lo que busca. Si no, se va.
                </p>
                <p className="text-[15px] text-zinc-600 leading-relaxed">
                  El problema no es tu catálogo ni tu precio. Es que la tienda no sabe escuchar.
                  Y una tienda que no escucha pierde ventas en silencio, sin dejar rastro en ningún dashboard.
                </p>
              </m.div>
              <m.div variants={fadeUp} custom={2} className="space-y-4">
                <p className="text-[15px] text-zinc-600 leading-relaxed">
                  La hiperpersonalización no es una tecnología nueva ni cara.
                  Existe desde 2015 y la usaban las marcas más grandes del mundo.
                  Lo que cambió en 2024 y 2025 es que los motores generativos bajaron el costo de entrada
                  al punto en que tiene sentido para una PYME que vende desde diez mil euros al mes.
                </p>
                <p className="text-[15px] text-zinc-600 leading-relaxed">
                  Y lo que nosotros hacemos es instalarlo en tu plataforma sin que tengas que tocar
                  una línea de código ni depender de un equipo de desarrollo propio.
                </p>
              </m.div>
            </div>
          </Section>
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="px-4 py-20 bg-zinc-50">
        <div className="max-w-4xl mx-auto">
          <Section>
            <m.div variants={fadeUp} className="mb-14">
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-400 mb-4 block">Cómo funciona</span>
              <h2
                className="text-3xl sm:text-4xl font-bold text-zinc-900 leading-tight"
                style={{ fontFamily: "var(--font-cal-sans)" }}
              >
                Tres capas que trabajan juntas.
              </h2>
              <p className="text-zinc-500 mt-4 max-w-xl leading-relaxed">
                Detrás de cada visita personalizada hay un proceso que ocurre en milisegundos.
                Esto es lo que pasa por dentro.
              </p>
            </m.div>

            <div className="relative">
              <div className="absolute left-5 top-0 bottom-0 w-px bg-zinc-200 hidden sm:block" />
              <div className="flex flex-col gap-4">
                {layers.map((layer, i) => (
                  <m.div
                    key={layer.num}
                    variants={fadeUp}
                    custom={i + 1}
                    className="relative flex gap-6 sm:pl-14 p-5 bg-white rounded-2xl border border-zinc-200 shadow-sm"
                  >
                    <div className="absolute left-[1.1rem] hidden sm:flex items-center justify-center w-3 h-3 rounded-full bg-zinc-400 mt-1" />
                    <span className="font-mono text-sm text-zinc-400 shrink-0 w-6">{layer.num}</span>
                    <div>
                      <h3 className="text-base font-semibold text-zinc-900 mb-1">{layer.title}</h3>
                      <p className="text-sm text-zinc-500 leading-relaxed">{layer.body}</p>
                    </div>
                  </m.div>
                ))}
              </div>
            </div>
          </Section>
        </div>
      </section>

      {/* Plataformas */}
      <section className="px-4 py-20 bg-white">
        <div className="max-w-4xl mx-auto">
          <Section>
            <m.div variants={fadeUp} className="mb-10">
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-400 mb-4 block">Compatibilidad</span>
              <h2
                className="text-3xl sm:text-4xl font-bold text-zinc-900 leading-tight"
                style={{ fontFamily: "var(--font-cal-sans)" }}
              >
                Funciona con la plataforma que ya usás.
              </h2>
              <p className="text-zinc-500 mt-4 max-w-xl leading-relaxed">
                No hace falta migrar ni cambiar nada de tu infraestructura actual.
                Implementamos sobre lo que ya tenés.
              </p>
            </m.div>

            <m.div variants={fadeUp} custom={1} className="flex flex-wrap gap-3">
              {platforms.map((p) => (
                <span
                  key={p}
                  className="px-4 py-2 rounded-full border border-zinc-200 bg-zinc-50 text-sm font-medium text-zinc-700"
                >
                  {p}
                </span>
              ))}
            </m.div>
          </Section>
        </div>
      </section>

      {/* Cómo lo implementamos */}
      <section className="px-4 py-20 bg-zinc-50">
        <div className="max-w-4xl mx-auto">
          <Section>
            <m.div variants={fadeUp} className="mb-14">
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-400 mb-4 block">El proceso</span>
              <h2
                className="text-3xl sm:text-4xl font-bold text-zinc-900 leading-tight"
                style={{ fontFamily: "var(--font-cal-sans)" }}
              >
                De cero a tienda personalizada en semanas.
              </h2>
              <p className="text-zinc-500 mt-4 max-w-xl leading-relaxed">
                No es un proyecto de seis meses. No requiere tu equipo técnico.
                Este es el flujo que seguimos con cada cliente.
              </p>
            </m.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {steps.map((step, i) => (
                <m.div
                  key={step.num}
                  variants={fadeUp}
                  custom={i + 1}
                  className="p-6 bg-white rounded-2xl border border-zinc-200 shadow-sm"
                >
                  <span className="font-mono text-xs text-zinc-400 mb-3 block">{step.num}</span>
                  <h3 className="text-base font-semibold text-zinc-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{step.body}</p>
                </m.div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      {/* Resultados */}
      <section className="px-4 py-20 bg-white">
        <div className="max-w-4xl mx-auto">
          <Section>
            <m.div variants={fadeUp} className="mb-14">
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-400 mb-4 block">Impacto</span>
              <h2
                className="text-3xl sm:text-4xl font-bold text-zinc-900 leading-tight"
                style={{ fontFamily: "var(--font-cal-sans)" }}
              >
                Lo que cambia cuando tu tienda escucha.
              </h2>
              <p className="text-zinc-500 mt-4 max-w-xl leading-relaxed">
                Los resultados no son de un solo cliente ni de un solo mercado.
                Son el promedio documentado de la categoría, validados con A/B tests reales.
              </p>
            </m.div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-14">
              {results.map((r, i) => (
                <m.div
                  key={r.label}
                  variants={fadeUp}
                  custom={i + 1}
                  className="p-6 rounded-2xl border border-zinc-200 bg-zinc-50"
                >
                  <p
                    className="text-4xl font-bold text-zinc-900 mb-1 tracking-tight"
                    style={{ fontFamily: "var(--font-cal-sans)" }}
                  >
                    {r.metric}
                  </p>
                  <p className="text-sm font-semibold text-zinc-700 mb-1">{r.label}</p>
                  <p className="text-xs text-zinc-400 leading-relaxed">{r.note}</p>
                </m.div>
              ))}
            </div>

            <m.div variants={fadeUp} custom={4} className="p-6 rounded-2xl bg-zinc-900 text-white">
              <p className="text-sm leading-relaxed text-zinc-300 max-w-2xl">
                La personalización no reemplaza tener buen producto ni buena logística.
                Lo que hace es asegurarse de que el tráfico que ya pagaste para traer
                convierta mejor. Es el paso siguiente natural para cualquier tienda
                que ya tiene visitas y quiere sacarles más partido sin gastar más en adquisición.
              </p>
            </m.div>
          </Section>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-24 bg-zinc-50">
        <div className="max-w-2xl mx-auto text-center">
          <Section>
            <m.div variants={fadeUp}>
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-400 mb-6 block">Siguiente paso</span>
              <h2
                className="text-3xl sm:text-4xl font-bold text-zinc-900 leading-tight mb-4"
                style={{ fontFamily: "var(--font-cal-sans)" }}
              >
                Miramos tu tienda juntos.
              </h2>
              <p className="text-zinc-500 leading-relaxed mb-8 max-w-md mx-auto">
                En 20 minutos revisamos tu plataforma, tu tráfico actual y qué partes de tu tienda
                tienen más potencial de impacto. Sin costo, sin compromiso.
              </p>
              <a
                href="https://calendar.app.google/aGDRM9XzkQFEndG77"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-3.5 rounded-full bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-700 transition-colors"
              >
                Agenda tu diagnóstico →
              </a>
            </m.div>
          </Section>
        </div>
      </section>

      <Footer />
    </div>
  )
}
