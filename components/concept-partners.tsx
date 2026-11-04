"use client"

import { useTranslation } from "@/components/locale-provider"

import { useEffect, useRef, useState } from "react"
import { technologyProducts } from "@/components/technology-logos"
import s from "./liquid-concept.module.css"

export function ConceptPartners() {
  const { t } = useTranslation()
  const viewport = useRef<HTMLDivElement>(null)
  const group = useRef<HTMLUListElement>(null)
  const [overflow, setOverflow] = useState(false)
  useEffect(() => {
    const measure = () => {
      if (!viewport.current || !group.current) return
      const items = [...group.current.children] as HTMLElement[]
      const gap = parseFloat(getComputedStyle(group.current).columnGap) || 0
      const naturalWidth = items.reduce((sum, item) => sum + item.getBoundingClientRect().width, 0) + gap * (items.length - 1)
      setOverflow(naturalWidth > viewport.current.clientWidth)
    }
    const observer = new ResizeObserver(measure)
    if (viewport.current) observer.observe(viewport.current)
    measure()
    return () => observer.disconnect()
  }, [])
  const logos = (duplicate: boolean) => technologyProducts.map(product => <li key={product.name} title={product.name}><img src={`/technology-logos/${product.image}`} alt={duplicate ? "" : product.name} width={40} height={40} loading="lazy" decoding="async" /></li>)
  return <section className={s.partnerSection} aria-labelledby="concept-partners-title">
    <h2 id="concept-partners-title">{t("Socios de confianza")}</h2>
    <div ref={viewport} className={s.partnerViewport} data-moving={overflow} tabIndex={overflow ? 0 : undefined} role="region" aria-labelledby="concept-partners-title">
      <div className={s.partnerTrack}>
        <ul ref={group} className={s.partnerGroup}>{logos(false)}</ul>
        {overflow && <ul className={s.partnerGroup} aria-hidden="true">{logos(true)}</ul>}
      </div>
    </div>
  </section>
}
