"use client"

import { useTranslation } from "@/components/locale-provider"

import { LanguageSwitcher } from "@/components/language-switcher"
import { useState, useRef, useCallback } from "react"
import { usePathname } from "next/navigation"
import { m } from "framer-motion"
import { Menu, X } from "lucide-react"

const navItems = [
  { label: "Cómo funciona", href: "/#how-it-works" },
  { label: "Servicios", href: "/servicios" },
  { label: "CRO", href: "/servicios/cro" },
  { label: "Blog", href: "/blog" },
]

export function Navbar() {
  const { t, locale, localizeHref } = useTranslation()

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  const handleNav = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMobileMenuOpen(false)
    if (href.startsWith("/#")) {
      const hash = href.slice(1)
      if (["/", "/es", "/en"].includes(pathname)) {
        e.preventDefault()
        const el = document.querySelector(hash)
        if (el) el.scrollIntoView({ behavior: "smooth" })
      }
    }
  }, [pathname])

  return (
    <m.header
      initial={{ y: -100, opacity: 1 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="site-navbar fixed top-4 left-1/2 -translate-x-1/2 z-[1000] w-[calc(100%-2rem)] max-w-6xl"
    >
      <nav
        ref={navRef}
        className="relative flex items-center justify-between px-4 py-3 rounded-full bg-white/70 backdrop-blur-md border border-zinc-200 shadow-sm"
      >
        {/* Logo */}
        <a href={localizeHref("/")} className="flex items-center gap-2">
          <img src="/branding/stackhouse-logo.png" alt={t("The Stack House")} className="w-6 h-6 object-contain" />
        </a>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-1 relative">
          {navItems.map((item, index) => (
            <a
              key={t(item.label)}
              href={localizeHref(item.href)}
              onClick={(e) => handleNav(e, item.href)}
              className="relative px-4 py-2 whitespace-nowrap text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {hoveredIndex === index && (
                <m.div
                  layoutId="navbar-hover"
                  className="absolute inset-0 bg-zinc-100 rounded-full"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <span className="relative z-10">{t(item.label)}</span>
            </a>
          ))}

        </div>

        {/* CTA + Mobile Menu */}
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <a
            href={localizeHref("/auditoria")}
            className="hidden sm:inline-flex shrink-0 whitespace-nowrap items-center px-5 py-1.5 rounded-full bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800 transition-colors"
          > {t("Audita tu tienda")} </a>
          <button
            className="md:hidden p-2 text-zinc-500 hover:text-zinc-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={t(mobileMenuOpen ? "Cerrar menú" : "Abrir menú")}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <m.div
          initial={{ opacity: 1, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full left-0 right-0 mt-2 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-zinc-200 shadow-lg"
        >
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <a
                key={t(item.label)}
                href={localizeHref(item.href)}
                className="px-4 py-3 text-sm text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors"
                onClick={(e) => handleNav(e, item.href)}
              >
                {t(item.label)}
              </a>
            ))}
            <a
              href={localizeHref("/auditoria")}
              className="mt-2 flex items-center justify-center px-5 py-3 rounded-full bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800 transition-colors"
            > {t("Audita tu tienda")} </a>
          </div>
        </m.div>
      )}
    </m.header>
  )
}
