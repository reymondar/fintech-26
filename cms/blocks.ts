import type { Block, Field } from 'payload'
export const validURL = (v: unknown): true | string => {
 if(!v)return true
 if(typeof v!=='string'||/\s/.test(v))return 'El enlace no puede contener espacios.'
 if(/^\/(?!\/)/.test(v)||/^#.+/.test(v))return true
 try { const url=new URL(v);if(['http:','https:'].includes(url.protocol)&&url.hostname&&!url.username&&!url.password)return true }catch{}
 return 'Usá una URL http(s), una ruta / o un ancla # válida'
}
const text = (name: string, label: string): Field => ({ name, label, type: 'text', required: true })
const area = (name: string, label: string): Field => ({ name, label, type: 'textarea', required: true })
const source: Field[] = [text('sourceName', 'Fuente'), { name: 'sourceURL', label: 'Enlace a la fuente', type: 'text', required: true, validate: validURL }]
export const editorialBlocks: Block[] = [
 { slug: 'image', labels: { singular: 'Imagen por URL (importación)', plural: 'Imágenes por URL' }, fields: [{ name: 'url', type: 'text', required: true, validate: validURL }, text('alt','Texto alternativo'), { name:'caption', type:'text', label:'Pie de imagen' }] },
 { slug: 'cta', labels: { singular:'Botón / enlace', plural:'Botones' }, fields: [text('label','Texto'), { name:'url', type:'text', validate:validURL, admin:{description:'Completá este enlace o elegí un artículo.'} }, { name:'post', label:'Artículo interno', type:'relationship', relationTo:'posts', maxDepth:1 }, {name:'newTab',label:'Abrir en otra pestaña',type:'checkbox'}, {name:'nofollow',label:'nofollow',type:'checkbox'}, {name:'sponsored',label:'Enlace patrocinado',type:'checkbox'}] },
 { slug:'faq', labels:{singular:'Preguntas y respuestas',plural:'Preguntas y respuestas'}, fields:[{name:'title',label:'Encabezado',type:'text',defaultValue:'Preguntas frecuentes'}, {name:'items',type:'array',minRows:1,required:true,fields:[text('question','Pregunta'),area('answer','Respuesta directa')]}] },
 { slug:'definition',labels:{singular:'Definición',plural:'Definiciones'},fields:[text('term','Concepto'),area('definition','Definición')] },
 { slug:'statistic',labels:{singular:'Dato con fuente',plural:'Datos con fuentes'},fields:[text('value','Dato o cifra'),area('explanation','Contexto y alcance'),...source,{name:'observedAt',label:'Fecha del dato',type:'date',required:true}] },
 { slug:'serviceCard',labels:{singular:'Ficha de servicio / producto',plural:'Fichas'},fields:[text('name','Nombre'),area('description','Descripción'),{name:'entityType',label:'Tipo',type:'select',defaultValue:'Service',options:['Service','Product'],required:true},{name:'attributes',type:'array',label:'Características',minRows:1,fields:[text('label','Atributo'),text('value','Valor')]},{name:'url',label:'Página del servicio o producto',type:'text',validate:validURL}] },
 { slug:'comparison',labels:{singular:'Tabla comparativa',plural:'Comparativas'},fields:[text('caption','Título de la tabla'),{name:'columns',type:'array',minRows:2,maxRows:8,required:true,fields:[text('label','Columna')]},{name:'rows',type:'array',minRows:1,required:true,fields:[{name:'cells',type:'array',minRows:2,maxRows:8,required:true,fields:[text('value','Contenido de celda')]}]},{name:'source',label:'Fuente / aclaración',type:'text'}] },
 { slug:'video',labels:{singular:'Vídeo',plural:'Vídeos'},fields:[text('title','Título accesible'),{name:'url',label:'URL de YouTube, Vimeo o archivo MP4/WebM',type:'text',required:true,validate:validURL},{name:'transcript',label:'Transcripción o resumen del vídeo',type:'textarea',required:true}] },
 { slug:'reusable',labels:{singular:'Sección reutilizable',plural:'Secciones reutilizables'},fields:[{name:'section',label:'Sección',type:'relationship',relationTo:'sections',required:true,maxDepth:1}] },
]
