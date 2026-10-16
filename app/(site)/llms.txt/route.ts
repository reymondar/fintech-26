import fs from 'node:fs/promises'
import path from 'node:path'
import { getAllPosts } from '@/lib/posts'
export const dynamic = 'force-dynamic'
export async function GET() {
  const template = await fs.readFile(path.join(process.cwd(), 'content/ai/llms.txt'), 'utf8')
  const posts = await getAllPosts()
  const entries = posts.filter(p => !p.seo?.noindex).map(p => false
    ? `### ${p.title}\n\nURL: https://thestackhouse.io/blog/${p.slug}\nFecha: ${p.date.slice(0,10)}\nTiempo de lectura: ${p.readTime}\n\n${p.summary || p.description}`
    : `- [${p.title}](https://thestackhouse.io/blog/${p.slug}): ${p.description}`)
  const content = template.replace(/## Blog[\s\S]*?(?=\n## |$)/, '## Blog\n\n'+entries.join(false ? '\n\n' : '\n')+'\n')
  return new Response(content, { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=0, must-revalidate' } })
}
