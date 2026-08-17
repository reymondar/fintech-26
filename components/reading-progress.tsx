"use client"

import { useEffect, useState } from "react"

export function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0)
    }

    window.addEventListener("scroll", update, { passive: true })
    update()
    return () => window.removeEventListener("scroll", update)
  }, [])

  const SEGMENTS = 20
  const filled = Math.round(progress * SEGMENTS)

  const scrollTo = (i: number) => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    window.scrollTo({ top: ((i + 1) / SEGMENTS) * docHeight, behavior: "smooth" })
  }

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col">
      {Array.from({ length: SEGMENTS }).map((_, i) => (
        <button
          key={i}
          onClick={() => scrollTo(i)}
          className="group flex items-center justify-end py-[4px] px-0 cursor-pointer"
          aria-label={`Ir al ${Math.round(((i + 1) / SEGMENTS) * 100)}% del artículo`}
        >
          <span
            className="block h-px rounded-full transition-all duration-150 group-hover:w-6"
            style={{
              width: i < filled ? "18px" : "14px",
              backgroundColor: i < filled ? "#18181b" : "#d4d4d8",
            }}
          />
        </button>
      ))}
    </div>
  )
}
