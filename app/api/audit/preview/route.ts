import { buildConfirmationEmail, buildTeamEmail } from "@/lib/audit-emails"
export async function GET(req: Request) {
  if (process.env.NODE_ENV !== "development") return new Response(null, { status: 404 })
  const params = new URL(req.url).searchParams
  const locale = params.get("lang") === "en" ? "en" : "es"
  const email = params.get("team") === "1" ? buildTeamEmail({ url: "https://example.com/", name: "Alex", email: "alex@example.com", category: "Hogar y mobiliario", categoryOther: "", regions: ["España"], locale, requestId: "00000000-0000-4000-8000-000000000000" }) : buildConfirmationEmail("Alex", locale)
  return new Response(email.html, { headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store", "X-Robots-Tag": "noindex" } })
}
