import { croMarkdown } from "@/lib/cro-content"

export function GET() {
  return new Response(croMarkdown(), { headers: {
    "Content-Type": "text/markdown; charset=utf-8",
    "Content-Language": "es",
    "Cache-Control": "public, max-age=3600",
  } })
}
