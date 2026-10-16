import { draftMode, headers } from 'next/headers'
import { getPayload } from 'payload'
import config from '@payload-config'
export async function GET(request: Request) {
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: await headers() })
  if (!user) return new Response('Iniciá sesión en el panel', { status: 401 })
  const slug = new URL(request.url).searchParams.get('slug') || ''
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return new Response('Slug inválido', { status: 400 })
  ;(await draftMode()).enable()
  return new Response(null, { status: 307, headers: { Location: `/blog/${slug}`, 'Cache-Control': 'private, no-store' } })
}
