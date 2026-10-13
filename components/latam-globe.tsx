"use client"

import { useEffect, useRef } from "react"

type Coordinate = [number, number]
type Vector = [number, number, number]
const RAD = Math.PI / 180
const vector = ([lon, lat]: Coordinate): Vector => [Math.cos(lat * RAD) * Math.sin(lon * RAD), Math.sin(lat * RAD), Math.cos(lat * RAD) * Math.cos(lon * RAD)]
// Illustrative commerce nodes, not claims of offices or customer locations.
const cities: Coordinate[] = [[-99.13, 19.43], [-90.51, 14.63], [-84.09, 9.93], [-74.07, 4.71], [-78.47, -0.18], [-77.04, -12.05], [-70.67, -33.45], [-58.38, -34.60], [-46.63, -23.55], [-66.90, 10.48]]
const connections = [[0, 3], [0, 2], [1, 3], [2, 4], [3, 5], [3, 8], [4, 5], [5, 6], [6, 7], [7, 8], [3, 9]]
const nodes = cities.map(vector)
const routes = connections.map(([from, to]) => {
  const a = nodes[from], b = nodes[to]
  const angle = Math.acos(Math.max(-1, Math.min(1, a.reduce((sum, value, i) => sum + value * b[i], 0))))
  return Array.from({ length: 65 }, (_, i) => {
    const t = i / 64
    const height = 1 + Math.sin(t * Math.PI) * (0.08 + angle * 0.13)
    return a.map((value, j) => height * (value * Math.sin((1 - t) * angle) + b[j] * Math.sin(t * angle)) / Math.sin(angle)) as Vector
  })
})

export function LatamGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    let land: Vector[][] = []
    let frame = 0, width = 0, height = 0, elapsed = 0, last = 0
    let inView = true, disposed = false
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
    const controller = new AbortController()

    function draw(time: number) {
      if (!ctx || !width || !height) return
      ctx.clearRect(0, 0, width, height)
      const radius = Math.min(width, height) * 0.405
      const cx = width * 0.50, cy = height * 0.48
      // Oscillation keeps Latin America facing the visitor throughout the animation.
      const lon = (-74 + Math.sin(time * 0.13) * 6) * RAD
      const lat = (-9 + Math.sin(time * 0.09) * 2) * RAD
      const project = ([x, y, z]: Vector): Vector => {
        const front = x * Math.sin(lon) + z * Math.cos(lon)
        return [cx + radius * (x * Math.cos(lon) - z * Math.sin(lon)), cy - radius * (y * Math.cos(lat) - front * Math.sin(lat)), y * Math.sin(lat) + front * Math.cos(lat)]
      }
      ctx.save()
      ctx.translate(cx, cy + radius * 1.12)
      ctx.scale(1, 0.12)
      const shadow = ctx.createRadialGradient(0, 0, 0, 0, 0, radius * 0.85)
      shadow.addColorStop(0, "rgba(6,78,59,.14)")
      shadow.addColorStop(1, "rgba(6,78,59,0)")
      ctx.fillStyle = shadow
      ctx.fillRect(-radius, -radius, radius * 2, radius * 2)
      ctx.restore()

      const ocean = ctx.createRadialGradient(cx - radius * 0.40, cy - radius * 0.45, radius * 0.05, cx, cy, radius)
      ocean.addColorStop(0, "#ffffff")
      ocean.addColorStop(0.60, "#f0f7f3")
      ocean.addColorStop(0.88, "#dbece3")
      ocean.addColorStop(1, "#bbd6c8")
      ctx.beginPath(); ctx.arc(cx, cy, radius, 0, Math.PI * 2)
      ctx.fillStyle = ocean; ctx.fill()
      ctx.save(); ctx.clip()
      ctx.strokeStyle = "rgba(42,105,80,.10)"; ctx.lineWidth = 0.7
      function line(points: Vector[]) {
        if (!ctx) return
        ctx.beginPath()
        let started = false
        points.forEach(point => {
          const [x, y, z] = project(point)
          if (z <= 0) { started = false; return }
          if (started) ctx.lineTo(x, y); else ctx.moveTo(x, y)
          started = true
        })
        ctx.stroke()
      }
      for (let latitude = -75; latitude <= 75; latitude += 15) {
        line(Array.from({ length: 181 }, (_, i) => vector([i * 2 - 180, latitude])))
      }
      for (let longitude = -180; longitude < 180; longitude += 20) {
        line(Array.from({ length: 91 }, (_, i) => vector([longitude, i * 2 - 90])))
      }
      land.forEach(ring => {
        const points = ring.map(project)
        if (points.filter(p => p[2] > 0).length < points.length * 0.75) return
        const depth = points.reduce((sum, p) => sum + Math.max(0, p[2]), 0) / points.length
        ctx.beginPath()
        points.forEach(([x, y, z], i) => {
          if (z < 0) {
            const d = Math.hypot(x - cx, y - cy)
            x = cx + (x - cx) / d * radius
            y = cy + (y - cy) / d * radius
          }
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y)
        })
        ctx.closePath()
        ctx.fillStyle = `rgba(65,134,104,${0.15 + depth * 0.19})`
        ctx.fill()
        ctx.strokeStyle = "rgba(255,255,255,.70)"; ctx.lineWidth = 0.7; ctx.stroke()
      })
      ctx.restore()
      // Raised great-circle routes are projected above the spherical surface.
      routes.forEach((route, i) => {
        ctx.strokeStyle = "rgba(5,150,105,.33)"; ctx.lineWidth = 1.15
        line(route)
        const position = ((time * 0.12 + i * 0.173) % 1) * (route.length - 1)
        const index = Math.floor(position), t = position - index
        const a = route[index], b = route[Math.min(index + 1, route.length - 1)]
        const [x, y, z] = project(a.map((v, j) => v + (b[j] - v) * t) as Vector)
        if (z <= 0) return
        ctx.shadowBlur = 10; ctx.shadowColor = "#34d399"
        ctx.beginPath(); ctx.arc(x, y, 2.1, 0, Math.PI * 2)
        ctx.fillStyle = "#059669"; ctx.fill(); ctx.shadowBlur = 0
      })
      nodes.forEach((node, i) => {
        const [x, y, z] = project(node)
        if (z <= 0) return
        const pulse = reduced.matches ? 0.35 : (time * 0.33 + i * 0.21) % 1
        ctx.beginPath(); ctx.arc(x, y, 5 + pulse * 12, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(5,150,105,${(1 - pulse) * 0.26})`; ctx.lineWidth = 1; ctx.stroke()
        ctx.beginPath(); ctx.arc(x, y, 3.2, 0, Math.PI * 2)
        ctx.fillStyle = "#047857"; ctx.fill()
        ctx.strokeStyle = "#ffffff"; ctx.lineWidth = 1.5; ctx.stroke()
        // A few storefront pins keep the map readable at smaller sizes.
        if (![0, 3, 6, 8].includes(i)) return
        const bx = x - 15, by = y - 46
        ctx.shadowColor = "rgba(6,78,59,.13)"; ctx.shadowBlur = 12; ctx.shadowOffsetY = 4
        ctx.beginPath(); ctx.roundRect(bx, by, 30, 30, 9)
        ctx.fillStyle = "rgba(255,255,255,.97)"; ctx.fill()
        ctx.shadowBlur = 0; ctx.shadowOffsetY = 0
        ctx.strokeStyle = "rgba(5,150,105,.18)"; ctx.lineWidth = 1; ctx.stroke()
        ctx.strokeStyle = "#047857"; ctx.lineWidth = 1.2; ctx.lineJoin = "round"
        ctx.beginPath(); ctx.moveTo(x - 7, by + 13); ctx.lineTo(x - 5, by + 8); ctx.lineTo(x + 5, by + 8); ctx.lineTo(x + 7, by + 13); ctx.closePath(); ctx.stroke()
        ctx.beginPath(); ctx.moveTo(x - 6, by + 14); ctx.lineTo(x - 6, by + 22); ctx.lineTo(x + 6, by + 22); ctx.lineTo(x + 6, by + 14); ctx.moveTo(x, by + 22); ctx.lineTo(x, by + 17); ctx.lineTo(x + 3, by + 17); ctx.lineTo(x + 3, by + 22); ctx.stroke()
        ctx.beginPath(); ctx.moveTo(x, by + 31); ctx.lineTo(x, y - 6)
        ctx.strokeStyle = "rgba(5,150,105,.28)"; ctx.stroke()
      })
    }

    function tick(now: number) {
      frame = 0
      if (disposed || !inView || document.hidden) { last = 0; return }
      if (last && now - last < 32) { frame = requestAnimationFrame(tick); return }
      elapsed += last ? Math.min((now - last) / 1000, 0.1) : 0
      last = now
      draw(reduced.matches ? 0 : elapsed)
      if (!reduced.matches) frame = requestAnimationFrame(tick)
    }
    function restart() {
      cancelAnimationFrame(frame); last = 0
      if (!disposed) frame = requestAnimationFrame(tick)
    }
    const resize = new ResizeObserver(() => {
      const bounds = canvas.getBoundingClientRect()
      width = bounds.width; height = bounds.height
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      draw(reduced.matches ? 0 : elapsed)
    })
    resize.observe(canvas)
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; restart() })
    observer.observe(canvas)
    document.addEventListener("visibilitychange", restart)
    reduced.addEventListener("change", restart)
    fetch("/globe/land.json", { signal: controller.signal })
      .then(response => { if (!response.ok) throw new Error("Map unavailable"); return response.json() })
      .then((rings: Coordinate[][]) => { land = rings.map(ring => ring.map(vector)); restart() })
      .catch(() => { /* The sphere and commerce connections remain visible if the map is unavailable. */ })
    restart()
    return () => {
      disposed = true; controller.abort(); cancelAnimationFrame(frame)
      resize.disconnect(); observer.disconnect()
      document.removeEventListener("visibilitychange", restart)
      reduced.removeEventListener("change", restart)
    }
  }, [])

  return <div aria-hidden="true" className="latam-globe pointer-events-none absolute">
    <canvas ref={canvasRef} className="h-full w-full" />

  </div>
}
