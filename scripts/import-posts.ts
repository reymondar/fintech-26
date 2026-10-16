import nextEnv from '@next/env'
nextEnv.loadEnvConfig(process.cwd())
const { getPayload } = await import('payload')
const { default: config } = await import('../payload.config')
const { compileMDX } = await import('next-mdx-remote/rsc')
const { renderToStaticMarkup } = await import('react-dom/server')
const { convertHTMLToLexical } = await import('@payloadcms/richtext-lexical')
const { JSDOM } = await import('jsdom')
const { default: matter } = await import('gray-matter')
const { default: remarkGfm } = await import('remark-gfm')
const fs = await import('node:fs/promises')
const path = await import('node:path')
const payload = await getPayload({ config })
const contentField = payload.config.collections.find(c => c.slug === 'posts')!.fields.find(f => 'name' in f && f.name === 'content') as any
const editorConfig = contentField.editor.editorConfig
const fullIndex = await fs.readFile('content/ai/llms-full.txt', 'utf8')
let created = 0, skipped = 0
for (const file of (await fs.readdir('content/posts')).filter(f => f.endsWith('.mdx'))) {
  const slug = file.replace(/\.mdx$/, '')
  const existing = await payload.find({ collection: 'posts', where: { slug: { equals: slug } }, limit: 1, draft: true })

  const raw = await fs.readFile(path.join('content/posts', file), 'utf8')
  const { data, content } = matter(raw)
  const section = fullIndex.split(/^### /m).find(s => s.includes(`/blog/${slug}`))
  const legacySummary = section ? section.split('\n').slice(1).filter(line => line.trim() && !/^(URL|Fecha|Tiempo de lectura|Publicado|Actualizado|Lectura):/i.test(line.trim()) && !line.includes('https://thestackhouse.io/blog/')).join('\n').trim() : data.description
  const summary = (legacySummary || data.description).split('\n## ')[0].split('\n').filter((line: string) => line.trim() !== '---').join('\n').trim()
  if (existing.docs.length) {
    // Upgrade only the freshly imported fallback summary, never overwrite editorial edits.
    const current = existing.docs[0]
    if (current.originalMdx === raw && (current.summary === current.description || current.summary === legacySummary) && summary !== current.summary) await payload.update({ collection: 'posts', id: current.id, context: { importing: true }, data: { summary } })
    skipped++; continue
  }
  const compiled = await compileMDX({ source: content, options: { mdxOptions: { remarkPlugins: [remarkGfm] } } })
  const dom = new JSDOM(renderToStaticMarkup(compiled.content))
  const blocks: Record<string, any> = {}
  let index = 0
  for (const figure of [...dom.window.document.querySelectorAll('figure:has(svg)')]) {
    const svg = figure.querySelector('svg')!
    const name = `${slug}-chart-${index}.svg`
    await fs.mkdir('public/blog', { recursive: true })
    await fs.writeFile(path.join('public/blog', name), svg.outerHTML)
    const marker = `STACKHOUSEIMAGE${index++}`
    blocks[marker] = { blockType: 'image', url: `/blog/${name}`, alt: svg.getAttribute('aria-label') || data.title, caption: figure.querySelector('figcaption')?.textContent || '' }
    const replacement = dom.window.document.createElement('p'); replacement.textContent = marker; figure.replaceWith(replacement)
  }
  for (const image of [...dom.window.document.querySelectorAll('img')]) {
    const marker = `STACKHOUSEIMAGE${index++}`
    blocks[marker] = { blockType: 'image', url: image.getAttribute('src') || '', alt: image.getAttribute('alt') || data.title }
    const parent = image.parentElement
    const replacement = dom.window.document.createElement('p'); replacement.textContent = marker
    if (parent?.tagName === 'P' && parent.childNodes.length === 1) parent.replaceWith(replacement)
    else image.replaceWith(replacement)
  }
  const rich = convertHTMLToLexical({ editorConfig, html: dom.window.document.body.innerHTML, JSDOM })
  rich.root.children = rich.root.children.map((node:any) => {
    const text = (node.children || []).map((n:any)=>n.text || '').join('')
    return blocks[text] ? { type: 'block', version: 2, format: '', fields: blocks[text] } : node
  })
  await payload.create({ collection: 'posts', context: { importing: true }, data: {
    title: data.title, h1: data.h1, slug, description: data.description,
    content: rich, date: new Date(data.date).toISOString(), updated: data.updated ? new Date(data.updated).toISOString() : undefined,
    category: data.category, author: data.author, readTime: data.readTime, keywords: data.keywords,
    summary, originalMdx: raw, _status: data.draft ? 'draft' : 'published',
  } })
  created++
  console.log(`Importado: ${slug}${data.draft ? ' (borrador)' : ''}`)
}
console.log(`${created} importados; ${skipped} existentes conservados.`)
await payload.destroy()

// CLI command: all writes and cleanup above have completed; close remaining driver sockets.
process.exit(0)
