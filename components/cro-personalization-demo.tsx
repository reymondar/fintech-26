"use client"

import { useState } from "react"
import { ArrowUpRight, SlidersHorizontal, PackageCheck } from "lucide-react"

const scenarios = [
  { name: "Primera visita", context: "Explora una categoría por primera vez", headline: "Encuentra el equipo para tu negocio.", copy: "Compara capacidad, uso y soporte para elegir por dónde empezar.", cta: "Explorar equipos", signal: "Entrada en categoría", result: "Descubrimiento de productos" },
  { name: "Vuelve a comparar", context: "Vuelve a consultar una familia de productos", headline: "Las diferencias que te ayudan a decidir.", copy: "Revisa especificaciones, instalación y garantía antes de elegir tu equipo.", cta: "Comparar modelos", signal: "Interés en la categoría", result: "Comparación de alternativas" },
  { name: "Busca asesoría", context: "Necesita resolver requisitos de su compra", headline: "Hablemos del equipo que necesitas.", copy: "Cuéntanos el uso y la capacidad que buscas. Preparemos una propuesta para tu negocio.", cta: "Solicitar asesoría", signal: "Intención de consulta", result: "Contacto con contexto comercial" },
]

export function CroPersonalizationDemo() {
  const [selected, setSelected] = useState(0)
  const active = scenarios[selected]
  return <div className="overflow-hidden rounded-[2rem] border border-emerald-200 bg-white shadow-[0_24px_70px_-40px_rgba(6,78,59,.4)]">
    <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-4 text-xs"><span className="flex items-center gap-2 font-medium text-emerald-800"><SlidersHorizontal size={15} /> Motor de personalización</span><span className="rounded-full bg-zinc-100 px-2.5 py-1 text-zinc-600">Ejemplo ilustrativo</span></div>
    <div className="p-5 sm:p-7">
      <p id="demo-segment-label" className="mb-3 text-xs font-medium text-zinc-600">Elige un contexto de compra</p>
      <div role="group" aria-labelledby="demo-segment-label" className="flex flex-wrap gap-2">{scenarios.map((s, i) => <button key={s.name} type="button" aria-pressed={selected === i} onClick={() => setSelected(i)} className={`rounded-full border px-3 py-2 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700 ${selected === i ? "border-emerald-900 bg-emerald-900 text-white" : "border-zinc-200 text-zinc-600 hover:border-emerald-500"}`}>{s.name}</button>)}</div>
      <div aria-live="polite" aria-atomic="true" className="mt-6">
        <p className="mb-4 text-xs leading-5 text-zinc-500">{active.context}</p>
        <div className="rounded-2xl bg-emerald-50 p-6 sm:p-8">
          <div className="mb-7 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.15em] text-emerald-800"><PackageCheck size={18} /> Equipamiento profesional</div>
          <p className="max-w-sm text-2xl font-medium leading-tight tracking-tight text-zinc-900 sm:text-3xl">{active.headline}</p>
          <p className="mt-4 max-w-sm text-sm leading-6 text-zinc-600">{active.copy}</p>
          <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-950 px-4 py-2.5 text-xs font-medium text-white">{active.cta}<ArrowUpRight size={14} /></span>
        </div>
        <dl className="mt-5 grid gap-4 text-xs sm:grid-cols-2"><div><dt className="text-zinc-500">Señal de ejemplo</dt><dd className="mt-1 font-medium text-zinc-800">{active.signal}</dd></div><div><dt className="text-zinc-500">Acción que observamos</dt><dd className="mt-1 font-medium text-zinc-800">{active.result}</dd></div></dl>
      </div>
      <p className="mt-5 border-t border-zinc-100 pt-4 text-[11px] leading-5 text-zinc-500">Demostración de mensajes y CTA. Las reglas, señales e integraciones se definen para cada tienda. No representa una campaña activa ni resultados de clientes.</p>
    </div>
  </div>
}
