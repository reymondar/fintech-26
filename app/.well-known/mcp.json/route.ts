import { NextResponse } from "next/server"

const SITE_URL = "https://thestackhouse.io"

export async function GET() {
  const card = {
    schema_version: "v1",
    name: "The Stack House",
    description:
      "Consultoría de visibilidad en IA (GEO/AEO). Contenido accesible como Markdown estructurado para modelos de lenguaje.",
    server_url: SITE_URL,
    tools: [
      {
        name: "get_homepage",
        description: "Descripción completa de The Stack House: qué hace, cómo funciona y cómo contactar.",
        endpoint: "/api/md",
        method: "GET",
      },
      {
        name: "list_blog_posts",
        description: "Lista todos los artículos del blog sobre GEO, AEO, Share of Model y visibilidad en IA.",
        endpoint: "/api/md/blog",
        method: "GET",
      },
      {
        name: "get_blog_post",
        description: "Obtiene el contenido completo de un artículo del blog en Markdown.",
        endpoint: "/api/md/blog/{slug}",
        method: "GET",
      },
      {
        name: "get_services",
        description: "Detalle de los cuatro niveles de servicio: Auditoría, Construir, Defender y Expandir.",
        endpoint: "/api/md/services",
        method: "GET",
      },
    ],
    resources: [
      {
        type: "text/plain",
        url: `${SITE_URL}/llms.txt`,
        description: "Índice de contenido para modelos de lenguaje (llmstxt.org)",
      },
      {
        type: "text/plain",
        url: `${SITE_URL}/llms-full.txt`,
        description: "Contenido completo con resúmenes de todos los artículos para indexadores de IA",
      },
      {
        type: "application/xml",
        url: `${SITE_URL}/sitemap.xml`,
        description: "Mapa de todas las URLs del sitio",
      },
    ],
    content_negotiation: {
      markdown: "Cualquier página del sitio devuelve Markdown con el header Accept: text/markdown",
    },
  }

  return NextResponse.json(card, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=86400",
    },
  })
}
