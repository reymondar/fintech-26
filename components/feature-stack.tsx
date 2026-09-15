"use client"

import { Radar, ShoppingBag, Workflow, Globe2, ChartNoAxesCombined, MousePointer2 } from "lucide-react"
import { useTranslation } from "@/components/locale-provider"

export function FeatureStack() {
  const { locale } = useTranslation()
  const en = locale === "en"
  const features = [
    { icon: Workflow, title: en ? "Connected sales." : "Ventas conectadas.", description: en ? "From inquiry to your CRM." : "De la consulta a tu CRM.", position: "min-[900px]:col-start-1 min-[900px]:row-start-1" },
    { icon: Radar, title: en ? "AI visibility." : "Presencia en IA.", description: en ? "Get into the conversation." : "Entra en la conversación.", position: "min-[900px]:col-start-2 min-[900px]:row-start-2" },
    { icon: ShoppingBag, title: en ? "A clearer catalog." : "Catálogo claro.", description: en ? "Make choosing easier." : "Facilita la elección.", position: "min-[900px]:col-start-2 min-[900px]:row-start-1" },
    { icon: ChartNoAxesCombined, title: en ? "Measurable impact." : "Impacto medible.", description: en ? "Track visits and sales." : "Mide visitas y ventas.", position: "min-[900px]:col-start-4 min-[900px]:row-start-2" },
    { icon: Globe2, title: en ? "Personalization." : "Personalización.", description: en ? "Adapt to each shopper." : "Adáptate a cada cliente.", position: "min-[900px]:col-start-4 min-[900px]:row-start-1" },
    { icon: MousePointer2, title: en ? "Better conversion." : "Mejor conversión.", description: en ? "Clear the path to purchase." : "Despeja el camino a la compra.", position: "min-[900px]:col-start-5 min-[900px]:row-start-1" },
  ]

  return (
    <section id="stack-house" aria-label={en ? "The Stack House advantages" : "Lo que aporta The Stack House"} className="my-6 px-0 py-6 sm:py-8 scroll-mt-24">
      <div className="mx-auto grid max-w-[1280px] grid-cols-2 items-stretch gap-3 xl:gap-4 min-[900px]:grid-cols-[1fr_1fr_1.06fr_1fr_1fr] min-[900px]:grid-rows-[156px_156px_40px] xl:grid-rows-[172px_172px_48px]">
        <div className="relative col-span-2 flex min-h-36 rounded-[28px] items-center justify-center min-[900px]:col-span-1 min-[900px]:col-start-3 min-[900px]:row-span-3 min-[900px]:row-start-1 min-[900px]:items-end min-[900px]:pb-12">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[28px]" style={{ padding: 1, background: "linear-gradient(0deg, rgba(5,150,105,.55), rgba(16,185,129,.12) 28%, transparent 75%)", mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", maskComposite: "exclude" }} />
          <div className="absolute inset-x-4 bottom-8 h-32 rounded-full bg-emerald-400/10 blur-3xl" aria-hidden="true" />
          <div className="relative flex h-24 w-24 items-center justify-center sm:h-28 sm:w-28">
            <img src="/logo-stackhouse.png" alt="The Stack House" className="h-16 w-16 object-contain sm:h-20 sm:w-20" />
          </div>
        </div>
        {features.map(({ icon: Icon, title, description, position }, index) => (
          <article key={title} className={`relative overflow-hidden rounded-[24px] p-4 xl:p-5 ${position}`} style={{ background: `linear-gradient(${index < 3 ? 225 : 135}deg, rgba(16,185,129,${index % 2 ? ".065" : ".035"}), rgba(255,255,255,.3) 45%, transparent 85%)` }}>
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[24px]" style={{ padding: 1, background: `linear-gradient(${index < 3 ? 225 : 135}deg, rgba(5,150,105,${index % 2 ? ".48" : ".26"}), rgba(16,185,129,.07) 35%, rgba(16,185,129,.015) 70%, transparent)`, mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", maskComposite: "exclude" }} />
            <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50"><Icon className="h-5 w-5 text-emerald-600" aria-hidden="true" /></div>
            <h3 className="text-base min-[900px]:text-sm xl:text-lg font-semibold leading-tight tracking-tight text-zinc-900">{title}</h3>
            <p className="mt-1 text-sm min-[900px]:text-xs xl:text-base leading-snug tracking-tight text-zinc-500">{description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
