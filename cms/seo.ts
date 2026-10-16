// Shared by the editor and server publication gate. No browser or database dependencies.
export type Issue = { level: 'error' | 'warning'; message: string }
export function walkContent(value: unknown, visit: (node: any) => void) {
 if (!value || typeof value !== 'object') return
 const node = value as any; visit(node)
 if (Array.isArray(node.children)) node.children.forEach((child: unknown) => walkContent(child,visit))
 if (node.root) walkContent(node.root,visit)
}
export function seoIssues(data: any): Issue[] {
 const issues: Issue[] = []; const add = (level: Issue['level'],message: string) => issues.push({level,message})
 for (const [key,label] of [['title','Título SEO'],['description','Descripción SEO'],['slug','Slug'],['author','Autor'],['date','Fecha de publicación']]) if (!String(data[key] || '').trim()) add('error',`Falta: ${label}.`)
 if (data.slug && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data.slug)) add('error','El slug debe usar minúsculas, números y guiones.')
 if (data.date && !Number.isFinite(Date.parse(data.date))) add('error','La fecha de publicación no es válida.')
 if (data.updated && (!Number.isFinite(Date.parse(data.updated)) || Date.parse(data.updated)<Date.parse(data.date))) add('error','La fecha de actualización debe ser válida y posterior a la publicación.')
 if (data.title?.length>60) add('warning','El título SEO puede cortarse en los resultados de búsqueda.')
 if (data.description?.length>160) add('warning','La descripción puede cortarse en los resultados de búsqueda.')
 if (!data.h1?.trim()) add('warning','Se usará el título SEO como H1. Podés escribir un título visible diferente.')
 if (!data.seo?.image) add('warning','Sin imagen social propia: se usará la imagen predeterminada del sitio.')
 if (data.seo?.noindex) add('warning','NOINDEX activo: este artículo se excluye del sitemap y solicita no indexarse.')
 if (data.seo?.canonical) {try {const u=new URL(data.seo.canonical); if (!['https:','http:'].includes(u.protocol)) throw 0; add('warning',`Canonical personalizado: ${u.href}. Revisá que sea intencional.`)} catch {add('error','Canonical inválido: usá una URL absoluta http(s).')}}
 let text='';let internal=0;let heading=1
 walkContent(data.content,node=>{
  if (node.type==='text') text+=node.text || ''
  if (node.type==='heading') {const level=Number(node.tag?.slice(1));if(level===1)add('error','El contenido no debe incluir otro H1: el título visible ya lo genera.');if(level>heading+1)add('warning',`Salto de encabezados: H${heading} a H${level}.`);heading=level}
  if (node.type==='link' || node.type==='autolink') {const f=node.fields || {};if(f.doc)internal++;else if(f.url?.startsWith('/')&&!f.url.startsWith('//'))internal++;if(f.url && !/^(https?:\/\/[^\s]+|mailto:[^\s]+|tel:[+\d ()-]+|\/(?!\/)[^\s]*|#[^\s]+)$/i.test(f.url))add('error','Hay un enlace con URL inválida o protocolo no permitido.')}
  if(node.type==='block') {const f=node.fields || {};text+=' '+Object.values(f).filter(v=>typeof v==='string').join(' ')
   if(f.blockType==='cta' && !f.url && !f.post)add('error','Un botón necesita un enlace o un artículo de destino.')
   if(f.blockType==='cta' && f.post)internal++
   if(f.blockType==='comparison' && f.rows?.some((r:any)=>r.cells?.length!==f.columns?.length))add('error','La comparativa debe tener una celda por columna en todas sus filas.')
   if(f.blockType==='image' && !f.alt?.trim())add('error','Una imagen no tiene texto alternativo.')
   if(f.blockType==='video' && !videoURL(f.url))add('error','Vídeo no compatible: usá YouTube, Vimeo o un archivo MP4/WebM con HTTPS.')
  }
  if(node.type==='upload' && typeof node.value==='object' && !node.value?.alt?.trim())add('error','Una imagen de biblioteca no tiene texto alternativo.')
 })
 if(!text.trim() && !data.content?.root?.children?.some((n:any)=>['upload','block'].includes(n.type)))add('error','El artículo no tiene contenido.')
 if(!internal)add('warning','No se detectaron enlaces internos. Añadilos cuando aporten contexto.')
 return issues.filter((x,i,a)=>a.findIndex(y=>y.level===x.level&&y.message===x.message)===i)
}
export function videoURL(input: unknown): { kind:'embed'|'file'; url:string } | null {
 try {const u=new URL(String(input));if(u.protocol!=='https:')return null
  if(['youtube.com','www.youtube.com','youtu.be'].includes(u.hostname)){const id=u.hostname==='youtu.be'?u.pathname.slice(1):u.searchParams.get('v') || u.pathname.match(/^\/(?:embed|shorts)\/([\w-]+)/)?.[1];return id&&/^[\w-]{11}$/.test(id)?{kind:'embed',url:`https://www.youtube-nocookie.com/embed/${id}`}:null}
  if(['vimeo.com','www.vimeo.com','player.vimeo.com'].includes(u.hostname)){const id=u.pathname.match(/(?:video\/)?(\d+)$/)?.[1];return id?{kind:'embed',url:`https://player.vimeo.com/video/${id}`}:null}
  return /\.(mp4|webm)$/i.test(u.pathname)?{kind:'file',url:u.href}:null
 }catch{return null}
}
export function validateSchema(value: unknown): true | string {
 if(!value)return true
 const entries=Array.isArray(value)?value:[value]
 const allowed=['Service','Product','DefinedTerm','ItemList','FAQPage']
 for(const entry of entries){if(!entry || typeof entry!=='object' || !allowed.includes((entry as any)['@type']))return 'Tipos permitidos: Service, Product, DefinedTerm, ItemList o FAQPage. Article, Organization y BreadcrumbList se generan automáticamente.'}
 for(const entry of entries as any[]) {
  if(entry['@context'] && entry['@context']!=='https://schema.org')return 'El contexto de Schema debe ser https://schema.org.'
  if(entry['@type']==='FAQPage') {if(!Array.isArray(entry.mainEntity)||!entry.mainEntity.length||entry.mainEntity.some((q:any)=>q['@type']!=='Question'||!q.name||q.acceptedAnswer?.['@type']!=='Answer'||!q.acceptedAnswer?.text))return 'FAQPage necesita preguntas con respuestas completas.'}
  else if(entry['@type']==='ItemList') {if(!Array.isArray(entry.itemListElement)||!entry.itemListElement.length)return 'ItemList necesita elementos.'}
  else if(!entry.name || !entry.description)return 'Las entidades necesitan nombre y descripción.'
 }
 if(new Set(entries.map((e:any)=>e['@type'])).size!==entries.length)return 'No repitas un tipo de Schema personalizado.'
 return true
}
