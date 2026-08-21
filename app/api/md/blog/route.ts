import { NextResponse } from "next/server"
import { getAllPosts } from "@/lib/posts"

export async function GET() {
  const posts = getAllPosts()

  const lines = [
    "# Blog — The Stack House",
    "",
    "Guías, análisis y perspectivas sobre visibilidad en IA, GEO y el futuro del marketing digital.",
    "",
    "## Artículos",
    "",
    ...posts.map((p) => {
      const date = new Date(p.date).toLocaleDateString("es-AR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
      return `### [${p.title}](https://thestackhouse.io/blog/${p.slug})\n\n${p.description}\n\n*${date} · ${p.readTime} de lectura*`
    }),
  ]

  return new NextResponse(lines.join("\n"), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
