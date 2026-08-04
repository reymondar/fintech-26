"use client"

import { m, useInView } from "framer-motion"
import { useRef } from "react"
import { Check, X } from "lucide-react"

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const comparisonRows = [
  {
    category: "Diagnóstico",
    mayoria: "Te dicen si apareces en ChatGPT.",
    nosotros: "Analizamos tus propios datos y separamos las causas reales.",
  },
  {
    category: "Medición",
    mayoria: "Dashboards genéricos y listas de menciones.",
    nosotros: "Medimos cuánto de tu caída es atribuible a la IA y cuánto no.",
  },
  {
    category: "Acciones",
    mayoria: "Recomendaciones genéricas sin priorizar.",
    nosotros: "Priorizamos únicamente las tres acciones con mayor impacto.",
  },
  {
    category: "Honestidad",
    mayoria: "Nunca te dirán que la IA no es el problema.",
    nosotros: "Si la IA no es el problema, lo dejamos por escrito.",
  },
  {
    category: "Criterio",
    mayoria: "No separan el impacto de la IA del resto de factores.",
    nosotros: "Solo recomendamos más trabajo cuando los datos lo justifican.",
  },
]


export function Honesty() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="honesty" ref={ref} className="py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* 1. Hero */}
        <m.div
          initial={{ opacity: 1, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2
            className="text-3xl sm:text-4xl font-bold text-zinc-900 mb-5"
            style={{ fontFamily: "var(--font-instrument-sans)" }}
          >
            <span className="block">Te diremos la verdad.</span>
            <span className="block text-zinc-400">Incluso si la verdad es que tu problema no es la IA.</span>
          </h2>
          <p className="text-zinc-500 max-w-2xl mx-auto leading-relaxed">
            El sector está lleno de promesas vacías. Nosotros solo prometemos aquello que podemos demostrar.
          </p>
        </m.div>

        {/* Cobertura + Avance cards */}
        <m.div
          initial={{ opacity: 1, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative flex flex-col md:flex-row gap-5 justify-center items-stretch max-w-2xl mx-auto mb-20"
        >
          <div className="absolute inset-0 -inset-x-16 -inset-y-8 bg-emerald-100/30 rounded-full blur-3xl pointer-events-none z-0" />
          {/* Cobertura de fuentes */}
          <div
            className="relative z-10"
            style={{
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
              flex: 1,
              boxSizing: 'border-box',
              background: 'linear-gradient(180deg, #10152f 0%, #0a0e20 100%)',
              border: '1px solid rgba(148,163,255,.10)',
              borderRadius: 20,
              padding: 22,
              color: '#eaeefc',
              WebkitFontSmoothing: 'antialiased',
            }}
          >
            <h3 style={{ fontSize: 16.5, fontWeight: 700, letterSpacing: 0.1, margin: 0 }}>Cobertura de fuentes</h3>
            <div style={{ fontSize: 12, color: '#8b93b9', marginTop: 3 }}>Presencia en el top 20 del sector</div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
              <svg viewBox="0 0 160 160" width={140} height={140} xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="shcCov" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#00cf8d" />
                    <stop offset="100%" stopColor="#009967" />
                  </linearGradient>
                </defs>
                <g transform="rotate(-90 80 80)" strokeLinecap="round" fill="none" strokeWidth={13}>
                  <circle cx={80} cy={80} r={62} stroke="#1b2242" />
                  <circle cx={80} cy={80} r={62} stroke="url(#shcCov)" strokeDasharray="175 214"
                    style={{ filter: 'drop-shadow(0 0 6px rgba(0,207,141,.55))' }} />
                </g>
                <text x={80} y={78} textAnchor="middle" fill="#eaeefc" fontSize={24} fontWeight={800} fontFamily="Inter, sans-serif">9/20</text>
                <text x={80} y={96} textAnchor="middle" fill="#8b93b9" fontSize={9.5} fontFamily="Inter, sans-serif">fuentes cubiertas</text>
              </svg>
            </div>
            <p style={{ fontSize: 11, color: '#6b7299', marginTop: 14, lineHeight: 1.5, textAlign: 'center' }}>
              Objetivo Q3: presencia en 14 de las 20 fuentes más citadas.
            </p>
          </div>

          {/* Avance del plan */}
          <div
            className="relative z-10"
            style={{
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
              flex: 1,
              boxSizing: 'border-box',
              background: 'linear-gradient(180deg, #10152f 0%, #0a0e20 100%)',
              border: '1px solid rgba(148,163,255,.10)',
              borderRadius: 20,
              padding: 22,
              color: '#eaeefc',
              WebkitFontSmoothing: 'antialiased',
            }}
          >
            <h3 style={{ fontSize: 16.5, fontWeight: 700, letterSpacing: 0.1, margin: 0 }}>Avance del plan</h3>
            <div style={{ fontSize: 12, color: '#8b93b9', marginTop: 3 }}>Estrategia Q3 · 24 acciones</div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 14 }}>
              <svg viewBox="0 0 200 120" width={200} height={120} xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="shpPg" x1="0" y1="1" x2="1" y2="0">
                    <stop offset="0%" stopColor="#4f7dff" />
                    <stop offset="100%" stopColor="#00cf8d" />
                  </linearGradient>
                </defs>
                <path d="M20 110 A 80 80 0 0 1 180 110" fill="none" stroke="#1b2242" strokeWidth={15} strokeLinecap="round" />
                <path d="M20 110 A 80 80 0 0 1 180 110" fill="none" stroke="url(#shpPg)" strokeWidth={15} strokeLinecap="round"
                  strokeDasharray={251} strokeDashoffset={105}
                  style={{ filter: 'drop-shadow(0 0 7px rgba(0,207,141,.5))' }} />
                <text x={100} y={92} textAnchor="middle" fill="#eaeefc" fontSize={27} fontWeight={800} fontFamily="Inter, sans-serif">58%</text>
                <text x={100} y={110} textAnchor="middle" fill="#8b93b9" fontSize={10.5} fontFamily="Inter, sans-serif">completado</text>
              </svg>
            </div>
            <div style={{ display: 'flex', gap: 14, fontSize: 12, color: '#8b93b9', justifyContent: 'center', marginTop: 18, flexWrap: 'wrap' as const }}>
              <span><i style={{ width: 8, height: 8, borderRadius: '50%', display: 'inline-block', marginRight: 6, background: '#00cf8d' }} />14 hechas</span>
              <span><i style={{ width: 8, height: 8, borderRadius: '50%', display: 'inline-block', marginRight: 6, background: '#7ea2ff' }} />6 en curso</span>
              <span><i style={{ width: 8, height: 8, borderRadius: '50%', display: 'inline-block', marginRight: 6, background: '#3a4470' }} />4 pendientes</span>
            </div>
          </div>
        </m.div>

        {/* 2. Cambio de perspectiva */}
        <m.div
          initial={{ opacity: 1, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-3xl mx-auto text-center mb-20"
        >
          <p className="text-zinc-500 mb-4 leading-relaxed">
            La mayoría de empresas empiezan preguntándose:
          </p>
          <p className="text-lg text-zinc-400 italic mb-6">
            &ldquo;¿Me menciona ChatGPT?&rdquo;
          </p>
          <p className="text-zinc-500 mb-4 leading-relaxed">
            Nosotros empezamos por una pregunta mucho más importante:
          </p>
          <p
            className="text-xl sm:text-2xl font-semibold text-zinc-900"
            style={{ fontFamily: "var(--font-instrument-sans)" }}
          >
            ¿La IA está afectando realmente a tu negocio?
          </p>
          <p className="text-zinc-500 mt-4 leading-relaxed">
            Porque si la respuesta es no, te lo diremos antes de asesorarte incorrectamente.
          </p>
        </m.div>

        {/* 3. Comparativa — tabla */}
        <m.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="rounded-2xl border border-zinc-200 overflow-hidden shadow-sm mb-20"
        >
          {/* Header */}
          <div className="grid grid-cols-[1fr_1fr] md:grid-cols-[140px_1fr_1fr] bg-zinc-100">
            <div className="hidden md:block px-5 py-4" />
            <div className="px-5 py-4 text-sm font-semibold text-zinc-500 uppercase tracking-wider">
              La mayoría
            </div>
            <div className="px-5 py-4 text-sm font-semibold text-emerald-700 uppercase tracking-wider bg-emerald-50/80">
              The Stack House
            </div>
          </div>

          {/* Rows */}
          {comparisonRows.map((row, i) => (
            <div
              key={row.category}
              className={`grid grid-cols-[1fr_1fr] md:grid-cols-[140px_1fr_1fr] ${
                i < comparisonRows.length - 1 ? "border-b border-zinc-100" : ""
              }`}
            >
              <div className="hidden md:flex items-start px-5 py-5">
                <span
                  className="text-xs font-bold text-zinc-400 uppercase tracking-widest"
                  style={{ fontFamily: "var(--font-instrument-sans)" }}
                >
                  {row.category}
                </span>
              </div>

              <div className="px-5 py-5 flex flex-col gap-3">
                <div className="md:hidden text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">
                  {row.category}
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                    <X className="w-4 h-4 text-red-500" strokeWidth={2.5} />
                  </div>
                  <span className="text-sm text-zinc-500 leading-relaxed">{row.mayoria}</span>
                </div>
              </div>

              <div className="px-5 py-5 bg-emerald-50/40">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-emerald-600" strokeWidth={2.5} />
                  </div>
                  <span className="text-sm text-zinc-800 font-medium leading-relaxed">{row.nosotros}</span>
                </div>
              </div>
            </div>
          ))}
        </m.div>
      </div>
    </section>
  )
}
