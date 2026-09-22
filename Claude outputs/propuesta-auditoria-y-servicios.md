# Propuesta — Páginas de Auditoría y Servicios

**Sitio:** thestackhouse.io · repo `sh-new-landing` (Next.js 16 App Router, Tailwind 4, framer-motion)
**Fecha:** 15 sep 2026 · **Estado:** propuesta para aprobar antes de construir

---

## 0. Qué necesito que apruebes

Esto es la **primera entrega: estructura y copy**. No he tocado código todavía. Léelo, corrige lo que quieras y, cuando digas OK, construyo.

Hay **cuatro decisiones** que me bloquean para construir y que no puedo tomar por ti porque tienen coste o dependen de herramientas tuyas. Están detalladas en la §6; el resumen:

1. **Calendario:** ¿seguimos con Google Appointment Scheduling embebido (gratis, pero re-pregunta nombre/email y no da webhook fiable) o migramos a Cal.com (prefill + webhook + mejor embed)? → **Recomiendo Cal.com.**
2. **Almacenamiento:** ¿guardamos los leads en Notion vía n8n (tu arquitectura ya acordada en la vault) o en un MVP más simple (Notion directo + email) para arrancar ya? → **Recomiendo empezar por el MVP y dejar n8n listo para conectar.**
3. **Ruta de servicios:** hoy hay dos páginas de servicios que se pisan (`/services` y `/servicios/ecommerce-personalizacion`). ¿Consolidamos en `/servicios` y redirigimos la vieja? → **Recomiendo sí.**
4. **Limpieza de honestidad:** la página vieja lleva precios inventados ($1.500 / $500 mes) y la de personalización promete métricas no validadas (+15-20% AOV). Violan tus propias reglas. ¿Los quito? → **Recomiendo quitarlos.**

Todo lo demás (recorrido, campos, copy, esquema de los 7 servicios) es mi propuesta concreta; dime qué cambiar.

---

## 1. Contexto: cómo está el sitio hoy

Lo que encontré revisando el repo, para que las decisiones tengan base:

- **i18n:** la landing (`/`, `/es`, `/en`) es bilingüe con un diccionario (`lib/landing-en.ts`) y el hook `useTranslation()` / `t()`. Las páginas secundarias (`/services`, `/contacto`, `/servicios/ecommerce-personalizacion`) están **hardcodeadas en español** y no usan ese sistema. Para cumplir "español e inglés" en las páginas nuevas hay que engancharlas al mismo sistema `t()`.
- **Calendario:** el CTA "Audita tu tienda" apunta a **Google Appointment Scheduling** (`calendar.app.google/aGDRM9XzkQFEndG77`), abriendo pestaña nueva. Aparece en 8 sitios: navbar (x2), hero, final-cta, services-cta, footer, contacto y el CTA de cada artículo del blog.
- **Almacenamiento:** el formulario de `/contacto` hace POST a `/api/contact`, que **hoy solo hace `console.log`** — no guarda nada, no envía email. Resend está comentado. Es decir: ahora mismo no capturáis ningún dato de forma persistente.
- **Rutas de servicios (hoy están descuidadas):**
  - `/services` — copy genérico de consultoría GEO ("Legible/Confiable/Elegible", escalera Auditoría→Construir→Defender→Expandir con **precios $1.500 / $500 mes**). Está en el sitemap pero **no está enlazada desde el navbar ni el footer**.
  - `/servicios/ecommerce-personalizacion` — página profunda de personalización, con **métricas de resultado sin validar** (+15-20% AOV, +20% RPV) y **voseo** ("tenés", "agregás") que rompe la regla de español neutro. No está ni en el sitemap ni en el nav.
- **Diseño reutilizable:** fondo `zinc-50`, texto `zinc-900`/`zinc-500`, acento **esmeralda `#009967`**, tarjetas blancas `rounded-2xl border-zinc-200 shadow-sm`, CTAs píldora negra `rounded-full bg-zinc-900`. Tipografías: Instrument Sans (headings), Cal Sans/Bricolage (display), Manrope (cuerpo). Animaciones framer-motion con `useInView`. Iconos lucide. **Las dos páginas nuevas reutilizan todo esto tal cual.**

---

## 2. Página 1 — Auditoría y reserva

### 2.1 Ruta y CTA

- **Ruta nueva:** `/auditoria` (bilingüe con `t()`; el switcher ES/EN ya existente conmuta el idioma).
- El CTA **"Audita tu tienda"** deja de abrir el calendario en pestaña nueva y pasa a llevar a `/auditoria`. Actualizo las 8 referencias. El calendario vive **embebido dentro** de esta página, al final del recorrido.

### 2.2 El recorrido (4 pantallas, una sola URL)

```
1. Intro breve  →  2. Formulario (2 pasos)  →  3. Calendario embebido  →  4. Confirmación
   "cuéntanos          Paso 1: tu tienda          reservar 20 min          reserva confirmada
    de tu tienda"      Paso 2: contacto
```

Todo ocurre en `/auditoria` (transiciones suaves, sin recargar). Barra de progreso "Paso 1 de 2 · Tu tienda / Paso 2 de 2 · Contacto".

**Regla clave del recorrido:** el formulario se guarda al terminar el Paso 2, pero **enviar el formulario ≠ tener reunión**. Solo se considera reserva cuando la persona elige hueco en el calendario. Ver §2.6.

### 2.3 Los campos definitivos

Agrupados en dos pasos cortos, tal como pediste. Nada de criterios de descarte ni campos sin razón comercial.

**Paso 1 — Tu tienda** (para preparar la revisión)

| Campo | Tipo | Obligatorio | Opciones |
|---|---|---|---|
| URL de la tienda | texto (url) | Sí | placeholder `https://tutienda.com` |
| Categoría de productos | select + "Otra" (campo libre) | Sí | Salud y estética · Tecnología y electrónica · Maquinaria y equipamiento profesional · Hogar y mobiliario · Moda y accesorios · Alimentación y bebidas · Industrial / B2B · Otra |
| Países o regiones donde vende | multi-select + campo libre | Sí | España · México · Chile · Colombia · Resto de LatAm · Resto de Europa · EE. UU. / Canadá · Global |
| Inversión mensual en publicidad | moneda + rango | Sí | **Moneda:** EUR · USD · MXN · CLP · COP — **Rango:** No invertimos actualmente · Menos de 1.000 · 1.000–5.000 · 5.000–15.000 · 15.000–50.000 · Más de 50.000 |

**Paso 2 — Contacto**

| Campo | Tipo | Obligatorio |
|---|---|---|
| Nombre | texto | Sí |
| Correo profesional | email | Sí |

> Categorías y regiones reflejan tu vertical (ecommerce B2B high-ticket, cuña médico-estética + LatAm/España) sin cerrar la puerta a otros. Si quieres estrechar más las opciones hacia la cuña, lo ajusto.

### 2.4 Copy propuesto (ES)

**Pantalla 1 — Intro**
> **Audita tu tienda.**
> Cuéntanos sobre tu tienda para preparar la revisión. Dos minutos ahora, y en la llamada de 20 minutos vamos directo a lo tuyo: qué responde la IA cuando preguntan por tu categoría, a quién recomienda y dónde estás tú.
> *[Empezar →]*
> `20 minutos · sin costo · sin compromiso`

**Paso 1 — Tu tienda** (encabezado)
> **Tu tienda**
> Con esto preparamos la revisión antes de hablar. Cuanto más claro, más útil la llamada.

**Paso 2 — Contacto** (encabezado)
> **¿Dónde te escribimos?**
> Para enviarte la confirmación y el resumen de la revisión.

**Botón fin de formulario:** `Elegir hueco para la revisión →`

**Pantalla 3 — Calendario** (encabezado sobre el embed)
> **Casi listo. Elige cuándo.**
> Reserva 20 minutos. Ya tenemos los datos de tu tienda — no hace falta repetir nada.
> *(si el calendario no carga)* ¿No ves el calendario? **Ábrelo aquí →**

**Pantalla 4 — Confirmación**
> **Reserva confirmada.**
> Te esperamos el [fecha/hora]. Te llega la invitación por correo. Antes de la llamada revisamos tu tienda con las preguntas reales de tu categoría.

**Estado intermedio — formulario enviado pero SIN reservar** (si abandona antes de elegir hueco)
> **Recibimos los datos de tu tienda — pero aún no hay reunión.**
> Falta elegir un hueco de 20 minutos para que la revisión sirva de algo. *[Elegir hueco →]*

Copy EN equivalente (irá a `lib/landing-en.ts`): "Audit your store" / "Tell us about your store to prepare the review" / "Almost there. Pick a time." / "Booking confirmed." etc. Entrego el set EN completo al construir.

### 2.5 Decisión — Calendario (embed y prefill)

**Verificado:** Google Appointment Scheduling **sí se puede embeber** por iframe. **Pero no permite prefill fiable** de nombre/email ni de campos personalizados por URL — es una limitación conocida y sin solución oficial. Eso choca con tu requisito de "evitar pedir de nuevo los datos que ya tenemos" y con "asociar las respuestas a la reserva".

| | **A) Seguir con Google (embebido)** | **B) Migrar a Cal.com** *(recomendado)* |
|---|---|---|
| Coste | Gratis | Gratis (self/hosted plan free) |
| Embed | Sí (iframe) | Sí (iframe/inline, mejor estilado) |
| Prefill nombre/email | ❌ No → re-pregunta en el calendario | ✅ Sí por URL |
| Webhook al reservar | ❌ No fiable | ✅ Sí (clave para atribuir formulario↔reserva) |
| Migración | Ninguna | Crear cuenta + rehacer el tipo de cita "20 min" |

**Recomendación: Cal.com.** Resuelve de golpe los tres requisitos que Google no puede (no repetir datos, atar formulario a reserva, diferenciar enviado/confirmado por webhook). Calendly funciona igual pero es de pago para webhooks; Cal.com da webhook gratis. Si prefieres no migrar, seguimos con Google embebido y asumimos que el calendario vuelve a pedir nombre/email (duplicación menor, aceptable pero fea).

### 2.6 Decisión — Almacenamiento y entrega al equipo

Hoy no se guarda nada. Propongo dos niveles; podemos arrancar por el MVP y crecer.

**Estados que hay que distinguir:**
- `formulario_enviado` — completó el Paso 2 (tenemos datos de tienda + contacto).
- `reunion_confirmada` — además eligió hueco (webhook del calendario).

**MVP (para lanzar ya):**
`/api/audit` guarda cada envío en una base de datos de **Notion** ("Auditorías/Leads", estado = `formulario_enviado`) + email al equipo (Resend). Cuando la persona reserva, el email de confirmación del calendario avisa; el match formulario↔reserva se hace por correo (manual al principio).

**Completo (tu arquitectura de la vault):**
Formulario → `/api/audit` → **webhook n8n** → Notion (lead, `formulario_enviado`) + email. **Webhook del calendario** (Cal.com) → n8n → actualiza el mismo registro a `reunion_confirmada` y lo empuja al **CRM** (fuente de verdad de ventas, como dice tu doc de módulos). Notion queda como portal/ops, no como CRM.

**Recomendación:** construir el MVP ahora (Notion + email) con el `/api/audit` ya preparado para disparar el webhook de n8n, de modo que activar el pipeline completo sea conectar, no reescribir. Necesito de ti, para el MVP: token de integración de Notion + ID de base, o me dices que uses Google Sheets; y confirmación de a qué correo llegan los avisos.

### 2.7 Si el calendario no carga

Fallback explícito: si el iframe no monta en X segundos, se muestra el enlace directo ("Ábrelo aquí →") para no perder la reserva. Y el mensaje de "formulario enviado ≠ reunión" siempre visible hasta que haya reserva.

---

## 3. Página 2 — Servicios

### 3.1 Ruta e integración (evitar duplicados)

- **Canónica nueva:** `/servicios` (bilingüe con `t()`).
- `/services` (la vieja, genérica, con precios inventados) → **redirección 301 a `/servicios`** y se retira su contenido. Actualizo el sitemap.
- `/servicios/ecommerce-personalizacion` → **se mantiene como página de detalle** del servicio nº5 (Personalización y conversión), enlazada desde ahí. Antes hay que **limpiarla**: quitar/matizar las métricas no validadas y corregir el voseo (decisión nº4). No se duplica: `/servicios` resume, la hija detalla.

### 3.2 Narrativa: un trabajo conectado, no paquetes sueltos

Marco tomado de tu doc `motor-de-captacion` (la cadena de 5 momentos): el comprador se pierde en eslabones encadenados, y el resultado lo marca el eslabón más débil. Por eso los servicios se presentan como **partes de un mismo trabajo**, no como productos con precio propio.

**Hero de la página:**
> **Todo lo que hace falta para que la IA te recomiende — y que esa recomendación termine en venta.**
> No es una web más bonita. Es la cadena completa: que la IA te lea, confíe en ti y te elija, y que quien llega desde ahí encuentre, entienda y compre. Cada pieza sostiene a la siguiente.

Sin precios, sin garantías de posición ni de ingresos (regla de honestidad).

### 3.3 Los 7 servicios

Para cada uno: **qué problema resuelve · qué hacemos · qué recibe el cliente.** Copy propuesto abajo. Mapeados a tu oferta de la vault (módulos entre paréntesis).

**1. Diagnóstico de tienda, catálogo y preguntas de compra** *(la auditoría; módulos de medición 1-3)*
- *Problema:* no sabes qué responde la IA cuando preguntan por tu categoría, ni a quién recomienda en tu lugar. Es un canal invisible: no sale en rojo en ningún informe.
- *Qué hacemos:* ejecutamos las preguntas reales de compra de tu sector en ChatGPT, Gemini, Perplexity y Claude, y cruzamos qué apareces, a quién nombran y de qué fuentes se fían — con tus datos (GSC, analítica).
- *Qué recibe:* una foto clara de dónde eres invisible hoy y por qué, y las prioridades. Si tu problema no es la IA, te lo decimos.

**2. Preparación del catálogo y acceso técnico** *(módulos 3-4: legibilidad + catálogo)*
- *Problema:* la IA compara por atributos que tu tienda no publica (materiales, medidas, compatibilidad, plazos, devoluciones) y describe mal tu producto. Si te lee mal, te recomienda mal — o no te recomienda.
- *Qué hacemos:* completamos atributos, datos estructurados de producto (schema), feeds y consistencia de entidad, adaptándonos a tu CMS/ERP actual. Sin instalar un PIM salvo que haga falta de verdad.
- *Qué recibe:* un catálogo que las máquinas leen sin adivinar, con los datos verificables (precio, plazo, garantía) a la vista.

**3. Contenido y autoridad para aparecer en recomendaciones** *(módulos 5-7: contenido citable + autoridad externa)*
- *Problema:* la IA casi nunca recomienda a una empresa por lo que dice de sí misma. La recomienda por lo que dicen terceros — y entre el 68% y el 85% de las citas vienen de fuera de tu web.
- *Qué hacemos:* creamos contenido que un modelo puede extraer (respuestas directas, comparativas, dato propio) y trabajamos la autoridad externa: PR digital, medios sectoriales, listados y comparativas de tu categoría.
- *Qué recibe:* material citable publicado y una presencia creciente en las fuentes que los modelos consultan. Es la parte lenta: compone en meses, no en días.

**4. Implementación del motor de captación** *(módulo: atención y captura)*
- *Problema:* quien llega desde una IA llega decidido — y si nadie responde a tiempo, ya compró en otro sitio. La demanda de máxima intención se pierde en la puerta.
- *Qué hacemos:* montamos captura y atención en tu web (asistente con información real del negocio, calificación de la consulta, enrutado y alertas a tu equipo, secuencias de seguimiento), con aviso de interacción con IA por transparencia.
- *Qué recibe:* que ningún comprador de máxima intención se quede sin respuesta, y cada consulta llega a ventas con su origen.

**5. Personalización y mejora de conversión** *(módulos: conversión + hiperpersonalización)*
- *Problema:* tu web está hecha para quien descubre; el que viene de la IA viene a confirmar. Ve el mismo mensaje aunque esté comparando productos distintos, y se enfría.
- *Qué hacemos:* rediseñamos las páginas donde decide (responder objeciones, comparativas honestas, quitar fricción) y adaptamos mensaje y productos a cada visitante, midiendo cada cambio contra un control.
- *Qué recibe:* páginas que convierten al comprador informado y una experiencia que se ajusta a quién está mirando. *(Detalle: /servicios/ecommerce-personalizacion.)*

**6. Conexión con herramientas comerciales y CRM** *(módulo: automatizaciones)*
- *Problema:* el tráfico de IA aparece como "directo" y se pierde la atribución; los datos viven sueltos entre formularios, analítica y CRM.
- *Qué hacemos:* integramos formularios, tracking, calendario, CRM y tu panel (n8n como capa de integración; Notion como centro operativo), con el origen trazado de punta a punta. Tu CRM sigue siendo la fuente de verdad de ventas.
- *Qué recibe:* un flujo donde cada lead y cada venta se conecta con su origen, sin trabajo manual.

**7. Medición, seguimiento y optimización** *(módulos: seguimiento + defensa)*
- *Problema:* se hacen cambios en la tienda sin comprobar qué pasa con las ventas, y las posiciones en IA se caen solas cuando los modelos cambian, sin que nadie lo vigile.
- *Qué hacemos:* relacionamos visibilidad, tráfico, oportunidades y ventas en un panel (GEO Metrics, GSC, GA4, Clarity, CRM), decidimos la siguiente prioridad cada mes y defendemos la posición conforme los modelos cambian.
- *Qué recibe:* un informe con formato fijo que conecta lo que hacemos con lo que vendes, y una decisión clara para el mes siguiente. Ninguna posición ni ingreso garantizado — los modelos son probabilísticos.

### 3.4 Cierre

CTA hacia la página nueva de auditoría:
> **Empieza por saber dónde estás.**
> La revisión de 20 minutos es gratis: vemos tu tienda y qué recomienda la IA en tu categoría. De ahí sale el resto.
> *[Audita tu tienda →]* → `/auditoria`

---

## 4. Integración de rutas y navegación

| Ruta | Hoy | Propuesta |
|---|---|---|
| `/auditoria` | no existe | **nueva** — recorrido de auditoría + calendario |
| `/servicios` | no existe | **nueva** — página de servicios canónica |
| `/services` | genérica + precios | **301 → `/servicios`**, contenido retirado, sitemap actualizado |
| `/servicios/ecommerce-personalizacion` | huérfana, métricas sin validar | **detalle del servicio nº5**, enlazada, limpiada |
| `/contacto` | form → `console.log` | se mantiene para contacto general; su enlace de "agenda" pasa a `/auditoria` |

**Navbar:** añadir ítem **"Servicios"** (`/servicios`) — hoy no existe. El CTA "Audita tu tienda" → `/auditoria`.
**Footer:** añadir "Servicios"; "Revisemos tu ecommerce" (hoy calendario) → `/auditoria`.
**Resto de CTAs** (hero, final-cta, services-cta, blog, contacto): todos → `/auditoria`.
**AI-readiness (CLAUDE.md):** añadir ambas páginas a `llms.txt`, `llms-full.txt`, sitemap y `/api/md/services`.

---

## 5. Observaciones de honestidad (para tu criterio)

Encontré tres cosas ya publicadas que chocan con tus propias reglas. No las toco sin tu OK:

1. **Precios inventados** en `/services` ($1.500 proyecto / $500 mes) y en la escalera de engagement. El precio está pendiente con Minitiva. → Recomiendo **quitar cifras** de la página pública.
2. **Métricas de resultado sin validar** en `/servicios/ecommerce-personalizacion` (+15-20% AOV, +20% RPV). Tu vault las marca como no validadas / dato de terceros (Adobe). → Recomiendo **quitarlas o marcarlas como dato de terceros con fuente y año**.
3. **Voseo** ("tenés", "agregás", "no meses") en varias páginas, contra la regla de español neutro de VOICE.md. → Recomiendo **normalizar** al pasarlas.

---

## 6. Qué construyo al aprobar

En cuanto me confirmes las 4 decisiones (§0) y me pases lo que necesito (cuenta de calendario elegida; token Notion o Sheets; correo del equipo), el plan de construcción es:

1. `/auditoria` — recorrido de 2 pasos + calendario embebido + estados enviado/confirmado, bilingüe.
2. `/api/audit` — guardado + email + (webhook n8n preparado).
3. `/servicios` — página de los 7 servicios, bilingüe, sin precios ni garantías.
4. Redirección `/services` → `/servicios` + limpieza de la página de personalización.
5. Actualizar todos los CTAs, navbar, footer y los archivos de AI-readiness.
6. Verificación: build local, prueba del recorrido en móvil y desktop, revisar que no queden datos duplicados ni enlaces al calendario suelto, y repaso de voz (taboo phrases).

**No construyo nada hasta que apruebes esta propuesta.**
