/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.zoom.us https://source.zoom.us",
              "style-src 'self' 'unsafe-inline' https://*.zoom.us",
              "connect-src 'self' https://*.zoom.us wss://*.zoom.us https://*.supabase.co wss://*.supabase.co https://api.zoom.us https://zoom.us",
              "frame-src 'self' https://*.zoom.us",
              "media-src 'self' https://*.zoom.us blob: mediastream:",
              "img-src 'self' data: blob: https://*.zoom.us https://images.unsplash.com",
              "worker-src 'self' blob:",
              "font-src 'self' data: https://*.zoom.us",
            ].join("; "),
          },
        ],
      },
    ]
  },
}

export default nextConfig