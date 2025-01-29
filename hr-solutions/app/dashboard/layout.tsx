import type React from "react"
import { DashboardSidebar } from "@/components/dashboard/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex max-h-screen pt-[60px] overflow-hidden"> 
      {/* pt-[60px] ensures the dashboard starts below the navbar */}
      <DashboardSidebar />
      <main className="flex-1 overflow-y-auto bg-background p-8">{children}</main>
    </div>
  )
}
