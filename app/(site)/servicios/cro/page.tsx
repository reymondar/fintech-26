import type { Metadata } from "next"
import { ArrowUpRight, Check, ArrowRight, Search, ListFilter, Wrench, FlaskConical, ChartNoAxesCombined } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LocaleProvider } from "@/components/locale-provider"
import { CroPersonalizationDemo } from "@/components/cro-personalization-demo"
import { CRO_URL, CRO_TITLE, CRO_DESCRIPTION, CRO_INTRO, croAreas, croSteps, croDeliverables, croModes, croFaqs } from "@/lib/cro-content"

export const metadata: Metadata = {
  title: CRO_TITLE, description: CRO_DESCRIPTION,
  alternates: { canonical: CRO_URL },
  openGraph: { title: CRO_TITLE, description: CRO_DESCRIPTION, url: CRO_URL, type: "website", locale: "es_ES", siteName: "The Stack House", images: [{ url: "/og-default.png", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title: CRO_TITLE, description: CRO_DESCRIPTION, images: ["/og-default.png"] },
}

const stepIcons = [Search, ListFilter, Wrench, FlaskConical, ChartNoAxesCombined]
const audit = "/auditoria?lang=es"
const sectionLabel = "text-xs font-medium uppercase tracking-[.17em] text-emerald-700"
const heading = "mt-4 text-3xl font-medium leading-tight tracking-tight text-zinc-900 sm:text-5xl"

export default function CroPage() {
  const schema = [
    { "@context": "https://schema.org", "@type": "WebPage", "@id": `${CRO_URL}#webpage`, url: CRO_URL, name: CRO_TITLE, description: CRO_DESCRIPTION, inLanguage: "es", isPartOf: { "@id": "https://thestackhouse.io/#website" }, mainEntity: { "@id": `${CRO_URL}#service` } },
    { "@context": "https://schema.org", "@type": "Service", "@id": `${CRO_URL}#service`, name: "CRO y personalización para ecommerce", serviceType: "Optimización de conversiones para ecommerce", url: CRO_URL, description: CRO_DESCRIPTION, provider: { "@id": "https://thestackhouse.io/#organization" } },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Inicio", item: "https://thestackhouse.io/es" }, { "@type": "ListItem", position: 2, name: "Servicios", item: "https://thestackhouse.io/servicios?lang=es" }, { "@type": "ListItem", position: 3, name: "CRO para ecommerce", item: CRO_URL }] },
  ]
  return <LocaleProvider locale="es">
    <Navbar />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <main className="overflow-hidden bg-zinc-50">
      <section className="px-5 pb-16 pt-32 sm:px-8 sm:pb-24 sm:pt-40">
        <div className="mx-auto max-w-6xl">
          <nav aria-label="Ruta de navegación" className="mb-10 flex flex-wrap items-center gap-2 text-xs text-zinc-500"><a href="/es" className="hover:text-emerald-800">Inicio</a><span aria-hidden="true">/</span><a href="/servicios?lang=es" className="hover:text-emerald-800">Servicios</a><span aria-hidden="true">/</span><span aria-current="page">CRO</span></nav>
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
            <div>
              <p className={sectionLabel}>CRO para ecommerce · Implementación continua</p>
              <h1 className="mt-5 text-[2.65rem] font-medium leading-[1.06] tracking-tight text-zinc-900 sm:text-6xl lg:text-7xl">Haz que más visitas terminen en una compra.</h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-zinc-600">{CRO_INTRO}</p>
              <div className="mt-8 flex flex-wrap gap-4"><a href={audit} className="inline-flex items-center gap-3 rounded-full bg-emerald-950 px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-emerald-800">Revisemos tu ecommerce<ArrowUpRight size={17} /></a><a href="#proceso" className="inline-flex items-center gap-2 px-1 py-3.5 text-sm font-medium text-emerald-800">Cómo lo implementamos<ArrowRight size={16} /></a></div>
              <p className="mt-5 text-xs leading-6 text-zinc-500">Compra directa, cotizaciones y demos. Sobre tu tienda y tus herramientas.</p>
            </div>
            <div className="rounded-[2rem] border border-zinc-200 bg-white p-6 sm:p-8">
              <div className="flex items-center justify-between gap-3"><span className="text-xs font-medium text-zinc-500">Del interés a la venta</span><span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-medium text-emerald-800">Cada paso cuenta</span></div>
              <div className="mt-7 space-y-3">{[{ n: "01", title: "Encuentra", body: "Categorías, filtros y búsqueda" }, { n: "02", title: "Compara", body: "Fichas, compatibilidades y condiciones" }, { n: "03", title: "Decide", body: "Carrito, cotización o demo" }, { n: "04", title: "Compra y vuelve", body: "Pedidos, seguimiento y recompra" }].map((s, i) => <div key={s.n} className={`flex items-center gap-4 rounded-2xl border p-4 ${i === 2 ? "border-emerald-200 bg-emerald-50" : "border-zinc-100 bg-zinc-50"}`}><span className="font-mono text-xs text-emerald-700">{s.n}</span><div><p className="text-sm font-semibold text-zinc-900">{s.title}</p><p className="mt-1 text-xs leading-5 text-zinc-500">{s.body}</p></div></div>)}</div>
              <p className="mt-6 border-t border-zinc-100 pt-5 text-xs leading-6 text-zinc-500">Detectamos dónde se frena la compra. Implementamos una mejora y medimos qué ocurre después.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-zinc-200 bg-white px-5 py-14 sm:px-8"><div className="mx-auto grid max-w-6xl gap-7 lg:grid-cols-[1fr_1.2fr]"><h2 className="text-2xl font-medium leading-tight tracking-tight text-zinc-900 sm:text-3xl">Tu catálogo atrae interés.<br />Trabajemos lo que pasa después.</h2><div className="space-y-4 text-sm leading-7 text-zinc-600"><p>CRO —optimización de la tasa de conversión— es un proceso continuo de análisis, implementación y evaluación. En The Stack House lo aplicamos al recorrido real del comprador: encontrar, comparar, consultar y comprar.</p><p>En ecommerce B2B, una conversión también puede ser un presupuesto bien calificado o una demo que avanza a venta. Conectamos la experiencia de la tienda con ese resultado comercial.</p></div></div></section>

      <section id="que-optimizamos" className="scroll-mt-28 px-5 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <p className={sectionLabel}>Dónde intervenimos</p>
          <h2 className={`${heading} max-w-3xl`}>Mejoras en los puntos donde se decide la compra.</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-500">Cada intervención parte de una fricción observable. Definimos la variante y la métrica antes de implementar; usamos pruebas controladas cuando el volumen lo permite.</p>
          <div className="mt-9 grid gap-4 md:grid-cols-2">
            {croAreas.map((area, index) => (
              <article key={area.title} className="flex flex-col rounded-xl border border-[#5588ff40] bg-[#111722] p-5 sm:p-6">
                <div className="flex items-start gap-3">
                  <span aria-hidden="true" className="rounded border border-[#5588ff40] bg-[#1645ff20] px-2 py-1 font-mono text-xs text-[#80aeff]">0{index + 1}</span>
                  <h3 className="text-lg leading-snug text-[#f5f6f7]">{area.title}</h3>
                </div>
                <dl className="mt-5 flex flex-1 flex-col gap-4 text-sm leading-6 text-[#c9cbd1]">
                  <div><dt className="text-xs font-medium text-[#80aeff]">Diagnóstico</dt><dd>{area.problem}</dd></div>
                  <div><dt className="text-xs font-medium text-[#80aeff]">Implementación</dt><dd>{area.implementation}</dd></div>
                  <div className="mt-auto border-t border-[#5588ff30] pt-3"><dt className="flex items-center gap-2 text-xs font-medium text-[#80aeff]"><ChartNoAxesCombined size={15} aria-hidden="true" /> Qué medimos</dt><dd>{area.metric}</dd></div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="proceso" className="scroll-mt-28 bg-emerald-950 px-5 py-20 text-white sm:px-8 sm:py-24"><div className="mx-auto max-w-6xl"><p className="text-xs font-medium uppercase tracking-[.17em] text-emerald-300">Así lo llevamos a la tienda</p><h2 className="mt-4 max-w-3xl text-3xl font-medium leading-tight tracking-tight sm:text-5xl">Analizamos. Implementamos. Medimos. Volvemos a mejorar.</h2><p className="mt-5 max-w-2xl text-base leading-8 text-emerald-100">Cada ciclo termina con cambios concretos y una decisión documentada. Definimos contigo qué se trabaja y quién valida cada paso.</p><div className="mt-12 divide-y divide-emerald-800">{croSteps.map((s, i) => { const Icon = stepIcons[i]; return <article key={s.title} className="grid gap-5 py-8 md:grid-cols-[.8fr_1.2fr]"><div className="flex items-start gap-4"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-700 text-emerald-200"><Icon size={18} /></span><div><span className="font-mono text-xs text-emerald-300">0{i + 1}</span><h3 className="mt-1 text-xl font-medium tracking-tight">{s.title}</h3></div></div><div><p className="text-sm leading-7 text-emerald-100">{s.body}</p><p className="mt-4 border-l-2 border-emerald-500 pl-4 text-xs leading-6 text-emerald-200"><strong className="font-semibold text-white">Qué recibes:</strong> {s.deliverable}</p></div></article>})}</div></div></section>

      <section className="px-5 py-20 sm:px-8 sm:py-24"><div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[.85fr_1.15fr]"><div><p className={sectionLabel}>Incluido en el trabajo continuo</p><h2 className={heading}>La mejora se ejecuta.<br />El aprendizaje queda.</h2><p className="mt-5 text-sm leading-7 text-zinc-600">El alcance establece las categorías, páginas o recorridos que trabajaremos y el ritmo de implementación. El reporte recoge lo realizado, los resultados y las siguientes prioridades.</p></div><ul className="divide-y divide-zinc-200 rounded-3xl border border-zinc-200 bg-white px-6 sm:px-8">{croDeliverables.map(d => <li key={d} className="flex gap-3 py-5 text-sm leading-7 text-zinc-700"><Check className="mt-1.5 shrink-0 text-emerald-700" size={16} />{d}</li>)}</ul></div></section>

      <section id="personalizacion" className="scroll-mt-28 border-y border-emerald-100 bg-emerald-50/60 px-5 py-20 sm:px-8 sm:py-24"><div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2"><div><p className={sectionLabel}>Opcional · Software propio</p><h2 className={heading}>Una experiencia que cambia con el contexto de compra.</h2><p className="mt-6 text-base leading-8 text-zinc-600">Podemos sumar campañas con nuestro motor de personalización de ecommerce para adaptar mensajes, recomendaciones y llamadas a la acción según el segmento, el comportamiento y la intención del visitante.</p><p className="mt-4 text-sm leading-7 text-zinc-600">Definimos el público, las señales, las reglas y las variantes. Implementamos la campaña y registramos exposición y acciones para evaluar qué ocurre en cada segmento.</p><ul className="mt-6 space-y-3 text-sm leading-6 text-zinc-700">{["Orientar a quien recién empieza a explorar.", "Ayudar a comparar a quien vuelve a una categoría.", "Acercar la consulta cuando la compra requiere asesoría."].map(t => <li key={t} className="flex gap-3"><Check size={16} className="mt-1 shrink-0 text-emerald-700" />{t}</li>)}</ul><p className="mt-6 text-xs leading-6 text-zinc-500">La personalización se cotiza como ampliación del servicio. Las posibilidades de integración se revisan con cada tienda.</p></div><CroPersonalizationDemo /></div></section>

      <section id="modalidades" className="scroll-mt-28 px-5 py-20 sm:px-8 sm:py-24"><div className="mx-auto max-w-6xl"><p className={sectionLabel}>Cómo podemos trabajar</p><h2 className={`${heading} max-w-3xl`}>CRO continuo. Personalización cuando aporta una oportunidad.</h2><div className="mt-10 grid gap-5 md:grid-cols-2">{croModes.map((m, i) => <article key={m.title} className={`flex flex-col rounded-3xl border p-7 sm:p-9 ${i ? "border-emerald-300 bg-white" : "border-zinc-200 bg-white"}`}><span className="text-xs font-medium text-emerald-700">{m.tag}</span><h3 className="mt-3 text-3xl font-medium tracking-tight text-zinc-900">{m.title}</h3><p className="mt-4 text-sm leading-7 text-zinc-600">{m.body}</p><ul className="mb-8 mt-6 space-y-3">{m.items.map(item => <li key={item} className="flex gap-3 text-sm leading-6 text-zinc-700"><Check size={15} className="mt-1 shrink-0 text-emerald-700" />{item}</li>)}</ul><a href={audit} className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-emerald-800">Definamos el alcance<ArrowUpRight size={16} /></a></article>)}</div><p className="mt-6 max-w-3xl text-sm leading-7 text-zinc-500">La propuesta detalla implementación inicial, trabajo mensual y licencias o integraciones necesarias. El alcance depende del catálogo, los datos, la plataforma y la capacidad de experimentar.</p></div></section>

      <section className="border-y border-zinc-200 bg-white px-5 py-16 sm:px-8"><div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2"><div><p className={sectionLabel}>Medición comercial</p><h2 className="mt-4 text-3xl font-medium tracking-tight text-zinc-900">Más claridad sobre qué mejora el negocio.</h2></div><div className="space-y-4 text-sm leading-7 text-zinc-600"><p>Medimos el resultado relevante para cada recorrido: compras, consultas calificadas, cotizaciones o demos. Sumamos ingresos y margen cuando existen datos de costos, descuentos y devoluciones.</p><p>Una variante que genera más clics necesita demostrar su valor más adelante en el recorrido. Revisamos también errores, abandono y calidad de los contactos para decidir qué mantener.</p><p>Cuando hacemos experimentos, diferenciamos su resultado del seguimiento antes y después. Dejamos explícitos el período observado, el volumen y los límites de la conclusión.</p><p className="font-medium text-zinc-800">GA4, Amplitude y Clarity, junto con los pedidos y el CRM disponibles, ayudan a conectar comportamiento y resultados.</p></div></div></section>

      <section id="preguntas" className="scroll-mt-28 px-5 py-20 sm:px-8 sm:py-24"><div className="mx-auto max-w-4xl"><p className={sectionLabel}>Antes de empezar</p><h2 className={heading}>Lo que necesitas saber.</h2><div className="mt-10 divide-y divide-zinc-200 border-y border-zinc-200">{croFaqs.map(f => <details key={f.question} className="group py-5"><summary className="cursor-pointer text-base font-medium leading-7 text-zinc-900 marker:text-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700">{f.question}</summary><p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-600">{f.answer}</p></details>)}</div></div></section>

      <section className="px-5 pb-20 sm:px-8"><div className="mx-auto max-w-6xl rounded-[2rem] bg-emerald-950 p-8 text-white sm:p-14"><p className="text-xs font-medium uppercase tracking-[.17em] text-emerald-300">Tu próxima mejora empieza con una pregunta</p><h2 className="mt-5 max-w-3xl text-3xl font-medium leading-tight tracking-tight sm:text-5xl">¿Qué está frenando la compra en tu ecommerce?</h2><p className="mt-5 max-w-2xl text-sm leading-7 text-emerald-100">Revisemos tu tienda y sus oportunidades. Definimos qué recorrido conviene trabajar primero y si la personalización tiene sentido para ese objetivo.</p><a href={audit} className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-emerald-950 transition-colors hover:bg-emerald-100">Revisemos tu ecommerce<ArrowUpRight size={17} /></a><p className="mt-4 text-xs text-emerald-200">Revisión inicial sin costo ni compromiso.</p></div></section>
    </main>
    <Footer />
  </LocaleProvider>
}
