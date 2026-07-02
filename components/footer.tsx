"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Anchor } from "lucide-react"

export function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <footer ref={ref} className="border-t border-zinc-200 bg-zinc-100">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a href="/" className="flex items-center gap-2 mb-4">
              <Anchor className="w-5 h-5 text-zinc-900" strokeWidth={1.5} />
              <span className="font-semibold text-zinc-900 tracking-wide text-sm uppercase">Grounded</span>
            </a>
            <p className="text-sm text-zinc-500">
              We make your business readable, trustworthy and eligible for AI.
            </p>
          </div>

          {/* Site */}
          <div>
            <h4 className="text-sm font-semibold text-zinc-900 mb-4">Site</h4>
            <ul className="space-y-3">
              <li>
                <a href="/#how-it-works" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="/services" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="/#cases" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">
                  Cases
                </a>
              </li>
              <li>
                <a href="#audit" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">
                  Free Audit
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-zinc-900 mb-4">Legal</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">
                  Terms
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-zinc-900 mb-4">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:hello@grounded.so"
                  className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
                >
                  hello@grounded.so
                </a>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 pt-8 border-t border-zinc-200 flex items-center justify-center"
        >
          <p className="text-sm text-zinc-500">&copy; {new Date().getFullYear()} GROUNDED. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}
