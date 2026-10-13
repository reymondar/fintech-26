import type { Locale } from "@/lib/locale"

const products = [
  { name: "Amplitude", image: "amplitude-symbol.svg" },
  { name: "Personizely", image: "personizely-symbol.svg" },
  { name: "Shopify Plus", image: "shopify.svg" },
  { name: "Magento", image: "magento.svg" },
  { name: "PrestaShop", image: "prestashop-symbol.svg" },
  { name: "Mercado Libre", image: "mercado-libre-symbol.png" },
  { name: "Meta", image: "meta.svg" },
  { name: "GEO Metrics", image: "geo-metrics-symbol.png" },
  { name: "Microsoft Clarity", image: "clarity.ico" },
  { name: "AWS", image: "aws.svg" },
]

export function TechnologyLogos({ locale }: { locale: Locale }) {
  return (
    <section aria-labelledby="technology-logos-title" className="py-6 sm:py-8 px-4 ">
      <div className="mx-auto max-w-6xl border-y border-zinc-200/70 py-8 sm:py-10">
        <h2 id="technology-logos-title" className="mb-7 text-center text-xs font-medium uppercase tracking-[0.16em] text-zinc-500 sm:mb-8">
          {locale === "en" ? "Technology we work with" : "Tecnología con la que trabajamos"}
        </h2>
        <div role="region" aria-labelledby="technology-logos-title" tabIndex={0} className="overflow-x-auto rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-600">
          <ul className="flex w-max min-w-full items-center justify-between gap-4 px-2 py-2 sm:px-4 lg:gap-8">
            {products.map((product) => (
              <li key={product.name} title={product.name} className="flex h-12 w-12 shrink-0 items-center justify-center opacity-75 grayscale">
                <img
                  src={`/technology-logos/${product.image}`}
                  alt={product.name}
                  width={40}
                  height={40}
                  loading="lazy"
                  decoding="async"
                  className="h-10 w-10 object-contain"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
