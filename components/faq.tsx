"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "¿Qué hace exactamente The Stack House?",
    answer:
      "The Stack House hace visible a tu empresa en motores de IA como ChatGPT, Gemini, Perplexity y Claude. Diagnosticamos cómo te ven los modelos cuando tus compradores preguntan por tu categoría, atribuimos tu caída de tráfico a sus causas reales y construimos la posición para que la IA te recomiende.",
  },
  {
    question: "¿En qué se diferencia de una herramienta de monitorización?",
    answer:
      "Una herramienta de monitorización te dice si la IA te menciona. Nosotros te decimos por qué pierdes tráfico, cuánto es atribuible a la IA y qué hacer para recuperar la posición. Los datos son el punto de partida; el valor está en el diagnóstico y la ejecución.",
  },
  {
    question: "Ya invierto en SEO. ¿No es pagar lo mismo dos veces?",
    answer:
      "No. El SEO trabaja tu posición en una lista de enlaces; la visibilidad en IA decide si el modelo te nombra en su respuesta. Comparten base técnica, pero se miden y se trabajan distinto. De hecho, nuestro diagnóstico le dice a tu SEO dónde enfocar: separa lo que es problema de buscadores de lo que es problema de IA.",
  },
  {
    question: "¿Garantizan que la IA me va a recomendar?",
    answer:
      "No, y desconfía de quien lo garantice. Los modelos son probabilísticos: la misma pregunta puede dar respuestas distintas el mismo día. Lo que sí garantizamos: medición rigurosa y comparable, un diagnóstico honesto de tus causas de caída y acciones que aumentan tu probabilidad de aparecer.",
  },
  {
    question: "¿Cuánto cuesta?",
    answer:
      "El diagnóstico en vivo de 20 minutos es gratis. La auditoría completa tiene precio cerrado antes de empezar, en función del tamaño de tu presencia digital y tu competencia. Sin permanencia y sin letra pequeña.",
  },
  {
    question: "Mi negocio es \"aburrido\" (industrial, B2B, nicho). ¿Esto aplica?",
    answer:
      "Sí — y suele ser donde más rápido se gana. En sectores nicho los modelos se apoyan en muy pocas fuentes de autoridad: estar en las correctas cuesta menos y mueve más que en mercados saturados. El diagnóstico en vivo te lo confirma en 20 minutos con tus propias preguntas de compra.",
  },
  {
    question: "¿Tienen que reconstruir mi sitio web?",
    answer:
      "No. La mayoría de acciones son ajustes sobre lo que ya tienes: hacer tu contenido legible y citable para los modelos, corregir bloqueos técnicos que ni sabías que existían y ganar presencia en las fuentes que la IA consulta en tu sector. Si algo requiere desarrollo, lo verás en el plan y decides tú.",
  },
  {
    question: "¿Y si la auditoría concluye que mi problema no es la IA?",
    answer:
      "Te lo decimos por escrito, con el desglose de causas reales. Pagas un diagnóstico verdadero, no una excusa para vendernos. Esta regla no es marketing: es cómo trabajamos.",
  },
]

export function FAQ() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="faq" ref={ref} className="py-12 px-4">
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
                <AccordionContent forceMount className="text-zinc-500 text-sm leading-relaxed">
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
