import { NextResponse } from "next/server"

const markdown = "# Servicios — The Stack House\n\nEl motor de captación de tu ecommerce: posicionamiento de productos, personalización y automatización comercial sobre tus herramientas existentes.\n\n## Posicionamiento\nDiagnosticamos catálogo y presencia frente a competidores. Mejoramos fichas, creamos contenido que resuelve dudas de compra y trabajamos referencias en fuentes relevantes.\nEntregamos un plan priorizado y mejoras implementadas en productos y contenido.\n\n## Personalización y conversión\nAdaptamos mensajes, productos y llamadas a la acción según las señales disponibles de cada visitante. Implementamos experiencias y pruebas para medir qué funciona.\n\n## Automatización comercial\nConectamos consultas, datos del cliente, CRM y seguimiento para que tu equipo reciba oportunidades con contexto.\n\n## Medición\nRelacionamos recomendaciones, visitas y resultados comerciales. Distinguimos el origen rastreable de la influencia declarada y señalamos lo que no se puede atribuir.\n\n## Auditoría inicial\nComparte la URL .com de tu tienda, categoría, mercados y contacto. Después eliges una cita en el calendario. Enviar el formulario no reserva una reunión. La revisión inicial no tiene costo ni compromiso.\n\n- Servicios: https://thestackhouse.io/servicios?lang=es\n- Auditoría: https://thestackhouse.io/auditoria?lang=es\n- Contacto: contact@thestackhouse.io\n"

export async function GET() {
  return new NextResponse(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Language": "es",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
