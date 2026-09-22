import { headers } from "next/headers"
import type React from "react"
import type { Metadata } from "next"
import { Manrope, Bricolage_Grotesque, Instrument_Sans } from "next/font/google"
import { PrivacyControls } from "@/components/privacy-controls"
import { MotionProvider } from "@/components/motion-provider"
import "./globals.css"

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
})

const calSans = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-cal-sans",
  display: "swap",
})

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  display: "swap",
})

const SITE_URL = "https://thestackhouse.io"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Visibilidad en IA para ecommerce | The Stack House",
    template: "%s — The Stack House",
  },
  description: "Ayudamos a tu ecommerce a aparecer en recomendaciones de IA y convertir ese interés en ventas. Catálogo, contenido, autoridad y conversión.",
  authors: [{ name: "Ramón Arana", url: SITE_URL }],
  icons: {
    icon: "/logo-stackhouse.png",
    apple: "/logo-stackhouse.png",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: SITE_URL,
    siteName: "The Stack House",
    title: "The Stack House — IA y conversión para ecommerce",
    description: "Trabajamos tu catálogo, contenido y autoridad para ganar presencia en la IA, y mejoramos tu tienda para convertir ese interés en ventas.",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "The Stack House — IA y conversión para ecommerce",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Stack House — IA y conversión para ecommerce",
    description: "Ayudamos a tu ecommerce a ganar presencia en la IA y convertir ese interés en ventas.",
    images: ["/og-default.png"],
  },
  alternates: {
    canonical: SITE_URL,
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const privatePage = (await headers()).get("x-sh-private") === "1"
  const locale = (await headers()).get("x-sh-locale") === "en" ? "en" : "es"
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${manrope.variable} ${calSans.variable} ${instrumentSans.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "@id": `${SITE_URL}/#organization`,
                name: "The Stack House",
                url: SITE_URL,
                logo: {
                  "@type": "ImageObject",
                  url: `${SITE_URL}/logo-stackhouse.png`,
                },
                contactPoint: {
                  "@type": "ContactPoint",
                  contactType: "sales",
                  email: "contact@thestackhouse.io",
                  url: `${SITE_URL}/contacto`,
                  availableLanguage: ["Spanish", "English"],
                },
                description:
                  locale === "en" ? "The Stack House helps online stores gain visibility in AI recommendations and turn interest into sales through catalog, content, authority, conversion and sales tracking." : "The Stack House ayuda a ecommerce a ganar presencia en recomendaciones de IA y convertir ese interés en ventas mediante catálogo, contenido, autoridad, conversión y seguimiento comercial.",
                knowsAbout: [
                  "Generative Engine Optimization",
                  "AI visibility",
                  "Share of Model",
                  "GEO",
                  "AEO",
                  "SEO",
                  "Ecommerce personalization",
                  "Sales automation",
                  "ChatGPT brand mentions",
                  "Perplexity citations",
                ],
                sameAs: ["https://www.linkedin.com/company/the-stack-house/"],
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "@id": `${SITE_URL}/#website`,
                url: SITE_URL,
                name: "The Stack House",
                publisher: { "@id": `${SITE_URL}/#organization` },
                inLanguage: ["es", "en"],
              },
              {
                "@context": "https://schema.org",
                "@type": "Person",
                "@id": `${SITE_URL}/#ramon-arana`,
                name: "Ramón Arana",
                jobTitle: locale === "en" ? "Founder" : "Fundador",
                url: SITE_URL,
                worksFor: { "@id": `${SITE_URL}/#organization` },
              },
            ]),
          }}
        />
        <div className="noise-overlay" aria-hidden="true" />
        <MotionProvider>{children}</MotionProvider>
        {!privatePage && <PrivacyControls locale={locale} />}
      </body>
    </html>
  )
}
