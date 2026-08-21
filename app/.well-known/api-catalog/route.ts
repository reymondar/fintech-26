import { NextResponse } from "next/server"

const SITE_URL = "https://thestackhouse.io"

export async function GET() {
  const catalog = {
    linkset: [
      {
        anchor: SITE_URL,
        "describedby": [
          {
            href: `${SITE_URL}/llms.txt`,
            type: "text/plain",
            title: "LLMs index — índice para modelos de lenguaje",
          },
          {
            href: `${SITE_URL}/llms-full.txt`,
            type: "text/plain",
            title: "LLMs full — contenido completo para indexadores de IA",
          },
          {
            href: `${SITE_URL}/sitemap.xml`,
            type: "application/xml",
            title: "Sitemap XML",
          },
        ],
        "api": [
          {
            href: `${SITE_URL}/api/md`,
            type: "text/markdown",
            title: "Markdown API — devuelve cualquier página en formato Markdown",
          },
        ],
      },
    ],
  }

  return NextResponse.json(catalog, {
    headers: {
      "Content-Type": "application/linkset+json",
      "Cache-Control": "public, max-age=86400",
    },
  })
}
