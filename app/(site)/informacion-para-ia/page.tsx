import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LocaleProvider } from "@/components/locale-provider"
import {
  COMPANY_URL, COMPANY_INFORMATION_URL, COMPANY_INFORMATION_TITLE,
  COMPANY_INFORMATION_DESCRIPTION, COMPANY_INFORMATION_DATE, COMPANY_INFORMATION_INTRO,
  companyFacts, companySections, companyLinks,
} from "@/lib/company-information"

export const metadata: Metadata = {
  title: { absolute: COMPANY_INFORMATION_TITLE },
  description: COMPANY_INFORMATION_DESCRIPTION,
  alternates: { canonical: COMPANY_INFORMATION_URL },
  openGraph: {
    title: COMPANY_INFORMATION_TITLE, description: COMPANY_INFORMATION_DESCRIPTION,
    url: COMPANY_INFORMATION_URL, type: "website", locale: "es_ES", siteName: "The Stack House",
    images: [{ url: "/branding/social-card.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: COMPANY_INFORMATION_TITLE, description: COMPANY_INFORMATION_DESCRIPTION, images: ["/branding/social-card.png"] },
}

export default function CompanyInformationPage() {
  return (
    <LocaleProvider locale="es">
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "AboutPage",
        "@id": `${COMPANY_INFORMATION_URL}#webpage`, url: COMPANY_INFORMATION_URL,
        name: COMPANY_INFORMATION_TITLE, description: COMPANY_INFORMATION_DESCRIPTION,
        inLanguage: "es", datePublished: COMPANY_INFORMATION_DATE,
        about: { "@id": `${COMPANY_URL}/#organization` },
        mainEntity: { "@id": `${COMPANY_URL}/#organization` },
        isPartOf: { "@id": `${COMPANY_URL}/#website` },
        publisher: { "@id": `${COMPANY_URL}/#organization` },
      }).replace(/</g, "\\u003c") }} />
      <main id="main-content" className="min-h-screen bg-zinc-50 px-5 pb-24 pt-36 sm:px-8 sm:pt-44">
        <article className="mx-auto max-w-4xl">
          <header className="max-w-3xl">
            <p className="mb-5 text-xs font-medium uppercase tracking-[.18em] text-emerald-700">La empresa, en detalle</p>
            <h1 className="text-4xl font-medium leading-tight tracking-tight text-zinc-900 sm:text-6xl">{COMPANY_INFORMATION_TITLE}</h1>
            <p className="mt-6 text-base leading-8 text-zinc-600 sm:text-lg">{COMPANY_INFORMATION_INTRO}</p>
            <p className="mt-5 text-sm text-zinc-500">Publicado el <time dateTime={COMPANY_INFORMATION_DATE}>19 de octubre de 2026</time></p>
          </header>

          <nav aria-label="Contenido de esta página" className="my-10 rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8">
            <p className="mb-4 text-sm font-semibold text-zinc-900">En esta página</p>
            <ul className="grid gap-3 text-sm sm:grid-cols-2">
              <li><a href="#informacion-general" className="text-emerald-800 underline-offset-4 hover:underline">Información general</a></li>
              {companySections.map(s => <li key={s.id}><a href={`#${s.id}`} className="text-emerald-800 underline-offset-4 hover:underline">{s.title}</a></li>)}
            </ul>
          </nav>

          <section id="informacion-general" aria-labelledby="general-title" className="scroll-mt-28 py-6">
            <h2 id="general-title" className="mb-6 text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl">Información general</h2>
            <dl className="divide-y divide-zinc-200 rounded-2xl border border-zinc-200 bg-white px-6 sm:px-8">
              {companyFacts.map(f => <div key={f.label} className="grid gap-2 py-5 sm:grid-cols-[11rem_1fr] sm:gap-6">
                <dt className="text-sm font-medium text-zinc-900">{f.label}</dt>
                <dd className="min-w-0 break-words text-sm leading-7 text-zinc-600">{f.href ? <a href={f.href} className="text-emerald-800 underline underline-offset-4">{f.value}</a> : f.value}</dd>
              </div>)}
            </dl>
          </section>

          {companySections.map(s => <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="scroll-mt-28 border-b border-zinc-200 py-10 last:border-0">
            <h2 id={`${s.id}-title`} className="mb-5 text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl">{s.title}</h2>
            <div className="space-y-4 text-base leading-8 text-zinc-600">{s.paragraphs.map(p => <p key={p}>{p}</p>)}</div>
            {s.items && <div className="mt-7 space-y-7">{s.items.map(item => <div key={item.title}>
              <h3 className="mb-2 text-lg font-semibold text-zinc-900">{item.title}</h3>
              <p className="text-base leading-8 text-zinc-600">{item.body}</p>
            </div>)}</div>}
            {s.id === "servicios" && <a href="/servicios?lang=es" className="mt-6 inline-block text-sm font-medium text-emerald-800 underline underline-offset-4">Ver los servicios en detalle →</a>}
            {s.id === "fuentes" && <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm">{companyLinks.map(l => <li key={l.href}><a href={l.href} className="text-emerald-800 underline underline-offset-4">{l.label}</a></li>)}</ul>}
          </section>)}

          <aside aria-labelledby="contact-title" className="mt-12 rounded-2xl bg-emerald-950 p-7 text-white sm:p-10">
            <h2 id="contact-title" className="text-2xl font-medium tracking-tight">Revisemos tu ecommerce.</h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-emerald-100">Comparte tu tienda para evaluar oportunidades y definir el alcance del trabajo. La revisión inicial no tiene costo ni compromiso.</p>
            <a href="/auditoria?lang=es" className="mt-6 inline-flex rounded-full bg-white px-6 py-3 text-sm font-medium text-emerald-950 transition-colors hover:bg-emerald-100">Solicitar una revisión →</a>
          </aside>
        </article>
      </main>
      <Footer />
    </LocaleProvider>
  )
}
