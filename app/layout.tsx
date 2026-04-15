import type { Metadata } from "next"
import { Toaster } from "sonner"
import "./styles.css"

export const metadata: Metadata = {
  title: "Coding Sprout | TK–12 Kids Coding Classes Online & In-Person",
  description: "Coding Sprout teaches TK–12 students how to code through fun, engaging online and in-person classes that build real tech skills and confidence.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script src="/coi-serviceworker.js" />
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-9ZYW4XM703"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-9ZYW4XM703');
            `,
          }}
        />
      </head>
      <body>
        {children}
        <Toaster 
          position="top-center"
          richColors
          closeButton
        />
      </body>
    </html>
  )
}