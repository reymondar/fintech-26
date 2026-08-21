# The Stack House — Instrucciones para Claude

## Antes de cada push

Antes de hacer `git push`, revisar y actualizar todo lo que aplique según los cambios del commit:

---

## Checklist post-cambios: AI Readiness

Cada vez que terminamos de hacer ajustes al sitio (nueva página, nuevo artículo de blog, cambio de servicios, nuevo precio, etc.), hay que revisar y actualizar estos archivos:

### 1. `public/llms.txt`
Agregar cualquier página nueva o artículo nuevo bajo la sección correspondiente.
Formato:
```
- [Título del artículo](https://thestackhouse.io/blog/slug): Descripción corta de una línea.
```

### 2. `public/llms-full.txt`
Agregar el resumen completo del artículo o página nueva. Para artículos del blog, incluir:
- Título, URL, fecha, tiempo de lectura
- Resumen de 3-5 líneas con los puntos clave

### 3. `app/sitemap.ts`
El sitemap es dinámico y se genera solo a partir de los posts en `content/posts/`. No requiere cambio manual para artículos nuevos. Sí hay que actualizarlo si se agrega una página nueva que no sea blog.

### 4. `public/robots.txt`
Solo tocar si se agrega un nuevo bot de IA que haya que permitir o bloquear. Actualmente permite todos los bots: GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot, Google-Extended, Googlebot, Bingbot, meta-externalagent, CCBot. Política: exposición máxima a todos los motores de IA incluyendo corpus de entrenamiento.

### 5. `app/blog/[slug]/page.tsx`
No requiere cambios por artículo. El JSON-LD de BlogPosting y BreadcrumbList se genera automáticamente desde el frontmatter del MDX.

### 6. Frontmatter de cada artículo MDX
Asegurarse de que cada artículo en `content/posts/` tenga estos campos completos:
```yaml
---
title: ""
description: ""
date: "YYYY-MM-DD"
category: ""
author: "Ramón Arana"
readTime: "X min"
keywords: ["keyword1", "keyword2"]
---
```
Los keywords son importantes para el JSON-LD de BlogPosting.

### 7. `app/api/md/blog/route.ts`
No requiere cambios. Genera automáticamente la lista de posts desde `getAllPosts()`.

### 8. `app/api/md/blog/[slug]/route.ts`
No requiere cambios. Sirve el contenido MDX crudo de cada post automáticamente.

### 9. `app/api/md/services/route.ts` y `app/api/md/route.ts`
Actualizar si cambian los precios, servicios o descripción de la empresa. Son archivos de texto estático.

---

## Estructura de archivos AI-ready

```
public/
  robots.txt              — permisos para bots de IA + refs a llms.txt
  llms.txt                — índice para modelos de lenguaje
  llms-full.txt           — versión completa con resúmenes
  sitemap.xml             — generado automáticamente por Next.js
  og-default.png          — imagen OG (1200×630px, <300KB)

middleware.ts             — detecta Accept: text/markdown, reescribe a /api/md/...
next.config.ts            — agrega Link header en todas las respuestas

app/
  sitemap.ts              — genera sitemap.xml dinámicamente
  layout.tsx              — JSON-LD Organization + WebSite (global) + OG tags
  page.tsx                — JSON-LD FAQPage (homepage)
  .well-known/
    api-catalog/
      route.ts            — catálogo de APIs (apuntado por el Link header)
  blog/[slug]/
    page.tsx              — JSON-LD BlogPosting + BreadcrumbList + OG article
  api/md/
    route.ts              — homepage en Markdown
    blog/
      route.ts            — listado del blog en Markdown
      [slug]/route.ts     — cada artículo en Markdown (sirve el MDX crudo)
    services/
      route.ts            — página de servicios en Markdown
```

---

## Stack técnico

- Next.js App Router
- MDX con `next-mdx-remote/rsc` y `gray-matter`
- Posts en `content/posts/*.mdx`
- Fuentes: Manrope, Bricolage Grotesque, Instrument Sans
- Analytics: Vercel Analytics + Microsoft Clarity + GTM (GTM-NSRBC7Q5)
- Deploy: Vercel
- Dominio: thestackhouse.io
