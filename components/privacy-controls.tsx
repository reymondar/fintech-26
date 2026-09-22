'use client'
import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { Analytics } from '@vercel/analytics/next'
const KEY='sh_analytics_consent_v1'
const MAX_AGE=180*24*60*60*1000
function stored(){try{const v=JSON.parse(localStorage.getItem(KEY)||'null');return v&&Date.now()<v.expires&&['accepted','rejected'].includes(v.value)?v.value:null}catch{return null}}
export function PrivacyControls({locale}:{locale:'es'|'en'}){
 const [choice,setChoice]=useState<string|null>(null),[open,setOpen]=useState(false)
 const en=locale==='en'
 useEffect(()=>{const value=stored();setChoice(value);setOpen(!value);const sync=(e:StorageEvent)=>{if(e.key===KEY)location.reload()};window.addEventListener('storage',sync);return()=>window.removeEventListener('storage',sync)},[])
 useEffect(()=>{
  if(choice!=='accepted')return
  const w=window as any
  w.dataLayer=w.dataLayer||[]
  function gtag(..._args:unknown[]){w.dataLayer.push(arguments)}
  gtag('consent','default',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'})
  w.clarity=w.clarity||function(..._args:unknown[]){(w.clarity.q=w.clarity.q||[]).push(arguments)}
  w.clarity('consentv2',{analytics_storage:'granted',ad_storage:'denied'})
  const add=(id:string,src:string)=>{if(document.getElementById(id))return;const s=document.createElement('script');s.id=id;s.src=src;s.async=true;document.head.appendChild(s)}
  w.dataLayer.push({'gtm.start':Date.now(),event:'gtm.js'})
  add('sh-gtm','https://www.googletagmanager.com/gtm.js?id=GTM-NSRBC7Q5')
  add('sh-clarity','https://www.clarity.ms/tag/y1a1pnj417')
 },[choice])
 function choose(value:'accepted'|'rejected'){
  try{localStorage.setItem(KEY,JSON.stringify({value,expires:Date.now()+MAX_AGE}))}catch{setChoice(null);setOpen(true);return}
  if(value==='rejected'){
   const w=window as any
   w.clarity?.('consentv2',{analytics_storage:'denied',ad_storage:'denied'})
   w.posthog?.opt_out_capturing?.()
   // Clear readable analytics cookies for this host and its parent domains.
   const host=location.hostname.split('.');const domains=['',...host.map((_,i)=>'.'+host.slice(i).join('.'))]
   document.cookie.split(';').forEach(c=>{const name=c.split('=')[0].trim();if(!/^(_ga|_gid|_gat|_gcl|_clck|_clsk|ph_)/.test(name))return;for(const domain of domains)document.cookie=`${name}=; Max-Age=0; path=/${domain?'; domain='+domain:''}`})
  }
  // Reload stops already-running trackers after withdrawal.
  location.reload()
 }
 const button='rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-medium transition-colors hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600'
 return <>{choice==='accepted'&&<Analytics/>}{choice!=='accepted'&&<button type="button" onClick={()=>setOpen(true)} className="fixed bottom-3 left-3 z-[70] rounded-full border border-zinc-200 bg-white px-3 py-2 text-xs text-zinc-600 shadow-sm hover:bg-zinc-100">{en?'Privacy settings':'Preferencias de privacidad'}</button>}{open&&<section aria-label={en?'Privacy preferences':'Preferencias de privacidad'} className="fixed bottom-14 left-3 right-3 z-[80] max-w-xl rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl"><button type="button" aria-label={en?'Close privacy preferences':'Cerrar preferencias de privacidad'} onClick={()=>setOpen(false)} className="absolute right-3 top-3 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"><X size={18} aria-hidden="true"/></button><h2 className="pr-8 text-lg font-semibold text-zinc-900">{en?'Your privacy, your choice':'Tu privacidad, tú decides'}</h2><p className="mt-2 text-sm leading-relaxed text-zinc-600">{en?'Essential storage remembers your preferences and keeps sign-in secure. Optional analytics helps us better understand our visitors and improve their experience.':'El almacenamiento esencial guarda tus preferencias y permite el acceso seguro. La analítica opcional nos ayuda a conocer mejor a nuestras visitas y ofrecer una mejor experiencia.'}</p><a href="/privacidad" className="mt-3 inline-block text-sm text-emerald-700 underline">{en?'Privacy policy (Spanish)':'Política de privacidad'}</a><div className="mt-5 flex flex-wrap justify-between gap-3"><button type="button" className={button} onClick={()=>choose('accepted')}>{en?'Accept all':'Aceptar todo'}</button><button type="button" className={button} onClick={()=>choose('rejected')}>{en?'Essential only':'Solo esenciales'}</button></div></section>}</>
}
