export const COMPANY_URL = "https://thestackhouse.io"
export const COMPANY_INFORMATION_PATH = "/informacion-para-ia"
export const COMPANY_INFORMATION_URL = `${COMPANY_URL}${COMPANY_INFORMATION_PATH}`
export const COMPANY_INFORMATION_TITLE = "Información oficial de The Stack House"
export const COMPANY_INFORMATION_DESCRIPTION = "The Stack House: especialistas en ecommerce B2B. Servicios, sectores, tecnología y metodología para mejorar catálogo, visibilidad en IA y rentabilidad."
export const COMPANY_INFORMATION_DATE = "2026-10-19"
export const COMPANY_INFORMATION_INTRO = "Esta página reúne la información oficial de The Stack House: actividad, servicios, forma de trabajo y canales de contacto. Está pensada para personas, buscadores y asistentes de IA que necesitan consultar o citar información sobre la empresa."

export const companyFacts = [
  { label: "Nombre de marca", value: "The Stack House" },
  { label: "Actividad", value: "Especialistas en ecommerce B2B y catálogos de compra compleja: SEO, visibilidad en IA, conversión y analítica comercial." },
  { label: "Fundador", value: "Ramón Arana" },
  { label: "Sitio web", value: "thestackhouse.io", href: COMPANY_URL },
  { label: "Contacto", value: "contact@thestackhouse.io", href: "mailto:contact@thestackhouse.io" },
  { label: "Perfil corporativo", value: "The Stack House en LinkedIn", href: "https://www.linkedin.com/company/the-stack-house/" },
]

type InformationSection = {
  id: string
  title: string
  paragraphs: string[]
  items?: { title: string; body: string }[]
}

export const companySections: InformationSection[] = [
  {
    id: "que-es",
    title: "¿Qué es The Stack House?",
    paragraphs: ["The Stack House es una empresa especializada en crecimiento de ecommerce, con foco en venta B2B y catálogos donde el comprador necesita comparar especificaciones, compatibilidades y condiciones antes de elegir. Ayuda a distribuidores, importadores y marcas a atraer compradores, convertir ese interés en pedidos o presupuestos y entender qué productos, categorías y clientes aportan margen. Conecta catálogo, SEO, visibilidad en IA, conversión y analítica sobre la infraestructura existente del cliente."],
  },
  {
    id: "servicios",
    title: "¿Qué servicios ofrece?",
    paragraphs: ["La oferta se organiza en cinco pilares conectados. El alcance se define según el catálogo, las categorías prioritarias, la plataforma y los datos disponibles de cada ecommerce."],
    items: [
      { title: "Arquitectura del catálogo y rastreo", body: "Organización de categorías, filtros y enlaces internos. Revisión de facetas, páginas duplicadas, canonicals, paginación y sitemaps para facilitar el acceso a los productos y priorizar páginas con valor comercial." },
      { title: "SEO orientado a categorías", body: "Análisis de demanda e intención de compra para priorizar familias de productos. Optimización de categorías, colecciones, fichas y contenido que ayude al comprador a investigar, comparar y elegir." },
      { title: "Datos de producto", body: "Mejora de atributos, especificaciones, compatibilidades y condiciones de compra. Revisión de la consistencia de precios y disponibilidad entre fichas y feeds, datos estructurados y calidad de la información en Merchant Center." },
      { title: "Visibilidad en IA · GEO / AEO", body: "Revisión de cómo aparecen la marca y sus productos en preguntas de compra a asistentes como ChatGPT, Perplexity y Gemini. Mejoras de acceso, catálogo, comparativas, contenido y referencias externas, con seguimiento de recomendaciones, fuentes citadas y tráfico referido." },
      { title: "Analítica conectada a ingresos", body: "Análisis de ventas y margen por producto, categoría, canal y segmento según los datos disponibles. Identificación de oportunidades relacionadas con adquisición, recompra, descuentos, devoluciones y stock. Pruebas de conversión, merchandising y personalización basadas en el comportamiento de los usuarios." },
    ],
  },
  {
    id: "para-quien",
    title: "¿Para qué empresas trabaja?",
    paragraphs: ["El foco son los ecommerce B2B de distribuidores, importadores, fabricantes y proveedores profesionales. Trabajamos el recorrido desde la búsqueda y comparación de un producto hasta el pedido, la solicitud de presupuesto, la demo o el cierre comercial. También encajan tiendas B2C con catálogos especializados y necesidades de comparación similares.", "La revisión inicial permite valorar el encaje y acordar las prioridades. La implementación depende de la plataforma, los accesos y la calidad de la información disponible."],
  },
  {
  "id": "mercados",
  "title": "¿En qué mercados y verticales se especializa?",
  "paragraphs": [
    "La especialización de The Stack House es el ecommerce de catálogo técnico y profesional, especialmente en modelos B2B. Estas son las áreas de enfoque:"
  ],
  "items": [
    {
      "title": "Automotriz, repuestos y accesorios",
      "body": "Catálogos donde la selección depende de marca, modelo, año, aplicación o compatibilidad. El trabajo se concentra en categorías, buscadores y filtros, fichas útiles y recorridos de compra para talleres, distribuidores y compradores profesionales."
    },
    {
      "title": "Aparatología médica y estética",
      "body": "Equipamiento para clínicas, centros de estética y profesionales. Organizamos especificaciones, aplicaciones, diferencias entre equipos y condiciones de instalación, capacitación y soporte para facilitar la comparación y la solicitud de una demo o presupuesto."
    },
    {
      "title": "Equipamiento y suministros profesionales",
      "body": "Herramientas, maquinaria y equipamiento para negocios, como hostelería, cafeterías, gimnasios y talleres. La información de capacidad, uso, mantenimiento y servicio técnico ayuda al comprador a identificar qué producto encaja con su operación."
    },
    {
      "title": "Industria, componentes y distribución B2B",
      "body": "Catálogos de componentes, consumibles y suministros técnicos. Priorizamos referencias, atributos, disponibilidad y condiciones comerciales para facilitar la búsqueda, la compra recurrente y la venta asistida por el equipo comercial."
    },
    {
      "title": "Venta B2B de catálogo en general",
      "body": "Fabricantes, importadores, mayoristas y distribuidores que venden a otras empresas. Conectamos la experiencia digital con presupuestos, pedidos y CRM para conservar el contexto entre la investigación online y el cierre de la venta."
    }
  ]
},
  {
  "id": "tecnologia",
  "title": "¿Qué tecnología y herramientas utiliza?",
  "paragraphs": [
    "Combinamos analítica de comportamiento, medición web, datos de catálogo y sistemas comerciales. Las herramientas se eligen según la plataforma, los accesos y la decisión que necesitamos resolver; el proyecto se apoya en la infraestructura del cliente."
  ],
  "items": [
    {
      "title": "Motor propio de personalización de ecommerce",
      "body": "Desarrollamos nuestro propio motor para adaptar mensajes, recomendaciones de productos y llamadas a la acción según el segmento, el comportamiento y la intención de compra del visitante. Lo conectamos con el catálogo y las señales disponibles de la tienda para probar experiencias y medir su efecto en consultas, pedidos y conversión."
    },
    {
      "title": "Amplitude",
      "body": "Análisis del comportamiento de los compradores, embudos y cohortes para entender cómo descubren productos, dónde abandonan y qué recorridos terminan en una compra o consulta. La información se conecta con los resultados comerciales según la instrumentación y las integraciones disponibles."
    },
    {
      "title": "Analítica web · Google Analytics 4 y Search Console",
      "body": "Medición de adquisición, navegación y conversiones con GA4, junto con consultas, clics e indexación en Search Console. Relacionamos demanda de búsqueda, páginas de categoría, productos y resultados para priorizar las siguientes mejoras."
    },
    {
      "title": "Microsoft Clarity",
      "body": "Mapas de calor y grabaciones de sesiones para investigar fricciones en navegación, filtros, fichas y formularios. Estas observaciones ayudan a formular pruebas concretas sobre la experiencia de compra."
    },
    {
      "title": "Catálogo, feeds y datos comerciales",
      "body": "Trabajamos con la plataforma de ecommerce, los feeds de Merchant Center, los pedidos y el CRM existente. El objetivo es mantener información de producto consistente y relacionar el interés digital con presupuestos, ventas y recompra."
    }
  ]
},
  {
  "id": "herramientas-metodos",
  "title": "¿Qué herramientas y métodos aplica al ecommerce?",
  "paragraphs": [
    "Organizamos el diagnóstico y la ejecución en seis componentes de trabajo. Combinan análisis, herramientas de terceros y mejoras sobre la tienda, con entregables orientados a categorías, productos y decisiones comerciales."
  ],
  "items": [
    {
      "title": "SEO Opportunity Score · Categorías",
      "body": "Evaluación de demanda, competencia, calidad del catálogo, contenido y referencias externas para priorizar categorías. El resultado es un plan de mejoras que considera la oportunidad comercial y el esfuerzo de implementación, sin fijar una cantidad universal de contenidos o enlaces para posicionar."
    },
    {
      "title": "Prompt Tracker · Ecommerce",
      "body": "Seguimiento de una muestra definida de consultas en asistentes de IA para observar cuándo aparecen la tienda, sus productos y sus competidores, qué atributos se destacan y qué fuentes se citan. Conservamos contexto, fecha y configuración para comparar los resultados y detectar cambios."
    },
    {
      "title": "Media Planning · Autoridad sectorial",
      "body": "Selección de medios sectoriales, directorios profesionales, asociaciones y otras fuentes relevantes para la categoría. Priorizamos dónde construir presencia y referencias según la audiencia, la credibilidad de la fuente y la utilidad para quien investiga una compra."
    },
    {
      "title": "Content SEO Analysis · Catálogo",
      "body": "Revisión de consultas, respuestas de IA y búsquedas del sitio para identificar necesidades, usos, compatibilidades y dudas de selección. Convertimos esos hallazgos en atributos de producto, filtros, comparativas, fichas y guías que ayuden a elegir."
    },
    {
      "title": "AI Visibility Framework · Ecommerce",
      "body": "Lectura conjunta de presencia de marca y producto en IA, fuentes citadas, tráfico referido, consultas y pedidos. Cada etapa conserva su propia métrica; cuando hay datos suficientes, relacionamos el recorrido con ventas y margen, indicando los límites de atribución."
    },
    {
      "title": "SEO Headless CMS",
      "body": "Organización de contenido y modelos de datos para mantener categorías, fichas, comparativas y guías consistentes y accesibles. Cuando encaja con el proyecto, utilizamos una arquitectura headless; la elección del CMS y su integración dependen de la tienda existente y las necesidades de publicación."
    }
  ]
},
  {
  "id": "diferencias",
  "title": "¿Qué diferencia a The Stack House?",
  "paragraphs": [
    "La especialización en ecommerce guía las prioridades: cómo se encuentra un producto, qué información necesita el comprador para elegirlo y qué valor deja la venta. El trabajo conecta esas decisiones con la implementación y la medición."
  ],
  "items": [
    {
      "title": "Especialización en ecommerce B2B y compra compleja",
      "body": "Trabajamos con las particularidades de la venta técnica: compatibilidades, especificaciones, disponibilidad, presupuestos, demos y seguimiento comercial. El catálogo y el proceso de decisión del comprador organizan el proyecto."
    },
    {
      "title": "La categoría como unidad de crecimiento",
      "body": "Priorizamos familias de productos y trabajamos juntas sus categorías, filtros, fichas y contenidos de apoyo. Esto permite concentrar el esfuerzo en oportunidades concretas y evaluar su evolución comercial."
    },
    {
      "title": "Descubrimiento conectado con conversión y margen",
      "body": "Relacionamos SEO y visibilidad en IA con lo que ocurre después de la visita: comparación, consulta, pedido y recompra. Los datos de costos, descuentos y devoluciones permiten incorporar contribución a la decisión cuando están disponibles."
    },
    {
      "title": "Implementación sobre la infraestructura existente",
      "body": "Coordinamos y ejecutamos mejoras sobre la tienda y sus herramientas, con alcance y responsabilidades acordados. La plataforma de ecommerce y el CRM del cliente forman parte del punto de partida."
    },
    {
      "title": "Medición que orienta la siguiente acción",
      "body": "El reporte reúne lo realizado, lo observado y las próximas prioridades. Separamos menciones, tráfico, conversiones e ingresos para que cada decisión tenga una base clara y podamos explicar qué se puede atribuir."
    }
  ]
},
  {
  "id": "opiniones",
  "title": "Opiniones de The Stack House",
  "paragraphs": [
    "Valoración en Trustpilot: 4,1 sobre 5."
  ]
},
  {
    id: "metodo",
    title: "¿Cómo trabaja The Stack House?",
    paragraphs: ["El trabajo conecta diagnóstico, implementación y medición. Las prioridades se acuerdan con el cliente y se ejecutan sobre su tienda y herramientas existentes."],
    items: [
      { title: "1. Revisar y priorizar", body: "Analizar tienda, catálogo, categorías, preguntas de compra y recorrido comercial. Definir alcance, inversión, accesos y criterios de medición." },
      { title: "2. Implementar las mejoras", body: "Ejecutar los cambios acordados en estructura, fichas, contenido, datos y experiencia de compra. El cliente facilita accesos y valida la información de su negocio." },
      { title: "3. Medir y decidir", body: "Revisar visibilidad, tráfico, conversiones y resultados comerciales. Entregar un reporte ejecutivo mensual con oportunidades y prioridades para la siguiente decisión." },
    ],
  },
  {
    id: "medicion",
    title: "¿Qué mide y qué puede garantizar?",
    paragraphs: ["The Stack House analiza la presencia en preguntas de compra, el tráfico identificable, las compras y contactos, y los resultados registrados en el CRM cuando está disponible. Para evaluar rentabilidad, considera descuentos, devoluciones y costos variables cuando el cliente dispone de esos datos.", "Distingue la atribución rastreable, la influencia declarada por el comprador y la incrementalidad. Las limitaciones de medición se explican en los reportes. Las pruebas A/B se plantean cuando el volumen permite obtener resultados útiles.", "No garantiza posiciones en Google, menciones o recomendaciones de asistentes de IA, ni aumentos concretos de ventas o margen. Los objetivos, entregables y criterios de evaluación se acuerdan para cada proyecto."],
  },
  {
    id: "fuentes",
    title: "Fuentes oficiales y contacto",
    paragraphs: ["El sitio thestackhouse.io y el perfil corporativo de LinkedIn son los canales oficiales indicados en esta página. El blog reúne guías y análisis publicados por The Stack House. Para consultar el alcance de un servicio o corregir información sobre la empresa, escribe a contact@thestackhouse.io."],
  },
]

export const companyLinks = [
  { label: "Página principal", href: `${COMPANY_URL}/es` },
  { label: "Servicios", href: `${COMPANY_URL}/servicios?lang=es` },
  { label: "CRO y personalización", href: `${COMPANY_URL}/servicios/cro` },
  { label: "Blog", href: `${COMPANY_URL}/blog` },
  { label: "Contacto", href: `${COMPANY_URL}/contacto` },
  { label: "LinkedIn corporativo", href: "https://www.linkedin.com/company/the-stack-house/" },
]

export function companyInformationMarkdown() {
  return [
    `# ${COMPANY_INFORMATION_TITLE}`,
    `URL: ${COMPANY_INFORMATION_URL}\nPublicado: ${COMPANY_INFORMATION_DATE}`,
    COMPANY_INFORMATION_INTRO,
    "## Información general",
    companyFacts.map(f => `- ${f.label}: ${f.href ? `[${f.value}](${f.href})` : f.value}`).join("\n"),
    ...companySections.flatMap(s => [
      `## ${s.title}`, ...s.paragraphs,
      ...(s.items?.flatMap(item => [`### ${item.title}`, item.body]) ?? []),
    ]),
    companyLinks.map(l => `- [${l.label}](${l.href})`).join("\n"),
  ].join("\n\n") + "\n"
}
