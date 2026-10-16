import { NextRequest, NextResponse } from "next/server"
import { detectLocale, isLocale, LOCALE_COOKIE } from "@/lib/locale"

const LINK_HEADER = '</.well-known/api-catalog>; rel="api-catalog"'

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (pathname === "/admin" || pathname.startsWith("/admin/") || pathname === "/mailing" || pathname.startsWith("/mailing/")) {
    const h = new Headers(request.headers)
    h.set("x-sh-private", "1")
    const res = NextResponse.next({ request: { headers: h } })
    res.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive")
    res.headers.set("Cache-Control", "private, no-store")
    res.headers.set("Referrer-Policy", "no-referrer")
    res.headers.set("Content-Security-Policy", "frame-ancestors 'none'")
    return res
  }
  if (pathname === '/api/users/first-register' && process.env.VERCEL && process.env.PAYLOAD_ALLOW_SETUP !== 'true') return new NextResponse('Setup disabled', { status: 403 })
  if (pathname.startsWith('/blog/') && process.env.CMS_BLOG_ENABLED === 'true') {
    const { getCMS } = await import('@/lib/posts')
    const payload = await getCMS()
    const slug = pathname.slice('/blog/'.length)
    const active = await payload.find({ collection: 'posts', where: { slug: { equals: slug }, _status: { equals: 'published' } }, limit: 1, depth: 0, select: { slug: true }, overrideAccess: false })
    if (!active.docs.length) {
      const redirects = await payload.find({ collection: 'redirects', where: { from: { equals: pathname } }, limit: 1, depth: 0 })
      const destination = redirects.docs[0]?.to
      if (destination && destination !== pathname && /^\/blog\/[a-z0-9]+(?:-[a-z0-9]+)*$/.test(destination)) return NextResponse.redirect(new URL(destination, request.url), 301)
    }
  }
  const accept = request.headers.get("accept") ?? ""
  const explicit = pathname === "/es" ? "es" : pathname === "/en" ? "en" : null
  const detected = detectLocale(request.headers.get("x-vercel-ip-country"), request.cookies.get(LOCALE_COOKIE)?.value, request.headers.get("accept-language") ?? "")

  // Redirect only the language-neutral landing. Explicit URLs are stable and crawlable.
  if (pathname === "/" && !accept.includes("text/markdown")) {
    const url = request.nextUrl.clone()
    url.pathname = `/${detected}`
    const response = NextResponse.redirect(url, 307)
    response.headers.set("Cache-Control", "private, no-store")
    response.headers.set("Vary", "Cookie, Accept-Language, X-Vercel-IP-Country")
    response.headers.set("Link", LINK_HEADER)
    return response
  }

  const flowPage = ["/auditoria", "/servicios"].includes(pathname)
  const queryLocale = request.nextUrl.searchParams.get("lang")
  const locale = explicit ?? (flowPage ? (isLocale(queryLocale) ? queryLocale : detected) : pathname === "/" ? detected : "es")
  const requestHeaders = new Headers(request.headers)
  // Always overwrite the internal language header supplied by the client.
  requestHeaders.set("x-sh-locale", locale)
  requestHeaders.delete("x-sh-private")
  const hasMarkdown = pathname === "/" || explicit || pathname === "/services" || pathname === "/servicios" || pathname === "/blog" || pathname.startsWith("/blog/")
  if (accept.includes("text/markdown") && hasMarkdown) {
    const url = request.nextUrl.clone()
    url.pathname = explicit || pathname === "/" ? "/api/md" : pathname === "/servicios" ? "/api/md/services" : `/api/md${pathname}`
    if (explicit || pathname === "/") url.searchParams.set("lang", locale)
    const response = NextResponse.rewrite(url, { request: { headers: requestHeaders } })
    response.headers.set("Link", LINK_HEADER)
    response.headers.set("Content-Language", pathname === "/servicios" || pathname === "/services" ? "es" : locale)
    if (pathname === "/") {
      response.headers.set("Cache-Control", "private, no-store")
      response.headers.set("Vary", "Cookie, Accept-Language, X-Vercel-IP-Country")
    }
    return response
  }

  const response = NextResponse.next({ request: { headers: requestHeaders } })
  response.headers.set("Link", LINK_HEADER)
  if (explicit) response.headers.set("Content-Language", pathname === "/servicios" || pathname === "/services" ? "es" : locale)
  return response
}

export const config = {
  matcher: ["/api/users/first-register", "/((?!api/|_next/|.*\\.[^/]+$).*)"],
}
