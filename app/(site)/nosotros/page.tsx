import type { Metadata } from "next"
import { headers } from "next/headers"
import { LocaleProvider } from "@/components/locale-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import s from "./page.module.css"

async function getLocale() { return (await headers()).get("x-sh-locale") === "en" ? "en" : "es" }
export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  return {
    title: { absolute: locale === "en" ? "About us | The Stack House" : "Sobre nosotros | The Stack House" },
    description: locale === "en" ? "From software and product development to ecommerce visibility, conversion and business analytics. Meet The Stack House." : "Del desarrollo de software y producto a la visibilidad, conversión y analítica para ecommerce. Conoce The Stack House.",
    alternates: { canonical: `https://thestackhouse.io/nosotros?lang=${locale}`, languages: { es: "https://thestackhouse.io/nosotros?lang=es", en: "https://thestackhouse.io/nosotros?lang=en" } },
  }
}
export default async function AboutPage() {
  const locale = await getLocale()
  const en = locale === "en"
  return <LocaleProvider locale={locale}>
    <Navbar />
    <main className={s.about}>
      <header className={s.hero}>
        <img src="/branding/stackhouse-logo.png" alt="The Stack House" width={240} height={240} className={s.logo} />
        <p className={s.eyebrow}>{en ? "ABOUT US" : "SOBRE NOSOTROS"}</p>
        <h1>THE STACK HOUSE</h1>
        <p className={s.lead}>{en ? "We put your business on the map. And connect that visibility to sales." : "Ponemos tu empresa en el mapa. Y conectamos esa visibilidad con ventas."}</p>
      </header>
      <section className={s.story}>
        <h2>{en ? "Built in software. Focused on your business." : "Nacimos en el software. Nos enfocamos en tu negocio."}</h2>
        <div><p>{en ? "We started in software development, product and analytics. Working with AI and automation taught us how to structure, connect and activate information. That foundation led us to data analysis and web visibility: helping businesses get found and turn demand into commercial opportunities." : "Nacimos en el desarrollo de software, producto y analítica. El trabajo con inteligencia artificial y automatizaciones nos enseñó a estructurar, conectar y aprovechar la información. Esa base nos llevó al análisis de datos y la visibilidad web: ayudar a las empresas a ser encontradas y convertir esa demanda en oportunidades comerciales."}</p>
        <p>{en ? "Today we work with ecommerce and B2B businesses on catalog architecture, SEO/GEO, product data, CRO and business analytics. We implement improvements on existing platforms and, where appropriate, add segment-based campaigns with our own personalization engine." : "Hoy trabajamos con ecommerce y negocios B2B en arquitectura de catálogo, SEO/GEO, datos de producto, CRO y analítica comercial. Implementamos mejoras sobre las plataformas existentes y, cuando encaja, sumamos campañas por segmento con nuestro motor propio de personalización."}</p></div>
      </section>
      <div className={s.experience}>
        <p>{en ? "OUR TEAM'S EXPERIENCE" : "EXPERIENCIA DE NUESTRO EQUIPO"}</p>
        <div><strong>15+</strong><span>{en ? "years in SEO" : "años en SEO"}</span></div>
        <div><strong>8+</strong><span>{en ? "years in data-driven marketing and analytics" : "años en marketing de datos y analítica"}</span></div>
      </div>
      <section className={s.beliefs} aria-label={en ? "Our philosophy and mission" : "Nuestra filosofía y misión"}>
        <div><p className={s.eyebrow}>{en ? "OUR PHILOSOPHY" : "NUESTRA FILOSOFÍA"}</p><h2>{en ? "Build. Measure. Improve." : "Construir. Medir. Mejorar."}</h2><p>{en ? "We bring a product mindset to ecommerce: understand the buyer, work on a specific opportunity and test what changes. We connect visibility, buying experience and business data so decisions go beyond traffic or mentions. We work with your team and leave implemented improvements, clear measurement and a next priority." : "Llevamos la mentalidad de producto al ecommerce: entender al comprador, trabajar sobre una oportunidad concreta y comprobar qué cambia. Conectamos visibilidad, experiencia de compra y datos del negocio para decidir más allá del tráfico o las menciones. Trabajamos con tu equipo y dejamos mejoras implementadas, medición clara y una próxima prioridad."}</p></div>
        <div><p className={s.eyebrow}>{en ? "OUR MISSION" : "NUESTRA MISIÓN"}</p><h2>{en ? "The reach your business deserves." : "El alcance que tu empresa merece."}</h2><p>{en ? "We put businesses with valuable products on the map, making them easier to find, understand and choose. In search engines, in AI answers and in the store itself. Our goal is to turn that visibility into qualified opportunities, sales and profitable customer relationships." : "Ponemos en el mapa a las empresas con productos valiosos para que sean más fáciles de encontrar, entender y elegir. En buscadores, en respuestas de IA y dentro de su tienda. Nuestro objetivo es convertir esa visibilidad en oportunidades calificadas, ventas y relaciones rentables con sus clientes."}</p></div>
      </section>
      <div className={s.aboutLinks}><a href={`/servicios?lang=${locale}`}>{en ? "Explore our services" : "Conoce nuestros servicios"} ↗</a><a href="mailto:contact@thestackhouse.io">{en ? "Let's talk" : "Hablemos"} ↗</a></div>
    </main>
    <Footer />
  </LocaleProvider>
}
