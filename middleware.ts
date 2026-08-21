import { NextRequest, NextResponse } from "next/server"

const LINK_HEADER = '</.well-known/api-catalog>; rel="api-catalog"'

export function middleware(request: NextRequest) {
  const accept = request.headers.get("accept") ?? ""

  if (accept.includes("text/markdown")) {
    const { pathname } = request.nextUrl
    const mdUrl = new URL(`/api/md${pathname === "/" ? "" : pathname}`, request.url)
    const response = NextResponse.rewrite(mdUrl)
    response.headers.set("Link", LINK_HEADER)
    return response
  }

  const response = NextResponse.next()
  response.headers.set("Link", LINK_HEADER)
  return response
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon\\.ico|.*\\.png|.*\\.jpg|.*\\.svg|.*\\.ico|.*\\.webp).*)"],
}
