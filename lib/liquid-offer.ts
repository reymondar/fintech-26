import { croSteps } from "@/lib/cro-content"

export const conceptAreas = [
  { title: "Arquitectura de catálogo", body: "Categorías indexables, facetas y canonicals que concentran el rastreo y la demanda en páginas con valor comercial." },
  { title: "SEO/GEO de producto", body: "Atributos, compatibilidades y datos estructurados consistentes entre fichas y feeds para buscadores y asistentes de IA." },
  { title: "CRO de leads B2B", body: "Cotizaciones y demos con producto, necesidad y fuente de captación hasta el cierre en tu CRM." },
  { title: "Checkout y conversión", body: "Entrega, costos y medios de pago claros. Seguimiento de abandono y errores desde carrito hasta compra." },
  { title: "Merchandising", body: "Orden de productos y venta cruzada por categoría, evaluados con conversión, ticket promedio y contribución." },
  { title: "Retención y recompra", body: "Cohortes de recompra para identificar segmentos rentables, ciclos de reposición y recuperación de adquisición." },
]

const stepResults = [
  { title: "Encuentra categorías con demanda desaprovechada.", body: "Identificamos qué categorías concentran demanda, ventas y fricción. Cruzamos Search Console, analítica de tienda, búsquedas internas y datos de catálogo para elegir dónde intervenir." },
  { title: "Prioriza por valor comercial y esfuerzo.", body: "Priorizamos una familia de productos por oportunidad comercial y esfuerzo. Definimos la hipótesis, las páginas y plantillas afectadas, quién implementa y cómo se evaluará el cambio." },
  { title: "Publica mejoras en catálogo y conversión.", body: "Ejecutamos los cambios acordados en categorías, fichas, feeds o recorridos de compra. Tu equipo valida datos de producto y condiciones comerciales; comprobamos experiencia y medición antes de activar." },
  { title: "Valida el efecto en pedidos y oportunidades.", body: "Evaluamos la mejora con pedidos, contactos calificados y métricas de protección. Las pruebas A/B registran exposición y control cuando hay volumen; el seguimiento antes y después se interpreta junto con inventario, promociones y estacionalidad." },
  { title: "Decide con ventas, contribución y recompra.", body: "El scorecard mensual reúne demanda orgánica, referencias de IA, conversión, ventas y contribución cuando hay costos. Incluye cambios implementados, aprendizajes y la siguiente categoría o hipótesis a trabajar." },
]
const methods = ["SEO/GEO · Diagnóstico por categoría", "CRO · Backlog de hipótesis", "UX/UI · Implementación", "A/B testing · Experimentación", "Analítica · Ventas y contribución"]
export const conceptSteps = croSteps.map((step, i) => ({ ...step, ...stepResults[i], method: methods[i] }))
export const serviceCards = [
  { kind: "posicionamiento" as const, label: "AEO / SEO", keywords: "SEO/GEO · Catálogo · Search intent", title: "Maximizamos la visibilidad de tu catálogo", body: "Genera más tráfico a tus categorías más rentables. Optimizamos fichas y páginas de producto y automatizamos reseñas para que los asistentes de IA hablen de tus productos como lo harías tú." },
  { kind: "datos" as const, label: "Análisis de datos", keywords: "Analytics · Atribución · Contribution margin", title: "Convertimos el tráfico en oportunidades comerciales medibles.", body: "Deja de adivinar qué pasa con tu tráfico web. Unifica tus datos para planificar estrategias que retengan a tus visitas." },
  { kind: "personalizacion" as const, label: "Personalización ecommerce", keywords: "CRO · Merchandising · Segmentación", title: "Creamos experiencias únicas para cada visita", body: "Convierte el interés en pedidos, cotizaciones o demos con A/B testing y cambios en tiempo real en tu web, adaptados a cada segmento de clientes." },
]

export function liquidHomepageMarkdown() {
  return [
    "# The Stack House — CRO, GEO y analítica para ecommerce",
    "Tu próximo cliente está buscándote en ChatGPT. Te convertimos en la respuesta.",
    "The Stack House trabaja por categorías para conectar arquitectura del catálogo, SEO, datos de producto, visibilidad en IA y analítica comercial sobre la tienda y las herramientas existentes.",
    "## Captación, conversión y contribución",
    ...serviceCards.flatMap(card => [`### ${card.label}: ${card.title}`, card.body]),
    "## Del catálogo al pedido",
    ...conceptAreas.flatMap(area => [`### ${area.title}`, area.body]),
    "## Cómo implementamos",
    ...conceptSteps.flatMap((step, i) => [`### ${i + 1}. ${step.method}`, step.title, step.body]),
    "## Motor propio de personalización",
    "Las campañas opcionales adaptan mensajes, recomendaciones y CTA según reglas y señales acordadas. Se registra exposición y acciones por segmento; pedidos y resultados del CRM se conectan cuando están disponibles.",
    "## Alcance y medición",
    "Priorizamos categorías y plantillas según oportunidad, complejidad y datos. La propuesta identifica implementación inicial, ejecución y análisis mensual, y licencias necesarias. Distinguimos atribución e incrementalidad; no garantizamos recomendaciones de IA ni aumentos de ingresos.",
    "[Revisemos tu ecommerce](https://thestackhouse.io/auditoria?lang=es) · [Servicios](https://thestackhouse.io/servicios?lang=es) · [CRO](https://thestackhouse.io/servicios/cro) · [Contacto](https://thestackhouse.io/contacto)",
  ].join("\n\n") + "\n"
}
