"use client"

import { usePathname } from "next/navigation"
import { LOCALE_COOKIE, type Locale } from "@/lib/locale"
import { useTranslation } from "@/components/locale-provider"

export function LanguageSwitcher() {
  const pathname = usePathname()
  const { locale } = useTranslation()
  const flowPage = ["/auditoria", "/servicios"].includes(pathname)
  if (!["/", "/es", "/en"].includes(pathname) && !flowPage) return null

  function remember(next: Locale) {
    const secure = window.location.protocol === "https:" ? "; Secure" : ""
    document.cookie = `${LOCALE_COOKIE}=${next}; Path=/; Max-Age=31536000; SameSite=Lax${secure}`
    const target = new URL(window.location.href)
    if (flowPage) target.searchParams.set("lang", next)
    else target.pathname = `/${next}`
    window.location.assign(target.toString())
  }

  return (
    <div role="group" aria-label={locale === "es" ? "Idioma" : "Language"} className="inline-flex shrink-0 rounded-full border border-zinc-200 bg-white/80 p-1">
      {(["es", "en"] as const).map(next => (
        <a key={next} href={flowPage ? `${pathname}?lang=${next}` : `/${next}`} lang={next} hrefLang={next}
          aria-label={next === "es" ? "Español" : "English"}
          aria-current={locale === next ? "page" : undefined}
          onClick={event => { if (!event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey && event.button === 0) { event.preventDefault(); remember(next) } }}
          className={`rounded-full px-2.5 py-2 text-xs font-semibold transition-colors ${locale === next ? "bg-zinc-900 text-white" : "text-zinc-500 hover:text-zinc-900"}`}>
          {next.toUpperCase()}
        </a>
      ))}
    </div>
  )
}
