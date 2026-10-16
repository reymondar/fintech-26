import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor, EXPERIMENTAL_TableFeature, BlocksFeature, LinkFeature, UploadFeature } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { es } from '@payloadcms/translations/languages/es'
import sharp from 'sharp'
import { resendAdapter } from '@payloadcms/email-resend'
import { editorialBlocks } from './cms/blocks'
import { Posts, Media, Users, Changes, Redirects, Sections } from './cms/collections'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const databaseURL = process.env.DATABASE_URL || 'file:./data/payload.db'
if (process.env.VERCEL && databaseURL.startsWith('file:')) throw new Error('Payload en Vercel requiere DATABASE_URL de PostgreSQL persistente; no uses SQLite local.')
export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || '',
  serverURL: process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL ? process.env.PUBLIC_SITE_URL || 'https://thestackhouse.io' : ''),
  admin: {
    user: 'users',
    components: { graphics: { Logo: '/components/cms-login-brand#LoginLogo' }, beforeLogin: ['/components/cms-login-brand#LoginBrand'] },
    importMap: { baseDir: dirname },
    meta: { titleSuffix: '— Stackhouse CMS' },
    livePreview: {
      url: ({ data }) => `/api/cms/preview?slug=${encodeURIComponent(data.slug || '')}`,
      collections: ['posts'],
      breakpoints: [{ label: 'Móvil', name: 'mobile', width: 375, height: 812 }, { label: 'Desktop', name: 'desktop', width: 1440, height: 900 }],
    },
  },
  i18n: { supportedLanguages: { es }, fallbackLanguage: 'es', translations: { es: { general: { welcome: 'Crear cuenta' }, authentication: { beginCreateFirstUser: 'Creá la primera cuenta de administración.' } } } },
  editor: lexicalEditor({ features: ({ defaultFeatures }) => [
    ...defaultFeatures.filter(feature => !['link', 'upload'].includes(feature.key)),
    LinkFeature({ enabledCollections: ['posts'], maxDepth: 1, fields: ({ defaultFields }) => [...defaultFields, { name:'nofollow',label:'nofollow',type:'checkbox' }, { name:'sponsored',label:'Enlace patrocinado',type:'checkbox' }] }),
    UploadFeature({ collections: { media: { fields: [{ name:'alt',label:'Alt específico en este artículo (opcional)',type:'text' },{ name:'caption',label:'Pie específico en este artículo (opcional)',type:'text' }] } } }),
    EXPERIMENTAL_TableFeature(),
    BlocksFeature({ blocks: editorialBlocks }),
  ] }),
  email: process.env.RESEND_API_KEY ? resendAdapter({ apiKey: process.env.RESEND_API_KEY, defaultFromAddress: process.env.FROM_EMAIL || 'contact@thestackhouse.io', defaultFromName: 'The Stack House' }) : undefined,
  jobs: {
    autoRun: process.env.VERCEL ? [] : [{ cron: '* * * * *', queue: 'default' }],
    access: { run: ({ req }) => Boolean(req.user) || Boolean(process.env.CRON_SECRET && req.headers.get('authorization') === `Bearer ${process.env.CRON_SECRET}`) },
  },
  collections: [Users, Media, Posts, Redirects, Changes, Sections],
  db: databaseURL.startsWith('file:')
    ? sqliteAdapter({ client: { url: databaseURL } })
    : postgresAdapter({ push: false, schemaName: process.env.PAYLOAD_DB_SCHEMA || 'stackhouse_cms', pool: { connectionString: databaseURL } }),
  sharp,
  plugins: [vercelBlobStorage({ enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN), alwaysInsertFields: true, collections: { media: true }, token: process.env.BLOB_READ_WRITE_TOKEN })],
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
})
