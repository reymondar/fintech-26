import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog — The Stack House",
  description: "Guías, análisis y perspectivas sobre visibilidad en IA, GEO y el futuro del marketing digital.",
}

const posts = [
  {
    slug: "por-que-chatgpt-no-menciona-tu-empresa",
    category: "GEO",
    title: "Por qué ChatGPT no menciona tu empresa (y qué hacer al respecto)",
    description:
      "Los motores de IA no eligen marcas por popularidad. Eligen las que tienen evidencia estructurada, fuentes confiables y responden preguntas concretas. Aquí explicamos el mecanismo.",
    author: "The Stack House",
    date: "13 de agosto, 2026",
    readTime: "8 min",
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-32 pb-24 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-14">
            <p className="text-xs font-medium tracking-widest text-zinc-400 uppercase mb-3">The Stack House</p>
            <h1 className="font-display text-4xl font-bold text-zinc-900 tracking-tight">Blog</h1>
            <p className="mt-3 text-sm text-zinc-500 leading-relaxed max-w-md">
              Análisis y guías sobre visibilidad en IA, GEO y cómo las marcas se posicionan en la nueva búsqueda.
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-zinc-200 mb-10" />

          {/* Posts */}
          <div className="divide-y divide-zinc-100">
            {posts.map((post) => (
              <article key={post.slug} className="py-8 group">
                <a href={`/blog/${post.slug}`} className="block">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-block text-[10px] font-semibold tracking-widest uppercase text-zinc-400 border border-zinc-200 rounded-full px-2.5 py-0.5">
                      {post.category}
                    </span>
                    <span className="text-xs text-zinc-400">{post.readTime} de lectura</span>
                  </div>
                  <h2 className="font-display text-xl font-bold text-zinc-900 group-hover:text-zinc-600 transition-colors leading-snug mb-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-zinc-500 leading-relaxed mb-4 max-w-2xl">{post.description}</p>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-zinc-900 flex items-center justify-center">
                      <span className="text-[9px] font-bold text-white">SH</span>
                    </div>
                    <span className="text-xs text-zinc-400">{post.author}</span>
                    <span className="text-zinc-300">·</span>
                    <span className="text-xs text-zinc-400">{post.date}</span>
                  </div>
                </a>
              </article>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
