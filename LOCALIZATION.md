# Landing languages

The landing has Spanish (`/es`) and English (`/en`) versions rendered on the server with the same components. The existing blog and other service pages remain in Spanish. Navbar links identify Spanish destinations in the English landing.

The language-neutral root (`/`) uses, in order:

1. The `sh_locale` cookie set by the ES/EN selector (one year).
2. Vercel's `x-vercel-ip-country` country header. Spain and Latin America use Spanish; other countries use English. The complete set is in `lib/locale.ts` and includes Brazil.
3. The browser's highest-priority `Accept-Language` language when geolocation is unavailable. Spanish maps to Spanish; all others and missing headers map to English.

Explicit language URLs always take precedence, preserve query parameters and do not redirect by IP. Root redirects are temporary and private/no-store. API endpoints, static assets and existing blog URLs are excluded from language redirects. No external translation or IP lookup service is called.

English copy lives in `lib/landing-en.ts`. Spanish copy remains in the existing components and `lib/landing-copy.ts`. When changing Spanish copy, update its English entry. The same translations feed the visible FAQs and FAQ structured data. The Markdown homepage also supports `?lang=en` and content negotiation on `/en` and `/es`.

The layout receives a server-set language header for the HTML `lang` attribute. Localized pages include canonical URLs, hreflang, Open Graph and Twitter metadata, and are listed in the sitemap.

Local verification: `node --experimental-strip-types --test tests/locale.test.mjs`. Real IP geolocation requires Vercel; locally simulate its country header in HTTP requests. No location prompt is needed in the browser.

Reference: https://vercel.com/docs/headers/request-headers
