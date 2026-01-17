import type { Metadata } from "next"
import { Toaster } from "sonner"
import "./styles.css"

export const metadata: Metadata = {
  title: "Coding Sprout",
  description: "Coding classes for kids",  //app layout
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