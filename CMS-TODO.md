# Checklist editorial de Payload

## Implementación local
- [x] Imágenes de biblioteca dentro del editor, alt y pie específico por artículo.
- [x] Selector de artículos y atributos de enlaces (nueva pestaña, nofollow, sponsored).
- [x] Bloques de preguntas/respuestas, definición, estadística con fuente, ficha, comparativa, vídeo y CTA.
- [x] Secciones compartidas con consulta de usos, versiones y registro de URLs afectadas.
- [x] Revisión SEO visible y bloqueo de publicación ante errores esenciales; borradores incompletos permitidos.
- [x] Simulación de resultado Google/redes y avisos sobre canonical, noindex y slugs.
- [x] Schema derivado del contenido y campos JSON adicionales con validación básica.
- [x] Historial filtrable y exportaciones JSON/CSV, con filtros opcionales en la URL.
- [x] Workflow de scheduler preparado; no requiere Vercel Cron de pago.

## Verificación (marcar solo con evidencia)
- [x] Suite de acceso, borradores, versiones, redirecciones y publicación programada.
- [x] Suite editorial: bloqueos, enlaces dinámicos, bloques, Schema, secciones compartidas y exportaciones.
- [x] Compilación y tipos.
- [x] Revisión visual del panel y HTML responsive del artículo de prueba.
- [ ] Prueba editorial con Angie.

## Antes del despliegue
- [ ] Variables de producción y recuperación de cuenta verificadas en Vercel.
- [ ] Configurar secretos GitHub CMS_SITE_URL y CMS_CRON_SECRET (mismo valor que CRON_SECRET en Vercel).
- [ ] Desplegar y comprobar workflow, panel, guardado, imágenes y vistas previas online.
- [ ] Revisar cuotas de GitHub Actions según cuenta/repositorio. El scheduler horario no garantiza una hora exacta y puede retrasarse.

## Segunda etapa acordada
- [ ] Páginas de servicios en el CMS.
- [ ] Idiomas/hreflang.

Los chequeos SEO no son un validador completo de Schema.org ni comprueban por red todos los enlaces externos. El historial registra publicación en el CMS, no indexación. La simulación social usa el título/descripción reales; no reproduce la tarjeta exacta de cada plataforma.

Evidencia local: ambas suites pasaron; build de producción y TypeScript pasaron. HTTP: blog/artículo/sitemap/llms 200; laboratorio público 404; historial/usos/scheduler anónimos 401. Laboratorio guardado como borrador (ID 17), con los 15 artículos públicos intactos. Revisión visual completada el 16/10/2026: panel autenticado, preview privada, un H1, noindex, Schema BlogPosting/BreadcrumbList/FAQPage/Service/DefinedTerm, sin desbordamiento móvil a 390px; comparativa con desplazamiento interno. Se corrigieron las redirecciones de preview para mantener el host de la sesión.


## Revisión previa a producción — 16/10/2026
- Ambas suites y la compilación de producción pasan en la revisión final.
- `.env.vercel.production` contiene únicamente las variables de CMS para cargar/verificar en Vercel Production; archivo privado, ignorado por Git. El CRON_SECRET generado allí todavía no está activado online.
- El esquema de Neon ya tiene las dos migraciones aplicadas; no ejecutar una importación que sobreescriba el contenido editorial.
- Falta comprobar las variables remotas (no hay acceso Vercel conectado), desplegar, probar guardado/preview/subida de imagen/recuperación de contraseña online y crear una cuenta propia para Angie.
- Scheduler: configurar los secretos GitHub mencionados arriba. Hasta entonces, publicación manual disponible; programación online pendiente.
