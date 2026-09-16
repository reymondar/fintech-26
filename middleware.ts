import { NextRequest, NextResponse } from "next/server"
import { detectLocale, isLocale, LOCALE_COOKIE } from "@/lib/locale"

const LINK_HEADER = '</.well-known/api-catalog>; rel="api-catalog"'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
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
  matcher: ["/((?!api/|_next/|.*\\.[^/]+$).*)"],
}
