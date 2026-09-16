export const CONTACT_EMAIL = "contact@thestackhouse.io"
export const CALENDAR_LINK = "https://calendar.app.google/aGDRM9XzkQFEndG77"
export const CALENDAR_SRC = "https://calendar.google.com/calendar/appointments/schedules/AcZssZ3l04YCCknE8tNqaRNh8tDkeuy8RVoK4nYebaEw_VLRJ6pPLFzbi2zQ2wFZZuVOSLrPkGlEApZA?gv=true"
export const CATEGORIES = ["Salud y estética", "Tecnología y electrónica", "Maquinaria y equipamiento profesional", "Hogar y mobiliario", "Moda y accesorios", "Alimentación y bebidas", "Industrial / B2B", "Otra"]
export const REGIONS = ["España", "México", "Chile", "Colombia", "Resto de LatAm", "Resto de Europa", "EE. UU. / Canadá", "Otros mercados", "Global"]

// Local syntax check only. No DNS requests, crawling or store verification.
export function normalizeStoreUrl(value: string): string | null {
  const raw = value.trim()
  if (!raw || raw.length > 2048 || /\s/.test(raw)) return null
  try {
    const url = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`)
    if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) return null
    if (!/^[a-z0-9][a-z0-9.-]*\.com$/i.test(url.hostname)) return null
    return url.toString()
  } catch { return null }
}

export type AuditForm = { url: string; category: string; categoryOther: string; regions: string[]; name: string; email: string; locale: "es" | "en"; requestId: string }
export function parseAudit(input: unknown): AuditForm | null {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return null
  const d = input as Record<string, unknown>
  const str = (key: string, max: number) => typeof d[key] === 'string' && d[key].length <= max ? d[key].trim() : ''
  const url = normalizeStoreUrl(str('url', 2048))
  const name = str('name', 120), email = str('email', 254), category = str('category', 100), categoryOther = str('categoryOther', 200)
  const requestId = str('requestId', 36)
  if (!url || !name || /[\r\n]/.test(name) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !CATEGORIES.includes(category)) return null
  if (category === 'Otra' && !categoryOther) return null
  if (!Array.isArray(d.regions) || !d.regions.length || d.regions.length > REGIONS.length || !d.regions.every(r => typeof r === 'string' && REGIONS.includes(r))) return null
  if (!/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(requestId)) return null
  return { url, name, email, category, categoryOther: category === 'Otra' ? categoryOther : '', regions: [...new Set(d.regions)] as string[], locale: d.locale === 'en' ? 'en' : 'es', requestId }
}
