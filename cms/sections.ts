import type { CollectionConfig } from 'payload'
import { validURL } from './blocks'
export function referencesSection(content: unknown,id: string|number): boolean {
 if(!content || typeof content!=='object')return false
 const n=content as any
 if(n.type==='block' && n.fields?.blockType==='reusable' && String(typeof n.fields.section==='object'?n.fields.section?.id:n.fields.section)===String(id))return true
 return !!n.root && referencesSection(n.root,id) || Array.isArray(n.children) && n.children.some((c:unknown)=>referencesSection(c,id))
}
export const Sections: CollectionConfig={
 slug:'sections',labels:{singular:'Sección reutilizable',plural:'Secciones reutilizables'},admin:{useAsTitle:'title',description:'Información compartida entre artículos. Guardar una sección actualiza todos sus usos.'},
 access:{read:({req})=>req.user?true:{active:{equals:true}},create:({req})=>!!req.user,update:({req})=>!!req.user,delete:()=>false},
 versions:{maxPerDoc:0},
 fields:[{name:'usage',type:'ui',admin:{components:{Field:'/components/cms-editorial-tools#SectionUsage'}}},{name:'title',label:'Título',type:'text',required:true},{name:'body',label:'Contenido (párrafos separados por una línea vacía)',type:'textarea',required:true},{name:'sourceName',label:'Fuente',type:'text'},{name:'sourceURL',label:'Enlace a la fuente',type:'text',validate:validURL},{name:'active',label:'Mostrar en los artículos',type:'checkbox',defaultValue:true},{name:'changeNote',label:'Qué cambió y para qué',type:'textarea',required:true}],
 hooks:{afterChange:[async({doc,previousDoc,req})=>{
  if(!previousDoc)return doc
  const posts=await req.payload.find({collection:'posts',pagination:false,depth:0,req})
  for(const post of posts.docs.filter(p=>p._status==='published'&&referencesSection(p.content,doc.id)))await req.payload.create({collection:'changes',overrideAccess:true,req,data:{post:post.id,url:`/blog/${post.slug}`,kind:'shared-section',note:doc.changeNote,editor:req.user?.email||'Sistema',publishedAt:new Date().toISOString(),snapshot:{section:doc.id,title:doc.title,body:doc.body,sourceURL:doc.sourceURL,active:doc.active}}})
  return doc
 }]}
}
