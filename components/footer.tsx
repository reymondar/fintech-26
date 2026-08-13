"use client"

import { m, useInView } from "framer-motion"
import { useRef } from "react"

export function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <footer ref={ref} className="border-t border-zinc-200 bg-zinc-100">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <m.div
          initial={{ opacity: 1, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-8"
        >
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a href="/" className="flex items-center gap-2 mb-4">
              <img src="/logo-stackhouse.png" alt="The Stack House" className="w-6 h-6 object-contain" />
              <span className="font-semibold text-zinc-900 tracking-wide text-sm uppercase">The Stack House</span>
            </a>
            <p className="text-sm text-zinc-500">
              Hacemos tu negocio legible, confiable y elegible para la IA.
            </p>
          </div>

          {/* Sitio */}
          <div>
            <h4 className="text-sm font-semibold text-zinc-900 mb-4">Sitio</h4>
            <ul className="space-y-3">
              <li>
                <a href="/#how-it-works" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">
                  Cómo funciona
                </a>
              </li>
              <li>
                <a href="/services" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">
                  Servicios
                </a>
              </li>
              <li>
                <a href="/blog" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="https://calendar.app.google/aGDRM9XzkQFEndG77" target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">
                  Agenda tu diagnóstico
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-sm font-semibold text-zinc-900 mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:hello@thestackhouse.com"
                  className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
                >
                  hello@thestackhouse.com
                </a>
              </li>
            </ul>
          </div>
        </m.div>

        {/* Bottom */}
        <m.div
          initial={{ opacity: 1 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 pt-8 border-t border-zinc-200 flex items-center justify-center"
        >
          <p className="text-sm text-zinc-500">&copy; {new Date().getFullYear()} The Stack House. Todos los derechos reservados.</p>
        </m.div>
      </div>
    </footer>
  )
}
