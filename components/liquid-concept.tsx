"use client"

import { useTranslation } from "@/components/locale-provider"

import { useEffect, useRef, useState } from "react"
import { useInView, useReducedMotion } from "framer-motion"
import { ArrowDown, ArrowUpRight, ArrowRight, Waves } from "lucide-react"
import { conceptAreas, conceptSteps, serviceCards } from "@/lib/liquid-offer"
import { LatamGlobe } from "@/components/latam-globe"
import { ConceptPartners } from "@/components/concept-partners"
import { ServiceVisual } from "@/components/services-overview"
import { landingFaqs } from "@/lib/landing-copy"
import { BrandIntro } from "@/components/brand-intro"
import { Footer } from "@/components/footer"
import { CroPersonalizationDemo } from "@/components/cro-personalization-demo"
import s from "./liquid-concept.module.css"


function LiquidFunnel({ active }: { active: number }) {
  const { t, locale } = useTranslation()
  const levels = [
    { d: "M55 76 Q220 130 385 76 L349 139 Q220 183 91 139 Z", cx:220,cy:76,rx:165,ry:45 },
    { d: "M96 156 Q220 199 344 156 L314 213 Q220 244 126 213 Z", cx:220,cy:156,rx:124,ry:33 },
    { d: "M131 229 Q220 259 309 229 L284 280 Q220 303 156 280 Z", cx:220,cy:229,rx:89,ry:25 },
    { d: "M161 297 Q220 319 279 297 L257 342 Q220 354 183 342 Z", cx:220,cy:297,rx:59,ry:17 },
    { d: "M187 356 Q220 369 253 356 L232 401 Q220 406 208 401 Z", cx:220,cy:356,rx:33,ry:10 },
  ]
  return <svg className={s.nativeFunnel} viewBox="0 0 440 440" role="img" aria-label={`${locale === "en" ? "Growth funnel" : "Embudo de crecimiento"}: ${t(conceptSteps[active].method)}`}>
    <defs>
      <linearGradient id="water-funnel-body" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#d8f3ff" stopOpacity=".8"/><stop offset=".25" stopColor="#7faec8" stopOpacity=".12"/><stop offset=".7" stopColor="#96c7e0" stopOpacity=".38"/><stop offset="1" stopColor="#e0f6ff" stopOpacity=".75"/></linearGradient>
      <linearGradient id="water-funnel-top"><stop stopColor="#e1f4ff" stopOpacity=".6"/><stop offset=".5" stopColor="#244a63" stopOpacity=".05"/><stop offset="1" stopColor="#bfdff0" stopOpacity=".5"/></linearGradient>
      <radialGradient id="water-funnel-glow"><stop stopColor="#b8e5ff" stopOpacity=".2"/><stop offset="1" stopColor="#b8e5ff" stopOpacity="0"/></radialGradient>
    </defs>
    <ellipse cx="220" cy="230" rx="205" ry="200" fill="url(#water-funnel-glow)"/>
    <path d="M220 32V414" stroke="#9dc6dd" strokeOpacity=".2" strokeDasharray="2 8"/>
    {levels.map((l,i)=><g key={l.d} className={active===i?s.funnelLevelActive:s.funnelLevel}>
      <path d={l.d} fill="url(#water-funnel-body)" stroke="#b8d9ec" strokeWidth=".9"/>
      <ellipse cx={l.cx} cy={l.cy} rx={l.rx} ry={l.ry} fill="url(#water-funnel-top)" stroke="#c5e6f8" strokeWidth="1.2"/>
      <text x="220" y={l.cy+(i<2?42:28)} textAnchor="middle" fill="#d7effd" fontSize={i<2?19:13} fontFamily="var(--font-instrument-sans)">0{i+1}</text>
    </g>)}
    <ellipse cx="220" cy="421" rx="82" ry="8" fill="none" stroke="#99c5df" strokeOpacity=".3"/>
  </svg>
}

export function LiquidConcept() {
  const { t, locale } = useTranslation()
  const [activeStep, setActiveStep] = useState(0)
  const [held, setHeld] = useState(false)
  const [focused, setFocused] = useState(false)
  const processRef = useRef<HTMLElement>(null)
  const processVisible = useInView(processRef, { amount: .2 })
  const reduced = useReducedMotion()
  useEffect(() => {
    if (!processVisible || held || focused || reduced) return
    const timer = window.setInterval(() => {
      if (!document.hidden) setActiveStep(step => (step + 1) % conceptSteps.length)
    }, 6500)
    return () => clearInterval(timer)
  }, [processVisible, held, focused, reduced, activeStep])
  return <div className={s.concept}>

    <main>
      <BrandIntro />

      <div className={s.partners}><ConceptPartners /></div>

      <section className={s.serviceOverview} aria-labelledby="water-services-title">
        <div className={s.sectionTop}><div><p className={s.sectionKicker}>{t("AEO / SEO · DATOS · CRO")}</p><h2 id="water-services-title">{t("Genera demanda.")}<br />{t("Convierte con margen.")}</h2></div><p>{t("Del descubrimiento de tus productos al pedido o la cotización, incluso en catálogos con miles de referencias.")}</p></div>
        <div className={s.serviceCards}>{serviceCards.map(card=><article key={card.kind}>
          <div className={s.serviceScene}><ServiceVisual kind={card.kind} en={locale === "en"}/><span className={s.servicePill}>{t(card.keywords)}</span></div>
          <div className={s.serviceCardCopy}><p className={s.serviceLabel}>{t(card.label)}</p><h3>{t(card.title)}</h3><p>{t(card.body)}</p></div>
        </article>)}</div>
      </section>

      <section id="punto-de-partida" className={s.intro}>
        <div className={s.sectionKicker}>{t("01 — EL PUNTO DE PARTIDA")}</div>
        <div className={s.introGrid}><div className={s.introIdentity}><img src="/branding/stackhouse-logo.png" alt="" aria-hidden="true" className={s.introLogo} width="240" height="280" loading="lazy" /><h2>{t("Una categoría.")}<br />{t("Un recorrido.")}<br /><span>{t("Una prioridad.")}</span></h2></div><div><p>{t("Tu próximo visitante puede ser tu mejor cliente. Mejoramos tu catálogo para ser su mejor opción. Trabajamos por familia de productos en función de tu analítica para optimizar gradualmente todos sus atributos para que tu cliente y los agentes de IA puedan encontrar fácilmente lo que buscan.")}</p><p>{t("Analizamos los datos resultantes y nuestras campañas en tiempo real para tomar decisiones basadas en lo que tiene mayor éxito.")}</p><a href="#intervenciones" className={s.darkLink}>{t("Dónde intervenimos")} <ArrowDown size={16} /></a></div></div>
      </section>

      <section id="intervenciones" className={s.interventions}>
        <div className={s.sectionTop}><div><p className={s.sectionKicker}>{t("02 — LO QUE GANA TU ECOMMERCE")}</p><h2>{t("Del catálogo al pedido.")}<br />{t("Del pedido a la contribución.")}</h2></div></div>
        <div className={s.interventionGrid}>{conceptAreas.map((a, i) => <article key={t(a.title)}><span className={s.cardNumber}>0{i + 1}</span><h3>{t(a.title)}</h3><p>{t(a.body)}</p><span aria-hidden="true" className={s.cardArrow}><ArrowUpRight size={20} /></span></article>)}</div>
      </section>

      <div id="how-it-works" className={s.processAnchor} />
      <section id="proceso" ref={processRef} className={s.process}>
        <header className={s.cycleHeading}><p className={s.eyebrow}>{t("03 — UN CICLO CONTINUO")}</p><h2>{t("Observar. Cambiar.")}{" "}<span>{t("Aprender.")}</span></h2><p>{t("SEO/GEO, CRO y analítica conectados con la siguiente decisión de tu ecommerce.")}</p></header>
        <div className={s.cycleLayout}>
          <div className={s.funnelArt}><LiquidFunnel active={activeStep}/><p>{t(conceptSteps[activeStep].method)}</p><span>{t("De la intención de compra al crecimiento rentable.")}</span></div>
          <div className={s.cycleSteps} onMouseEnter={()=>setHeld(true)} onMouseLeave={()=>setHeld(false)} onFocusCapture={()=>setFocused(true)} onBlurCapture={e=>{if(!e.currentTarget.contains(e.relatedTarget))setFocused(false)}}>
            {conceptSteps.map((step,i)=><article key={t(step.title)} className={activeStep===i?s.cycleActive:""} onMouseEnter={()=>setActiveStep(i)}>
              <h3><button type="button" aria-expanded={activeStep===i} aria-controls={`water-step-${i}`} onClick={()=>setActiveStep(i)} onFocus={()=>setActiveStep(i)}><span>0{i+1}</span><div><small>{t(step.method)}</small>{t(step.title)}</div><span aria-hidden="true" className={s.cyclePlus}>{activeStep===i?"−":"+"}</span></button></h3>
              <div id={`water-step-${i}`} hidden={activeStep!==i} className={s.cycleDetail}><p>{t(step.body)}</p></div>
              {activeStep===i && <span key={`${i}-${held}-${focused}`} className={`${s.cycleProgress} ${held||focused||reduced?s.progressHeld:""}`}/>}
            </article>)}
          </div>
        </div>
      </section>

      <div className={s.personalizationBreak}><span>{t("UNA CAPA ADICIONAL PARA TU TIENDA")}</span><Waves size={21} /><span>{t("EXPERIENCIAS POR SEGMENTO")}</span></div>
      <section id="personalizacion" className={s.personalization}>
        <div className={s.personalizationCopy}><p className={s.sectionKicker}>{t("MOTOR PROPIO DE PERSONALIZACIÓN")}</p><h2>{t("Una tienda.")}<br />{t("Distintas formas")}<br /><span>{t("de comprar.")}</span></h2><p>{t("Un comprador B2B necesita confirmar compatibilidad, disponibilidad y condiciones de compra. Quien vuelve puede buscar una referencia, comparar modelos o solicitar una cotización.")}</p><p>{t("Nuestro motor propio adapta mensajes, recomendaciones y CTA con reglas y señales acordadas. Registramos exposición y acciones por segmento, y conectamos pedidos o resultados del CRM cuando están disponibles. Las campañas pueden sumarse al servicio según el alcance.")}</p><a href={`/auditoria?lang=${locale}`} className={s.darkButton}>{t("Exploremos tu caso")} <ArrowUpRight size={17} /></a></div>
        <div className={s.demo}><CroPersonalizationDemo /></div>
      </section>

      <section id="preguntas" className={s.faq}>
        <div><p className={s.sectionKicker}>{t("PREGUNTAS FRECUENTES")}</p><h2>{t("Lo que necesitas saber")}<br /><span>{t("antes de empezar.")}</span></h2><p>{t("¿Tienes otra pregunta?")} <a href="mailto:contact@thestackhouse.io">{t("Escríbenos.")}</a></p></div>
        <div className={s.faqItems}>{landingFaqs.map(faq => <details key={t(faq.question)}><summary>{t(faq.question)}<span aria-hidden="true">+</span></summary><p>{t(faq.answer)}</p></details>)}</div>
      </section>

      <section className={s.closing}><div className={s.closingRipple} aria-hidden="true" /><p className={s.eyebrow}>{t("EL SIGUIENTE PASO")}</p><h2>{t("¿Qué categoría merece")}<br />{t("tu")}{" "}<em>{t("próxima inversión?")}</em></h2><p>{t("Revisemos demanda, catálogo y recorrido de compra. Definimos qué implementar primero, con qué datos medirlo y qué alcance necesita tu tienda.")}</p><a href={`/auditoria?lang=${locale}`} className={s.primary}>{t("Revisemos tu ecommerce")} <ArrowUpRight size={17} /></a><small>{t("Revisión inicial sin costo ni compromiso.")}</small></section>
    </main>
    <Footer />
  </div>
}
