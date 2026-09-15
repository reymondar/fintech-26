"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, m, useInView, useReducedMotion } from "framer-motion"
import { ArrowDown, ArrowUpRight, Check, CheckCheck, Coffee, Globe2, MessageCircle, RotateCcw, ShieldCheck, Sparkles } from "lucide-react"
import { useTranslation } from "@/components/locale-provider"

function CoffeeMachine({ small = false }: { small?: boolean }) {
  return <svg viewBox="0 0 320 230" className={small ? "w-20 h-16" : "w-full h-full max-h-48"} aria-hidden="true">
    <defs><linearGradient id={small ? "metal-small" : "metal-large"} x2="1" y2="1"><stop stopColor="#fafafa"/><stop offset=".45" stopColor="#d4d4d8"/><stop offset="1" stopColor="#a1a1aa"/></linearGradient></defs>
    <ellipse cx="162" cy="204" rx="117" ry="12" fill="#064e3b" opacity=".08"/>
    <path d="M68 60Q68 40 88 40H233Q251 40 254 61L269 181H54Z" fill="#27272a"/>
    <rect x="66" y="59" width="187" height="105" rx="10" fill={`url(#${small ? "metal-small" : "metal-large"})`}/>
    <rect x="78" y="71" width="162" height="32" rx="6" fill="#18181b"/>
    <rect x="91" y="80" width="33" height="13" rx="3" fill="#6ee7b7"/>
    <circle cx="204" cy="86" r="7" fill="#a1a1aa"/><circle cx="226" cy="86" r="7" fill="#a1a1aa"/>
    <path d="M111 109V127H153V109M182 109V127H224V109" fill="#3f3f46"/>
    <path d="M128 125V136M198 125V136" stroke="#52525b" strokeWidth="8"/>
    <path d="M96 123H129M200 123H241" stroke="#18181b" strokeWidth="9" strokeLinecap="round"/>
    <path d="M77 111V146L87 156" fill="none" stroke="#71717a" strokeWidth="5" strokeLinecap="round"/>
    <path d="M111 146H151L148 168Q131 179 116 168Z" fill="#fff"/><path d="M152 150Q168 150 155 162" fill="none" stroke="#fff" strokeWidth="4"/>
    <path d="M181 146H221L218 168Q201 179 186 168Z" fill="#ecfdf5"/>
    <rect x="55" y="178" width="214" height="16" rx="5" fill="#71717a"/><path d="M72 181H250" stroke="#d4d4d8" strokeWidth="2"/>
    <rect x="72" y="194" width="17" height="9" rx="3" fill="#27272a"/><rect x="235" y="194" width="17" height="9" rx="3" fill="#27272a"/>
    <path d="M123 29Q114 20 123 10M145 29Q136 20 145 10" fill="none" stroke="#6ee7b7" strokeWidth="3" strokeLinecap="round" opacity=".7"/>
  </svg>
}

const assistants = [
  { name: "Perplexity", logo: "perplexity", color: "#20808D", background: "#f0f8f8" },
  { name: "Claude", logo: "claude", color: "#D97757", background: "#faf4ee" },
  { name: "ChatGPT", logo: "openai", color: "#18181b", background: "#f7f7f7" },
]

export function HeroBuyerJourney() {
  const { locale } = useTranslation()
  const en = locale === "en"
  const c = (es: string, english: string) => en ? english : es
  const ref = useRef<HTMLDivElement>(null)
  const visible = useInView(ref, { amount: 0.35 })
  const reduced = useReducedMotion()
  const [step, setStep] = useState(0)
  const [assistantIndex, setAssistantIndex] = useState(0)
  const assistant = assistants[assistantIndex]
  const [pageVisible, setPageVisible] = useState(true)
  const [cycle, setCycle] = useState(0)
  useEffect(() => {
    const update = () => setPageVisible(!document.hidden)
    update(); document.addEventListener("visibilitychange", update)
    return () => document.removeEventListener("visibilitychange", update)
  }, [])
  useEffect(() => {
    if (!visible || !pageVisible || reduced) return
    const timer = window.setTimeout(() => {
      if (step === 3) setAssistantIndex(i => (i + 1) % assistants.length)
      setStep((step + 1) % 4)
    }, step === 0 ? 2000 : 2500)
    return () => window.clearTimeout(timer)
  }, [step, visible, pageVisible, reduced, cycle])
  const active = reduced ? 3 : step
  const labels = [c("Pregunta", "Ask"), c("Te descubre", "Discover"), c("Visita tu tienda", "Visit your store"), c("Cierra la venta", "Make the sale")]
  return <div ref={ref} id="buyer-journey" className="relative mx-auto mt-10 mb-16 w-full max-w-5xl scroll-mt-28 text-left">
    <div className="pointer-events-none absolute inset-x-16 top-20 bottom-0 rounded-full bg-emerald-100/60 blur-3xl" />
    <div className="relative grid items-start gap-5 md:grid-cols-[1fr_1.08fr] md:gap-0">
      <div className="relative z-10 overflow-hidden rounded-3xl border border-zinc-200/80 bg-white/95 shadow-[0_16px_60px_-35px_rgba(0,0,0,.3)] md:mr-[-24px]">
        <div className="border-b border-zinc-100 px-5 py-4 transition-colors duration-[350ms]" style={{ backgroundColor: assistant.background }}>
          <m.div key={assistant.name} initial={reduced ? false : { opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .25 }} className="flex items-center gap-3">
            <span aria-hidden="true" className="block h-8 w-8 shrink-0" style={{ backgroundColor: assistant.color, mask: `url(/ai-logos/${assistant.logo}.svg) center / contain no-repeat`, WebkitMask: `url(/ai-logos/${assistant.logo}.svg) center / contain no-repeat` }} />
            <div><p className="text-sm font-semibold" style={{ color: assistant.color }}>{assistant.name}</p><p className="text-[11px] text-zinc-400">{c("Tu cliente está buscando", "Your customer is searching")}</p></div>
          </m.div>
        </div>
        <div className="min-h-[310px] p-5 sm:p-6">
          <div className="ml-7 rounded-2xl rounded-tr-sm bg-zinc-100 px-4 py-3 text-sm leading-relaxed text-zinc-700">{c("¿Qué cafetera profesional me conviene para abrir una cafetería?", "Which professional coffee machine should I choose for a new café?")}</div>
          <div className="mt-6 flex items-center gap-2 text-xs transition-colors duration-[350ms]" style={{ color: assistant.color }}><Sparkles size={14}/>{c("Una opción para lo que necesitas", "An option that fits your needs")}</div>
          <AnimatePresence mode="wait">
            {active === 0 ? <m.div key="thinking" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="mt-5 space-y-3" aria-label={c("Buscando opciones", "Finding options")}><div className="h-2 w-5/6 rounded bg-zinc-100"/><div className="h-2 w-full rounded bg-zinc-100"/><div className="h-2 w-3/5 rounded transition-colors duration-[350ms]" style={{ backgroundColor: `${assistant.color}20` }}/><p className="pt-2 text-xs text-zinc-400">{c("Comparando capacidad, uso y soporte…", "Comparing capacity, use and support…")}</p></m.div> : <m.div key="recommendation" initial={reduced ? false : {opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{duration:.25}}>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600">{c("La Barista Pro 2G encaja con una cafetería que necesita preparar varias bebidas a la vez.", "The Barista Pro 2G suits a café that needs to prepare several drinks at once.")}</p>
              <div className="mt-4 flex items-center gap-3 rounded-2xl border p-3 transition-colors duration-[350ms]" style={{ borderColor: `${assistant.color}35`, backgroundColor: assistant.background }}><CoffeeMachine small/><div className="min-w-0 flex-1"><p className="text-sm font-semibold text-zinc-800">Barista Pro 2G</p><p className="mt-1 text-xs text-zinc-500">{c("Disponible en tu tienda", "Available at your store")}</p></div><ArrowUpRight size={17} className="shrink-0 transition-colors duration-[350ms]" style={{ color: assistant.color }}/></div>
            </m.div>}
          </AnimatePresence>
        </div>
      </div>
      <m.div animate={{opacity: active >= 2 ? 1 : .62, y: active >= 2 ? 0 : 8}} transition={{duration:.35}} className="relative overflow-hidden rounded-3xl border border-emerald-200/70 bg-white shadow-[0_24px_70px_-40px_rgba(5,150,105,.45)] md:mt-12 md:ml-0">
        <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-4 md:pl-10"><span className="text-xs font-semibold tracking-[.16em] text-zinc-800">{c("TU TIENDA", "YOUR STORE")}</span><span className="flex items-center gap-1.5 text-[11px] text-zinc-400"><Globe2 size={12}/> {c("Equipamiento profesional", "Professional equipment")}</span></div>
        <div className="p-5 md:pl-10">
          <div className="relative flex h-40 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-50 via-zinc-50 to-white"><CoffeeMachine/><span className="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-1 text-[10px] text-emerald-700">{c("Para tu cafetería", "For your café")}</span></div>
          <div className="mt-4 flex items-center justify-between gap-2"><h3 className="text-xl font-medium tracking-tight text-zinc-900">Barista Pro 2G</h3><Coffee size={19} className="text-emerald-600"/></div>
          <p className="mt-1 text-xs text-zinc-500">{c("Dos grupos. Lista para tu ritmo de trabajo.", "Two groups. Built for your daily workflow.")}</p>
          <div className="my-4 flex flex-wrap gap-x-4 gap-y-2 text-[11px] text-zinc-600"><span className="flex items-center gap-1"><Check size={12} className="text-emerald-600"/>{c("Instalación incluida", "Installation included")}</span><span className="flex items-center gap-1"><ShieldCheck size={12} className="text-emerald-600"/>{c("Soporte técnico", "Technical support")}</span></div>
          <div className={`flex min-h-11 items-center justify-center gap-2 rounded-full px-3 text-sm font-medium transition-colors duration-[250ms] ${active === 3 ? "bg-emerald-100 text-emerald-800" : "bg-zinc-900 text-white"}`}>
            {active === 3 ? <><CheckCheck size={17}/>{c("Solicitud enviada", "Request sent")}</> : <>{c("Solicitar presupuesto", "Request a quote")}<ArrowUpRight size={15}/></>}
          </div>
        </div>
      </m.div>
      <m.div aria-hidden="true" animate={{opacity:active>=2?1:0,scale:active>=2?1:.8}} className="absolute left-1/2 top-[41%] z-20 hidden h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full border-4 border-zinc-50 bg-emerald-600 text-white md:flex"><ArrowUpRight size={20}/></m.div>
    </div>
    <div className="relative mt-5 flex min-h-12 items-center justify-center gap-2 text-xs text-zinc-500">
      <AnimatePresence mode="wait"><m.p key={active} initial={reduced ? false : {opacity:0,y:5}} animate={{opacity:1,y:0}} exit={{opacity:0}} className="flex items-center gap-2 text-center">{active===3 ? <MessageCircle size={15} className="shrink-0 text-emerald-600"/> : <ArrowDown size={14} className="shrink-0 text-emerald-600"/>}{[c("Todo empieza con una necesidad.","It starts with a need."),c("Tu producto entra en la conversación.","Your product enters the conversation."),c("La tienda resuelve sus dudas.","Your store answers their questions."),c("Tu equipo recibe una consulta con el producto de interés.","Your team receives an inquiry with the product of interest.")][active]}</m.p></AnimatePresence>
    </div>
    <div className="relative mx-auto mt-2 flex max-w-xl items-center justify-center gap-2 sm:gap-4">
      {labels.map((label,i)=><button key={label} type="button" onClick={()=>{setStep(i);setCycle(n=>n+1)}} aria-pressed={active===i} className={`flex items-center gap-1.5 rounded-lg px-1 py-2 text-[10px] sm:text-xs transition-colors focus-visible:outline-2 focus-visible:outline-emerald-600 ${active===i?'text-emerald-700':'text-zinc-400 hover:text-zinc-700'}`}><span className={`h-1.5 w-1.5 shrink-0 rounded-full ${active===i?'bg-emerald-500':'bg-zinc-200'}`}/>{label}</button>)}
      <button type="button" aria-label={c("Reiniciar demostración", "Replay demo")} onClick={()=>{setStep(0);setCycle(n=>n+1)}} className="rounded-full p-2 text-zinc-400 hover:text-emerald-600 focus-visible:outline-2 focus-visible:outline-emerald-600"><RotateCcw size={13}/></button>
    </div>
  </div>
}
