export const paragraph = (text: string) => ({type:'paragraph',version:1,format:'',indent:0,direction:null,children:[{type:'text',version:1,text,format:0,detail:0,mode:'normal',style:''}]})
export const block = (blockType: string, fields: Record<string,unknown>) => ({type:'block',version:2,format:'',fields:{id:crypto.randomUUID(),blockName:'',blockType,...fields}})
export const content = (nodes: any[]) => ({root:{type:'root',version:1,format:'',indent:0,direction:null,children:nodes}})
export function editorialFixture(section?: number, post?: number, media?: number) {
 return content([
  paragraph('Laboratorio editorial. Estos son ejemplos de formato para probar el CMS; no constituyen datos reales ni una oferta comercial.'),
  ...(media?[{type:'upload',version:3,format:'',relationTo:'media',value:media,fields:{alt:'Imagen de prueba editorial',caption:'Imagen de prueba almacenada en Blob.'}}]:[]),
  block('definition',{term:'Contenido estructurado',definition:'Información organizada en bloques con significado explícito.'}),
  block('statistic',{value:'42 % (ejemplo ficticio)',explanation:'Dato inventado para comprobar el formato. No usar como evidencia.',sourceName:'Fuente de prueba',sourceURL:'https://example.com',observedAt:'2026-10-16T00:00:00Z'}),
  block('comparison',{caption:'Comparativa de ejemplo',columns:[{label:'Criterio'},{label:'Opción A'},{label:'Opción B'}],rows:[{cells:[{value:'Edición'},{value:'Visual'},{value:'Texto'}]},{cells:[{value:'Contenido'},{value:'Bloques'},{value:'Libre'}]}],source:'Ejemplo editorial, no una evaluación de productos.'}),
  block('serviceCard',{name:'Servicio de ejemplo',description:'Ficha ficticia para comprobar atributos y presentación.',entityType:'Service',url:'/servicios',attributes:[{label:'Formato',value:'Prueba'},{label:'Entrega',value:'Ejemplo'}]}),
  block('faq',{title:'Preguntas del laboratorio',items:[{question:'¿Este artículo está publicado?',answer:'Este laboratorio se mantiene como borrador en la web real.'},{question:'¿Qué se está probando?',answer:'La edición, el renderizado semántico y la exportación del contenido.'}]}),
  block('video',{title:'Vídeo de ejemplo: Big Buck Bunny',url:'https://www.youtube.com/watch?v=aqz-KE-bpKQ',transcript:'Vídeo de animación de ejemplo para comprobar la inserción. Sustituir por contenido editorial propio antes de publicar.'}),
  block('cta',{label:'Explorar el blog',url:'/blog',...(post?{post}:{}),newTab:false,nofollow:false,sponsored:false}),
  ...(section?[block('reusable',{section})]:[]),
  ...(post?[{type:'paragraph',version:1,format:'',indent:0,direction:null,children:[{type:'link',version:3,format:'',indent:0,direction:null,fields:{linkType:'internal',doc:{relationTo:'posts',value:post},newTab:false,nofollow:false,sponsored:false},children:[{type:'text',version:1,text:'Artículo interno seleccionado',format:0,detail:0,mode:'normal',style:''}]}]}]:[]),
 ])
}
