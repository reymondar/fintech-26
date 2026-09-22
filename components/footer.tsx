"use client"

import { useTranslation } from "@/components/locale-provider"

import { m, useInView } from "framer-motion"
import { useRef } from "react"

export function Footer() {
  const { t, locale, localizeHref } = useTranslation()

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
            <a href={localizeHref("/")} className="flex items-center gap-2 mb-4">
              <img src="/logo-stackhouse.png" alt={t("The Stack House")} className="w-6 h-6 object-contain" />
              <span className="font-semibold text-zinc-900 tracking-wide text-sm uppercase">{t("The Stack House")}</span>
            </a>
            <p className="text-sm text-zinc-500"> {t("Ayudamos a tu ecommerce a aparecer en la IA y convertir ese interés en ventas.")} </p>
          </div>

          {/* Sitio */}
          <div>
            <h4 className="text-sm font-semibold text-zinc-900 mb-4">{t("Sitio")}</h4>
            <ul className="space-y-3">
              <li>
                <a href={localizeHref("/#how-it-works")} className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors"> {t("Cómo funciona")} </a>
              </li>
              <li>
                <a href={localizeHref("/servicios")} className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors"> {t("Servicios")} </a>
              </li>
              <li>
                <a href="/blog" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors"> {t("Blog")} </a>
              </li>
              <li>
                <a href="/contacto" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors"> {t("Contacto")}{locale === "en" ? " (ES)" : ""} </a>
              </li>
              <li>
                <a href={localizeHref("/auditoria")} className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors"> {t("Revisemos tu ecommerce")} </a>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-sm font-semibold text-zinc-900 mb-4">{t("Contacto")}</h4>
            <ul className="space-y-3">
              <li><a href="https://www.linkedin.com/company/the-stack-house/" target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-500 transition-colors hover:text-zinc-900">LinkedIn · The Stack House</a></li>
              <li>
                <a
                  href="mailto:contact@thestackhouse.io"
                  className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
                > {t("contact@thestackhouse.io")} </a>
              </li>
            </ul>
          </div>
        </m.div>

        <nav aria-label={locale === "en" ? "Legal information" : "Información legal"} className="mt-8 flex flex-wrap gap-5 text-sm text-zinc-500">
          <a href="/aviso-legal" className="transition-colors hover:text-zinc-900">{locale === "en" ? "Legal notice (ES)" : "Aviso legal"}</a>
          <a href="/privacidad" className="transition-colors hover:text-zinc-900">{locale === "en" ? "Privacy policy (ES)" : "Política de privacidad"}</a>
        </nav>
        {/* Bottom */}
        <m.div
          initial={{ opacity: 1 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 pt-8 border-t border-zinc-200 flex items-center justify-center"
        >
          <p className="text-sm text-zinc-500">{t("©")} {new Date().getFullYear()} {t("The Stack House. Todos los derechos reservados.")}</p>
        </m.div>
      </div>
    </footer>
  )
}
