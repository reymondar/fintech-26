# Mailing privado

Ruta: `/mailing`. No aparece en navegación, sitemap o índices de IA; se excluye de indexación y no carga analítica.

Acceso sin Google OAuth: escribe `ramaarana7@gmail.com` y Resend envía un enlace firmado únicamente a esa cuenta. El enlace caduca en 10–20 minutos y la sesión dura 8 horas. El enlace es reutilizable hasta caducar; trátalo como una contraseña temporal. Resend deduplica las solicitudes de acceso en ventanas de 10 minutos.

Variables del servidor (no NEXT_PUBLIC):
- `RESEND_API_KEY`: la configuración existente; debe permitir envíos desde el dominio verificado `thestackhouse.io`.
- `MAILING_SESSION_SECRET`: secreto aleatorio de al menos 32 caracteres. Generar con `openssl rand -hex 32`. Rotarlo invalida sesiones y enlaces.
- `MAILING_BASE_URL`: origen exacto del sitio, sin ruta. Producción: `https://thestackhouse.io`. Local: `http://127.0.0.1:3000`.

El envío comprueba sesión y origen en servidor. Remitente y reply-to fijos: `ramon@thestackhouse.io`. Admite un destinatario, asunto y cuerpo de texto simple. No se guardan borradores ni historial. Resend conserva los datos según la configuración de la cuenta. Un reintento sin modificar el mensaje conserva su clave de idempotencia.

Sin variables, el acceso queda cerrado. No se realizaron envíos reales durante la implementación.
