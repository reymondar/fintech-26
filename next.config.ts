import { withPayload } from "@payloadcms/next/withPayload"
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  allowedDevOrigins: ["127.0.0.1"],
  serverExternalPackages: ["drizzle-kit", "@libsql/client", "libsql", "esbuild"],
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Link",
            value: '</.well-known/api-catalog>; rel="api-catalog"',
          },
        ],
      },
    ]
  },
}

export default withPayload(nextConfig)
