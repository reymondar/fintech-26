import { getCMS } from '@/lib/posts'
import { referencesSection } from '@/cms/sections'
export async function GET(request: Request) {
 const payload=await getCMS();const {user}=await payload.auth({headers:request.headers})
 if(!user)return new Response('Unauthorized',{status:401})
 const id=new URL(request.url).searchParams.get('id') || ''
 const [live,drafts]=await Promise.all([false,true].map(draft=>payload.find({collection:'posts',draft,pagination:false,depth:0,user,overrideAccess:false})))
 const urls=[...new Set([...live.docs,...drafts.docs].filter(p=>referencesSection(p.content,id)).map(p=>`/blog/${p.slug}`))]
 return Response.json({urls},{headers:{'Cache-Control':'private, no-store'}})
}
