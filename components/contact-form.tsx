"use client"

import { useState } from "react"

type Status = "idle" | "loading" | "success" | "error"

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle")
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? "success" : "error")
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col justify-center h-full min-h-[320px]">
        <div className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center mb-6">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7l3.5 3.5L12 3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="font-display text-xl font-bold text-zinc-900 mb-2">Mensaje recibido.</h3>
        <p className="text-sm text-zinc-500 leading-relaxed">
          Te respondemos en menos de 24 horas hábiles.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="name" className="text-xs font-medium text-zinc-500 uppercase tracking-widest">
            Nombre
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Tu nombre"
            className="w-full px-3 py-2.5 text-sm bg-white border border-zinc-200 rounded-xl text-zinc-900 placeholder:text-zinc-300 focus:outline-none focus:border-zinc-400 transition-colors"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="email" className="text-xs font-medium text-zinc-500 uppercase tracking-widest">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="tu@empresa.com"
            className="w-full px-3 py-2.5 text-sm bg-white border border-zinc-200 rounded-xl text-zinc-900 placeholder:text-zinc-300 focus:outline-none focus:border-zinc-400 transition-colors"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="company" className="text-xs font-medium text-zinc-500 uppercase tracking-widest">
          Empresa <span className="normal-case text-zinc-300">(opcional)</span>
        </label>
        <input
          id="company"
          name="company"
          type="text"
          value={form.company}
          onChange={handleChange}
          placeholder="Nombre de tu empresa"
          className="w-full px-3 py-2.5 text-sm bg-white border border-zinc-200 rounded-xl text-zinc-900 placeholder:text-zinc-300 focus:outline-none focus:border-zinc-400 transition-colors"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="message" className="text-xs font-medium text-zinc-500 uppercase tracking-widest">
          Mensaje
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder="Contanos qué está pasando con tu visibilidad en IA, o qué necesitás..."
          className="w-full px-3 py-2.5 text-sm bg-white border border-zinc-200 rounded-xl text-zinc-900 placeholder:text-zinc-300 focus:outline-none focus:border-zinc-400 transition-colors resize-none"
        />
      </div>

      {status === "error" && (
        <p className="text-xs text-red-500">Algo salió mal. Escribinos directamente a hello@thestackhouse.com</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-3 rounded-full bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-700 disabled:opacity-50 transition-colors"
      >
        {status === "loading" ? "Enviando..." : "Enviar mensaje"}
      </button>
    </form>
  )
}
