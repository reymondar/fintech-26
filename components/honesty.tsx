"use client"

import { motion, useInView } from "framer-motion"
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

const majoriaChecks = [
  "Te dicen si apareces en ChatGPT.",
  "Te muestran dashboards y listas de menciones.",
  "Te dan recomendaciones genéricas.",
]

const majoriaCrosses = [
  "No pueden decirte por qué está cayendo tu tráfico.",
  "No pueden separar el impacto de la IA del resto de factores.",
  "Nunca te dirán que la IA no es el problema.",
]

const nosotrosChecks = [
  "Analizamos tus propios datos.",
  "Medimos cuánto de tu caída es atribuible a la IA y cuánto no.",
  "Priorizamos únicamente las tres acciones con mayor impacto.",
  "Si la IA no es el problema, lo dejamos por escrito.",
  "Solo recomendamos más trabajo cuando los datos lo justifican.",
]

const neverPromise = [
  "Citaciones garantizadas.",
  "Resultados de la noche a la mañana.",
  "Soluciones mágicas.",
  "Venderte tecnología que todavía no necesitas.",
]

export function Honesty() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="honesty" ref={ref} className="py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* 1. Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
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
        </motion.div>

        {/* Cobertura + Avance cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col md:flex-row gap-5 justify-center items-stretch max-w-2xl mx-auto mb-20"
        >
          {/* Cobertura de fuentes */}
          <div
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
        </motion.div>

        {/* 2. Cambio de perspectiva */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
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
            Porque si la respuesta es no, preferimos decirlo antes que venderte un servicio que no necesitas.
          </p>
        </motion.div>

        {/* 3. Comparativa — dos tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-20">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="p-7 rounded-2xl bg-white border border-zinc-200 shadow-sm"
          >
            <h3
              className="text-lg font-semibold text-zinc-900 mb-6"
              style={{ fontFamily: "var(--font-instrument-sans)" }}
            >
              Lo que hace la mayoría
            </h3>
            <ul className="flex flex-col gap-3.5 mb-5">
              {majoriaChecks.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" strokeWidth={2} />
                  <span className="text-sm text-zinc-600">{item}</span>
                </li>
              ))}
            </ul>
            <div className="border-t border-zinc-100 pt-5">
              <ul className="flex flex-col gap-3.5">
                {majoriaCrosses.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <X className="w-4 h-4 text-red-400/70 shrink-0 mt-0.5" strokeWidth={2} />
                    <span className="text-sm text-zinc-500">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.1 }}
            className="p-7 rounded-2xl bg-white border border-emerald-200 shadow-sm"
          >
            <h3
              className="text-lg font-semibold text-zinc-900 mb-6"
              style={{ fontFamily: "var(--font-instrument-sans)" }}
            >
              Lo que hacemos nosotros
            </h3>
            <ul className="flex flex-col gap-3.5">
              {nosotrosChecks.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" strokeWidth={2} />
                  <span className="text-sm text-zinc-700">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* 4. Lo que nunca prometeremos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto mb-20"
        >
          <h3
            className="text-lg font-semibold text-zinc-900 mb-5 text-center"
            style={{ fontFamily: "var(--font-instrument-sans)" }}
          >
            Lo que nunca prometeremos
          </h3>
          <ul className="flex flex-col gap-3 mb-5">
            {neverPromise.map((item) => (
              <li key={item} className="flex items-center gap-3 justify-center">
                <X className="w-4 h-4 text-red-400/60 shrink-0" strokeWidth={2} />
                <span className="text-sm text-zinc-500">{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-zinc-400 text-center leading-relaxed">
            Los modelos cambian constantemente. Cualquiera que garantice resultados fijos sobre un sistema que se actualiza cada semana está vendiendo humo.
          </p>
        </motion.div>

      </div>
    </section>
  )
}
