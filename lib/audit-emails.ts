import { CALENDAR_LINK, CONTACT_EMAIL, type AuditForm } from "./audit"
const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')
function shell(preheader: string, content: string) {
  return `<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"/><meta charset="utf-8"/></head><body style="margin:0;background:#f4f4f5"><div style="display:none;max-height:0;overflow:hidden">${escape(preheader)}</div><table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr><td align="center" style="padding:32px 16px"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:white;border:1px solid #e4e4e7;border-radius:20px;font-family:Arial,Helvetica,sans-serif;color:#18181b"><tr><td style="padding:32px 24px"><p style="margin:0 0 28px;font-size:11px;letter-spacing:2px;color:#059669;font-weight:bold">THE STACK HOUSE</p>${content}<p style="margin:32px 0 0;padding-top:20px;border-top:1px solid #f4f4f5;font-size:12px;color:#71717a">The Stack House · <a style="color:#71717a" href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a></p></td></tr></table></td></tr></table></body></html>`
}
export function buildConfirmationEmail(name: string, locale: string) {
  const en = locale === 'en'
  const first = name.trim().split(/\s+/)[0] || name
  const subject = en ? 'We received your store — choose a time to review it' : 'Recibimos tu tienda — elige cuándo revisarla'
  const title = en ? 'Your next step: book a time.' : 'El siguiente paso: elegir cuándo.'
  const intro = en ? `Thanks, ${first}. We received your store details.` : `Gracias, ${first}. Recibimos los datos de tu tienda.`
  const body = en ? 'In your review, we’ll look at how your store appears in recommendations and where to improve the journey to a purchase.' : 'En la revisión veremos cómo apareces en las recomendaciones y dónde mejorar el recorrido hacia la compra.'
  const cta = en ? 'Book my review' : 'Reservar mi revisión'
  const closing = en ? 'Already booked? You don’t need to book again. Your calendar invitation arrives separately.' : '¿Ya reservaste? No hace falta hacerlo de nuevo. La invitación del calendario llega por separado.'
  const footer = en ? 'You received this email because you requested a store review.' : 'Recibiste este correo porque solicitaste una revisión de tu tienda.'
  const text = [title, intro, body, `${cta}: ${CALENDAR_LINK}`, closing, footer, CONTACT_EMAIL].join('\n\n')
  const html = shell(en ? 'Your request is received. Your meeting still needs a booking.' : 'Solicitud recibida. La reunión se confirma al reservar.', `<h1 style="font-size:26px;line-height:1.2;margin:0 0 20px">${escape(title)}</h1><p style="font-size:15px;line-height:1.6;color:#52525b">${escape(intro)}</p><p style="font-size:15px;line-height:1.6;color:#52525b">${escape(body)}</p><table role="presentation" cellspacing="0" cellpadding="0" style="margin:28px 0"><tr><td bgcolor="#18181b" style="border-radius:28px"><a href="${CALENDAR_LINK}" style="display:inline-block;padding:15px 24px;font-size:14px;font-weight:bold;color:white;text-decoration:none">${escape(cta)} &rarr;</a></td></tr></table><p style="font-size:13px;line-height:1.6;color:#71717a">${escape(closing)}</p><p style="font-size:11px;line-height:1.5;color:#a1a1aa;margin-top:24px">${escape(footer)}</p>`)
  return { subject, text, html }
}
export function buildTeamEmail(data: AuditForm) {
  const rows = [['Tienda', data.url], ['Categoría', data.category === 'Otra' ? data.categoryOther : data.category], ['Mercados', data.regions.join(', ')], ['Nombre', data.name], ['Correo', data.email], ['Idioma', data.locale], ['Referencia', data.requestId]]
  const text = ['SOLICITUD RECIBIDA · RESERVA PENDIENTE', ...rows.map(([k,v]) => `${k}: ${v}`), 'El formulario no confirma una reunión. Comprueba la reserva en Google Calendar usando el correo del cliente.'].join('\n')
  const html = shell('Nueva solicitud. Reserva pendiente.', `<h1 style="font-size:24px;margin:0 0 12px">Nueva solicitud de auditoría</h1><p style="color:#b45309;font-size:12px;font-weight:bold">RESERVA PENDIENTE</p><table width="100%" style="border-collapse:collapse;font-size:14px">${rows.map(([k,v])=>`<tr><td style="padding:12px 0;border-bottom:1px solid #f4f4f5;color:#71717a;vertical-align:top;width:100px">${escape(k)}</td><td style="padding:12px 0;border-bottom:1px solid #f4f4f5;word-break:break-word">${k === 'Tienda' ? `<a href="${escape(v)}" style="color:#059669">${escape(v)}</a>` : escape(v)}</td></tr>`).join('')}</table><p style="font-size:12px;color:#71717a;line-height:1.5">El formulario no confirma una reunión. Comprueba la reserva en Google Calendar usando el correo del cliente.</p>`)
  return { subject: `Solicitud de auditoría · ${new URL(data.url).hostname}`, text, html }
}
