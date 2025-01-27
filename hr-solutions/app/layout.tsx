import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import "./globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import { Nav } from "@/components/nav"

export const metadata: Metadata = {
  title: "HR Solutions",
  description: "Building Exceptional You for Future Success",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={GeistSans.className}>
        <body className="min-h-screen bg-black">
          <Nav />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}

