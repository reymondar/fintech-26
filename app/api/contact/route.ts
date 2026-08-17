import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { name, email, company, message } = await req.json()

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Campos requeridos faltantes" }, { status: 400 })
  }

  // TODO: conectar servicio de email (Resend recomendado — 2 líneas)
  // import { Resend } from "resend"
  // const resend = new Resend(process.env.RESEND_API_KEY)
  // await resend.emails.send({ from: "...", to: "hello@thestackhouse.com", subject: `Contacto: ${name}`, text: message })

  console.log("Contacto recibido:", { name, email, company, message })

  return NextResponse.json({ ok: true })
}
