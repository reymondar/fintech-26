import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ReadingProgress } from "@/components/reading-progress"
import { getPost, getAllPosts } from "@/lib/posts"
import { MDXRemote } from "next-mdx-remote/rsc"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import remarkGfm from "remark-gfm"

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

const SITE_URL = "https://thestackhouse.io"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  const postUrl = `${SITE_URL}/blog/${slug}`
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    authors: [{ name: post.author, url: SITE_URL }],
    alternates: { canonical: postUrl },
    openGraph: {
      type: "article",
      url: postUrl,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: "/og-default.png",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: ["/og-default.png"],
    },
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
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const href = props.href ?? ""
    const cls = "text-zinc-900 underline underline-offset-2 decoration-zinc-300 hover:decoration-zinc-900 transition-colors"
    if (href.startsWith("/")) {
      return <Link href={href} className={cls}>{props.children}</Link>
    }
    return <a {...props} target="_blank" rel="noopener noreferrer" className={cls} />
  },
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img {...props} alt={props.alt ?? ""} className="w-full rounded-xl border border-zinc-200 my-2" />
  ),
  figure: (props: React.HTMLAttributes<HTMLElement>) => (
    <figure className="my-8" {...props} />
  ),
  figcaption: (props: React.HTMLAttributes<HTMLElement>) => (
    <figcaption className="text-xs text-zinc-400 text-center mt-3" {...props} />
  ),
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full text-[13px] border-collapse" {...props} />
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-zinc-50" {...props} />
  ),
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th className="text-left text-xs font-semibold text-zinc-500 uppercase tracking-wide px-4 py-2.5 border-b border-zinc-200" {...props} />
  ),
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="px-4 py-2.5 text-zinc-700 border-b border-zinc-100 leading-relaxed" {...props} />
  ),
  tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className="hover:bg-zinc-50/50 transition-colors" {...props} />
  ),
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const postUrl = `${SITE_URL}/blog/${slug}`

  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": postUrl,
    url: postUrl,
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      "@id": `${SITE_URL}/#ramon-arana`,
      name: post.author,
      jobTitle: "Fundador",
      worksFor: { "@id": `${SITE_URL}/#organization` },
      url: SITE_URL,
    },
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
    inLanguage: "es",
    keywords: post.keywords?.join(", "),
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "The Stack House", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: postUrl },
    ],
  }

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <ReadingProgress />
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
              <a rel="author" href={SITE_URL} className="text-xs font-medium text-zinc-700">{post.author}</a>
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
            <MDXRemote
              source={post.content}
              components={mdxComponents}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
            />
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
