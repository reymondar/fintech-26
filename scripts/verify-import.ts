import nextEnv from '@next/env'
nextEnv.loadEnvConfig(process.cwd())
import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import matter from 'gray-matter'
import { JSDOM } from 'jsdom'
import { compileMDX } from 'next-mdx-remote/rsc'
import { renderToStaticMarkup } from 'react-dom/server'
import remarkGfm from 'remark-gfm'
const { getPayload } = await import('payload')
const { default: config } = await import('../payload.config')
const payload = await getPayload({ config })
function nodes(value: any): any[] { return [value, ...(value.children || []).flatMap(nodes)] }
try {
  const files = (await fs.readdir('content/posts')).filter(f=>f.endsWith('.mdx'))
  const all = await payload.find({ collection:'posts', pagination:false, draft:true })
  assert.equal(all.docs.length,files.length)
  for (const file of files) {
    const raw = await fs.readFile(`content/posts/${file}`,'utf8')
    const { data, content } = matter(raw)
    const doc = all.docs.find(p=>p.slug===file.replace(/\.mdx$/,''))!
    assert.ok(doc,file)
    assert.equal(doc.originalMdx,raw)
    assert.equal(doc.date.slice(0,10),String(data.date).slice(0,10))
    assert.equal(doc._status,data.draft?'draft':'published')
    const compiled = await compileMDX({source:content,options:{mdxOptions:{remarkPlugins:[remarkGfm]}}})
    const dom = new JSDOM(renderToStaticMarkup(compiled.content))
    const tree = nodes(doc.content.root)
    const originalHeadings = [...dom.window.document.querySelectorAll('h2,h3,h4,h5,h6')].map(n=>n.textContent)
    const importedHeadings = tree.filter(n=>n.type==='heading').map(n=>nodes(n).filter(x=>typeof x.text==='string').map(x=>x.text).join(''))
    assert.deepEqual(importedHeadings,originalHeadings,`${file}: headings`)
    assert.equal(tree.filter(n=>n.type==='table').length,dom.window.document.querySelectorAll('table').length,`${file}: tables`)
    const originalLinks = [...dom.window.document.querySelectorAll('a')].map(n=>n.getAttribute('href')).sort()
    const importedLinks = tree.filter(n=>n.type==='link'||n.type==='autolink').map(n=>n.fields?.url).sort()
    assert.deepEqual(importedLinks,originalLinks,`${file}: links`)
  }
  const publicPosts = await payload.find({collection:'posts',overrideAccess:false,pagination:false})
  assert.equal(publicPosts.totalDocs,15)
  assert.ok(publicPosts.docs.every(p=>!p.originalMdx))
  console.log('PASS: 16 originals retained; dates/draft state/headings/tables/links preserved; 15 public posts; original source private.')
} finally { await payload.destroy() }

// CLI command: all writes and cleanup above have completed; close remaining driver sockets.
process.exit(0)
