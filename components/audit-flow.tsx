"use client"

import { useState } from "react"
import { m, AnimatePresence } from "framer-motion"
import { ArrowRight, ArrowLeft, Check, Store, Mail } from "lucide-react"
import { useTranslation } from "@/components/locale-provider"

const CALENDAR_SRC =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ3l04YCCknE8tNqaRNh8tDkeuy8RVoK4nYebaEw_VLRJ6pPLFzbi2zQ2wFZZuVOSLrPkGlEApZA?gv=true"
const CALENDAR_LINK = "https://calendar.app.google/aGDRM9XzkQFEndG77"

const CATEGORIES = [
  "Salud y estética",
  "Tecnología y electrónica",
  "Maquinaria y equipamiento profesional",
  "Hogar y mobiliario",
  "Moda y accesorios",
  "Alimentación y bebidas",
  "Industrial / B2B",
  "Otra",
]

const REGIONS = [
  "España",
  "México",
  "Chile",
  "Colombia",
  "Resto de LatAm",
  "Resto de Europa",
  "EE. UU. / Canadá",
  "Global",
]

type Step = "store" | "contact" | "calendar"

const inputBase =
  "w-full px-3 py-2.5 text-sm bg-white border border-zinc-200 rounded-xl text-zinc-900 placeholder:text-zinc-300 focus:outline-none focus:border-zinc-400 transition-colors"
const labelBase = "text-xs font-medium text-zinc-500 uppercase tracking-widest"

export function AuditFlow() {
  const { t, locale } = useTranslation()

  const [step, setStep] = useState<Step>("store")
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle")
  const [form, setForm] = useState({
    url: "",
    category: "",
    categoryOther: "",
    regions: [] as string[],
    name: "",
    email: "",
  })

  const set = (key: string, value: string | string[]) =>
    setForm(prev => ({ ...prev, [key]: value }))

  const toggleRegion = (region: string) =>
    setForm(prev => ({
      ...prev,
      regions: prev.regions.includes(region)
        ? prev.regions.filter(r => r !== region)
        : [...prev.regions, region],
    }))

  const storeValid =
    form.url.trim() !== "" &&
    form.category !== "" &&
    (form.category !== "Otra" || form.categoryOther.trim() !== "") &&
    form.regions.length > 0

  const contactValid = form.name.trim() !== "" && /.+@.+\..+/.test(form.email)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!contactValid) return
    setStatus("loading")
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, locale }),
      })
      if (res.ok) {
        setStep("calendar")
        setStatus("idle")
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <div className="max-w-xl mx-auto">
      {/* Progress */}
      {step !== "calendar" && (
        <div className="flex items-center gap-2 mb-8">
          <StepDot active label={t("Paso 1 · Tu tienda")} on />
          <div className="h-px flex-1 bg-zinc-200" />
          <StepDot active={step === "contact"} label={t("Paso 2 · Contacto")} on={step === "contact"} />
        </div>
      )}

      <AnimatePresence mode="wait">
        {/* STEP 1 — STORE */}
        {step === "store" && (
          <m.div
            key="store"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Store className="w-4 h-4 text-emerald-600" strokeWidth={1.75} />
                <h2 className="font-display text-xl font-bold text-zinc-900">{t("Tu tienda")}</h2>
              </div>
              <p className="text-sm text-zinc-500">{t("Con esto preparamos la revisión antes de hablar. Cuanto más claro, más útil la llamada.")}</p>
            </div>

            <div className="space-y-5">
              <Field label={t("URL de la tienda")}>
                <input
                  type="url"
                  inputMode="url"
                  value={form.url}
                  onChange={e => set("url", e.target.value)}
                  placeholder="https://tutienda.com"
                  className={inputBase}
                />
              </Field>

              <Field label={t("Categoría de productos")}>
                <select value={form.category} onChange={e => set("category", e.target.value)} className={inputBase}>
                  <option value="" disabled>{t("Elige una opción")}</option>
                  {CATEGORIES.map(c => (
                    <option key={c} value={c}>{t(c)}</option>
                  ))}
                </select>
                {form.category === "Otra" && (
                  <input
                    type="text"
                    value={form.categoryOther}
                    onChange={e => set("categoryOther", e.target.value)}
                    placeholder={t("¿Qué vendes?")}
                    className={`${inputBase} mt-2`}
                  />
                )}
              </Field>

              <Field label={t("Países o regiones donde vende")}>
                <div className="flex flex-wrap gap-2">
                  {REGIONS.map(r => {
                    const on = form.regions.includes(r)
                    return (
                      <button
                        type="button"
                        key={r}
                        onClick={() => toggleRegion(r)}
                        aria-pressed={on}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                          on
                            ? "bg-zinc-900 text-white border-zinc-900"
                            : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-400"
                        }`}
                      >
                        {t(r)}
                      </button>
                    )
                  })}
                </div>
              </Field>
            </div>

            <button
              type="button"
              disabled={!storeValid}
              onClick={() => setStep("contact")}
              className="mt-8 w-full py-3 rounded-full bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors inline-flex items-center justify-center gap-2"
            >
              {t("Continuar")} <ArrowRight className="w-4 h-4" />
            </button>
          </m.div>
        )}

        {/* STEP 2 — CONTACT */}
        {step === "contact" && (
          <m.form
            key="contact"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Mail className="w-4 h-4 text-emerald-600" strokeWidth={1.75} />
                <h2 className="font-display text-xl font-bold text-zinc-900">{t("¿Dónde te escribimos?")}</h2>
              </div>
              <p className="text-sm text-zinc-500">{t("Para enviarte la confirmación y el resumen de la revisión.")}</p>
            </div>

            <div className="space-y-5">
              <Field label={t("Nombre")}>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => set("name", e.target.value)}
                  placeholder={t("Tu nombre")}
                  className={inputBase}
                />
              </Field>
              <Field label={t("Correo profesional")}>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => set("email", e.target.value)}
                  placeholder="tu@empresa.com"
                  className={inputBase}
                />
              </Field>
            </div>

            {status === "error" && (
              <p className="mt-4 text-xs text-red-500">
                {t("Algo salió mal. Escríbenos a")} hello@thestackhouse.com
              </p>
            )}

            <div className="mt-8 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setStep("store")}
                className="py-3 px-4 rounded-full border border-zinc-200 text-zinc-600 text-sm font-medium hover:border-zinc-400 transition-colors inline-flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> {t("Atrás")}
              </button>
              <button
                type="submit"
                disabled={!contactValid || status === "loading"}
                className="flex-1 py-3 rounded-full bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors inline-flex items-center justify-center gap-2"
              >
                {status === "loading" ? t("Enviando…") : t("Elegir hueco para la revisión")}
                {status !== "loading" && <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          </m.form>
        )}

        {/* STEP 3 — CALENDAR */}
        {step === "calendar" && (
          <m.div
            key="calendar"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-5 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
              <div className="mt-0.5 w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-sm font-semibold text-emerald-800">{t("Recibimos los datos de tu tienda.")}</p>
                <p className="text-sm text-emerald-700/90 mt-0.5">
                  {t("Falta un paso: elige un hueco de 20 minutos. Completar el formulario no reserva la reunión.")}
                </p>
              </div>
            </div>

            <h2 className="font-display text-2xl font-bold text-zinc-900 mb-1">{t("Casi listo. Elige cuándo.")}</h2>
            <p className="text-sm text-zinc-500 mb-5">{t("Reserva 20 minutos. Ya tenemos los datos de tu tienda — no hace falta repetir nada.")}</p>

            <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
              <iframe
                src={CALENDAR_SRC}
                title={t("Reservar revisión")}
                className="w-full"
                style={{ border: 0, height: 620 }}
              />
            </div>

            <p className="mt-4 text-center text-sm text-zinc-500">
              {t("¿No ves el calendario?")}{" "}
              <a href={CALENDAR_LINK} target="_blank" rel="noopener noreferrer" className="font-medium text-zinc-900 underline underline-offset-4 hover:text-emerald-600">
                {t("Ábrelo aquí →")}
              </a>
            </p>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className={labelBase}>{label}</label>
      {children}
    </div>
  )
}

function StepDot({ active, label, on }: { active: boolean; label: string; on: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`w-2 h-2 rounded-full transition-colors ${on ? "bg-emerald-600" : active ? "bg-zinc-900" : "bg-zinc-300"}`}
      />
      <span className={`text-xs font-medium ${on || active ? "text-zinc-900" : "text-zinc-400"}`}>{label}</span>
    </div>
  )
}
