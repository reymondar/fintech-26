import { NextResponse } from "next/server"

// Env vars (Vercel → Project → Settings → Environment Variables):
//   RESEND_API_KEY     — tu API key de Resend (obligatoria para enviar)
//   AUDIT_NOTIFY_TO    — bandeja del equipo que recibe los leads (default abajo)
//   AUDIT_NOTIFY_FROM  — remitente verificado en Resend (el dominio debe estar verificado)
const NOTIFY_TO = process.env.AUDIT_NOTIFY_TO || "ramaarana7@gmail.com"
const NOTIFY_FROM = process.env.AUDIT_NOTIFY_FROM || "The Stack House <contact@thestackhouse.io>"
const REPLY_TO = "contact@thestackhouse.io"

type AuditForm = {
  url?: string
  category?: string
  categoryOther?: string
  regions?: string[]
  name?: string
  email?: string
  locale?: string
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
}

async function sendEmail(apiKey: string, payload: Record<string, unknown>): Promise<boolean> {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      console.error("[audit] Resend respondió", res.status, await res.text())
      return false
    }
    return true
  } catch (err) {
    console.error("[audit] Error enviando email:", err)
    return false
  }
}

// ---- Email interno para el equipo ----
function buildTeamEmail(data: AuditForm) {
  const category = data.category === "Otra" ? `Otra — ${data.categoryOther || ""}`.trim() : data.category || "—"
  const regions = (data.regions || []).join(", ") || "—"
  const receivedAt = new Date().toLocaleString("es-ES", { timeZone: "Europe/Lisbon" })
  const rows: [string, string][] = [
    ["Tienda", data.url || "—"],
    ["Categoría", category],
    ["Regiones", regions],
    ["Nombre", data.name || "—"],
    ["Correo", data.email || "—"],
    ["Recibido", receivedAt],
  ]
  const text = [...rows.map(([k, v]) => `${k}: ${v}`), ``, `Estado: FORMULARIO ENVIADO.`].join("\n")
  const html = `
  <div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;color:#18181b">
    <p style="font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#71717a;margin:0 0 4px">The Stack House</p>
    <h1 style="font-size:20px;margin:0 0 4px">Nueva auditoría solicitada</h1>
    <p style="font-size:13px;color:#a1a1aa;margin:0 0 20px">Datos para preparar la revisión antes de la reunión.</p>
    <table style="width:100%;border-collapse:collapse;font-size:14px">
      ${rows
        .map(
          ([k, v]) => `<tr>
        <td style="padding:8px 12px;border-bottom:1px solid #f4f4f5;color:#71717a;width:120px;vertical-align:top">${escapeHtml(k)}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #f4f4f5;color:#18181b">${
          k === "Tienda"
            ? `<a href="${escapeHtml(v)}" style="color:#009967">${escapeHtml(v)}</a>`
            : k === "Correo"
              ? `<a href="mailto:${escapeHtml(v)}" style="color:#009967">${escapeHtml(v)}</a>`
              : escapeHtml(v)
        }</td>
      </tr>`
        )
        .join("")}
    </table>
  </div>`
  return { subject: `Nueva auditoría · ${data.url}`, text, html }
}

// ---- Email de confirmación para el usuario (sin CTA) ----
function buildConfirmationEmail(name: string, locale: string) {
  const en = locale === "en"
  const firstName = escapeHtml(name.split(" ")[0] || name)
  const c = en
    ? {
        subject: "Audit confirmed — The Stack House",
        preheader: "We're already reviewing your store.",
        title: "Audit confirmed.",
        intro: `Thanks, ${firstName}. We've got everything to prepare your store review.`,
        nextLabel: "What's next",
        next: "We analyze your store and what AI answers when people ask about your category: who it recommends and where you show up. We come to the call with that ready, so the 20 minutes go straight to what matters.",
        closing: "If you've already booked a time, the invite with the link comes separately. See you there.",
        signoff: "— The Stack House team",
        footer: "You're receiving this email because you requested an AI visibility review for your store.",
      }
    : {
        subject: "Auditoría confirmada — The Stack House",
        preheader: "Ya estamos revisando tu tienda.",
        title: "Auditoría confirmada.",
        intro: `Gracias, ${firstName}. Tenemos todo para preparar la revisión de tu tienda.`,
        nextLabel: "Qué sigue",
        next: "Analizamos tu tienda y qué responde la IA cuando preguntan por tu categoría: a quién recomienda y dónde apareces. Llegamos a la llamada con eso resuelto, para que los 20 minutos vayan a lo importante.",
        closing: "Si ya reservaste hora, la invitación con el enlace te llega aparte. Nos vemos ahí.",
        signoff: "— El equipo de The Stack House",
        footer: "Recibiste este correo porque pediste una revisión de visibilidad en IA para tu tienda.",
      }

  const text = [c.title, "", c.intro, "", `${c.nextLabel}: ${c.next}`, "", c.closing, "", c.signoff].join("\n")
  const html = `
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${c.preheader}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;background:#f4f4f5;">
    <tr><td align="center" style="padding:24px;">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="width:560px;max-width:100%;border-collapse:collapse;background:#ffffff;border:1px solid #e4e4e7;border-radius:16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
        <tr><td style="padding:28px 32px 0 32px;">
          <p style="margin:0;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#71717a;font-weight:600;">The Stack House</p>
        </td></tr>
        <tr><td style="padding:16px 32px 0 32px;">
          <h1 style="margin:0;font-size:24px;line-height:1.25;font-weight:800;color:#18181b;">${escapeHtml(c.title)}</h1>
        </td></tr>
        <tr><td style="padding:16px 32px 0 32px;">
          <p style="margin:0;font-size:15px;line-height:1.6;color:#52525b;">${escapeHtml(c.intro)}</p>
        </td></tr>
        <tr><td style="padding:24px 32px 0 32px;">
          <p style="margin:0 0 6px 0;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#a1a1aa;font-weight:600;">${escapeHtml(c.nextLabel)}</p>
          <p style="margin:0;font-size:15px;line-height:1.6;color:#52525b;">${escapeHtml(c.next)}</p>
        </td></tr>
        <tr><td style="padding:20px 32px 0 32px;">
          <p style="margin:0;font-size:14px;line-height:1.6;color:#52525b;">${escapeHtml(c.closing)}</p>
        </td></tr>
        <tr><td style="padding:20px 32px 28px 32px;">
          <p style="margin:0;font-size:15px;line-height:1.6;color:#18181b;">${escapeHtml(c.signoff)}</p>
        </td></tr>
        <tr><td style="padding:20px 32px 28px 32px;border-top:1px solid #f4f4f5;">
          <p style="margin:0;font-size:12px;line-height:1.6;color:#a1a1aa;">
            The Stack House · <a href="https://thestackhouse.io" style="color:#71717a;text-decoration:none;">thestackhouse.io</a> · <a href="mailto:contact@thestackhouse.io" style="color:#71717a;text-decoration:none;">contact@thestackhouse.io</a><br>
            ${escapeHtml(c.footer)}
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>`
  return { subject: c.subject, text, html }
}

export async function POST(req: Request) {
  const data = (await req.json()) as AuditForm

  if (!data.url || !data.name || !data.email) {
    return NextResponse.json({ error: "Campos requeridos faltantes" }, { status: 400 })
  }

  const team = buildTeamEmail(data)
  const confirmation = buildConfirmationEmail(data.name, data.locale || "es")

  // Registro de respaldo en logs, pase lo que pase con el email.
  console.log("[audit] lead recibido:", team.text)

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn("[audit] RESEND_API_KEY no configurada — lead solo registrado en logs.")
    return NextResponse.json({ ok: true, emailed: false })
  }

  // Aviso interno al equipo + confirmación al usuario. Un fallo no rompe la experiencia.
  const teamOk = await sendEmail(apiKey, {
    from: NOTIFY_FROM,
    to: [NOTIFY_TO],
    reply_to: data.email,
    subject: team.subject,
    text: team.text,
    html: team.html,
  })

  const leadOk = await sendEmail(apiKey, {
    from: NOTIFY_FROM,
    to: [data.email],
    reply_to: REPLY_TO,
    subject: confirmation.subject,
    text: confirmation.text,
    html: confirmation.html,
  })

  return NextResponse.json({ ok: true, emailed: teamOk, confirmation: leadOk })
}
