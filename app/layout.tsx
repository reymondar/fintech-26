import type React from "react"
import type { Metadata } from "next"
import { Manrope, Bricolage_Grotesque, Instrument_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script"
import "./globals.css"

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
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

export const metadata: Metadata = {
  title: "The Stack House — Visibilidad en IA | Sé la empresa que ChatGPT recomienda",
  description: "The Stack House hace visible tu empresa en ChatGPT, Gemini, Perplexity y Claude. Diagnóstico honesto de por qué cae tu tráfico, cuánto es atribuible a la IA y qué hacer para recuperar la posición. Diagnóstico en vivo gratis de 20 minutos.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${manrope.variable} ${calSans.variable} ${instrumentSans.variable} font-sans antialiased`}>
        <Script
          src="https://llmometrics.b-cdn.net/metric.js"
          data-token="a30d724c-4b4f-476a-af6a-43311f3cef84"
          strategy="afterInteractive"
        />
        <div className="noise-overlay" aria-hidden="true" />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
