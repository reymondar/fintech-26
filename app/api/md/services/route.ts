import { NextResponse } from "next/server"

const markdown = `# Servicios — The Stack House

> Una capa de datos sobre tu tienda y la IA para convertir las recomendaciones en ventas directas. No es una web más bonita: es la cadena completa, del diagnóstico a la venta. Cada pieza sostiene a la siguiente.

## Diagnóstico de tu tienda y de cómo te ve la IA

Revisamos tu tienda y probamos las preguntas reales de compra de tu sector en los asistentes de IA. Te mostramos dónde apareces, dónde no y por qué. Si tu problema no es la IA, te lo decimos.

## Preparar tu catálogo para que la IA lo entienda

Ordenamos y estructuramos los datos de tu catálogo para que las máquinas los lean sin adivinar, con la información que decide la compra a la vista.

## Contenido y autoridad para entrar en las recomendaciones

Creamos el contenido y la presencia externa que hacen que los modelos te tengan en cuenta.

## Captar la demanda que llega decidida

Montamos la captación y la atención en tu tienda para que cada consulta llegue a tu equipo con su contexto, sin caer en el vacío.

## Convertir y personalizar la experiencia

Ajustamos las páginas donde se decide la compra y adaptamos la experiencia a cada visitante.

## Conectar todo con tus herramientas de venta

Conectamos la capa de datos con tus herramientas comerciales para que cada oportunidad y venta quede enlazada con su origen, sin trabajo manual.

## Medir, seguir y mejorar mes a mes

Relacionamos lo que hacemos con lo que vendes y ajustamos la prioridad cada mes.

---

## Preguntas frecuentes

**¿Garantizan que la IA me va a recomendar?**
No, y desconfía de quien lo garantice. Los modelos son probabilísticos. Lo que hacemos: trabajo con método, medición rigurosa y diagnóstico honesto.

**¿Tienen que reconstruir mi sitio web?**
No. La mayoría de acciones son ajustes sobre lo que ya tienes. Si algo requiere desarrollo, lo ves en el plan y lo decides tú.

**¿Y si el problema no es la IA?**
Te lo decimos, con el desglose de causas reales.

---

Empieza por saber dónde estás: https://thestackhouse.io/auditoria
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
