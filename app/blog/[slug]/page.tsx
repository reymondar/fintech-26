import React from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

type Post = {
  category: string
  title: string
  description: string
  author: string
  date: string
  readTime: string
  content: React.ReactNode
}

const mockContent = (
  <div className="space-y-6 text-[15px] leading-[1.75] text-zinc-700">
    <p className="text-base font-semibold text-zinc-900 leading-relaxed">
      Tu empresa tiene años en el mercado, buenos clientes, reseñas positivas. Pero cuando alguien le pregunta a ChatGPT "¿cuál es la mejor agencia de marketing digital en Argentina?", tu nombre no aparece. ¿Por qué?
    </p>

    <p>
      La respuesta no tiene que ver con cuánto gastás en publicidad, ni con cuántos seguidores tenés. Los modelos de lenguaje no funcionan como Google. No rastrean popularidad —rastrean evidencia estructurada, fuentes confiables y consistencia semántica entre lo que una empresa dice ser y lo que el resto del ecosistema confirma.
    </p>

    <h2 className="font-display text-xl font-bold text-zinc-900 mt-10 mb-4">
      Cómo decide la IA qué empresas mencionar
    </h2>

    <p>
      Cuando un LLM responde una pregunta sobre marcas o servicios, construye su respuesta a partir de dos fuentes: el conocimiento que incorporó durante el entrenamiento y la información que recupera en tiempo real (en motores como Perplexity o el modo IA de Google).
    </p>

    <p>
      En ambos casos, lo que pesa es la calidad de la evidencia, no su volumen. Un artículo en un medio especializado con tu empresa citada como fuente vale más que cien publicaciones de redes sociales. Una página de producto con schema.org correcto es más legible para la IA que un sitio web visualmente impactante pero semánticamente vacío.
    </p>

    <h2 className="font-display text-xl font-bold text-zinc-900 mt-10 mb-4">
      Los tres problemas más comunes
    </h2>

    <p>En el 90% de los casos que analizamos, el problema se reduce a alguna combinación de estos tres:</p>

    <ol className="space-y-4 pl-5 list-decimal marker:text-zinc-400 marker:text-sm">
      <li>
        <strong className="text-zinc-900 font-semibold">Sin presencia en fuentes de autoridad.</strong>{" "}
        La IA cita lo que otros citan. Si no aparecés en medios, directorios relevantes, o publicaciones del sector, no existís para el modelo.
      </li>
      <li>
        <strong className="text-zinc-900 font-semibold">Contenido sin estructura semántica.</strong>{" "}
        Un sitio web sin schema.org, sin FAQs estructuradas, sin datos de entidad claros (qué hacés, para quién, dónde) es invisible para los sistemas de recuperación de la IA.
      </li>
      <li>
        <strong className="text-zinc-900 font-semibold">Inconsistencia de entidad.</strong>{" "}
        Si en LinkedIn decís que sos "agencia de growth", en tu web "consultora de marketing" y en Google Business "empresa de publicidad", el modelo no puede resolver qué sos. La ambigüedad se castiga con omisión.
      </li>
    </ol>

    <h2 className="font-display text-xl font-bold text-zinc-900 mt-10 mb-4">
      Qué podés hacer esta semana
    </h2>

    <p>
      No es un proceso de meses. Hay cambios que generan impacto rápido porque la IA actualiza su contexto de recuperación en tiempo real:
    </p>

    <ul className="space-y-3 pl-5 list-disc marker:text-zinc-300">
      <li>
        Definí tu entidad con precisión: nombre legal, categoría de negocio, área geográfica, servicio principal. Usá exactamente las mismas palabras en todos los canales.
      </li>
      <li>
        Implementá schema.org de tipo <code className="text-[13px] bg-zinc-100 px-1.5 py-0.5 rounded text-zinc-600 font-mono">Organization</code> con <code className="text-[13px] bg-zinc-100 px-1.5 py-0.5 rounded text-zinc-600 font-mono">sameAs</code> apuntando a tus perfiles verificados.
      </li>
      <li>
        Conseguí al menos una mención en un medio indexado con tu nombre, URL y categoría en el mismo párrafo.
      </li>
      <li>
        Creá una página que responda directamente la pregunta que tu cliente ideal le haría a la IA. No un post de blog genérico —una página que responde con especificidad.
      </li>
    </ul>

    <h2 className="font-display text-xl font-bold text-zinc-900 mt-10 mb-4">
      El resultado cuando lo hacés bien
    </h2>

    <p>
      Las empresas que optimizan para GEO no necesariamente ven más tráfico orgánico inmediato —a veces lo ven caer, porque la IA responde la pregunta directamente. Lo que sí ven es un aumento en las consultas entrantes de mayor calidad: personas que ya saben lo que ofrecen, que ya confían en la marca y que llegan con una intención concreta.
    </p>

    <p>
      La visibilidad en IA no reemplaza la conversión —la acelera. El funnel no desaparece; se comprime. Y las empresas que lleguen primero a esa posición van a ser muy difíciles de desplazar.
    </p>
  </div>
)

const posts: Record<string, Post> = {
  "por-que-chatgpt-no-menciona-tu-empresa": {
    category: "GEO",
    title: "Por qué ChatGPT no menciona tu empresa (y qué hacer al respecto)",
    description:
      "Los motores de IA no eligen marcas por popularidad. Eligen las que tienen evidencia estructurada, fuentes confiables y responden preguntas concretas.",
    author: "The Stack House",
    date: "13 de agosto, 2026",
    readTime: "8 min",
    content: mockContent,
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = posts[slug]
  if (!post) return {}
  return {
    title: `${post.title} — The Stack House`,
    description: post.description,
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = posts[slug]
  if (!post) notFound()

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-28 pb-24 px-4">
        <div className="max-w-2xl mx-auto">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-8">
            <a href="/" className="text-xs text-zinc-400 hover:text-zinc-600 transition-colors">
              The Stack House
            </a>
            <span className="text-zinc-300 text-xs">›</span>
            <a href="/blog" className="text-xs text-zinc-400 hover:text-zinc-600 transition-colors">
              Blog
            </a>
            <span className="text-zinc-300 text-xs">›</span>
            <span className="text-xs text-zinc-500 truncate max-w-[200px]">{post.title}</span>
          </nav>

          {/* Category */}
          <span className="inline-block text-[10px] font-semibold tracking-widest uppercase text-zinc-400 border border-zinc-200 rounded-full px-2.5 py-0.5 mb-5">
            {post.category}
          </span>

          {/* Title */}
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-zinc-900 leading-tight tracking-tight mb-6">
            {post.title}
          </h1>

          {/* Meta row */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-zinc-900 flex items-center justify-center flex-shrink-0">
                <span className="text-[9px] font-bold text-white">SH</span>
              </div>
              <p className="text-xs font-medium text-zinc-700">{post.author}</p>
            </div>
            <span className="text-zinc-200">|</span>
            <span className="text-xs text-zinc-400">{post.date}</span>
            <span className="text-zinc-200">|</span>
            <span className="text-xs text-zinc-400">{post.readTime} de lectura</span>
          </div>

          {/* Divider */}
          <div className="border-t border-zinc-200 mb-10" />

          {/* Article body */}
          <div className="prose-blog">
            {post.content}
          </div>

          {/* End CTA */}
          <div className="border-t border-zinc-200 mt-14 pt-10">
            <p className="text-xs font-semibold tracking-widest uppercase text-zinc-400 mb-3">¿Querés saber si tu empresa aparece en la IA?</p>
            <h3 className="font-display text-xl font-bold text-zinc-900 mb-4 leading-snug">
              Hacemos un diagnóstico en vivo de 20 minutos, sin costo.
            </h3>
            <a
              href="https://calendar.app.google/aGDRM9XzkQFEndG77"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-5 py-2.5 rounded-full bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-700 transition-colors"
            >
              Agenda tu diagnóstico →
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
