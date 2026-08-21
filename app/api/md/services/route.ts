import { NextResponse } from "next/server"

const markdown = `# Servicios — The Stack House

> De auditoría a agent-ready: la capa de datos, la autoridad y los sistemas que hacen que la IA te lea, confíe en ti y te elija.

Los cuatro servicios se desbloquean en secuencia. Cada nivel construye sobre el anterior.

## 1. Auditoría (Gratis)

Diagnóstico en vivo de 20 minutos sin costo. Analizamos tu marca en ChatGPT, Gemini, Perplexity y Claude en tiempo real, con las preguntas reales de compra de tu sector. Entregamos un baseline de Share of Model y las causas principales de invisibilidad.

**[Agendar diagnóstico gratuito](https://calendar.app.google/aGDRM9XzkQFEndG77)**

## 2. Construir (desde $1,500/proyecto)

Construimos tu presencia en IA:

- Optimización técnica del contenido para que los modelos puedan leerlo y citarlo
- Corrección de bloqueos técnicos (robots.txt, JavaScript no indexable, falta de datos estructurados)
- Posicionamiento en las fuentes de autoridad que la IA consulta en tu sector
- Creación de contenido estructurado orientado a responder preguntas de compra

## 3. Defender (desde $500/mes)

Mantenemos y monitorizamos tu posición:

- Medición continua del Share of Model (cuántas veces te menciona la IA)
- Alertas ante cambios en las respuestas de los motores de IA
- Ajustes tácticos para sostener la posición ganada

## 4. Expandir (precio custom)

Estrategias avanzadas para marcas con presencia establecida en IA:

- Automatizaciones de citación a escala
- Agentes de IA con catálogo propio del cliente
- Presencia en ecosistemas de IA emergentes

---

## Preguntas frecuentes

**¿Garantizan que la IA me va a recomendar?**
No, y desconfía de quien lo garantice. Los modelos son probabilísticos. Lo que garantizamos: medición rigurosa, diagnóstico honesto y acciones que aumentan tu probabilidad de aparecer.

**¿Tienen que reconstruir mi sitio web?**
No. La mayoría de acciones son ajustes sobre lo que ya tenés. Si algo requiere desarrollo, lo ves en el plan y decidís vos.

**¿Y si el problema no es la IA?**
Te lo decimos por escrito, con el desglose de causas reales.

---

Contacto: https://thestackhouse.io/contacto
`

export async function GET() {
  return new NextResponse(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
