import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { getAllPosts } from "@/lib/posts"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

const SITE_URL = "https://thestackhouse.io"
const POSTS_PER_PAGE = 10

type BlogPageProps = {
  searchParams: Promise<{ page?: string | string[] }>
}

function getPageNumber(value?: string | string[]) {
  const rawValue = Array.isArray(value) ? value[0] : value
  if (!rawValue) return 1

  const page = Number(rawValue)
  return Number.isInteger(page) && page > 0 ? page : null
}

export async function generateMetadata({ searchParams }: BlogPageProps): Promise<Metadata> {
  const { page: pageParam } = await searchParams
  const page = getPageNumber(pageParam)
  const pageSuffix = page && page > 1 ? ` — Página ${page}` : ""
  const canonical = page && page > 1 ? `${SITE_URL}/blog?page=${page}` : `${SITE_URL}/blog`

  return {
    title: `Blog — Visibilidad en IA, GEO y marketing digital${pageSuffix}`,
    description: "Guías, análisis y perspectivas sobre visibilidad en IA, GEO y el futuro del marketing digital. Escrito por el equipo de The Stack House.",
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      title: `Blog — The Stack House${pageSuffix}`,
      description: "Guías y análisis sobre visibilidad en IA, Share of Model, GEO y cómo las marcas se posicionan en la nueva búsqueda.",
      images: [{ url: "/og-default.png", width: 1200, height: 630 }],
    },
  }
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const posts = getAllPosts()
  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE))
  const { page: pageParam } = await searchParams
  const currentPage = getPageNumber(pageParam)

  if (!currentPage || currentPage > totalPages) notFound()

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const visiblePosts = posts.slice(startIndex, startIndex + POSTS_PER_PAGE)
  const pageUrl = currentPage === 1 ? `${SITE_URL}/blog` : `${SITE_URL}/blog?page=${currentPage}`
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${pageUrl}#posts`,
    numberOfItems: visiblePosts.length,
    itemListElement: visiblePosts.map((post, index) => ({
      "@type": "ListItem",
      position: startIndex + index + 1,
      url: `${SITE_URL}/blog/${post.slug}`,
      name: post.title,
    })),
  }

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <Navbar />

      <main className="pt-32 pb-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="mb-14">
            <p className="text-xs font-medium tracking-widest text-zinc-400 uppercase mb-3">The Stack House</p>
            <h1 className="font-display text-4xl font-bold text-zinc-900 tracking-tight">Blog</h1>
            <p className="mt-3 text-sm text-zinc-500 leading-relaxed max-w-md">
              Análisis y guías sobre visibilidad en IA, GEO y cómo las marcas se posicionan en la nueva búsqueda.
            </p>
          </div>

          <div className="border-t border-zinc-200 mb-10" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {visiblePosts.map((post) => (
              <article key={post.slug} className="group h-full">
                <Link
                  href={`/blog/${post.slug}`}
                  className="flex h-full flex-col rounded-2xl border border-zinc-200 bg-white p-6 sm:p-7 transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-[0_14px_36px_rgba(0,0,0,0.06)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="inline-block text-[10px] font-semibold tracking-widest uppercase text-zinc-400 border border-zinc-200 rounded-full px-2.5 py-0.5">
                      {post.category}
                    </span>
                    <span className="text-xs text-zinc-400">{post.readTime} de lectura</span>
                  </div>

                  <h2 className="font-display text-xl font-bold text-zinc-900 group-hover:text-zinc-600 transition-colors leading-snug mb-3">
                    {post.title}
                  </h2>
                  <p className="text-sm text-zinc-500 leading-relaxed mb-6 line-clamp-3">{post.description}</p>

                  <div className="flex items-center gap-3 mt-auto pt-5 border-t border-zinc-100">
                    <div className="w-6 h-6 rounded-full bg-zinc-900 flex items-center justify-center">
                      <span className="text-[9px] font-bold text-white">SH</span>
                    </div>
                    <span className="text-xs text-zinc-400">{post.author}</span>
                    <span className="text-zinc-300">·</span>
                    <time dateTime={post.date} className="text-xs text-zinc-400">
                      {new Date(post.date).toLocaleDateString("es-AR", { day: "numeric", month: "short", year: "numeric" })}
                    </time>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {totalPages > 1 && (
            <nav aria-label="Paginación del blog" className="mt-12 flex items-center justify-center gap-2">
              {currentPage > 1 && (
                <Link
                  href={currentPage === 2 ? "/blog" : `/blog?page=${currentPage - 1}`}
                  rel="prev"
                  className="mr-2 rounded-full border border-zinc-200 px-4 py-2 text-sm text-zinc-600 hover:border-zinc-400 hover:text-zinc-900 transition-colors"
                >
                  Anterior
                </Link>
              )}

              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <Link
                  key={page}
                  href={page === 1 ? "/blog" : `/blog?page=${page}`}
                  aria-current={page === currentPage ? "page" : undefined}
                  aria-label={`Ir a la página ${page}`}
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-sm transition-colors ${
                    page === currentPage
                      ? "bg-zinc-900 text-white"
                      : "border border-zinc-200 text-zinc-500 hover:border-zinc-400 hover:text-zinc-900"
                  }`}
                >
                  {page}
                </Link>
              ))}

              {currentPage < totalPages && (
                <Link
                  href={`/blog?page=${currentPage + 1}`}
                  rel="next"
                  className="ml-2 rounded-full border border-zinc-200 px-4 py-2 text-sm text-zinc-600 hover:border-zinc-400 hover:text-zinc-900 transition-colors"
                >
                  Siguiente
                </Link>
              )}
            </nav>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
