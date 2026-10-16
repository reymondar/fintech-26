import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { getPayload } from "payload"
import config from "@payload-config"

const POSTS_DIR = path.join(process.cwd(), "content/posts")

export type PostMeta = {
  slug: string
  title: string
  h1?: string
  description: string
  date: string
  updated?: string
  category: string
  author: string
  readTime: string
  keywords?: string[]
  draft?: boolean
  summary?: string
  seo?: { canonical?: string | null; noindex?: boolean | null; image?: { url?: string | null; alt?: string | null } | null }
}

export type Post = PostMeta & {
  content: string
  customSchema?: unknown
  richContent?: import("lexical").SerializedEditorState
}

export function getFilePosts(): PostMeta[] {
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"))

  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "")
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf-8")
      const { data } = matter(raw)
      return { slug, ...data } as PostMeta
    })
    .filter((p) => !p.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getFilePost(slug: string): Post | null {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`)
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || !fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(raw)
  if (data.draft) return null
  return { slug, content, ...data } as Post
}


export async function getCMS() {
  return getPayload({ config })
}
const cmsEnabled = () => process.env.CMS_BLOG_ENABLED === 'true'
function cmsPost(doc: import('@/payload-types').Post): Post {
  return {
    customSchema: doc.customSchema,
    slug: doc.slug, title: doc.title, h1: doc.h1 || undefined, description: doc.description,
    date: doc.date, updated: doc.updated || undefined, category: doc.category, author: doc.author,
    readTime: doc.readTime || '5 min', keywords: doc.keywords || undefined,
    content: lexicalMarkdown(doc.content), richContent: doc.content, summary: doc.summary || undefined,
    seo: { ...doc.seo, image: typeof doc.seo?.image === 'object' ? doc.seo.image : null },
  }
}
// Shared representation for Markdown consumers; never executes editor-provided MDX.
export function lexicalMarkdown(value: unknown): string {
  type Node = { type?: string; text?: string; format?: number; tag?: string; listType?: string; children?: Node[]; root?: Node; fields?: Record<string, any>; value?: any }
  function render(n: Node): string {
    const children = (n.children || []).map(render).join('')
    if (typeof n.text === 'string') return n.format && n.format & 1 ? `**${n.text}**` : n.text
    switch (n.type) {
      case 'root': return children
      case 'heading': return `${'#'.repeat(Number(n.tag?.slice(1)) || 2)} ${children}\n\n`
      case 'paragraph': return `${children}\n\n`
      case 'linebreak': return '\n'
      case 'quote': return `> ${children}\n\n`
      case 'link': case 'autolink': return `[${children}](${n.fields?.linkType === 'internal' ? (n.fields?.doc?.value?.slug ? '/blog/' + n.fields.doc.value.slug : '#') : n.fields?.url || '#'})`
      case 'listitem': return `- ${children.trim()}\n`
      case 'list': return `${children}\n`
      case 'horizontalrule': return '---\n\n'
      case 'tablerow': return `| ${(n.children || []).map(x => render(x).trim().replaceAll('|', '\\|')).join(' | ')} |\n`
      case 'table': { const rows = n.children || []; return rows.map((x,i) => render(x)+(i === 0 ? `| ${(x.children || []).map(()=>'---').join(' | ')} |\n` : '')).join('')+'\n' }
      case 'upload': return n.value?.url ? `![${n.fields?.alt || n.value.alt || ''}](${n.value.url})\n\n${n.fields?.caption || n.value.caption || ''}\n\n` : ''
      case 'block': {
        const f = n.fields || {}
        if (f.blockType === 'image') return `![${f.alt || ''}](${f.url})\n\n${f.caption || ''}\n\n`
        if (f.blockType === 'cta') return `[${f.label}](${f.post?.slug ? '/blog/' + f.post.slug : f.url || '#'})\n\n`
        if (f.blockType === 'faq') return (f.items || []).map((x:any)=>`### ${x.question}\n\n${x.answer}\n\n`).join('')
        if (f.blockType === 'definition') return `## ${f.term}\n\n${f.definition}\n\n`
        if (f.blockType === 'statistic') return `${f.value}: ${f.explanation}\n\nFuente: [${f.sourceName}](${f.sourceURL}) · ${f.observedAt || ''}\n\n`
        if (f.blockType === 'serviceCard') return `## ${f.name}\n\n${f.description}\n\n${(f.attributes||[]).map((x:any)=>`- ${x.label}: ${x.value}`).join('\n')}\n\n`
        if (f.blockType === 'comparison') { const cell=(v:any)=>String(v||'').replaceAll('|','\\|').replaceAll('\n',' '); return `## ${f.caption}\n\n| ${(f.columns||[]).map((c:any)=>cell(c.label)).join(' | ')} |\n| ${(f.columns||[]).map(()=>'---').join(' | ')} |\n${(f.rows||[]).map((r:any)=>`| ${(r.cells||[]).map((c:any)=>cell(c.value)).join(' | ')} |`).join('\n')}\n\n${f.source||''}\n\n` }
        if (f.blockType === 'video') return `## ${f.title}\n\n[Vídeo](${f.url})\n\n${f.transcript}\n\n`
        if (f.blockType === 'reusable' && f.section?.active) return `## ${f.section.title}\n\n${f.section.body}\n\n${f.section.sourceURL ? `[${f.section.sourceName || 'Fuente'}](${f.section.sourceURL})` : ''}\n\n`
        return ''
      }
      default: return children
    }
  }
  return render((value as Node)?.root || {}).trim()
}
export async function getAllPosts(): Promise<PostMeta[]> {
  if (!cmsEnabled()) return getFilePosts()
  const payload = await getCMS()
  const result = await payload.find({ collection: 'posts', overrideAccess: false, where: { _status: { equals: 'published' } }, sort: '-date', pagination: false, depth: 1 })
  return result.docs.map(cmsPost)
}
export async function getPost(slug: string): Promise<Post | null> {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return null
  if (!cmsEnabled()) return getFilePost(slug)
  const payload = await getCMS()
  const { draftMode, headers } = await import('next/headers')
  const mode = await draftMode()
  let user = null
  if (mode.isEnabled) user = (await payload.auth({ headers: await headers() })).user
  const result = await payload.find({ collection: 'posts', overrideAccess: false, user: user || undefined, draft: Boolean(user), where: { slug: { equals: slug }, ...(!user ? { _status: { equals: 'published' } } : {}) }, depth: 2, limit: 1 })
  return result.docs[0] ? cmsPost(result.docs[0]) : null
}
