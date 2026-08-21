import { NextResponse } from "next/server"

const SITE_URL = "https://thestackhouse.io"

export async function GET() {
  const plugin = {
    schema_version: "v1",
    name_for_human: "The Stack House",
    name_for_model: "the_stack_house",
    description_for_human:
      "Consultoría de visibilidad en IA (GEO/AEO). Información sobre cómo aparecer en ChatGPT, Gemini, Perplexity y Claude.",
    description_for_model:
      "Use this to access information about AI visibility (GEO/AEO), Share of Model metrics, and how companies can appear in AI-generated responses. Provides blog articles, service descriptions, and contact information for The Stack House, a GEO/AEO consultancy based in Spain. Content available as clean Markdown via the /api/md/* endpoints or by requesting any page with Accept: text/markdown.",
    auth: {
      type: "none",
    },
    api: {
      type: "markdown",
      url: `${SITE_URL}/api/md`,
    },
    logo_url: `${SITE_URL}/logo-stackhouse.png`,
    contact_email: "aranaramon1@gmail.com",
    legal_info_url: SITE_URL,
  }

  return NextResponse.json(plugin, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=86400",
    },
  })
}
