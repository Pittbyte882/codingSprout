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