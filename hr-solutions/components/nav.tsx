"use client"

import Link from "next/link"
import { SignInButton, SignUpButton, UserButton, useAuth, useUser } from "@clerk/nextjs"
import { usePathname } from "next/navigation" // Import usePathname
import { ModeToggle } from "./ModeToggle"

export function Nav() {
  const { isSignedIn } = useAuth()
  const pathname = usePathname() // Get the current route

  const isLandingPage = pathname === "/" // Check if on landing page

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 text-black"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <span className="text-white font-semibold">HR Solutions</span>
        </Link>

        <div className="flex items-center gap-4 text-sm">
          {isLandingPage ? (
            // If on landing page, only show Login/Register
            <>
            <SignInButton redirectUrl="/dashboard">
              <a className="text-white hover:text-purple-400">
                Login
              </a>
              </SignInButton>
              <span className="text-white/50">|</span>
              <SignUpButton redirectUrl="/dashboard">
              <a className="text-white hover:text-purple-400">
                Register
              </a>
              </SignUpButton>
            </>
          ) : isSignedIn ? (
            // If signed in and NOT on landing page, show Dashboard and UserButton
            <>
              <Link href="/dashboard" className="text-white hover:text-purple-400">
                Dashboard
              </Link>
              <UserButton afterSignOutUrl="/" />
            </>
          ) : (
            // If not signed in, show Login/Register
            <>
              <Link href="/login" className="text-white hover:text-purple-400">
                Login
              </Link>
              <span className="text-white/50">|</span>
              <Link href="/register" className="text-white hover:text-purple-400">
                Register
              </Link>
            </>
          )}
          
          <ModeToggle />
        </div>
      </div>
    </nav>
  )
}
