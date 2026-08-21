import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { getAllPosts } from "@/lib/posts"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog — Visibilidad en IA, GEO y marketing digital",
  description: "Guías, análisis y perspectivas sobre visibilidad en IA, GEO y el futuro del marketing digital. Escrito por el equipo de The Stack House.",
  alternates: { canonical: "https://thestackhouse.io/blog" },
  openGraph: {
    type: "website",
    url: "https://thestackhouse.io/blog",
    title: "Blog — The Stack House",
    description: "Guías y análisis sobre visibilidad en IA, Share of Model, GEO y cómo las marcas se posicionan en la nueva búsqueda.",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
}

export default function BlogPage() {
  const posts = getAllPosts()

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
                    <span className="text-xs text-zinc-400">
                      {new Date(post.date).toLocaleDateString("es-AR", { day: "numeric", month: "long", year: "numeric" })}
                    </span>
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
