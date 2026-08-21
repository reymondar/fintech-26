import { NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const accept = request.headers.get("accept") ?? ""

  if (accept.includes("text/markdown")) {
    const { pathname } = request.nextUrl
    const mdUrl = new URL(`/api/md${pathname === "/" ? "" : pathname}`, request.url)
    return NextResponse.rewrite(mdUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/", "/blog", "/blog/:slug*", "/services", "/contacto"],
}
