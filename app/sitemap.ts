import type { MetadataRoute } from "next"
import { getAllPosts } from "@/lib/posts"

const SITE_URL = "https://thestackhouse.io"

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()

  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  const landingEntries: MetadataRoute.Sitemap = (["es", "en"] as const).map(locale => ({
    url: `${SITE_URL}/${locale}`,
    changeFrequency: "weekly",
    priority: 1,
    alternates: { languages: { es: `${SITE_URL}/es`, en: `${SITE_URL}/en`, "x-default": SITE_URL } },
  }))

  return [
    ...landingEntries,
    ...["servicios", "auditoria"].flatMap(page => (["es", "en"] as const).map(locale => ({
      url: `${SITE_URL}/${page}?lang=${locale}`,
      lastModified: new Date("2026-09-16"),
      changeFrequency: "monthly" as const,
      priority: 0.9,
      alternates: { languages: { es: `${SITE_URL}/${page}?lang=es`, en: `${SITE_URL}/${page}?lang=en`, "x-default": `${SITE_URL}/${page}` } },
    }))),
    {
      url: `${SITE_URL}/blog`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contacto`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...blogEntries,
  ]
}
