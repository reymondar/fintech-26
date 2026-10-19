export const CRO_PATH = "/servicios/cro"
export const CRO_URL = `https://thestackhouse.io${CRO_PATH}`
export const CRO_TITLE = "CRO para ecommerce: implementación y personalización"
export const CRO_DESCRIPTION = "Optimizamos categorías, fichas y recorridos de compra. Implementación CRO continua y campañas opcionales con nuestro motor de personalización."
export const CRO_INTRO = "Analizamos cómo compran tus clientes, detectamos qué les frena e implementamos mejoras en tu tienda. Trabajamos categorías, fichas, formularios y recorridos de compra, con seguimiento de pedidos, oportunidades comerciales y margen."

export const croAreas = [
  { title: "Categorías y navegación", problem: "Buscan el producto, pero no lo encuentran.", body: "Mejoramos la organización, los filtros y la búsqueda para que cada comprador llegue a productos relevantes y pueda comparar alternativas." },
  { title: "Fichas y comparación", problem: "El producto interesa. Faltan razones para elegirlo.", body: "Trabajamos especificaciones, compatibilidades, imágenes, diferencias entre modelos, disponibilidad y condiciones para resolver las dudas antes del pedido." },
  { title: "Presupuestos y demos", problem: "La visita termina antes de hablar con ventas.", body: "Ajustamos llamadas a la acción y formularios. Conservamos producto, necesidad y origen de la consulta para dar contexto al equipo comercial." },
  { title: "Carrito y checkout", problem: "Llegan al final y abandonan.", body: "Revisamos costos de envío, plazos, medios de pago, errores y pasos innecesarios. Implementamos los cambios que permite la plataforma y el alcance acordado." },
  { title: "Merchandising y recomendaciones", problem: "La tienda muestra lo mismo a compradores distintos.", body: "Priorizamos productos, complementos y mensajes según la categoría y las señales disponibles. Probamos qué ayuda a elegir y qué aporta valor al pedido." },
  { title: "Compra recurrente", problem: "La primera venta no se convierte en una relación.", body: "Analizamos recorridos de clientes que vuelven, necesidades de reposición y compra complementaria para plantear experiencias relevantes de recompra." },
]

export const croSteps = [
  { title: "Diagnóstico del recorrido", body: "Revisamos medición, embudos, búsquedas internas, sesiones y datos comerciales. Elegimos una categoría o un recorrido con un problema concreto y una oportunidad de negocio.", deliverable: "Mapa de fricciones y punto de partida de las métricas." },
  { title: "Hipótesis y prioridades", body: "Definimos qué cambio proponemos, a quién afecta y qué esperamos observar. Ordenamos las mejoras por evidencia, impacto esperado y esfuerzo, con una métrica principal y criterios de evaluación.", deliverable: "Backlog priorizado y plan de implementación." },
  { title: "Diseño e implementación", body: "Preparamos textos, diseño y cambios funcionales. Los implementamos sobre tu tienda, revisamos móvil y escritorio, y comprobamos formularios, enlaces y eventos antes de activarlos.", deliverable: "Mejoras implementadas, registro de cambios y validación técnica." },
  { title: "Prueba y seguimiento", body: "Cuando el volumen permite una comparación útil, ejecutamos pruebas con control y variante. En otros casos corregimos fricciones y seguimos la evolución, teniendo en cuenta campañas, stock y estacionalidad.", deliverable: "Seguimiento de la exposición, conversiones y métricas de protección." },
  { title: "Aprendizaje y siguiente mejora", body: "Revisamos resultados y decidimos qué mantener, ajustar o retirar. Documentamos lo aprendido y actualizamos las prioridades para el siguiente ciclo.", deliverable: "Reporte mensual con resultados, límites y próximas acciones." },
]

export const croDeliverables = [
  "Diagnóstico de fricciones y revisión de la medición.",
  "Backlog de hipótesis y prioridades acordadas.",
  "Diseño e implementación de las mejoras incluidas en el alcance.",
  "Validación en móvil y escritorio, con seguimiento de eventos.",
  "Experimentos cuando existen hipótesis y volumen adecuados.",
  "Reporte mensual de cambios, resultados y siguiente decisión.",
]

export const croModes = [
  { title: "CRO continuo", tag: "El servicio de base", body: "Un ciclo de análisis, priorización, implementación y seguimiento para mejorar el recorrido de compra de tu ecommerce.", items: ["Categorías, fichas y flujos prioritarios.", "Mejoras ejecutadas sobre tu plataforma.", "Medición y experimentación según el caso.", "Reporte y planificación mensual."] },
  { title: "CRO + personalización", tag: "Ampliación opcional", body: "Sumamos campañas con nuestro motor propio de personalización para adaptar la experiencia a segmentos y comportamientos concretos.", items: ["Definición de segmentos y reglas de campaña.", "Mensajes, recomendaciones y CTA por contexto.", "Configuración y validación de las experiencias.", "Seguimiento de exposición y resultados por segmento."] },
]

export const croFaqs = [
  { question: "¿Qué incluye la implementación CRO?", answer: "Incluye los cambios de contenido, diseño y funcionamiento acordados para las páginas o recorridos prioritarios, junto con la validación y la medición. Definimos accesos, responsables, capacidad de ejecución y dependencias de la plataforma antes de empezar." },
  { question: "¿El servicio sirve para ecommerce B2B?", answer: "Sí. Trabajamos tanto la compra directa como la venta que requiere presupuesto, consulta o demo. En B2B medimos la calidad de los contactos y el avance comercial cuando el CRM lo permite, además del envío del formulario." },
  { question: "¿La personalización es obligatoria?", answer: "Es opcional. El servicio CRO puede trabajar con mejoras comunes a todos los compradores. Sumamos nuestro motor de personalización cuando existe una hipótesis que requiere adaptar mensajes, recomendaciones o llamadas a la acción por segmento." },
  { question: "¿Qué hace el motor propio de personalización?", answer: "Permite configurar campañas para adaptar mensajes, recomendaciones de productos y llamadas a la acción según segmentos, comportamiento e intención de compra. Definimos reglas, público, variantes y medición para cada campaña. La integración y las señales disponibles se revisan con la plataforma de cada tienda." },
  { question: "¿Siempre hacen pruebas A/B?", answer: "Las usamos cuando la hipótesis, la medición y el volumen permiten obtener una comparación útil. Con poco tráfico podemos corregir problemas de usabilidad y estudiar señales más frecuentes, como comparar productos o iniciar una consulta. Una mejora observada antes y después no demuestra por sí sola un efecto causal." },
  { question: "¿Tengo que cambiar mi tienda o mis herramientas?", answer: "Partimos de la plataforma de ecommerce, la analítica y el CRM existentes. Revisamos sus posibilidades y definimos qué cambios podemos implementar. Si una mejora requiere una licencia o integración adicional, queda identificada en la propuesta." },
  { question: "¿Cómo sabré si está funcionando?", answer: "Acordamos una métrica principal para cada intervención y revisamos pedidos, contactos, ingresos y margen cuando hay datos de costos. También observamos indicadores de protección como errores, abandonos o devoluciones. El reporte muestra qué se cambió, qué ocurrió y qué decisión tomamos." },
  { question: "¿Cómo se define el presupuesto y cuándo se ven resultados?", answer: "La inversión depende de las categorías y recorridos incluidos, las integraciones, la complejidad de implementación y el ritmo de trabajo. La personalización y sus costos se detallan por separado cuando se contratan. El plazo de evaluación depende del ciclo de compra y del volumen; no fijamos un aumento de conversión garantizado." },
]

export function croMarkdown() {
  return [
    `# ${CRO_TITLE}`, `URL: ${CRO_URL}`, CRO_INTRO,
    "## Qué es CRO en The Stack House", "CRO es el proceso continuo de mejorar la conversión de una tienda mediante análisis, hipótesis, implementación y evaluación. En The Stack House conecta catálogo, experiencia de compra y resultados comerciales, con foco en ecommerce B2B y compra compleja.",
    "## Qué optimizamos", ...croAreas.flatMap(a => [`### ${a.title}`, a.problem, a.body]),
    "## Cómo lo implementamos", ...croSteps.flatMap((s, i) => [`### ${i + 1}. ${s.title}`, s.body, `Entregable: ${s.deliverable}`]),
    "## Qué recibes", croDeliverables.map(d => `- ${d}`).join("\n"),
    "## Modalidades de trabajo", ...croModes.flatMap(m => [`### ${m.title}`, m.body, m.items.map(i => `- ${i}`).join("\n")]),
    "El alcance, la inversión inicial, la operación mensual y las licencias se detallan en la propuesta. La personalización con software propio es opcional.",
    "## Preguntas frecuentes", ...croFaqs.flatMap(f => [`### ${f.question}`, f.answer]),
    "## Contacto", "[Revisemos tu ecommerce](https://thestackhouse.io/auditoria?lang=es) · contact@thestackhouse.io",
  ].join("\n\n") + "\n"
}
