import { handleAudit } from "@/lib/audit-handler"

export const runtime = "nodejs"
export async function POST(req: Request) {
  return handleAudit(req, {
    apiKey: process.env.RESEND_API_KEY,
    notifyTo: process.env.AUDIT_NOTIFY_TO || "ramaarana7@gmail.com",
    notifyFrom: process.env.AUDIT_NOTIFY_FROM,
  })
}
