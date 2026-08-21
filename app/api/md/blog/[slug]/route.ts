import { NextResponse } from "next/server"
import { getPost } from "@/lib/posts"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const post = getPost(slug)

  if (!post) {
    return new NextResponse("Not found", { status: 404 })
  }

  const header = [
    `# ${post.title}`,
    "",
    `> ${post.description}`,
    "",
    `*Publicado el ${new Date(post.date).toLocaleDateString("es-AR", { day: "numeric", month: "long", year: "numeric" })} · ${post.readTime} de lectura · Autor: ${post.author}*`,
    "",
    "---",
    "",
  ].join("\n")

  return new NextResponse(header + post.content, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
