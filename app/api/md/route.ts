import { NextResponse } from "next/server"

const markdown = `# The Stack House — Visibilidad en IA

> Hacemos visible tu empresa en ChatGPT, Gemini, Perplexity y Claude.

The Stack House es una consultora especializada en GEO (Generative Engine Optimization) y AEO (Answer Engine Optimization). Diagnosticamos por qué cae tu tráfico orgánico, cuánto es atribuible a la IA y qué hacer para recuperar la posición.

## ¿Qué hacemos?

Medimos tu **Share of Model**: cuántas veces te menciona la IA cuando tus compradores preguntan por tu categoría. Luego ejecutamos las acciones técnicas y de contenido que aumentan esa probabilidad.

## Servicios

- **Auditoría (gratis)** — Diagnóstico en vivo de 20 minutos. Analizamos tu marca en los motores de IA en tiempo real.
- **Construir** — Optimización técnica, corrección de bloqueos, posicionamiento en fuentes de autoridad. Desde $1,500/proyecto.
- **Defender** — Monitorización continua del Share of Model. Desde $500/mes.
- **Expandir** — Automatizaciones de citación y agentes de IA con catálogo propio. Precio custom.

## Por qué nos diferenciamos

Una herramienta de monitorización te dice si la IA te menciona. Nosotros te decimos **por qué perdés tráfico**, cuánto es atribuible a la IA y qué hacer para recuperar la posición. Si el problema no es la IA, te lo decimos por escrito.

## Contacto

- Web: https://thestackhouse.io
- Diagnóstico gratuito: https://calendar.app.google/aGDRM9XzkQFEndG77
- Formulario: https://thestackhouse.io/contacto
`

export async function GET() {
  return new NextResponse(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
