import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { getPost, getAllPosts } from "@/lib/posts"
import { MDXRemote } from "next-mdx-remote/rsc"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return {
    title: `${post.title} — The Stack House`,
    description: post.description,
  }
}

const mdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="font-display text-xl font-bold text-zinc-900 mt-10 mb-4 leading-snug" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="font-display text-lg font-semibold text-zinc-900 mt-8 mb-3" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-[15px] leading-[1.75] text-zinc-700 mb-0" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="space-y-2 pl-5 list-disc marker:text-zinc-300 text-[15px] leading-[1.75] text-zinc-700" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="space-y-3 pl-5 list-decimal marker:text-zinc-400 marker:text-sm text-[15px] leading-[1.75] text-zinc-700" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-relaxed" {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-zinc-900" {...props} />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code className="text-[13px] bg-zinc-100 px-1.5 py-0.5 rounded text-zinc-600 font-mono" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="border-l-2 border-zinc-300 pl-4 text-zinc-500 italic text-[15px]" {...props} />
  ),
  hr: () => <hr className="border-zinc-200 my-8" />,
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPost(slug)
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

          {/* Meta */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-zinc-900 flex items-center justify-center flex-shrink-0">
                <span className="text-[9px] font-bold text-white">SH</span>
              </div>
              <p className="text-xs font-medium text-zinc-700">{post.author}</p>
            </div>
            <span className="text-zinc-200">|</span>
            <span className="text-xs text-zinc-400">
              {new Date(post.date).toLocaleDateString("es-AR", { day: "numeric", month: "long", year: "numeric" })}
            </span>
            <span className="text-zinc-200">|</span>
            <span className="text-xs text-zinc-400">{post.readTime} de lectura</span>
          </div>

          <div className="border-t border-zinc-200 mb-10" />

          {/* MDX Content */}
          <div className="space-y-6">
            <MDXRemote source={post.content} components={mdxComponents} />
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
