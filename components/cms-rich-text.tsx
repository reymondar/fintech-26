import { RichText, type JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from 'lexical'
import { videoURL } from '@/cms/seo'
const safeURL = (value: unknown) => typeof value === 'string' && (/^https?:\/\//i.test(value) || /^\/(?!\/)/.test(value) || /^(#|mailto:|tel:)/i.test(value)) ? value : '#'
const relation = (value: any) => value && typeof value==='object' ? value : null
const linkURL = (f:any) => f.linkType==='internal' ? (relation(f.doc?.value)?.slug ? `/blog/${f.doc.value.slug}` : '#') : safeURL(f.url)
const rel = (f:any) => [f.newTab?'noopener noreferrer':'',f.nofollow?'nofollow':'',f.sponsored?'sponsored':''].filter(Boolean).join(' ') || undefined
const linkConverter = ({node,nodesToJSX}:any) => {const href=linkURL(node.fields||{});const children=nodesToJSX({nodes:node.children});return href==='#'?<>{children}</>:<a href={href} target={node.fields?.newTab?'_blank':undefined} rel={rel(node.fields||{})}>{children}</a>}
const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
 ...defaultConverters, link:linkConverter, autolink:linkConverter,
 upload: ({node}:any) => {const image=relation(node.value);return image?.url?<figure><img src={safeURL(image.url)} width={image.width} height={image.height} alt={node.fields?.alt||image.alt||''} loading="lazy" />{(node.fields?.caption||image.caption)&&<figcaption>{node.fields?.caption||image.caption}</figcaption>}</figure>:null},
 blocks: {
  image: ({node}:any) => <figure><img src={safeURL(node.fields.url)} alt={String(node.fields.alt||'')} loading="lazy" />{node.fields.caption&&<figcaption>{node.fields.caption}</figcaption>}</figure>,
  cta: ({node}:any) => {const f=node.fields;const post=relation(f.post);if(f.post&&!post?.slug&&!f.url)return null;return <p><a className="cms-button" href={post?.slug?`/blog/${post.slug}`:safeURL(f.url)} target={f.newTab?'_blank':undefined} rel={rel(f)}>{f.label}</a></p>},
  faq: ({node}:any) => <section aria-label={node.fields.title||'Preguntas y respuestas'}><h2>{node.fields.title||'Preguntas frecuentes'}</h2>{(node.fields.items||[]).map((x:any,i:number)=><div key={x.id||i}><h3>{x.question}</h3><p>{x.answer}</p></div>)}</section>,
  definition: ({node}:any) => <dl className="cms-definition"><dt>{node.fields.term}</dt><dd>{node.fields.definition}</dd></dl>,
  statistic: ({node}:any) => <figure className="cms-statistic"><p><strong>{node.fields.value}</strong></p><p>{node.fields.explanation}</p><figcaption>Fuente: <a href={safeURL(node.fields.sourceURL)}>{node.fields.sourceName}</a>{node.fields.observedAt&&<> · <time dateTime={node.fields.observedAt}>{new Date(node.fields.observedAt).toLocaleDateString('es-AR',{timeZone:'UTC'})}</time></>}</figcaption></figure>,
  serviceCard: ({node}:any) => <section className="cms-service-card"><h2>{node.fields.name}</h2><p>{node.fields.description}</p><dl>{(node.fields.attributes||[]).map((x:any,i:number)=><div key={x.id||i}><dt>{x.label}</dt><dd>{x.value}</dd></div>)}</dl>{node.fields.url&&<p><a href={safeURL(node.fields.url)}>Ver {node.fields.name}</a></p>}</section>,
  comparison: ({node}:any) => <div className="cms-table-scroll" role="region" aria-label={node.fields.caption} tabIndex={0}><table><caption>{node.fields.caption}</caption><thead><tr>{(node.fields.columns||[]).map((c:any,i:number)=><th scope="col" key={c.id||i}>{c.label}</th>)}</tr></thead><tbody>{(node.fields.rows||[]).map((r:any,i:number)=><tr key={r.id||i}>{(r.cells||[]).map((c:any,j:number)=>j===0?<th scope="row" key={c.id||j}>{c.value}</th>:<td key={c.id||j}>{c.value}</td>)}</tr>)}</tbody></table>{node.fields.source&&<p><small>{node.fields.source}</small></p>}</div>,
  video: ({node}:any) => {const f=node.fields,v=videoURL(f.url);return v?<figure className="cms-video">{v.kind==='embed'?<iframe src={v.url} title={f.title} loading="lazy" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />:<video src={v.url} controls preload="metadata" aria-label={f.title} />}<figcaption>{f.title}</figcaption><p>{f.transcript}</p></figure>:null},
  reusable: ({node}:any) => {const s=relation(node.fields.section);return s?.active?<section className="cms-shared-section"><h2>{s.title}</h2>{String(s.body||'').split(/\n\s*\n/).map((p,i)=><p key={i}>{p}</p>)}{s.sourceURL&&<p>Fuente: <a href={safeURL(s.sourceURL)}>{s.sourceName||s.sourceURL}</a></p>}</section>:null},
 },
})
export function CMSRichText({ data }: { data: SerializedEditorState }) { return <RichText data={data} converters={converters} className="cms-richtext" /> }
