import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import "./globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import { Nav } from "@/components/nav"
import { ThemeProvider } from "@/components/theme-provider"
import { usePathname } from "next/navigation"

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
      <html lang="en" suppressHydrationWarning>
        <body className={`${GeistSans.className} min-h-screen bg-white dark:bg-black`}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Nav />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
