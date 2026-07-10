"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "¿Qué hace exactamente The Stack House?",
    answer:
      "Somos un estudio de desarrollo que hace que la IA te elija: construimos la infraestructura de datos y la autoridad que hacen que ChatGPT, Perplexity, Gemini y Google AI Overviews te lean, confíen en ti y te recomienden. No solo escribimos blogs. Estructuramos tus datos para que las máquinas los entiendan, construimos las señales de confianza que generan citaciones, y preparamos tu negocio para lo que viene: agentes de IA que no solo te mencionan — operan contigo. GEO es la puerta; la ingeniería es lo que nos hace mejores.",
  },
  {
    question: "¿Por qué un estudio de desarrollo y no una agencia SEO?",
    answer:
      "Porque la mayoría del mercado solo escribe contenido; nosotros construimos. Una herramienta te muestra que eres invisible. Una agencia de contenido escribe artículos. Nosotros hacemos las dos mitades que casi nadie combina bajo un mismo techo: ingeniería de datos legible por máquinas y la autoridad que convierte eso en citaciones reales. El hecho de que podamos construir — no solo recomendar — es lo que nos separa de los cientos que hacen lo mismo. Y sí: una vez que entras, construimos lo que necesites, desde automatizaciones hasta sistemas internos.",
  },
  {
    question: "¿Qué es GEO y por qué debería importarme ahora?",
    answer:
      "GEO (Generative Engine Optimization) es estructurar tu negocio para que la IA te cite como fuente cuando alguien pregunta — y es importante ahora porque el clic está muriendo. Google dejó de distribuir tráfico: bajó aproximadamente un tercio año con año, y la mayoría de búsquedas terminan sin ningún clic. Tus compradores ya no revisan diez enlaces; preguntan, y la IA responde con un nombre. GEO decide si ese nombre es el tuyo o el de tu competencia. La ventana para llegar temprano es ahora; en dos años será lo mínimo esperado.",
  },
  {
    question: "Ya invierto en SEO. ¿No es pagar lo mismo dos veces?",
    answer:
      "No: tu SEO trabaja para posicionarte en Google; GEO trabaja para que te citen en respuestas de IA — dos superficies distintas donde buscan tus compradores. Comparten bases, así que no duplicamos esfuerzo — construimos sobre lo que ya tienes en lugar de rehacerlo. Piénsalo así: SEO te da el clic que Google todavía envía; GEO te da la mención en la conversación que se está comiendo ese clic. Ignorar cualquiera de los dos es ceder la mitad del terreno.",
  },
  {
    question: "¿Cómo sé que funciona si no puedo ver un \"ranking\"?",
    answer:
      "Lo medimos con tu Share of Model: con qué frecuencia la IA te nombra versus a tus competidores, usando el mismo set de preguntas cada mes. No hay un \"ranking\" clásico porque los modelos no ordenan enlaces — sintetizan respuestas. Entonces, en lugar de una posición, te damos un número real y su tendencia, más las consultas donde apareces y donde no. Honestidad primero: todavía no existe un \"Search Console para IA\", así que esto se mide con nuestra propia metodología, no una métrica oficial. Pero lo que no se mide no se puede defender.",
  },
  {
    question: "¿Garantizan que la IA me va a recomendar?",
    answer:
      "No, y desconfía de quien lo haga: los modelos son probabilísticos, y la mayoría de las páginas citadas cambian cada pocos meses sin que nadie toque nada. Lo que hacemos es construir tu posición y defenderla mes a mes conforme los modelos cambian. Prometer \"citaciones garantizadas\" en un sistema que fluctúa por diseño es humo — preferimos decirte la verdad técnica que venderte una que no podemos cumplir. Esa honestidad es precisamente por la que nuestros clientes se quedan.",
  },
  {
    question: "Somos un negocio \"aburrido\" (industrial, B2B, nicho). ¿Esto es para nosotros?",
    answer:
      "Especialmente para ustedes: entre más técnico y especializado sea tu sector, menos competencia en GEO tienes y más directos son los resultados. Cuando un comprador industrial le pregunta a la IA \"quién fabrica X con certificación Y\", no busca una marca — busca capacidad. Si tu hoja de capacidades no está estructurada para que una máquina la lea, esa orden se va con otro. Los negocios \"aburridos\" suelen ser invisibles online y tienen presupuestos reales: la combinación perfecta para que esto realmente mueva la aguja.",
  },
  {
    question: "¿Tienen que reconstruir mi sitio web?",
    answer:
      "No: construimos la capa de datos legible por máquinas sobre tu sitio actual, sin migración ni rediseño. Estructuramos y exponemos tu información para que la IA la entienda sin adivinar, respetando tu diseño y tu stack. Y como somos desarrolladores, si surge algo custom que valga la pena construir, lo hacemos — pero nunca es un requisito para empezar. Empiezas con una auditoría, no con un proyecto de construcción.",
  },
]

export function FAQ() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="faq" ref={ref} className="py-24 px-4">
      <div className="max-w-3xl mx-auto">
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
            <span className="block">Preguntas frecuentes.</span>
            <span className="block text-zinc-400">Las respuestas honestas.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-zinc-200">
                <AccordionTrigger className="text-left text-zinc-900 hover:text-zinc-700 text-base font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-zinc-500 text-sm leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
