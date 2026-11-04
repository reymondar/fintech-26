"use client"

import { useEffect, useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { LatamGlobe } from "@/components/latam-globe"
import { useTranslation } from "@/components/locale-provider"
import s from "./liquid-concept.module.css"
import b from "./brand-intro.module.css"

const aiEngines = ["ChatGPT", "Gemini", "Perplexity", "Claude", "Copilot", "Grok", "Google AI"]

export function BrandIntro() {
  const { t, locale } = useTranslation()
  const [activeEngine, setActiveEngine] = useState(0)
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
    let timer: ReturnType<typeof setInterval> | undefined
    const sync = () => {
      clearInterval(timer)
      if (!reduced.matches && !document.hidden) {
        timer = setInterval(() => setActiveEngine(index => (index + 1) % aiEngines.length), 2600)
      }
    }
    sync()
    reduced.addEventListener("change", sync)
    document.addEventListener("visibilitychange", sync)
    return () => {
      clearInterval(timer)
      reduced.removeEventListener("change", sync)
      document.removeEventListener("visibilitychange", sync)
    }
  }, [])
  return <div className={b.intro}>
    <Navbar />
    <section id="inicio" className={s.hero} onPointerMove={e => {
      const r = e.currentTarget.getBoundingClientRect()
      e.currentTarget.style.setProperty("--mx", `${((e.clientX - r.left) / r.width - .5) * 14}px`)
      e.currentTarget.style.setProperty("--my", `${((e.clientY - r.top) / r.height - .5) * 14}px`)
    }}>
      <div aria-hidden="true" className={s.ambient} />
      <div className={s.heroCopy}>
        <p className={s.eyebrow}><span /> {t("CRO & GEO PARA ECOMMERCE B2B")}</p>
        <h1>{t("Tu próximo cliente está buscándote en")}{" "}<em className={b.engine} aria-label={aiEngines.join(", ")}>
          {aiEngines.map((name, index) => <span key={name} aria-hidden="true" className={index === activeEngine ? b.engineActive : b.engineHidden}>{name}.</span>)}
        </em><br />{t("Te convertimos en la respuesta.")}</h1>
        <h2 className={s.heroDescription}>{t("The Stack House conecta catálogos grandes de ecommerce B2B con compradores que buscan en Google y en la IA. Optimizamos categorías, datos de producto y recorridos de compra para convertir ese interés en pedidos y cotizaciones.")}</h2>
        <div className={s.heroActions}><a href={`/auditoria?lang=${locale}`} className={s.primary}>{t("Revisemos tu ecommerce")} <ArrowUpRight size={17} /></a></div>
      </div>
      <div className={s.liquidStage} aria-label={t("Globo de comercio conectado de The Stack House")}>
        <div aria-hidden="true" className={s.halo} />
        <div aria-hidden="true" className={s.rippleOne} /><div aria-hidden="true" className={s.rippleTwo} />
        <div className={s.globe}><LatamGlobe /></div>
        <div className={s.ringCenter}><span>THE STACK</span><strong>HOUSE</strong><i>{t("Todo conectado.")}</i></div>
        <div className={`${s.glassLabel} ${s.labelOne}`}><span className={s.dot} /> {t("Interés")}</div>
        <div className={`${s.glassLabel} ${s.labelTwo}`}><span className={s.dot} /> {t("Decisión")}</div>
        <div className={`${s.glassLabel} ${s.labelThree}`}><span className={s.dot} /> {t("Conversión")} <ArrowUpRight size={13} /></div>
      </div>
    </section>
  </div>
}
