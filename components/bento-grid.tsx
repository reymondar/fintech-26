"use client"

import { useTranslation } from "@/components/locale-provider"

import { m, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Code, ShieldCheck, ChartLine, Bot, Plug, Target } from "lucide-react"

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
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
}

function SystemStatus() {
  const { t, locale, localizeHref } = useTranslation()

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
        <m.div
          key={i}
          className={`w-2 h-2 rounded-full ${active ? "bg-emerald-500" : "bg-zinc-300"}`}
          animate={active ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: i * 0.2 }}
        />
      ))}
    </div>
  )
}

export function BentoGrid() {
  const { t, locale, localizeHref } = useTranslation()

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="features" className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <m.div
          initial={{ opacity: 1, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className="text-xl sm:text-2xl font-semibold text-zinc-900 mb-4"
            style={{ fontFamily: "var(--font-instrument-sans)" }}
          > {t("Un motor de captación que trabaja alrededor de tu infraestructura")} </h2>
        </m.div>

        {/* Sustancia — lo que te hace elegible */}
        <m.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4"
        >
          {/* Legible */}
          <m.div
            variants={itemVariants}
            className="group relative p-6 rounded-2xl bg-white border border-zinc-200 hover:border-zinc-300 hover:scale-[1.02] transition-all duration-300 overflow-hidden shadow-sm"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 rounded-lg bg-zinc-100 w-fit">
                <Code className="w-5 h-5 text-zinc-500" strokeWidth={1.5} />
              </div>
              <SystemStatus />
            </div>
            <h3 className="text-lg font-semibold text-zinc-900 mb-2">{t("Un catálogo que se entienda")}</h3>
            <p className="text-zinc-500 text-sm"> {t("Completamos atributos, compatibilidades, usos y condiciones de compra. Corregimos el acceso a tus páginas para que buscadores y asistentes puedan encontrar e interpretar lo que vendes.")} </p>
          </m.div>

          {/* Confiable */}
          <m.div
            variants={itemVariants}
            className="group relative p-6 rounded-2xl bg-white border border-zinc-200 hover:border-zinc-300 hover:scale-[1.02] transition-all duration-300 shadow-sm"
          >
            <div className="p-2 rounded-lg bg-zinc-100 w-fit mb-4">
              <ShieldCheck className="w-5 h-5 text-zinc-500" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-semibold text-zinc-900 mb-2">{t("Respuestas que ayudan a elegir")}</h3>
            <p className="text-zinc-500 text-sm"> {t("Creamos y actualizamos comparativas, guías y páginas de producto sobre las dudas de tus compradores. Información concreta que la IA pueda citar y que ayude a decidir una compra.")} </p>
          </m.div>

          {/* Elegible */}
          <m.div
            variants={itemVariants}
            className="group relative p-6 rounded-2xl bg-white border border-zinc-200 hover:border-zinc-300 hover:scale-[1.02] transition-all duration-300 shadow-sm"
          >
            <div className="p-2 rounded-lg bg-zinc-100 w-fit mb-4">
              <Plug className="w-5 h-5 text-zinc-500" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-semibold text-zinc-900 mb-2">{t("Referencias fuera de tu tienda")}</h3>
            <p className="text-zinc-500 text-sm"> {t("Identificamos los medios, listados y publicaciones que aparecen en las respuestas de tu categoría. Trabajamos con esas fuentes para construir presencia y respaldo para tu marca.")} </p>
          </m.div>
        </m.div>

        {/* Seguridad — lo que te protege */}
        <m.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {/* Medido */}
          <m.div
            variants={itemVariants}
            className="group relative p-6 rounded-2xl bg-white border border-zinc-200 hover:border-zinc-300 hover:scale-[1.02] transition-all duration-300 shadow-sm overflow-hidden"
          >
            <div className="p-2 rounded-lg bg-zinc-100 w-fit mb-4">
              <ChartLine className="w-5 h-5 text-zinc-500" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-semibold text-zinc-900 mb-2">{t("Saber quién aparece y por qué")}</h3>
            <p className="text-zinc-500 text-sm mb-4"> {t("Probamos preguntas de compra en distintos motores. Registramos qué marcas recomiendan y qué fuentes citan para elegir dónde intervenir y comparar la evolución.")} </p>
            <p className="text-xs text-emerald-700">{t("Preguntas de compra → fuentes citadas → acciones")}</p>
          </m.div>

          {/* Defendido */}
          <m.div
            variants={itemVariants}
            className="group relative p-6 rounded-2xl bg-white border border-zinc-200 hover:border-zinc-300 hover:scale-[1.02] transition-all duration-300 shadow-sm"
          >
            <div className="p-2 rounded-lg bg-zinc-100 w-fit mb-4">
              <Bot className="w-5 h-5 text-zinc-500" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-semibold text-zinc-900 mb-2">{t("Trabajar con el SEO que ya tienes")}</h3>
            <p className="text-zinc-500 text-sm"> {t("Partimos del trabajo existente y coordinamos las mejoras con tu equipo o agencia. Sumamos el análisis de respuestas de IA para detectar oportunidades que el ranking de Google, por sí solo, no muestra.")} </p>
          </m.div>

          {/* Elegible */}
          <m.div
            variants={itemVariants}
            className="group relative p-6 rounded-2xl bg-white border border-zinc-200 hover:border-zinc-300 hover:scale-[1.02] transition-all duration-300 shadow-sm"
          >
            <div className="p-2 rounded-lg bg-zinc-100 w-fit mb-4">
              <Target className="w-5 h-5 text-zinc-500" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-semibold text-zinc-900 mb-2">{t("Mantener la información al día")}</h3>
            <p className="text-zinc-500 text-sm"> {t("Revisamos qué cambia en las recomendaciones, qué productos se mencionan y si la información es correcta. Actualizamos los activos y las fuentes que podemos gestionar para sostener el trabajo.")} </p>
          </m.div>
        </m.div>
      </div>
    </section>
  )
}
