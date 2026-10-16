import { APIError, type Access, type CollectionConfig } from 'payload'
import { seoIssues, validateSchema, walkContent } from './seo'
export { Sections } from './sections'
const authenticated: Access = ({ req }) => Boolean(req.user)
const published: Access = ({ req }) => req.user ? true : { _status: { equals: 'published' } }
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
export const Users: CollectionConfig = {
  slug: 'users', labels: { singular: 'Usuario', plural: 'Usuarios' }, auth: true,
  admin: { useAsTitle: 'email' },
  access: { read: authenticated, create: authenticated, update: authenticated, delete: authenticated },
  fields: [{ name: 'name', label: 'Nombre', type: 'text' }],
}
export const Media: CollectionConfig = {
  slug: 'media', labels: { singular: 'Archivo', plural: 'Archivos' },
  access: { read: () => true, create: authenticated, update: authenticated, delete: authenticated },
  upload: { staticDir: 'public/media', mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'], imageSizes: [{ name: 'thumbnail', width: 400 }, { name: 'social', width: 1200, height: 630 }] },
  fields: [{ name: 'alt', label: 'Texto alternativo', type: 'text', required: true }, { name: 'caption', label: 'Pie / fuente', type: 'text' }],
}
export const Redirects: CollectionConfig = {
  slug: 'redirects', labels: { singular: 'Redirección', plural: 'Redirecciones' },
  access: { read: authenticated, create: authenticated, update: authenticated, delete: authenticated },
  admin: { useAsTitle: 'from' },
  fields: [
    { name: 'from', label: 'URL anterior', type: 'text', unique: true, required: true, validate: (v: unknown) => typeof v === 'string' && /^\/blog\/[a-z0-9]+(?:-[a-z0-9]+)*$/.test(v) || 'Usá una ruta /blog/slug válida' },
    { name: 'to', label: 'URL nueva', type: 'text', required: true, validate: (v: unknown) => typeof v === 'string' && /^\/blog\/[a-z0-9]+(?:-[a-z0-9]+)*$/.test(v) || 'Usá una ruta /blog/slug válida' },
  ],
}
export const Changes: CollectionConfig = {
  slug: 'changes', labels: { singular: 'Optimización', plural: 'Historial de optimizaciones' },
  access: { read: authenticated, create: () => false, update: () => false, delete: () => false },
  admin: { components: { beforeList: ['/components/cms-editorial-tools#ChangesExport'] }, useAsTitle: 'url', defaultColumns: ['url', 'kind', 'publishedAt', 'editor'] },
  fields: [
    { name: 'post', type: 'relationship', relationTo: 'posts', required: true },
    { name: 'url', type: 'text', required: true },
    { name: 'kind', label: 'Tipo', type: 'text', required: true },
    { name: 'note', label: 'Cambio / hipótesis', type: 'textarea' },
    { name: 'editor', type: 'text' },
    { name: 'publishedAt', label: 'Publicado en CMS', type: 'date', required: true },
    { name: 'snapshot', type: 'json', admin: { readOnly: true } },
  ],
}
export const Posts: CollectionConfig = {
  slug: 'posts', labels: { singular: 'Artículo', plural: 'Artículos' },
  admin: { useAsTitle: 'title', defaultColumns: ['title', '_status', 'date', 'updatedAt'], preview: (data) => `/api/cms/preview?slug=${encodeURIComponent(String(data.slug || ''))}` },
  access: { read: published, create: authenticated, update: authenticated, delete: authenticated },
  versions: { maxPerDoc: 0, drafts: { autosave: { interval: 1500 }, schedulePublish: true } },
  fields: [
    { name: 'editorialTools', type: 'ui', admin: { components: { Field: '/components/cms-editorial-tools#EditorialTools' } } },
    { name: 'title', label: 'Título SEO', type: 'text', required: true },
    { name: 'h1', label: 'Título visible (H1)', type: 'text' },
    { name: 'slug', label: 'URL / slug', type: 'text', unique: true, required: true, validate: (v: unknown) => typeof v === 'string' && slugPattern.test(v) || 'Usá minúsculas, números y guiones' },
    { name: 'description', label: 'Descripción SEO', type: 'textarea', required: true },
    { name: 'content', label: 'Contenido', type: 'richText', required: true },
    { name: 'date', label: 'Publicación original', type: 'date', required: true },
    { name: 'updated', label: 'Modificación sustancial', type: 'date' },
    { name: 'category', label: 'Categoría', type: 'text', required: true, defaultValue: 'GEO' },
    { name: 'author', label: 'Autor', type: 'text', required: true, defaultValue: 'Ramón Arana' },
    { name: 'readTime', label: 'Tiempo de lectura', type: 'text', defaultValue: '5 min' },
    { name: 'keywords', label: 'Palabras clave', type: 'text', hasMany: true },
    { name: 'summary', label: 'Resumen para lectores de IA', type: 'textarea' },
    { name: 'seo', label: 'SEO avanzado', type: 'group', fields: [
      { name: 'canonical', type: 'text', validate: (v: unknown) => !v || typeof v === 'string' && /^https?:\/\//.test(v) || 'Usá una URL absoluta https://' },
      { name: 'noindex', label: 'Excluir de buscadores', type: 'checkbox', defaultValue: false },
      { name: 'image', label: 'Imagen social', type: 'upload', relationTo: 'media' },
    ] },
    { name: 'customSchema', label: 'Schema adicional (avanzado)', type: 'json', validate: validateSchema, admin: { description: 'Solo entidades visibles en el artículo. No repitas Article, Organization o BreadcrumbList.' } },
    { name: 'changeKind', label: 'Tipo de optimización', type: 'select', defaultValue: 'content', options: [{ label: 'Contenido', value: 'content' }, { label: 'SEO', value: 'seo' }, { label: 'GEO / estructura', value: 'geo' }, { label: 'Fuentes y datos', value: 'sources' }, { label: 'Corrección', value: 'correction' }] },
    { name: 'changeNote', label: 'Qué cambió y para qué', type: 'textarea', admin: { description: 'Registrá una nota nueva en cada publicación para analizar los resultados.' } },
    { name: 'originalMdx', label: 'Copia original de importación', type: 'textarea', access: { read: ({ req }) => Boolean(req.user) }, admin: { readOnly: true, hidden: true } },
  ],
  hooks: { beforeChange: [async ({ data, originalDoc, req }) => {
    if (req.context.importing || (data._status ?? originalDoc?._status) !== 'published') return data
    const merged = { ...originalDoc, ...data, seo: { ...originalDoc?.seo, ...data.seo } }
    const errors = seoIssues(merged).filter(issue => issue.level === 'error')
    const references: { collection: 'posts'|'media'|'sections'; id: any }[] = []
    walkContent(merged.content, node => {
      if (node.type === 'upload') references.push({collection:'media',id:node.value})
      if (node.type === 'link' && node.fields?.linkType === 'internal' && node.fields?.doc?.relationTo === 'posts') references.push({collection:'posts',id:node.fields.doc.value})
      if (node.type === 'block' && node.fields?.post) references.push({collection:'posts',id:node.fields.post})
      if (node.type === 'block' && node.fields?.blockType === 'reusable') references.push({collection:'sections',id:node.fields.section})
    })
    for (const ref of references) {
      try {
        const target = await req.payload.findByID({collection:ref.collection,id:typeof ref.id==='object'?ref.id.id:ref.id,depth:0,req}) as any
        if (ref.collection==='posts' && target._status!=='published') errors.push({level:'error',message:'Un enlace interno apunta a un artículo sin publicar.'})
        if (ref.collection==='media' && !target.alt?.trim()) errors.push({level:'error',message:'Una imagen de biblioteca no tiene texto alternativo.'})
        if (ref.collection==='sections' && !target.active) errors.push({level:'error',message:'Una sección reutilizable está desactivada.'})
      } catch {errors.push({level:'error',message:`Referencia inexistente en ${ref.collection}.`})}
    }
    const schema = validateSchema(merged.customSchema)
    if (schema !== true) errors.push({ level: 'error', message: schema })
    if (errors.length) throw new APIError(errors.map(issue => issue.message).join(' '), 400)
    return data
  }], afterChange: [async ({ doc, previousDoc, req }) => {
    if (req.context.importing || doc._status !== 'published') return doc
    if (previousDoc?.slug && previousDoc.slug !== doc.slug) {
      const from = `/blog/${previousDoc.slug}`
      const incoming = await req.payload.find({ collection: 'redirects', where: { to: { equals: from } }, pagination: false, req })
      for (const redirect of incoming.docs) {
        if (redirect.from === `/blog/${doc.slug}`) await req.payload.delete({ collection: 'redirects', id: redirect.id, req })
        else await req.payload.update({ collection: 'redirects', id: redirect.id, data: { from: redirect.from, to: `/blog/${doc.slug}` }, req })
      }
      const existing = await req.payload.find({ collection: 'redirects', where: { from: { equals: from } }, limit: 1, req })
      if (existing.docs[0]) await req.payload.update({ collection: 'redirects', id: existing.docs[0].id, data: { from, to: `/blog/${doc.slug}` }, req })
      else await req.payload.create({ collection: 'redirects', data: { from, to: `/blog/${doc.slug}` }, req })
    }
    await req.payload.create({ collection: 'changes', req, overrideAccess: true, data: { post: doc.id, url: `/blog/${doc.slug}`, kind: doc.changeKind || 'content', note: doc.changeNote || '', editor: req.user?.email || 'Sistema', publishedAt: new Date().toISOString(), snapshot: { title: doc.title, h1: doc.h1, description: doc.description, slug: doc.slug, content: doc.content, date: doc.date, updated: doc.updated, author: doc.author, seo: doc.seo, customSchema: doc.customSchema } } })
    return doc
  }] },
}
