import nextEnv from '@next/env'
nextEnv.loadEnvConfig(process.cwd())
import assert from 'node:assert/strict'
import { mkdtemp, rm, readFile, readdir } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
const directory = await mkdtemp(path.join(tmpdir(), 'stackhouse-cms-check-'))
process.env.DATABASE_URL = `file:${directory}/test.db`
process.env.CMS_BLOG_ENABLED = 'true'
process.env.RESEND_API_KEY = ''
const { getPayload } = await import('payload')
const { default: config } = await import('../payload.config')
const payload = await getPayload({ config })
const editor = (payload.config.collections.find(c=>c.slug==='posts')!.fields.find(f=>'name' in f && f.name==='content') as any).editor.editorConfig
const { convertHTMLToLexical } = await import('@payloadcms/richtext-lexical')
const { JSDOM } = await import('jsdom')
const content = convertHTMLToLexical({ editorConfig: editor, html: '<h2>Pregunta real</h2><p>Respuesta con <a href="https://example.com">fuente</a>.</p><table><thead><tr><th>A</th><th>B</th></tr></thead><tbody><tr><td>1</td><td>2</td></tr></tbody></table>', JSDOM })
try {
  const user = await payload.create({ collection: 'users', data: { email: 'cms-test@example.com', password: 'test-only-' + crypto.randomUUID() } })
  const post = await payload.create({ collection: 'posts', draft: true, data: { title: 'Prueba', slug: 'cms-check', description: 'Prueba SEO', content, date: '2026-10-16T00:00:00Z', category: 'GEO', author: 'Test', _status: 'draft' } })
  const hidden = await payload.find({ collection: 'posts', overrideAccess: false })
  assert.equal(hidden.docs.length, 0, 'Draft must be private')
  await assert.rejects(()=>payload.create({ collection: 'posts', overrideAccess: false, data: { title:'No autorizado',slug:'anonymous',description:'x',content,date:new Date().toISOString(),category:'GEO',author:'Test' } }))
  await payload.update({ collection: 'posts', id: post.id, user, data: { _status: 'published', changeNote: 'Hipótesis SEO' } })
  assert.equal((await payload.find({ collection:'posts',overrideAccess:false })).docs.length,1)
  assert.equal((await payload.find({ collection:'changes' })).totalDocs,1)
  await payload.update({ collection:'posts',id:post.id,user,draft:true,data:{title:'Cambio privado',_status:'draft'} })
  assert.equal((await payload.find({collection:'posts',overrideAccess:false})).docs[0].title,'Prueba','Unpublished change must not affect public post')
  assert.equal((await payload.find({collection:'changes'})).totalDocs,1,'Autosave must not log a published optimization')
  await payload.update({ collection:'posts',id:post.id,user,data:{slug:'cms-renamed',_status:'published'} })
  const redirects = await payload.find({collection:'redirects'})
  assert.equal(redirects.docs[0].from,'/blog/cms-check')
  assert.equal(redirects.docs[0].to,'/blog/cms-renamed')
  const versions = await payload.findVersions({collection:'posts',where:{parent:{equals:post.id}}})
  assert.ok(versions.totalDocs >= 3)
  await payload.update({collection:'posts',id:post.id,user,data:{_status:'draft'}})
  assert.equal((await payload.find({collection:'posts',overrideAccess:false})).totalDocs,0,'Unpublished post must disappear publicly')
  await payload.jobs.queue({ task: 'schedulePublish', input: { type: 'publish', doc: { relationTo: 'posts', value: post.id }, user: { relationTo: 'users', value: user.id } }, waitUntil: new Date(Date.now() - 1000) })
  await payload.jobs.run({ queue: 'default' })
  assert.equal((await payload.find({ collection: 'posts', overrideAccess: false })).totalDocs, 1, 'Scheduled job must publish the draft')
  const { lexicalMarkdown } = await import('../lib/posts')
  const markdown = lexicalMarkdown(content)
  assert.match(markdown,/https:\/\/example.com/)
  assert.match(markdown,/\| A \| B \|/)
  console.log('PASS: drafts, access control, publication log, draft edits, redirects, versions, unpublishing, scheduled job, table/link export.')
} finally { await payload.destroy(); await rm(directory,{recursive:true,force:true}) }
