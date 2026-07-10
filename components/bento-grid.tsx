"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Code, ShieldCheck, ChartLine, Bot, Plug } from "lucide-react"

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

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

function SystemStatus() {
  const [dots, setDots] = useState([true, true, true, false, true])

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => prev.map(() => Math.random() > 0.2))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center gap-2">
      {dots.map((active, i) => (
        <motion.div
          key={i}
          className={`w-2 h-2 rounded-full ${active ? "bg-emerald-500" : "bg-zinc-300"}`}
          animate={active ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: i * 0.2 }}
        />
      ))}
    </div>
  )
}

function AnimatedChart() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const points = [
    { x: 0, y: 60 },
    { x: 20, y: 45 },
    { x: 40, y: 55 },
    { x: 60, y: 30 },
    { x: 80, y: 40 },
    { x: 100, y: 15 },
  ]

  const pathD = points.reduce((acc, point, i) => {
    return i === 0 ? `M ${point.x} ${point.y}` : `${acc} L ${point.x} ${point.y}`
  }, "")

  return (
    <svg ref={ref} viewBox="0 0 100 70" className="w-full h-24">
      <defs>
        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgb(16,185,129)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="rgb(16,185,129)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {isInView && (
        <>
          <path d={`${pathD} L 100 70 L 0 70 Z`} fill="url(#chartGradient)" className="opacity-50" />
          <path d={pathD} fill="none" stroke="rgb(16,185,129)" strokeWidth="2" strokeLinecap="round" className="draw-line" />
        </>
      )}
    </svg>
  )
}

export function BentoGrid() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="features" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className="text-3xl sm:text-4xl font-bold text-zinc-900 mb-4"
            style={{ fontFamily: "var(--font-instrument-sans)" }}
          >
            <span className="block">Construimos lo que la IA necesita para elegirte.</span>
          </h2>
          <p className="text-zinc-500 max-w-2xl mx-auto">
            Datos que puede leer. Señales en las que confía. Un nombre que repite.
          </p>
        </motion.div>

        {/* Sustancia — lo que te hace elegible */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4"
        >
          {/* Legible */}
          <motion.div
            variants={itemVariants}
            className="group relative p-6 rounded-2xl bg-white border border-zinc-200 hover:border-zinc-300 hover:scale-[1.02] transition-all duration-300 overflow-hidden shadow-sm"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 rounded-lg bg-zinc-100 w-fit">
                <Code className="w-5 h-5 text-zinc-500" strokeWidth={1.5} />
              </div>
              <SystemStatus />
            </div>
            <h3 className="text-lg font-semibold text-zinc-900 mb-2">Las máquinas pueden leerte</h3>
            <p className="text-zinc-500 text-sm">
              Estructuramos tu catálogo, especificaciones y capacidades para que los motores de IA entiendan exactamente qué vendes — sin adivinar, sin citar mal.
            </p>
          </motion.div>

          {/* Confiable */}
          <motion.div
            variants={itemVariants}
            className="group relative p-6 rounded-2xl bg-white border border-zinc-200 hover:border-zinc-300 hover:scale-[1.02] transition-all duration-300 shadow-sm"
          >
            <div className="p-2 rounded-lg bg-zinc-100 w-fit mb-4">
              <ShieldCheck className="w-5 h-5 text-zinc-500" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-semibold text-zinc-900 mb-2">La IA confía en ti para citarte</h3>
            <p className="text-zinc-500 text-sm">
              Construimos esa confianza — contenido, menciones de terceros, actualización — hasta que tu nombre sea la respuesta.
            </p>
          </motion.div>

          {/* Elegible */}
          <motion.div
            variants={itemVariants}
            className="group relative p-6 rounded-2xl bg-white border border-zinc-200 hover:border-zinc-300 hover:scale-[1.02] transition-all duration-300 shadow-sm"
          >
            <div className="p-2 rounded-lg bg-zinc-100 w-fit mb-4">
              <Plug className="w-5 h-5 text-zinc-500" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-semibold text-zinc-900 mb-2">Listo para lo que viene</h3>
            <p className="text-zinc-500 text-sm">
              Los agentes de IA pronto investigarán y comprarán en nombre de tus clientes. Nos aseguramos de que el tuyo sea un negocio con el que puedan operar.
            </p>
          </motion.div>
        </motion.div>

        {/* Seguridad — lo que te protege */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {/* Medido */}
          <motion.div
            variants={itemVariants}
            className="group relative p-6 rounded-2xl bg-white border border-zinc-200 hover:border-zinc-300 hover:scale-[1.02] transition-all duration-300 shadow-sm overflow-hidden"
          >
            <div className="p-2 rounded-lg bg-zinc-100 w-fit mb-4">
              <ChartLine className="w-5 h-5 text-zinc-500" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-semibold text-zinc-900 mb-2">Tu posición, medida</h3>
            <p className="text-zinc-500 text-sm mb-4">
              Un reporte, la misma métrica, cada mes: con qué frecuencia la IA te nombra vs. tus competidores. Sin dashboards de vanidad.
            </p>
            <AnimatedChart />
          </motion.div>

          {/* Defendido */}
          <motion.div
            variants={itemVariants}
            className="group relative p-6 rounded-2xl bg-white border border-zinc-200 hover:border-zinc-300 hover:scale-[1.02] transition-all duration-300 shadow-sm"
          >
            <div className="p-2 rounded-lg bg-zinc-100 w-fit mb-4">
              <Bot className="w-5 h-5 text-zinc-500" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-semibold text-zinc-900 mb-2">Nos ajustamos cuando los modelos cambian</h3>
            <p className="text-zinc-500 text-sm">
              ChatGPT cambia cada semana. Cuando tu posición se mueve, descubrimos por qué y lo corregimos — eso es lo que realmente compra la cuota mensual.
            </p>
          </motion.div>

          {/* Tuyo */}
          <motion.div
            variants={itemVariants}
            className="group relative p-6 rounded-2xl bg-white border border-zinc-200 hover:border-zinc-300 hover:scale-[1.02] transition-all duration-300 shadow-sm"
          >
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-zinc-100 shrink-0">
                <ShieldCheck className="w-5 h-5 text-zinc-500" strokeWidth={1.5} />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-zinc-900 mt-4 mb-2">Todo lo que construimos es tuyo</h3>
            <p className="text-zinc-500 text-sm">
              El contenido, la capa de datos, la autoridad — vive en tu dominio. Si algún día te vas, te lo llevas todo.
            </p>
            <p className="text-xs text-emerald-600 font-medium mt-4">Sin contrato a largo plazo · cancela cuando quieras</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
