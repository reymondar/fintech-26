import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { authorized, config, SESSION } from '@/lib/mailing'
import { MailingLogin } from '@/components/mailing-login'
import { MailingComposer } from '@/components/mailing-composer'
export const dynamic='force-dynamic'
export const metadata:Metadata={title:{absolute:'Mailing privado — The Stack House'},robots:{index:false,follow:false,noarchive:true},alternates:{canonical:null}}
export default async function MailingPage({searchParams}:{searchParams:Promise<{error?:string}>}) {
  let ready=false,access=false
  try {const c=config();ready=true;access=authorized((await cookies()).get(SESSION)?.value,c.secret)}catch{}
  const query=await searchParams
  return <main className="min-h-screen bg-zinc-50 px-5 py-16"><div className="mx-auto max-w-3xl"><p className="mb-3 text-xs uppercase tracking-[0.2em] text-emerald-700">The Stack House · privado</p><h1 className="mb-8 text-4xl font-medium tracking-tight">Mailing</h1>{access?<MailingComposer/>:<div className="rounded-3xl border border-zinc-200 bg-white p-8"><h2 className="text-xl font-medium">Tu espacio de correo.</h2><p className="my-4 text-zinc-500">Inicia sesión con tu cuenta autorizada para escribir y enviar.</p>{query.error&&<p role="alert" className="mb-4 text-red-700">No pudimos autorizar esa cuenta. Prueba con la cuenta habilitada.</p>}{ready?<MailingLogin/>:<p role="status" className="text-amber-800">El acceso privado todavía no está configurado.</p>}</div>}</div></main>
}
