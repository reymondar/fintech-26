"use client"

import { useRef, useState, useEffect, type ReactNode } from "react"
import { m, AnimatePresence, useReducedMotion } from "framer-motion"
import { ArrowRight, ArrowLeft, Check, Store, Mail, ExternalLink } from "lucide-react"
import { useTranslation } from "@/components/locale-provider"
import { CATEGORIES, REGIONS, CONTACT_EMAIL, CALENDAR_LINK, CALENDAR_SRC, normalizeStoreUrl } from "@/lib/audit"

type Step = "store" | "contact" | "calendar"
const inputBase = "w-full px-4 py-3 text-sm bg-white border border-zinc-200 rounded-xl text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-colors"
function Field({label,id,children}: {label:string;id:string;children:ReactNode}) { return <div className="space-y-2"><label htmlFor={id} className="text-sm font-medium text-zinc-700">{label}</label>{children}</div> }
export function AuditFlow({ preview = false }: { preview?: boolean }) {
  const {t,locale} = useTranslation()
  const c = (es:string,en:string) => locale==='en'?en:es
  const reduced=useReducedMotion()
  const [step,setStep]=useState<Step>('store')
  const [status,setStatus]=useState<'idle'|'loading'|'error'>('idle')
  const [receiptFailed,setReceiptFailed]=useState(false)
  const [form,setForm]=useState({url:'',category:'',categoryOther:'',regions:[] as string[],name:'',email:''})
  const requestId=useRef('')
  const busy=useRef(false)
  const heading=useRef<HTMLHeadingElement>(null)
  const initial=useRef(true)
  useEffect(()=>{if(initial.current){initial.current=false;return}heading.current?.focus()},[step])
  const set=(key:string,value:string|string[])=>setForm(prev=>({...prev,[key]:value}))
  const validStore=Boolean(normalizeStoreUrl(form.url)) && CATEGORIES.includes(form.category) && (form.category!=='Otra'||Boolean(form.categoryOther.trim())) && form.regions.length>0
  const validContact=Boolean(form.name.trim()) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
  async function submit(e:React.FormEvent){
    e.preventDefault();if(!validContact||!validStore||busy.current)return
    if(preview){setStep('calendar');return}
    busy.current=true;setStatus('loading')
    requestId.current ||= crypto.randomUUID()
    try {
      const res=await fetch('/api/audit',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...form,url:normalizeStoreUrl(form.url),locale,requestId:requestId.current})})
      const body=await res.json()
      if(!res.ok||body.ok!==true)throw new Error('Submission failed')
      setReceiptFailed(body.confirmation===false);setStatus('idle');setStep('calendar')
    }catch{setStatus('error')}finally{busy.current=false}
  }
  const transition={duration:reduced?0:.2}
  return <div className="mx-auto max-w-xl">
    {preview&&<p className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">{c('Preview local: el formulario no envía correos. El calendario es real; no confirmes una reserva de prueba.','Local preview: the form does not send emails. The calendar is real; do not confirm a test booking.')}</p>}
    <ol aria-label={c('Pasos para reservar','Booking steps')} className="mb-8 flex items-center justify-between gap-3 text-xs">
      {[c('Tu tienda','Your store'),c('Contacto','Contact'),c('Reserva','Book')].map((label,i)=><li key={label} aria-current={['store','contact','calendar'][i]===step?'step':undefined} className={`flex items-center gap-2 ${i<=['store','contact','calendar'].indexOf(step)?'text-zinc-900':'text-zinc-400'}`}><span className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] ${i<=['store','contact','calendar'].indexOf(step)?'bg-emerald-50 text-emerald-700':'bg-zinc-100'}`}>{i+1}</span>{label}</li>)}
    </ol>
    <AnimatePresence mode="wait">
      {step==='store'&&<m.form key="store" initial={{opacity:0,y:reduced?0:8}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={transition} onSubmit={e=>{e.preventDefault();if(validStore)setStep('contact')}}>
        <div className="mb-6 flex items-center gap-2"><Store size={18} className="text-emerald-600"/><h2 ref={heading} tabIndex={-1} className="text-xl font-semibold outline-none">{t('Tu tienda')}</h2></div>
        <div className="space-y-5">
          <Field id="audit-url" label={t('URL de la tienda')}><input id="audit-url" type="text" inputMode="url" autoComplete="url" placeholder="tutienda.com" value={form.url} maxLength={2048} onChange={e=>set('url',e.target.value)} className={inputBase} required aria-describedby="url-hint"/><p id="url-hint" className="text-xs text-zinc-400">{c('Tu dominio .com, con o sin https://','Your .com domain, with or without https://')}</p></Field>
          <Field id="audit-category" label={t('Categoría de productos')}><select id="audit-category" value={form.category} onChange={e=>set('category',e.target.value)} className={inputBase} required><option value="" disabled>{t('Elige una opción')}</option>{CATEGORIES.map(v=><option key={v} value={v}>{t(v)}</option>)}</select></Field>
          {form.category==='Otra'&&<Field id="audit-other" label={t('¿Qué vendes?')}><input id="audit-other" maxLength={200} value={form.categoryOther} onChange={e=>set('categoryOther',e.target.value)} className={inputBase} required/></Field>}
          <fieldset><legend className="mb-3 text-sm font-medium text-zinc-700">{c('¿Dónde vendes?','Where do you sell?')}</legend><div className="flex flex-wrap gap-2">{REGIONS.map(r=><button key={r} type="button" aria-pressed={form.regions.includes(r)} onClick={()=>setForm(p=>({...p,regions:p.regions.includes(r)?p.regions.filter(x=>x!==r):r==='Global'?['Global']:[...p.regions.filter(x=>x!=='Global'),r]}))} className={`rounded-full border px-3 py-2 text-xs transition-colors focus-visible:outline-2 focus-visible:outline-emerald-600 ${form.regions.includes(r)?'border-zinc-900 bg-zinc-900 text-white':'border-zinc-200 bg-white text-zinc-600 hover:border-emerald-400'}`}>{r==='Otros mercados'?c(r,'Other markets'):t(r)}</button>)}</div></fieldset>
        </div>
        <button disabled={!validStore} className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-zinc-900 py-3.5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40">{t('Continuar')}<ArrowRight size={16}/></button>
      </m.form>}
      {step==='contact'&&<m.form key="contact" onSubmit={submit} initial={{opacity:0,y:reduced?0:8}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={transition}>
        <div className="mb-6 flex items-center gap-2"><Mail size={18} className="text-emerald-600"/><h2 ref={heading} tabIndex={-1} className="text-xl font-semibold outline-none">{t('¿Dónde te escribimos?')}</h2></div>
        <div className="space-y-5"><Field id="audit-name" label={t('Nombre')}><input id="audit-name" autoComplete="name" maxLength={120} value={form.name} onChange={e=>set('name',e.target.value)} className={inputBase} required/></Field><Field id="audit-email" label={t('Correo profesional')}><input id="audit-email" type="email" autoComplete="email" maxLength={254} value={form.email} onChange={e=>set('email',e.target.value)} className={inputBase} placeholder="tu@empresa.com" required/></Field></div>
        <p className="mt-4 text-xs leading-relaxed text-zinc-400">{c('Usaremos estos datos para preparar tu revisión y coordinar la llamada.','We’ll use these details to prepare your review and arrange the call.')}</p>
        {status==='error'&&<p role="alert" className="mt-4 text-sm leading-relaxed text-red-600">{c('No pudimos enviar tu solicitud. Tus datos siguen aquí: vuelve a intentarlo o escríbenos a ','We couldn’t send your request. Your details are still here: try again or email ')}<a href={`mailto:${CONTACT_EMAIL}`} className="underline">{CONTACT_EMAIL}</a>.</p>}
        <div className="mt-8 flex gap-3"><button type="button" disabled={status==='loading'} onClick={()=>{setStep('store');setStatus('idle')}} className="flex items-center gap-2 rounded-full border border-zinc-200 px-4 py-3 text-sm text-zinc-600"><ArrowLeft size={15}/>{t('Atrás')}</button><button disabled={!validContact||status==='loading'} className="flex flex-1 items-center justify-center gap-2 rounded-full bg-zinc-900 py-3 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40">{status==='loading'?t('Enviando…'):c('Continuar al calendario','Continue to calendar')}<ArrowRight size={16}/></button></div>
      </m.form>}
      {step==='calendar'&&<m.div key="calendar" initial={{opacity:0}} animate={{opacity:1}} transition={transition}>
        <div className="mb-6 flex gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 p-4"><Check size={18} className="mt-0.5 shrink-0 text-emerald-600"/><p className="text-sm text-emerald-800">{c('Datos recibidos. Tu reunión se confirma al reservar.','Details received. Your meeting is confirmed when you book.')}</p></div>
        <h2 ref={heading} tabIndex={-1} className="mb-2 text-2xl font-semibold outline-none">{c('Elige cuándo hablamos.','Choose when to meet.')}</h2>
        <p className="mb-5 text-sm leading-relaxed text-zinc-500">{c('Usa el mismo correo al reservar para que podamos relacionarlo con tu tienda. Google enviará la invitación.','Use the same email when booking so we can match it to your store. Google will send your invitation.')}</p>
        {receiptFailed&&<p role="status" className="mb-4 text-xs text-amber-700">{c('Tu solicitud llegó al equipo, pero no pudimos enviar tu correo de recepción. Puedes reservar igualmente.','Your request reached our email provider, but we couldn’t send your receipt. You can still book.')}</p>}
        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white"><iframe src={`${CALENDAR_SRC}&hl=${locale}`} title={t('Reservar revisión')} className="h-[620px] w-full border-0"/></div>
        <p className="mt-4 text-center text-sm text-zinc-500">{t('¿No ves el calendario?')} <a href={CALENDAR_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-emerald-700 underline underline-offset-4">{c('Abrir calendario','Open calendar')}<ExternalLink size={12}/></a></p>
      </m.div>}
    </AnimatePresence>
  </div>
}
