"use client"

import Link from "next/link"
import { UserButton, useAuth } from "@clerk/nextjs"

export function Nav() {
  const { isSignedIn } = useAuth()

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
          {isSignedIn ? (
            <>
              <Link href="/dashboard" className="text-white hover:text-purple-400">
                Dashboard
              </Link>
              <UserButton afterSignOutUrl="/" />
            </>
          ) : (
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
          <Link href="/employer" className="text-white hover:text-purple-400">
            Employer
          </Link>
        </div>
      </div>
    </nav>
  )
}

