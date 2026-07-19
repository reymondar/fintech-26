import { SmoothScroll } from "@/components/smooth-scroll"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Integrations } from "@/components/integrations"
import { BentoGrid } from "@/components/bento-grid"
import { QueHacemos } from "@/components/que-hacemos"
import { TrustedAtScale } from "@/components/trusted-at-scale"
import { Honesty } from "@/components/honesty"
import { FAQ } from "@/components/faq"
import { QueRecibes } from "@/components/que-recibes"
import { FinalCTA } from "@/components/final-cta"
import { Footer } from "@/components/footer"

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "¿Qué hace exactamente The Stack House?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Stack House hace visible a tu empresa en motores de IA como ChatGPT, Gemini, Perplexity y Claude. Diagnosticamos cómo te ven los modelos cuando tus compradores preguntan por tu categoría, atribuimos tu caída de tráfico a sus causas reales y construimos la posición para que la IA te recomiende.",
      },
    },
    {
      "@type": "Question",
      name: "¿En qué se diferencia de una herramienta de monitorización?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Una herramienta de monitorización te dice si la IA te menciona. Nosotros te decimos por qué pierdes tráfico, cuánto es atribuible a la IA y qué hacer para recuperar la posición. Los datos son el punto de partida; el valor está en el diagnóstico y la ejecución.",
      },
    },
    {
      "@type": "Question",
      name: "Ya invierto en SEO. ¿No es pagar lo mismo dos veces?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. El SEO trabaja tu posición en una lista de enlaces; la visibilidad en IA decide si el modelo te nombra en su respuesta. Comparten base técnica, pero se miden y se trabajan distinto. De hecho, nuestro diagnóstico le dice a tu SEO dónde enfocar: separa lo que es problema de buscadores de lo que es problema de IA.",
      },
    },
    {
      "@type": "Question",
      name: "¿Garantizan que la IA me va a recomendar?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, y desconfía de quien lo garantice. Los modelos son probabilísticos: la misma pregunta puede dar respuestas distintas el mismo día. Lo que sí garantizamos: medición rigurosa y comparable, un diagnóstico honesto de tus causas de caída y acciones que aumentan tu probabilidad de aparecer.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cuánto cuesta?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "El diagnóstico en vivo de 20 minutos es gratis. La auditoría completa tiene precio cerrado antes de empezar, en función del tamaño de tu presencia digital y tu competencia. Sin permanencia y sin letra pequeña.",
      },
    },
    {
      "@type": "Question",
      name: "Mi negocio es \"aburrido\" (industrial, B2B, nicho). ¿Esto aplica?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí — y suele ser donde más rápido se gana. En sectores nicho los modelos se apoyan en muy pocas fuentes de autoridad: estar en las correctas cuesta menos y mueve más que en mercados saturados. El diagnóstico en vivo te lo confirma en 20 minutos con tus propias preguntas de compra.",
      },
    },
    {
      "@type": "Question",
      name: "¿Tienen que reconstruir mi sitio web?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. La mayoría de acciones son ajustes sobre lo que ya tienes: hacer tu contenido legible y citable para los modelos, corregir bloqueos técnicos que ni sabías que existían y ganar presencia en las fuentes que la IA consulta en tu sector. Si algo requiere desarrollo, lo verás en el plan y decides tú.",
      },
    },
    {
      "@type": "Question",
      name: "¿Y si la auditoría concluye que mi problema no es la IA?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Te lo decimos por escrito, con el desglose de causas reales. Pagas un diagnóstico verdadero, no una excusa para vendernos. Esta regla no es marketing: es cómo trabajamos.",
      },
    },
  ],
}

export default function Home() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-zinc-50">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <Navbar />
        <Hero />
        <Integrations />
        <BentoGrid />
        <QueHacemos />
        <TrustedAtScale />
        <Honesty />
        <QueRecibes />
        <FAQ />
        <FinalCTA />
        <Footer />
      </main>
    </SmoothScroll>
  )
}
