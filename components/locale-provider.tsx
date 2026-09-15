"use client"

import { createContext, useContext, type ReactNode } from "react"
import type { Locale } from "@/lib/locale"
import { translate } from "@/lib/translate"

const LocaleContext = createContext<Locale>("es")

export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
}

export function useTranslation() {
  const locale = useContext(LocaleContext)
  return {
    locale,
    t: (text: string) => translate(locale, text),
    localizeHref: (path: string) => path === "/" || path.startsWith("/#") ? `/${locale}${path.slice(1)}` : path,
  }
}
