import type React from "react"
import { AdminSidebar } from "@/components/admin-sidebar"

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <AdminSidebar />
      <main className="flex-1 md:ml-0 pt-20 md:pt-20 pb-8 overflow-x-hidden">{children}</main>
    </div>
  )
}
