import { walkContent } from './seo'
const SITE='https://thestackhouse.io'
export function editorialSchema(content: unknown, custom: unknown, url: string) {
 const entities: any[]=[];const questions: any[]=[]
 walkContent(content,node=>{if(node.type!=='block')return;const f=node.fields||{}
  if(f.blockType==='faq')for(const x of f.items||[])if(x.question&&x.answer)questions.push({'@type':'Question',name:x.question,acceptedAnswer:{'@type':'Answer',text:x.answer}})
  if(f.blockType==='definition')entities.push({'@type':'DefinedTerm',name:f.term,description:f.definition})
  if(f.blockType==='serviceCard')entities.push({'@type':f.entityType==='Product'?'Product':'Service',name:f.name,description:f.description,...(f.url&&/^(https?:\/\/|\/(?!\/))/.test(f.url)?{url:(()=>{try{return new URL(f.url,SITE).href}catch{return undefined}})()}:{}),...(f.entityType==='Product'?{additionalProperty:(f.attributes||[]).map((x:any)=>({'@type':'PropertyValue',name:x.label,value:x.value}))}:{provider:{'@id':SITE+'/#organization'}})})
 })
 const extra=(custom?(Array.isArray(custom)?custom:[custom]):[]).filter((x:any)=>x&&typeof x==='object'&&typeof x['@type']==='string')
 if(questions.length&&!extra.some((x:any)=>x['@type']==='FAQPage'))entities.push({'@type':'FAQPage',mainEntity:questions})
 // Explicit custom entities replace generated entities of the same type.
 const types=new Set(extra.map((x:any)=>x['@type']))
 return [...entities.filter(x=>!types.has(x['@type'])),...extra].map((x:any,i)=>({...x,'@context':'https://schema.org','@id':x['@id']||`${url}#entity-${i+1}`}))
}
