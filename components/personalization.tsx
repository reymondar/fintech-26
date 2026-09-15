"use client"

import { m, useInView, useReducedMotion } from "framer-motion"
import { useEffect, useRef, useState, type ReactNode } from "react"
import { ArrowUpRight } from "lucide-react"
import { useTranslation } from "@/components/locale-provider"

const markets = [
  { name: "España", english: "Spain", code: "ES", language: "Español", currency: "EUR", headline: "Trabaja cómodo, cada día.", subtitle: "Diseño que cuida tu postura.", product: "Silla ergonómica", price: "249 €", delivery: "Consulta envíos a España", cta: "Encuentra tu comodidad" },
  { name: "México", english: "Mexico", code: "MX", language: "Español", currency: "MXN", headline: "Renueva tu oficina en casa.", subtitle: "Comodidad para tus mejores ideas.", product: "Silla ergonómica", price: "$4,990 MXN", delivery: "Consulta envíos a México", cta: "Renueva tu espacio" },
  { name: "Estados Unidos", english: "United States", code: "US", language: "English", currency: "USD", headline: "Make room for your best work.", subtitle: "Everyday comfort. Designed around you.", product: "Ergonomic chair", price: "$279 USD", delivery: "Explore US shipping options", cta: "Upgrade your workspace" },
]

type Block = "headline" | "subtitle" | "commerce" | "cta"
const sequence: { block: Block; at: number }[] = [
  { block: "headline", at: 2000 },
  { block: "subtitle", at: 3000 },
  { block: "commerce", at: 4250 },
  { block: "cta", at: 5500 },
]

function ChangingBlock({ value, preparing, reduced, children, className = "" }: {
  value: number; preparing: boolean; reduced: boolean | null; children: ReactNode; className?: string
}) {
  return <div className={`relative rounded-lg ${className}`}>
    <m.div aria-hidden="true" className="pointer-events-none absolute -inset-1 rounded-lg border border-emerald-400/50 bg-emerald-100/40"
      animate={{ opacity: preparing ? 1 : 0 }} transition={{ duration: 0.175 }} />
    <m.div key={value} lang={value === 2 ? "en" : "es"} className="relative"
      initial={reduced ? false : { opacity: 0, y: 6, filter: "blur(3px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.275 }}>
      {children}
    </m.div>
  </div>
}

export function Personalization() {
  const { locale } = useTranslation()
  const en = locale === "en"
  const copy = (es: string, english: string) => en ? english : es
  const [blocks, setBlocks] = useState<Record<Block, number>>({ headline: 0, subtitle: 0, commerce: 0, cta: 0 })
  const [preparing, setPreparing] = useState<Block | null>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const visible = useInView(previewRef, { amount: 0.5 })
  const reducedMotion = useReducedMotion()
  const [changeCount, setChangeCount] = useState(0)
  const imageVariant = Math.floor(changeCount / 2) % 3
  const [pageVisible, setPageVisible] = useState(true)
  const running = visible && pageVisible && !reducedMotion
  useEffect(() => {
    const update = () => setPageVisible(!document.hidden)
    update()
    document.addEventListener("visibilitychange", update)
    return () => document.removeEventListener("visibilitychange", update)
  }, [])
  useEffect(() => {
    if (!running) { setPreparing(null); return }
    const timers: number[] = []
    const play = () => {
      sequence.forEach(({ block, at }) => {
        timers.push(window.setTimeout(() => setPreparing(block), at - 325))
        timers.push(window.setTimeout(() => {
          setBlocks(current => ({ ...current, [block]: (current[block] + 1) % markets.length }))
          setChangeCount(count => count + 1)
          setPreparing(null)
        }, at))
      })
      timers.push(window.setTimeout(play, 7250))
    }
    play()
    return () => timers.forEach(window.clearTimeout)
  }, [running])
  const market = markets[blocks.commerce]
  return (
    <section id="personalization" className="px-4 py-10 sm:py-14 scroll-mt-28" aria-labelledby="personalization-title">
      <div className="mx-auto max-w-6xl">
        <header className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-emerald-600">{copy("Personalización de tu tienda", "Store personalization")}</p>
          <h2 id="personalization-title" className="text-balance text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl" style={{ fontFamily: "var(--font-instrument-sans)" }}>{copy("Una misma tienda. Una experiencia para cada cliente.", "One store. An experience for every customer.")}</h2>
          <p className="mt-6 text-base leading-relaxed text-zinc-500">{copy("Adaptamos productos y mensajes a cada comprador para facilitar la compra.", "Tailor products and messages to each shopper to make buying easier.")}</p>
        </header>
        <div className="grid items-center gap-8 overflow-hidden rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          <div>
            <h3 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">{copy("Tu tienda, en contexto con tu audiencia", "Your store, tailored to your audience")}</h3>
            <p className="mt-5 leading-relaxed text-zinc-500">{copy("Analizamos tu capa de datos para generar la tienda perfecta para cada visitante", "We analyze your data layer to create the perfect store for every visitor")}</p>
          </div>
          <div ref={previewRef} className="min-w-0 rounded-3xl border border-emerald-100 bg-emerald-50/60 p-4 sm:p-6">
            <div aria-live="off" className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
              <div className="flex items-center justify-between gap-2 border-b border-zinc-100 px-5 py-4"><span className="text-xs font-semibold tracking-widest text-zinc-800">STUDIO STORE</span><ChangingBlock value={blocks.commerce} preparing={preparing === "commerce"} reduced={reducedMotion}><span className="text-xs text-zinc-500">{market.language} · {market.currency}</span></ChangingBlock></div>
              <div className="p-5 sm:p-6">
                <ChangingBlock value={blocks.headline} preparing={preparing === "headline"} reduced={reducedMotion}><p className="min-h-14 text-xl font-semibold leading-7 tracking-tight text-zinc-900">{markets[blocks.headline].headline}</p></ChangingBlock>
                <ChangingBlock value={blocks.subtitle} preparing={preparing === "subtitle"} reduced={reducedMotion} className="mt-1"><p className="min-h-10 text-sm leading-5 text-zinc-500">{markets[blocks.subtitle].subtitle}</p></ChangingBlock>
                <div className="my-4 flex h-36 items-center justify-center rounded-xl bg-zinc-50" aria-hidden="true">
                  <m.svg key={imageVariant} viewBox="0 0 200 150" className="h-36 w-48" fill="none"
                    initial={reducedMotion ? false : { opacity: 0, scale: 0.92, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.35, ease: "easeOut" }}>
                    <ellipse cx="100" cy="138" rx="61" ry="7" fill="#e4e4e7" />
                    {imageVariant === 0 ? <>
                      <path d="M74 22Q72 12 86 12H121Q135 12 132 27L124 82H79Z" fill="#a7f3d0" stroke="#059669" strokeWidth="2" />
                      <path d="M73 83H125Q137 83 136 95H69Q63 88 73 83Z" fill="#34d399" stroke="#059669" strokeWidth="2" />
                    </> : imageVariant === 1 ? <>
                      <rect x="82" y="7" width="38" height="13" rx="6" fill="#475569" />
                      <path d="M77 27Q101 17 129 27L123 80H80Z" fill="#cbd5e1" stroke="#64748b" strokeWidth="2" />
                      {[36, 46, 56, 66].map(y => <path key={y} d={`M84 ${y}H120`} stroke="#94a3b8" strokeWidth="2" />)}
                      <path d="M73 83H125Q137 83 136 95H69Q63 88 73 83Z" fill="#475569" stroke="#334155" strokeWidth="2" />
                    </> : <>
                      <path d="M72 28Q70 12 88 12H119Q136 12 133 29L127 84H78Z" fill="#e7d7c0" stroke="#a89072" strokeWidth="2" />
                      <path d="M102 20V77M79 48H128" stroke="#c3ac8e" strokeWidth="2" />
                      <path d="M73 83H125Q137 83 136 95H69Q63 88 73 83Z" fill="#cfb896" stroke="#a89072" strokeWidth="2" />
                    </>}
                    <path d="M101 96V126M72 136L101 126L131 136M101 126V139M70 80V63H60M130 80V63H140" stroke="#3f3f46" strokeWidth="5" strokeLinecap="round" />
                  </m.svg>
                </div>
                <ChangingBlock value={blocks.commerce} preparing={preparing === "commerce"} reduced={reducedMotion}>
                <div className="flex flex-wrap items-baseline justify-between gap-2"><span className="text-sm text-zinc-700">{market.product}</span><strong className="text-lg text-zinc-900">{market.price}</strong></div>
                <p className="mt-2 text-xs text-zinc-500">{market.delivery}</p>
                </ChangingBlock>
                <ChangingBlock value={blocks.cta} preparing={preparing === "cta"} reduced={reducedMotion} className="mt-5">
                <div className="flex items-center justify-center gap-2 rounded-full bg-emerald-600 py-3 text-sm font-medium text-white">{markets[blocks.cta].cta}<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></div>
                </ChangingBlock>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
