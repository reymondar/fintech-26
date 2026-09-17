import { createHmac, timingSafeEqual } from 'node:crypto'
export const OWNER = 'ramaarana7@gmail.com'
export const SENDER = 'ramon@thestackhouse.io'
export const SESSION = 'sh_mailing_session'
export const STATE = 'sh_mailing_state'
export function config() {
  const secret = process.env.MAILING_SESSION_SECRET || ''
  const base = process.env.MAILING_BASE_URL || 'http://localhost:3000'
  const url = new URL(base)
  if (secret.length < 32 || (process.env.NODE_ENV === 'production' && url.protocol !== 'https:')) throw new Error('mailing_not_configured')
  return {secret,base:url.origin}

}
export function sign(data: Record<string, unknown>, secret: string) {
  const payload = Buffer.from(JSON.stringify(data)).toString('base64url')
  return payload+'.'+createHmac('sha256',secret).update(payload).digest('base64url')
}
export function verify(token: string | undefined, secret: string): Record<string, unknown> | null {
  try {
    if (!token || secret.length < 32) return null
    const [payload,mac,...rest] = token.split('.')
    const expected = createHmac('sha256',secret).update(payload).digest()
    const received = Buffer.from(mac,'base64url')
    if(rest.length || received.length !== expected.length || !timingSafeEqual(received,expected)) return null
    const data = JSON.parse(Buffer.from(payload,'base64url').toString())
    return typeof data.exp === 'number' && data.exp > Date.now() ? data : null
  } catch { return null }
}
export function authorized(token: string | undefined, secret: string) {
  const data = verify(token,secret)
  return data?.kind === 'session' && data.email === OWNER
}
export function parseMail(value: unknown) {
  if (!value || typeof value !== 'object') return null
  const v = value as Record<string,unknown>
  if (typeof v.to !== 'string' || typeof v.subject !== 'string' || typeof v.body !== 'string' || typeof v.id !== 'string') return null
  const to=v.to.trim(),subject=v.subject.trim(),body=v.body.trim()
  if (!/^[^\s@<> ,;]+@[^\s@<> ,;]+\.[^\s@<> ,;]+$/.test(to) || to.length>254 || !subject || subject.length>200 || /[\r\n]/.test(subject) || !body || body.length>50000 || !/^[0-9a-f-]{36}$/i.test(v.id)) return null
  return {to,subject,body,id:v.id}
}
