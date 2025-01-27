"use client"

import { SignUp } from "@clerk/nextjs"

export default function Register() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-black">
        <div className="relative z-10">
          {/* <h1 className="text-2xl font-bold text-center mb-8">REGISTER</h1> */}
          <SignUp
            appearance={{
              elements: {
                formButtonPrimary: "bg-purple-600 hover:bg-purple-700 text-sm normal-case",
              },
            }}
          />
        </div>
      
    </main>
  )
}

