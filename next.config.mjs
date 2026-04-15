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
              "default-src 'self' https://*.daily.co",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.daily.co https://daily.co https://www.googletagmanager.com https://www.google-analytics.com",
              "style-src 'self' 'unsafe-inline' https://*.daily.co",
              "connect-src 'self' https://*.daily.co wss://*.daily.co https://*.supabase.co wss://*.supabase.co https://*.pluot.blue wss://*.pluot.blue https://www.google-analytics.com https://analytics.google.com",
              "frame-src 'self' https://*.daily.co https://daily.co",
              "media-src 'self' https://*.daily.co blob: mediastream:",
              "img-src 'self' data: blob: https://images.unsplash.com https://*.daily.co https://*.supabase.co",
              "worker-src 'self' blob:",
              "font-src 'self' data: https://*.daily.co",
              "child-src 'self' blob: https://*.daily.co",
            ].join("; "),
          },
        ],
      },
    ]
  },
}

export default nextConfig