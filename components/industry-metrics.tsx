import type { Locale } from "@/lib/locale"

const adobeSource = "https://business.adobe.com/blog/ai-traffic-surge-retail-sites-not-machine-readable"
const mckinseySource = "https://www.mckinsey.com/featured-insights/mckinsey-explainers/what-is-personalization"

export function IndustryMetrics({ locale }: { locale: Locale }) {
  const en = locale === "en"
  const metrics = [
    {
      value: "+42%",
      sign: "+",
      amount: "42",
      label: en ? "Higher conversion from AI traffic" : "Mayor conversión del tráfico IA",
      context: en ? "Compared with non-AI traffic. US retail, March 2026." : "Frente al tráfico no IA. Retail de EE. UU., marzo de 2026.",
      source: "Adobe · 2026",
      href: adobeSource,
    },
    {
      value: "−50%",
      sign: "−",
      amount: "50",
      label: en ? "Up to half the acquisition cost with personalization" : "Hasta la mitad del coste de captación con personalización",
      context: en ? "Potential reduction in customer acquisition costs." : "Reducción potencial del coste de adquisición de clientes.",
      source: "McKinsey · 2023",
      href: mckinseySource,
    },
    {
      value: "+10–30%",
      sign: "+",
      amount: "10–30",
      label: en ? "Marketing ROI with hyper personalization" : "ROI de marketing con personalización",
      context: en ? "Potential increase in marketing ROI." : "Incremento potencial del ROI de marketing.",
      source: "McKinsey · 2023",
      href: mckinseySource,
    },
  ]

  return (
    <section id="industry-metrics-title" aria-label={en ? "Industry research" : "Estudios del sector"} className="mx-auto mb-10 w-full max-w-3xl scroll-mt-24">
      <div className="grid grid-cols-1 gap-7 sm:grid-cols-3 sm:gap-6">
        {metrics.map((metric) => (
          <div key={metric.value} className="flex min-w-0 flex-col items-center gap-2 text-center">
            <span aria-label={metric.value} className="inline-flex items-baseline justify-center whitespace-nowrap font-medium leading-none text-emerald-600">
              <span aria-hidden="true" className="mr-1 self-start pt-1 text-xl sm:text-lg lg:text-xl">{metric.sign}</span>
              <span aria-hidden="true" className="text-5xl tracking-tight sm:text-4xl lg:text-5xl">{metric.amount}</span>
              <span aria-hidden="true" className="ml-0.5 text-2xl sm:text-xl lg:text-2xl">%</span>
            </span>
            <p className="max-w-60 text-sm font-medium leading-snug text-emerald-700 sm:max-w-52">
              {metric.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
