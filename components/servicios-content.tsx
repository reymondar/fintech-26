"use client"

import { useTranslation } from "@/components/locale-provider"
import { ArrowRight, ArrowUpRight, Check, BarChart3, ShieldCheck } from "lucide-react"
import { ServiceVisual, type ServiceKind } from "@/components/services-overview"

export function ServiciosContent() {
  const {locale,localizeHref}=useTranslation()
  const c=(es:string,en:string)=>locale==='en'?en:es
  const audit=localizeHref('/auditoria')
  const services: {id: ServiceKind; label: string; title: string; body: string; items: string[]; deliver: string}[] = [
    {id:'posicionamiento',label:'AEO / SEO',title:c('Que tus productos entren en la conversación.','Get your products into the conversation.'),body:c('Trabajamos tu visibilidad en buscadores y asistentes de IA, desde la base técnica hasta el contenido que ayuda a elegir.','We improve your visibility in search engines and AI assistants, from technical foundations to content that helps buyers choose.'),items:[c('Auditamos la base técnica, el catálogo y la presencia frente a competidores.','Audit technical foundations, your catalog and visibility against competitors.'),c('Mejoramos fichas y contenido para responder preguntas de compra.','Improve product pages and content to answer buying questions.'),c('Medimos visibilidad, tráfico identificable y resultados comerciales.','Measure visibility, identifiable traffic and business outcomes.')],deliver:c('Un plan priorizado y mejoras en la base técnica, productos y contenido.','A prioritized plan and improvements to technical foundations, products and content.')},
    {id:'datos',label:c('Análisis de datos','Data analysis'),title:c('Datos conectados. Decisiones claras.','Connected data. Clear decisions.'),body:c('Unimos los datos de tu tienda y marketing para entender el recorrido de compra y encontrar dónde actuar.','We connect store and marketing data to understand the buying journey and identify where to act.'),items:[c('Revisamos la calidad y unimos las fuentes de datos acordadas.','Review data quality and connect the agreed data sources.'),c('Analizamos canales, productos, segmentos y puntos de abandono.','Analyze channels, products, segments and drop-off points.'),c('Priorizamos oportunidades y seguimos el resultado de cada mejora.','Prioritize opportunities and track the outcome of each improvement.')],deliver:c('Una visión del negocio con hallazgos, prioridades y seguimiento de resultados.','A business view with findings, priorities and outcome tracking.')},
    {id:'personalizacion',label:c('Personalización ecommerce','Ecommerce personalization'),title:c('Una tienda que entiende a quien llega.','A store that understands each visitor.'),body:c('Personalizamos la experiencia por segmentos y testeamos tu tienda para facilitar la elección y la compra.','We personalize the experience by segment and test your store to make choosing and buying easier.'),items:[c('Definimos segmentos con las señales disponibles de navegación y compra.','Define segments using available browsing and purchase signals.'),c('Adaptamos mensajes, recomendaciones y llamadas a la acción por segmento.','Adapt messages, recommendations and calls to action by segment.'),c('Testeamos experiencias y variantes; usamos pruebas A/B cuando el volumen lo permite.','Test experiences and variants, using A/B tests when traffic volume supports them.')],deliver:c('Experiencias segmentadas en tu tienda y un plan de testing con resultados y próximos pasos.','Segmented store experiences and a testing plan with findings and next steps.')},
  ]
  return <main className="min-h-screen bg-zinc-50 text-zinc-900">
    <section className="relative overflow-hidden px-4 pb-12 pt-36 sm:pb-16">
      <div className="pointer-events-none absolute right-0 top-20 h-80 w-96 rounded-full bg-emerald-100/40 blur-3xl"/>
      <div className="relative mx-auto max-w-6xl">
        <p className="mb-6 font-mono text-xs uppercase tracking-[.2em] text-emerald-600">{c('Qué hacemos','What we do')}</p>
        <div className="grid gap-8 lg:grid-cols-[1.25fr_.75fr] lg:items-end">
          <h1 className="max-w-3xl text-4xl font-medium leading-[1.06] tracking-tight sm:text-5xl lg:text-6xl" style={{fontFamily:'var(--font-instrument-sans)'}}>{c('El motor de captación','Your customer acquisition engine,')}<br/><span className="text-emerald-600">{c('de tu ecommerce.','built for ecommerce.')}</span></h1>
          <div className="max-w-md"><p className="text-base leading-relaxed text-zinc-500">{c('Conectamos tus datos de tienda y marketing, analizamos cómo encuentran y comparan tus productos —incluidos asistentes de IA— y convertimos los hallazgos en un plan de crecimiento.','We connect your store and marketing data, analyze how your products are found and compared—including through AI assistants—and turn those insights into a growth plan.')}</p><a href={audit} className="mt-6 inline-flex items-center gap-3 rounded-full bg-zinc-900 px-6 py-3.5 text-sm font-medium text-white hover:bg-emerald-700">{c('Audita tu tienda','Audit your store')}<ArrowUpRight size={17}/></a></div>
        </div>
        <nav aria-label={c('Servicios de ecommerce','Ecommerce services')} className="mt-12 flex flex-wrap gap-x-8 gap-y-4 pt-5">{services.map((s,i)=><a key={s.id} href={`#${s.id}`} className="flex items-center gap-3 text-sm text-zinc-500 hover:text-emerald-700"><span className="font-mono text-xs text-emerald-600">0{i+1}</span>{s.label}<ArrowRight size={13}/></a>)}</nav>
      </div>
    </section>
    <div className="mx-auto max-w-6xl px-4 xl:px-0">
      {services.map((s,i)=><section key={s.id} id={s.id} className="grid scroll-mt-24 gap-10 border-t border-zinc-200 py-12 sm:py-16 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className={i===1?'lg:order-2':''}>
          <p className="mb-4 flex items-center gap-3 text-xs font-medium uppercase tracking-widest text-emerald-600"><span className="font-mono text-zinc-400">0{i+1}</span>{s.label}</p>
          <h2 className="max-w-lg text-3xl font-medium leading-tight tracking-tight sm:text-4xl" style={{fontFamily:'var(--font-instrument-sans)'}}>{s.title}</h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-zinc-500">{s.body}</p>
          <ul className="my-7 space-y-4">{s.items.map(v=><li key={v} className="flex items-start gap-3 text-sm leading-relaxed text-zinc-600"><Check size={16} className="mt-0.5 shrink-0 text-emerald-600"/>{v}</li>)}</ul>
          <div className="border-l-2 border-emerald-300 pl-4"><p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-400">{c('Qué recibes','What you get')}</p><p className="text-sm leading-relaxed text-zinc-800">{s.deliver}</p></div>
        </div>
        <figure className={`min-w-0 ${i===1?'lg:order-1':''}`}>
          <ServiceVisual kind={s.id} en={locale==='en'}/>
          <figcaption className="mt-3 text-right text-[10px] text-zinc-400">{c('Ejemplo de experiencia','Illustrative experience')}</figcaption>
        </figure>
      </section>)}
      <section className="mb-12 grid gap-6 rounded-3xl bg-emerald-950 p-7 text-white sm:p-10 md:grid-cols-[.8fr_1.2fr] md:items-center">
        <div><BarChart3 size={24} className="mb-4 text-emerald-300"/><h2 className="text-2xl font-medium tracking-tight">{c('Medimos para decidir.','Measure to decide.')}</h2></div><div><p className="text-sm leading-relaxed text-emerald-50/80">{c('Seguimos recomendaciones, visitas, consultas y ventas para elegir la siguiente mejora. Distinguimos lo rastreable de lo que declara el comprador.','We track recommendations, visits, inquiries and sales to choose the next improvement. We distinguish trackable sources from buyer-reported influence.')}</p><p className="mt-4 flex items-center gap-2 text-xs text-emerald-300"><ShieldCheck size={14}/>{c('Sobre tu tienda, tu analítica y tu CRM.','Built on your store, analytics and CRM.')}</p></div>
      </section>
      <section className="pb-20 pt-8 text-center"><p className="mb-4 text-xs text-emerald-600">{c('El primer paso','The first step')}</p><h2 className="text-3xl font-medium tracking-tight sm:text-4xl">{c('Veamos por dónde empezar.','Let’s find where to start.')}</h2><p className="mx-auto mb-7 mt-4 max-w-md text-sm leading-relaxed text-zinc-500">{c('Revisamos tu tienda y tu categoría para definir qué tiene sentido implementar.','We review your store and category to define what is worth implementing.')}</p><a href={audit} className="inline-flex items-center gap-3 rounded-full bg-zinc-900 px-7 py-3.5 text-sm font-medium text-white hover:bg-emerald-700">{c('Audita tu tienda','Audit your store')}<ArrowRight size={16}/></a><p className="mt-4 text-xs text-zinc-400">{c('Sin costo · sin compromiso','Free · no commitment')}</p></section>
    </div>
  </main>
}
