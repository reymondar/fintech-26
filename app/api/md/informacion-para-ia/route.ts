import { companyInformationMarkdown } from "@/lib/company-information"

export function GET() {
  return new Response(companyInformationMarkdown(), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Language": "es",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
