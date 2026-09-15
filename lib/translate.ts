import { english } from "@/lib/landing-en"
import type { Locale } from "@/lib/locale"

export function translate(locale: Locale, text: string): string {
  return locale === "en" ? (english[text] ?? text) : text
}
