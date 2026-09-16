import { createHash } from "node:crypto"
import { CONTACT_EMAIL, parseAudit } from "./audit"
import { buildConfirmationEmail, buildTeamEmail } from "./audit-emails"

type Options = { apiKey?: string; notifyTo?: string; notifyFrom?: string; fetcher?: typeof fetch }
export async function handleAudit(req: Request, options: Options) {
  const response = (body: unknown, status = 200) => Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } })
  let raw: string
  try { raw = await req.text() } catch { return response({error:'invalid_input'}, 400) }
  if (raw.length > 12000) return response({error:'invalid_input'}, 413)
  let input: unknown
  try { input = JSON.parse(raw) } catch { return response({error:'invalid_input'}, 400) }
  const data = parseAudit(input)
  if (!data) return response({error:'invalid_input'}, 400)
  if (!options.apiKey) return response({error:'temporarily_unavailable'}, 503)
  const fetcher = options.fetcher ?? fetch
  // Stable payload and idempotency key allow safe retries after a network interruption.
  const digest = createHash('sha256').update(JSON.stringify(data)).digest('hex').slice(0,24)
  const send = async (kind: string, payload: Record<string, unknown>) => {
    try {
      const res = await fetcher('https://api.resend.com/emails', {method:'POST',headers:{Authorization:`Bearer ${options.apiKey}`,'Content-Type':'application/json','Idempotency-Key':`audit/${data.requestId}/${digest}/${kind}`},body:JSON.stringify(payload),signal:AbortSignal.timeout(12000)})
      if (!res.ok) { console.error('[audit] Email provider rejected request', kind, res.status); return false }
      const result = await res.json()
      return typeof result.id === 'string' && result.id.length > 0
    } catch { console.error('[audit] Email provider unavailable', kind); return false }
  }
  const from = options.notifyFrom || `The Stack House <${CONTACT_EMAIL}>`
  // The existing team mailbox is the intake destination. Never claim success with only a log.
  const accepted = await send('team', {from,to:[options.notifyTo || CONTACT_EMAIL],reply_to:data.email,...buildTeamEmail(data)})
  if (!accepted) return response({error:'temporarily_unavailable'}, 503)
  const confirmation = await send('receipt', {from,to:[data.email],reply_to:CONTACT_EMAIL,...buildConfirmationEmail(data.name,data.locale)})
  return response({ok:true,requestId:data.requestId,confirmation,bookingStatus:'pending'})
}
