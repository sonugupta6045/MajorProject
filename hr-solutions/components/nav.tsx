"use client";

import Link from "next/link";
import {
  SignInButton,
  SignUpButton,
  UserButton,
  useAuth,
  useUser,
} from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./ModeToggle";
import { motion } from "framer-motion";
import { Button } from "./ui/button";

export function Nav() {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const pathname = usePathname();

  const isLandingPage = pathname === "/";

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/50 backdrop-blur-md"
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {isSignedIn ? (
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 text-white"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-lg">
                  HR Solutions
                </span>
                {!isLandingPage && (
                  <span className="text-xs text-gray-400">
                    Welcome, {user?.firstName}
                  </span>
                )}
              </div>
            </div>
          ) : (
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 text-white"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div className="flex flex-col">
                <Link href="/apply">
                  <Button>
                    Apply for Jobs
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-5 h-5"
                    >
                      <path d="M22 2L11 13" />
                      <path d="M22 2L15 22 11 13 2 9z" />
                    </svg>
                  </Button>
                </Link>
              </div>
            </Link>
          )}
        </motion.div>

        <div className="flex items-center gap-4">
          {isLandingPage ? (
            <>
              <SignInButton redirectUrl="/dashboard">
                <Button
                  variant="ghost"
                  className="text-white font-bold hover:text-purple-400 hover:bg-white/10"
                >
                 HR Portal Login
                </Button>
              </SignInButton>
              <SignUpButton redirectUrl="/dashboard">
                <Button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:opacity-90">
                  Register your Company
                </Button>
              </SignUpButton>
            </>
          ) : isSignedIn ? (
            <>
              <div className="flex items-center gap-4">
                <Link
                  href="/dashboard"
                  className={`text-sm font-medium transition-colors hover:text-purple-400 ${
                    pathname === "/dashboard" ? "text-purple-400" : "text-white"
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  href="/settings"
                  className={`text-sm font-medium transition-colors hover:text-purple-400 ${
                    pathname === "/settings" ? "text-purple-400" : "text-white"
                  }`}
                >
                  Settings
                </Link>
              </div>
              <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                <ModeToggle />
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "w-9 h-9",
                    },
                  }}
                />
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-4">
                <SignInButton redirectUrl="/dashboard">
                  <Button
                    variant="ghost"
                    className="text-white hover:text-purple-400 hover:bg-white/10"
                  >
                    Login
                  </Button>
                </SignInButton>
                <SignUpButton redirectUrl="/dashboard">
                  <Button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:opacity-90">
                    Register
                  </Button>
                </SignUpButton>
              </div>
              <div className="pl-4 border-l border-white/10">
                <ModeToggle />
              </div>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
