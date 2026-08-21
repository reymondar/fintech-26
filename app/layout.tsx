import type React from "react"
import type { Metadata } from "next"
import { Manrope, Bricolage_Grotesque, Instrument_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script"
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
    default: "The Stack House — Visibilidad en IA | Sé la empresa que ChatGPT recomienda",
    template: "%s — The Stack House",
  },
  description: "The Stack House hace visible tu empresa en ChatGPT, Gemini, Perplexity y Claude. Diagnóstico honesto de por qué cae tu tráfico, cuánto es atribuible a la IA y qué hacer para recuperar la posición. Diagnóstico en vivo gratis de 20 minutos.",
  icons: {
    icon: "/logo-stackhouse.png",
    apple: "/logo-stackhouse.png",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: SITE_URL,
    siteName: "The Stack House",
    title: "The Stack House — Visibilidad en IA",
    description: "Hacemos que tu empresa aparezca cuando sus compradores preguntan a ChatGPT, Gemini, Perplexity o Claude. Diagnóstico en vivo gratuito de 20 minutos.",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "The Stack House — Visibilidad en IA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Stack House — Visibilidad en IA",
    description: "Hacemos que tu empresa aparezca cuando sus compradores preguntan a ChatGPT, Gemini, Perplexity o Claude.",
    images: ["/og-default.png"],
  },
  alternates: {
    canonical: SITE_URL,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NSRBC7Q5');`,
          }}
        />
        <Script
          id="clarity-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "y1a1pnj417");`,
          }}
        />
      </head>
      <body className={`${manrope.variable} ${calSans.variable} ${instrumentSans.variable} font-sans antialiased`}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NSRBC7Q5"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
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
                  url: `${SITE_URL}/contacto`,
                  availableLanguage: ["Spanish", "English"],
                },
                description:
                  "Consultoría de visibilidad en IA (GEO/AEO). Hacemos que las empresas aparezcan cuando sus compradores preguntan a ChatGPT, Gemini, Perplexity o Claude.",
                knowsAbout: [
                  "Generative Engine Optimization",
                  "AI visibility",
                  "Share of Model",
                  "GEO",
                  "AEO",
                  "SEO",
                  "ChatGPT brand mentions",
                  "Perplexity citations",
                ],
                sameAs: [],
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "@id": `${SITE_URL}/#website`,
                url: SITE_URL,
                name: "The Stack House",
                publisher: { "@id": `${SITE_URL}/#organization` },
                inLanguage: "es",
              },
            ]),
          }}
        />
        <div className="noise-overlay" aria-hidden="true" />
        <MotionProvider>{children}</MotionProvider>
        <Analytics />
      </body>
    </html>
  )
}
