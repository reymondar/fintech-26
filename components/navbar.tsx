"use client"

import { useState, useRef, useCallback } from "react"
import { usePathname } from "next/navigation"
import { m } from "framer-motion"
import { ChevronDown, ExternalLink, Menu, X } from "lucide-react"

const navItems = [
  { label: "Cómo funciona", href: "/#how-it-works" },
  { label: "Blog", href: "/blog" },
]

export function Navbar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  const handleNav = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMobileMenuOpen(false)
    if (href.startsWith("/#")) {
      const hash = href.slice(1)
      if (pathname === "/") {
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
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-4xl"
    >
      <nav
        ref={navRef}
        className="relative flex items-center justify-between px-4 py-3 rounded-full bg-white/70 backdrop-blur-md border border-zinc-200 shadow-sm"
      >
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <img src="/logo-stackhouse.png" alt="The Stack House" className="w-6 h-6 object-contain" />
          <span className="font-semibold text-zinc-900 hidden sm:block tracking-wide text-sm uppercase">The Stack House</span>
        </a>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-1 relative">
          {navItems.map((item, index) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNav(e, item.href)}
              className="relative px-4 py-2 text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
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
              <span className="relative z-10">{item.label}</span>
            </a>
          ))}

          <div className="relative group/tools">
            <button
              type="button"
              aria-haspopup="menu"
              className="flex items-center gap-1 px-4 py-2 text-sm text-zinc-500 hover:text-zinc-900 group-focus-within/tools:text-zinc-900 transition-colors"
            >
              Herramientas
              <ChevronDown size={14} className="transition-transform duration-200 group-hover/tools:rotate-180 group-focus-within/tools:rotate-180" />
            </button>

            <div className="absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 pt-3 invisible opacity-0 translate-y-1 pointer-events-none transition-all duration-150 group-hover/tools:visible group-hover/tools:opacity-100 group-hover/tools:translate-y-0 group-hover/tools:pointer-events-auto group-focus-within/tools:visible group-focus-within/tools:opacity-100 group-focus-within/tools:translate-y-0 group-focus-within/tools:pointer-events-auto">
              <div role="menu" className="rounded-2xl border border-zinc-200 bg-white p-2 shadow-xl">
                <a
                  role="menuitem"
                  href="https://ucp-checker.thestackhouse.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start justify-between gap-4 rounded-xl px-3 py-3 hover:bg-zinc-50 focus:bg-zinc-50 focus:outline-none transition-colors"
                >
                  <span>
                    <span className="block text-sm font-semibold text-zinc-900">UCP Checker</span>
                    <span className="mt-1 block text-xs leading-relaxed text-zinc-500">
                      Comprueba si tu ecommerce está preparado para vender mediante agentes de IA.
                    </span>
                  </span>
                  <ExternalLink size={14} className="mt-0.5 shrink-0 text-zinc-400" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* CTA + Mobile Menu */}
        <div className="flex items-center gap-2">
          <a
            href="https://calendar.app.google/aGDRM9XzkQFEndG77" target="_blank" rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center px-5 py-1.5 rounded-full bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800 transition-colors"
          >
            Agenda tu diagnóstico
          </a>
          <button
            className="md:hidden p-2 text-zinc-500 hover:text-zinc-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
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
                key={item.label}
                href={item.href}
                className="px-4 py-3 text-sm text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors"
                onClick={(e) => handleNav(e, item.href)}
              >
                {item.label}
              </a>
            ))}
            <div className="mt-1 border-t border-zinc-100 pt-3">
              <p className="px-4 pb-1 text-[10px] font-semibold tracking-widest uppercase text-zinc-400">Herramientas</p>
              <a
                href="https://ucp-checker.thestackhouse.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 px-4 py-3 text-sm text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>
                  <span className="block font-medium">UCP Checker</span>
                  <span className="mt-0.5 block text-xs text-zinc-400">Audita tu preparación para comercio agéntico</span>
                </span>
                <ExternalLink size={14} className="shrink-0" />
              </a>
            </div>
            <a
              href="https://calendar.app.google/aGDRM9XzkQFEndG77" target="_blank" rel="noopener noreferrer"
              className="mt-2 flex items-center justify-center px-5 py-3 rounded-full bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800 transition-colors"
            >
              Agenda tu diagnóstico
            </a>
          </div>
        </m.div>
      )}
    </m.header>
  )
}
