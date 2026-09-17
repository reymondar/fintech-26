import { NextRequest, NextResponse } from 'next/server'
import { createHash } from 'node:crypto'
import { config, sign, verify, authorized, parseMail, OWNER, SENDER, SESSION, STATE } from '@/lib/mailing'
export const runtime = 'nodejs'
const privateHeaders = {'Cache-Control':'no-store','X-Robots-Tag':'noindex, nofollow, noarchive','Referrer-Policy':'no-referrer'}
const json = (body:unknown,status=200) => NextResponse.json(body,{status,headers:privateHeaders})
const cookie = {httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'lax' as const,path:'/'}
export async function GET(req:NextRequest,{params}:{params:Promise<{action:string}>}) {
  if((await params).action!=='login')return json({error:'Not found'},404)
  let c:ReturnType<typeof config>
  try{c=config()}catch{return json({error:'Falta configurar el acceso privado.'},503)}
  const token=verify(req.nextUrl.searchParams.get('token')||undefined,c.secret)
  if(!token || token.kind!=='login' || token.email!==OWNER)return NextResponse.redirect(new URL('/mailing?error=auth',c.base),{headers:privateHeaders})
  const res=NextResponse.redirect(new URL('/mailing',c.base),{headers:privateHeaders})
  res.cookies.set(SESSION,sign({kind:'session',email:OWNER,exp:Date.now()+8*3600000},c.secret),{...cookie,maxAge:8*3600})
  return res
}
export async function POST(req:NextRequest,{params}:{params:Promise<{action:string}>}) {
  let c:ReturnType<typeof config>
  try {c=config()} catch {return json({error:'Falta configurar el acceso privado.'},503)}
  if(req.headers.get('origin')!==c.base)return json({error:'Origen no autorizado.'},403)
  const {action}=await params
  if(action==='access') {
    let email
    try {const raw=await req.text();if(raw.length>300)return json({error:'Datos inválidos.'},400);email=JSON.parse(raw).email}catch{return json({error:'Datos inválidos.'},400)}
    if(typeof email!=='string' || email.trim().toLowerCase()!==OWNER)return json({error:'Cuenta no autorizada.'},403)
    if(!process.env.RESEND_API_KEY)return json({error:'Falta configurar Resend.'},503)
    const bucket=Math.floor(Date.now()/600000)
    const token=sign({kind:'login',email:OWNER,exp:(bucket+2)*600000},c.secret)
    const link=c.base+'/api/mailing/login?token='+encodeURIComponent(token)
    try {
      const res=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${process.env.RESEND_API_KEY}`,'Content-Type':'application/json','Idempotency-Key':`mailing-access/${bucket}`},body:JSON.stringify({from:`The Stack House <${SENDER}>`,to:[OWNER],subject:'Tu acceso a Mailing',text:`Abre este enlace para acceder a tu editor privado (caduca en 20 minutos como máximo):\n\n${link}\n\nSi no pediste acceso, ignora este correo.`}),signal:AbortSignal.timeout(15000)})
      if(!res.ok)throw Error('send_failed')
      return json({ok:true})
    }catch{return json({error:'No pudimos enviar el enlace. Inténtalo de nuevo.'},502)}
  }
  if(!authorized(req.cookies.get(SESSION)?.value,c.secret))return json({error:'Vuelve a iniciar sesión.'},401)
  if(action==='logout'){const res=json({ok:true});res.cookies.set(SESSION,'',{...cookie,maxAge:0});return res}
  if(action!=='send')return json({error:'Not found'},404)
  let input
  try {const text=await req.text();if(text.length>65000)return json({error:'Correo demasiado largo.'},413);input=JSON.parse(text)} catch{return json({error:'Datos inválidos.'},400)}
  const mail=parseMail(input)
  if(!mail)return json({error:'Revisa destinatario, asunto y mensaje.'},400)
  if(!process.env.RESEND_API_KEY)return json({error:'Falta configurar Resend.'},503)
  try {
    const digest=createHash('sha256').update(JSON.stringify(mail)).digest('hex')
    const res=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${process.env.RESEND_API_KEY}`,'Content-Type':'application/json','Idempotency-Key':`mailing/${mail.id}/${digest}`},body:JSON.stringify({from:`Ramón · The Stack House <${SENDER}>`,to:[mail.to],reply_to:SENDER,subject:mail.subject,text:mail.body}),signal:AbortSignal.timeout(15000)})
    if(!res.ok)return json({error:'Resend no aceptó el correo. Revisa la configuración del remitente e inténtalo de nuevo.'},502)
    const result=await res.json()
    if(typeof result.id!=='string')throw new Error('missing_id')
    return json({ok:true,id:result.id})
  } catch {return json({error:'No pudimos confirmar el envío. Reintenta sin modificar el mensaje para evitar duplicados.'},502)}
}
