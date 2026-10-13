import type { Locale } from "@/lib/locale"

// +42% source: Adobe, US retail, March 2026 vs. non-AI traffic; not a Stack House result.
// https://business.adobe.com/blog/ai-traffic-surge-retail-sites-not-machine-readable

export function IndustryMetrics({ locale }: { locale: Locale }) {
  const en = locale === "en"
  const metrics = [
    { value: "14", label: en ? "Countries we work in" : "Países de LATAM" },
    { value: "+80", label: en ? "Stores audited" : "Tiendas auditadas" },
    { value: "+42%", label: en ? "Higher conversion from AI traffic" : "Mayor conversión del tráfico IA" },
  ]

  return (
    <section aria-label={en ? "Our reach and AI commerce data" : "Nuestro alcance y datos de comercio con IA"} className="mx-auto mt-6 w-full max-w-md lg:mx-0">
      <div className="grid grid-cols-3 gap-4 sm:gap-6">
        {metrics.map((metric) => (
          <div key={metric.label} className="flex min-w-0 flex-col gap-1 text-left">
            <span className="text-2xl font-medium leading-none tracking-tight text-emerald-700">
              {metric.value}
            </span>
            <p className="text-[11px] leading-snug text-emerald-700 sm:text-xs">
              {metric.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
