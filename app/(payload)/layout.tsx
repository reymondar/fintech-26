import config from '@payload-config'
import { RootLayout, handleServerFunctions } from '@payloadcms/next/layouts'
import type { ServerFunctionClient } from 'payload'
import { importMap } from './admin/importMap'
import '@payloadcms/next/css'
import { Manrope, Bricolage_Grotesque } from 'next/font/google'
import { RegisterBrand } from '@/components/cms-register-brand'
import './custom.scss'
const bodyFont = Manrope({ subsets: ['latin'], variable: '--cms-font-body', display: 'swap' })
const displayFont = Bricolage_Grotesque({ subsets: ['latin'], variable: '--cms-font-display', display: 'swap' })
const serverFunction: ServerFunctionClient = async (args) => {
  'use server'
  return handleServerFunctions({ ...args, config, importMap })
}
export default function Layout({ children }: { children: React.ReactNode }) { return <RootLayout htmlProps={{ className: `${bodyFont.variable} ${displayFont.variable}` }} config={config} importMap={importMap} serverFunction={serverFunction}><RegisterBrand />{children}</RootLayout> }
