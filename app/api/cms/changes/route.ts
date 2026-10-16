import { getCMS } from '@/lib/posts'
const csvCell=(v:unknown)=>{let s=String(v??'');if(/^[\s]*[=+@-]/.test(s))s="'"+s;return '"'+s.replaceAll('"','""')+'"'}
export async function GET(request: Request) {
 const payload=await getCMS();const {user}=await payload.auth({headers:request.headers})
 if(!user)return new Response('Unauthorized',{status:401})
 const params=new URL(request.url).searchParams
 const and:any[]=[]
 if(params.get('url'))and.push({url:{equals:params.get('url')}})
 if(params.get('kind'))and.push({kind:{equals:params.get('kind')}})
 for(const [key,operator] of [['from','greater_than_equal'],['to','less_than_equal']]) {const value=params.get(key);if(value){if(!Number.isFinite(Date.parse(value)))return new Response('Fecha inválida',{status:400});and.push({publishedAt:{[operator]:new Date(value).toISOString()}})}}
 const changes=await payload.find({collection:'changes',user,overrideAccess:false,pagination:false,sort:'-publishedAt',depth:0,where:and.length?{and}:undefined})
 const csv=params.get('format')==='csv'
 const headers={'Cache-Control':'private, no-store','Content-Disposition':`attachment; filename="stackhouse-optimizations.${csv?'csv':'json'}"`}
 if(!csv)return Response.json(changes.docs,{headers})
 const columns=['url','kind','publishedAt','editor','note'] as const
 return new Response('\uFEFF'+[columns.join(','),...changes.docs.map(doc=>columns.map(c=>csvCell(doc[c])).join(','))].join('\r\n'),{headers:{...headers,'Content-Type':'text/csv; charset=utf-8'}})
}
