export type Locale = "es" | "en"
export const LOCALE_COOKIE = "sh_locale"

// Spain plus Latin America, including Brazil and the Latin Caribbean.
export const SPANISH_COUNTRIES = new Set([
  "ES", "MX", "GT", "BZ", "HN", "SV", "NI", "CR", "PA",
  "CU", "DO", "PR", "HT", "AR", "BO", "BR", "CL", "CO",
  "EC", "PY", "PE", "UY", "VE", "GY", "SR", "GF", "GP", "MQ", "BL", "MF",
])

export function isLocale(value: string | undefined | null): value is Locale {
  return value === "es" || value === "en"
}

export function detectLocale(country: string | null, preference?: string, acceptLanguage = ""): Locale {
  if (isLocale(preference)) return preference
  const code = country?.trim().toUpperCase()
  if (code && /^[A-Z]{2}$/.test(code) && code !== "XX" && code !== "ZZ") {
    return SPANISH_COUNTRIES.has(code) ? "es" : "en"
  }
  const languages = acceptLanguage.split(",").map((entry, index) => {
    const [tag, ...params] = entry.trim().split(";")
    const quality = params.find(p => p.trim().startsWith("q="))
    const q = quality ? Number(quality.trim().slice(2)) : 1
    return { tag: tag.toLowerCase(), q, index }
  }).filter(({ q }) => Number.isFinite(q) && q > 0 && q <= 1)
    .sort((a, b) => b.q - a.q || a.index - b.index)
  // When country is unavailable, use the browser's top language; all others map to English.
  return languages[0]?.tag.split("-")[0] === "es" ? "es" : "en"
}
