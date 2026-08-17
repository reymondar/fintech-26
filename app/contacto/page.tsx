import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/contact-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contacto — The Stack House",
  description: "Hablemos. Contanos qué está pasando con tu visibilidad en IA y te decimos cómo podemos ayudar.",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-32 pb-24 px-4">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="mb-16">
            <p className="text-xs font-medium tracking-widest text-zinc-400 uppercase mb-3">The Stack House</p>
            <h1 className="font-display text-4xl font-bold text-zinc-900 tracking-tight">Contacto</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

            {/* Left — copy */}
            <div>
              <p className="text-[15px] leading-relaxed text-zinc-600 mb-10">
                Si tu empresa está perdiendo visibilidad en la nueva búsqueda, o nunca la tuvo, podemos hacer un diagnóstico honesto de 20 minutos sin costo.
              </p>

              <div className="space-y-8">
                <div>
                  <p className="text-xs font-semibold tracking-widest uppercase text-zinc-400 mb-1">Email</p>
                  <a
                    href="mailto:hello@thestackhouse.com"
                    className="text-sm text-zinc-900 hover:text-zinc-500 transition-colors"
                  >
                    hello@thestackhouse.com
                  </a>
                </div>

                <div>
                  <p className="text-xs font-semibold tracking-widest uppercase text-zinc-400 mb-1">Diagnóstico rápido</p>
                  <a
                    href="https://calendar.app.google/aGDRM9XzkQFEndG77"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-zinc-900 hover:text-zinc-500 transition-colors"
                  >
                    Agenda 20 minutos →
                  </a>
                </div>

                <div className="pt-8 border-t border-zinc-100">
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Respondemos en menos de 24 horas hábiles. Si tu caso es urgente, usá el link de agenda directamente.
                  </p>
                </div>
              </div>
            </div>

            {/* Right — form */}
            <ContactForm />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
