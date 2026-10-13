"use client"

import { useState } from "react"
import { ArrowUpRight, Search, Sparkles, ShoppingBag, Database, MousePointer2, Check, FlaskConical } from "lucide-react"
import { useTranslation } from "@/components/locale-provider"

export type ServiceKind = "posicionamiento" | "datos" | "personalizacion"

export function ServiceVisual({ kind, en }: { kind: ServiceKind; en: boolean }) {
  const [returning, setReturning] = useState(false)
  const c = (es: string, english: string) => en ? english : es
  return <div className={`service-scene relative flex h-56 flex-col justify-center overflow-hidden rounded-2xl p-5 ${kind === "datos" ? "bg-[#f1f0fc]" : kind === "personalizacion" ? "bg-[#fff3e6]" : "bg-[#eaf6ef]"}`}>
    {kind === "posicionamiento" && <div aria-hidden="true" className="relative mx-auto w-full max-w-64">
      <div className="scene-search flex items-center gap-2 rounded-xl border border-white bg-white/90 px-3 py-3 shadow-sm"><Search size={14} className="shrink-0 text-emerald-700"/><span className="text-[11px] text-zinc-600">{c("¿Qué tienda tiene lo que busco?", "Which store has what I need?")}</span></div>
      <div className="mx-auto h-5 w-px bg-emerald-300"/>
      <div className="scene-result rounded-xl border border-emerald-200 bg-white p-4 shadow-[0_12px_24px_-16px_#047857]">
        <p className="mb-3 flex items-center gap-2 text-[10px] font-medium text-emerald-700"><Sparkles size={13}/>{c("Una respuesta que lleva a tu tienda", "An answer that leads to your store")}</p>
        <div className="flex items-center gap-3"><div className="rounded-xl bg-emerald-50 p-3"><ShoppingBag size={24} strokeWidth={1.4} className="text-emerald-700"/></div><div className="space-y-2"><div className="text-xs font-medium text-zinc-800">{c("Tu producto. Justo aquí.", "Your product. Right here.")}</div><div className="h-1.5 w-24 rounded bg-zinc-100"/><div className="h-1.5 w-16 rounded bg-zinc-100"/></div></div>
      </div>
      <span className="absolute -right-2 bottom-5 rounded-full bg-emerald-700 p-1.5 text-white shadow-sm"><Check size={12}/></span>
    </div>}
    {kind === "datos" && <div aria-hidden="true" className="mx-auto w-full max-w-64">
      <div className="mb-3 flex items-center justify-center gap-3">{[ShoppingBag, MousePointer2, Database].map((Icon,i)=><div key={i} className="rounded-xl border border-white bg-white/80 p-2 text-violet-600"><Icon size={16} strokeWidth={1.5}/></div>)}</div>
      <div className="rounded-xl border border-violet-100 bg-white p-4 shadow-[0_12px_24px_-16px_#7c3aed]">
        <div className="flex items-center justify-between"><span className="text-[11px] font-medium text-zinc-700">{c("Todo conectado", "Everything connected")}</span><span className="h-1.5 w-1.5 rounded-full bg-violet-400"/></div>
        <div className="mt-4 flex h-12 items-end gap-2">{[35,65,45,85,60,100,75].map((h,i)=><span key={i} className="scene-bar flex-1 rounded-t bg-violet-200 last:bg-violet-500" style={{height:`${h}%`,animationDelay:`${i * 110}ms`}}/>)}</div>
        <div className="mt-3 border-t border-zinc-100 pt-2 text-[10px] text-violet-700">{c("De los datos a la próxima decisión", "From data to your next decision")}</div>
      </div>
    </div>}
    {kind === "personalizacion" && <div className="mx-auto w-full max-w-64">
      <div role="group" aria-label={c("Probar un segmento de ejemplo", "Try a sample segment")} className="mb-3 flex rounded-full bg-white/70 p-1">
        {[false,true].map(value=><button type="button" key={String(value)} aria-pressed={returning===value} onClick={()=>setReturning(value)} className={`flex-1 rounded-full px-2 py-1.5 text-[10px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700 ${returning===value?'bg-zinc-800 text-white shadow-sm':'text-zinc-600 hover:bg-white'}`}>{value?c("Vuelve a comparar", "Returning shopper"):c("Primera visita", "First visit")}</button>)}
      </div>
      <div aria-live="polite" className="rounded-xl border border-orange-100 bg-white p-4 shadow-[0_12px_24px_-16px_#c2410c]">
        <div className="flex items-center gap-3"><div className={`rounded-xl p-3 transition-colors ${returning?'bg-emerald-50 text-emerald-700':'bg-orange-50 text-orange-700'}`}><ShoppingBag size={27} strokeWidth={1.4}/></div><div><p className="text-[11px] font-medium text-zinc-800">{returning?c("Comparemos tus favoritos", "Compare your favorites"):c("Encontrá tu próximo favorito", "Find your next favorite")}</p><p className="mt-1 text-[10px] text-zinc-500">{returning?c("Detalles que ayudan a elegir", "Details that help you choose"):c("Una selección para empezar", "A selection to get started")}</p></div></div>
        <div className={`mt-3 rounded-lg px-3 py-2 text-center text-[10px] font-medium transition-colors ${returning?'bg-emerald-50 text-emerald-800':'bg-orange-50 text-orange-800'}`}>{returning?c("Ver diferencias", "See the differences"):c("Explorar productos", "Explore products")}</div>
      </div>
      <div className="mt-2 flex items-center justify-center gap-1 text-[9px] text-orange-800"><FlaskConical size={11}/>{c("Cambiá el segmento y probalo", "Switch segments and try it")}</div>
    </div>}
    <style jsx>{`
      .scene-result { animation: result-float 5s ease-in-out infinite; }
      .scene-bar { transform-origin: bottom; animation: bar-rise 4s ease-in-out infinite; }
      @keyframes result-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
      @keyframes bar-rise { 0%,100% { transform: scaleY(.8); } 50% { transform: scaleY(1); } }
      @media (prefers-reduced-motion: reduce) { .scene-result,.scene-bar { animation: none; } }
    `}</style>
  </div>
}

export function ServicesOverview() {
  const { locale, localizeHref } = useTranslation()
  const en = locale === "en"
  const c = (es: string, english: string) => en ? english : es
  const services: {id: ServiceKind; name: string; title: string; body: string}[] = [
    {id:"posicionamiento",name:"AEO / SEO",title:c("Que te encuentren.","Get discovered."),body:c("Trabajamos tu catálogo, contenido y base técnica para que tus productos aparezcan en buscadores y respuestas de IA.","We improve your catalog, content and technical foundations to help your products appear in search engines and AI answers.")},
    {id:"datos",name:c("Análisis de datos","Data analysis"),title:c("Que todo tenga sentido.","Make sense of it all."),body:c("Unimos datos de tienda y marketing para entender qué pasa, detectar oportunidades y decidir qué mejorar primero.","We bring store and marketing data together to understand performance, find opportunities and decide what to improve first.")},
    {id:"personalizacion",name:c("Personalización ecommerce","Ecommerce personalization"),title:c("Que cada visita cuente.","Make every visit count."),body:c("Personalizamos la tienda por segmentos y testeamos experiencias, mensajes y recomendaciones para mejorar la compra.","We personalize your store by segment and test experiences, messages and recommendations to improve the buying journey.")},
  ]
  return <section id="servicios" aria-labelledby="services-overview-title" className="py-6 sm:py-8 px-4 sm:px-6 ">
    <div className="mx-auto max-w-6xl">
      <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="mb-4 text-xs font-medium uppercase tracking-[.18em] text-emerald-700">{c("Qué hacemos", "What we do")}</p><h2 id="services-overview-title" className="text-3xl font-medium tracking-tight text-zinc-900 sm:text-4xl">{c("Tres especialidades. Una tienda mejor.", "Three specialties. A better store.")}</h2><p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-500">{c("Te encuentran, entendés qué pasa y probás qué funciona. Conectamos las tres partes.", "Get found, understand what happens and test what works. We connect all three.")}</p></div>
        <a href={localizeHref('/servicios')} className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-emerald-700 hover:text-emerald-900">{c("Ver todos los servicios", "Explore our services")}<ArrowUpRight size={16}/></a>
      </div>
      <div className="grid gap-5 lg:grid-cols-3">
        {services.map((service,i)=><article key={service.id} className="group flex min-w-0 flex-col rounded-[1.75rem] border border-zinc-200/80 bg-white p-3 transition-shadow hover:shadow-[0_16px_40px_-24px_rgba(6,78,59,.25)]">
          <ServiceVisual kind={service.id} en={en}/>
          <div className="flex flex-1 flex-col px-3 pb-4 pt-6"><p className="mb-3 flex items-center gap-2 text-[11px] font-medium text-emerald-700"><span className="font-mono text-zinc-400">0{i+1}</span>{service.name}</p><h3 className="text-2xl font-medium leading-tight tracking-tight text-zinc-900">{service.title}</h3><p className="mb-7 mt-3 text-sm leading-relaxed text-zinc-500">{service.body}</p><a href={`${localizeHref('/servicios')}#${service.id}`} aria-label={`${c('Ver','Explore')} ${service.name}`} className="mt-auto inline-flex items-center justify-between text-xs font-medium text-zinc-700 hover:text-emerald-700">{c("Así lo hacemos", "How we do it")}<span className="rounded-full bg-zinc-50 p-2 transition-colors group-hover:bg-emerald-50"><ArrowUpRight size={16}/></span></a></div>
        </article>)}
      </div>
    </div>
  </section>
}
