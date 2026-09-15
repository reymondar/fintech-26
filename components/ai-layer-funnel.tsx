"use client"

import { m, useReducedMotion } from "framer-motion"
import { useId } from "react"

export function AILayerFunnel({ active, running, locale }: { active: number; running: boolean; locale: string }) {
  const reduced = useReducedMotion()
  const uid = useId().replace(/:/g, "")
  const en = locale === "en"
  const stages = en ? [
    { title: "Understand demand", lines: ["Purchase questions", "Store · catalog · competitors"], tag: "DIAGNOSIS" },
    { title: "Your acquisition engine", lines: ["Anticipate buyer needs", "Adapt the experience to drive sales"], tag: "IMPLEMENTATION" },
    { title: "Measure and improve", lines: ["Visibility · inquiries · sales", "Analytics + CRM → next action"], tag: "OPTIMIZATION" },
  ] : [
    { title: "Entender la demanda", lines: ["Preguntas de compra", "Tienda · catálogo · competencia"], tag: "DIAGNÓSTICO" },
    { title: "Tu motor de captación", lines: ["Anticipa lo que busca cada comprador", "Adapta la experiencia para vender"], tag: "IMPLEMENTACIÓN" },
    { title: "Medir y mejorar", lines: ["Visibilidad · consultas · ventas", "Analítica + CRM → siguiente acción"], tag: "OPTIMIZACIÓN" },
  ]
  const paths = [
    "M42 142 Q170 104 298 142 L265 226 Q170 253 75 226 Z",
    "M81 244 Q170 270 259 244 L225 326 Q170 345 115 326 Z",
    "M121 345 Q170 363 219 345 L187 419 Q170 430 153 419 Z",
  ]
  const ellipses = [{cx:170,cy:142,rx:128,ry:25},{cx:170,cy:244,rx:89,ry:20},{cx:170,cy:345,rx:49,ry:13}]
  return <div className="relative overflow-hidden rounded-[2rem] border border-emerald-100 bg-gradient-to-br from-white via-zinc-50/50 to-emerald-50/60 p-3 shadow-[0_18px_60px_-35px_rgba(5,150,105,.25)] sm:p-5">
    <svg viewBox="0 0 640 540" className="block h-auto w-full" role="img" aria-labelledby={`${uid}-title ${uid}-desc`}>
      <title id={`${uid}-title`}>{en ? "The AI layer across your sales funnel" : "El AI layer a lo largo de tu embudo de ventas"}</title>
      <desc id={`${uid}-desc`}>{stages[active].title}. {stages[active].lines.join(". ")}</desc>
      <defs>
        <linearGradient id={`${uid}-on`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#a7f3d0" stopOpacity=".85"/><stop offset=".55" stopColor="#10b981" stopOpacity=".5"/><stop offset="1" stopColor="#047857" stopOpacity=".85"/></linearGradient>
        <linearGradient id={`${uid}-off`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#e4e4e7" stopOpacity=".5"/><stop offset="1" stopColor="#d4d4d8" stopOpacity=".15"/></linearGradient>
        <filter id={`${uid}-glow`} x="-70%" y="-70%" width="240%" height="240%"><feGaussianBlur stdDeviation="12"/></filter>
        <pattern id={`${uid}-grid`} width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".7" fill="#a1a1aa" opacity=".2"/></pattern>
      </defs>
      <rect width="640" height="540" fill={`url(#${uid}-grid)`}/>
      <text x="28" y="34" fontSize="11" letterSpacing="2.4" fill="#059669" fontFamily="monospace">THE STACK HOUSE / AI LAYER</text>
      <text x="28" y="65" fontSize="21" fontWeight="500" fill="#18181b">{en ? "Your infrastructure. Connected." : "Tu infraestructura. Conectada."}</text>
      <g fontSize="10" fill="#71717a" textAnchor="middle">
        {[en ? "Questions" : "Preguntas",en ? "Products" : "Productos",en ? "Buyers" : "Compradores"].map((s,i)=><g key={s}><rect x={43+i*86} y="87" width="80" height="23" rx="11.5" fill="white" stroke="#e4e4e7"/><text x={83+i*86} y="102">{s}</text></g>)}
      </g>
      <path d="M170 110V447" stroke="#a7f3d0" strokeWidth="1" strokeDasharray="3 6"/>
      {paths.map((d,i)=><g key={d}>
        <m.path d={d} fill="#34d399" filter={`url(#${uid}-glow)`} animate={{opacity:active===i?.3:0}} transition={{duration:reduced?0:.8}}/>
        <m.path d={d} animate={{fill:active>=i?`url(#${uid}-on)`:`url(#${uid}-off)`,stroke:active===i?"#059669":active>i?"#6ee7b7":"#d4d4d8",opacity:active===i?1:active>i?.55:.7}} strokeWidth="1.2" transition={{duration:reduced?0:.7}}/>
        <m.ellipse {...ellipses[i]} animate={{fill:active===i?"#d1fae5":"#fafafa",stroke:active===i?"#10b981":"#d4d4d8",opacity:active===i?1:.6}} strokeWidth="1.2" transition={{duration:reduced?0:.7}}/>
        <text x="170" y={[186,288,388][i]} textAnchor="middle" fontSize={i===2?17:22} fontWeight="600" fill={active>=i?"#065f46":"#a1a1aa"}>0{i+1}</text>
        <m.path d={`M${[286,252,211][i]} ${[183,285,383][i]}H323`} fill="none" strokeDasharray="3 4" animate={{stroke:active===i?"#10b981":"#d4d4d8"}}/>
        <circle cx="324" cy={[183,285,383][i]} r="3" fill={active===i?"#10b981":"#d4d4d8"}/>
        <m.g animate={{opacity:active===i?1:.42}} transition={{duration:reduced?0:.5}}>
          <rect x="340" y={137+i*102} width="278" height="89" rx="16" fill={active===i?"white":"transparent"} stroke={active===i?"#a7f3d0":"transparent"}/>
          <text x="355" y={156+i*102} fontSize="8.5" fontFamily="monospace" letterSpacing="1.3" fill="#059669">{stages[i].tag}</text>
          <text x="355" y={178+i*102} fontSize="17" fontWeight="500" fill="#18181b">{stages[i].title}</text>
          {stages[i].lines.map((line,j)=><text key={line} x="355" y={198+i*102+j*15} fontSize="10.5" fill="#71717a">{line}</text>)}
        </m.g>
      </g>)}
      {running && !reduced && [0,1,2].map(i=><m.circle key={`${active}-${i}`} cx={150+i*20} r="2.8" fill="#059669" initial={{cy:[119,231,335][active],opacity:0}} animate={{cy:[228,330,434][active],opacity:[0,1,1,0]}} transition={{duration:2.8,delay:i*.65,repeat:Infinity,ease:"easeInOut"}}/>)}
      <m.g animate={{opacity:active===2?1:.4}}><rect x="91" y="450" width="158" height="32" rx="16" fill="#ecfdf5" stroke="#a7f3d0"/><text x="170" y="470" textAnchor="middle" fontSize="12" fill="#047857">{en ? "Sales opportunities" : "Oportunidades de venta"}</text></m.g>
      <path d="M282 466H612Q626 466 626 452V111Q626 95 612 95H340" fill="none" stroke={active===2?"#34d399":"#e4e4e7"} strokeWidth="1.3" strokeDasharray="4 6"/>
      <path d="M348 91L340 95L348 99" fill="none" stroke={active===2?"#34d399":"#d4d4d8"}/>
      <text x="430" y="488" textAnchor="middle" fontSize="10" fill={active===2?"#059669":"#a1a1aa"}>{en ? "What we learn feeds the next improvement" : "Lo que aprendemos alimenta la siguiente mejora"}</text>
      <line x1="28" x2="612" y1="508" y2="508" stroke="#e4e4e7"/>
      <text x="28" y="529" fontSize="10" fill="#a1a1aa">{en ? "Built on your store, analytics and CRM" : "Sobre tu tienda, analítica y CRM"}</text>
      <text x="611" y="529" textAnchor="end" fontFamily="monospace" fontSize="10" fill="#059669">0{active+1} / 03</text>
    </svg>
  </div>
}
