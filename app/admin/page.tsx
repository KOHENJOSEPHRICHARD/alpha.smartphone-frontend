"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { AdminLoginForm } from "@/components/admin-login-form"

export default function AdminLoginPage() {
  const router = useRouter()

  useEffect(() => {
    // Check if already authenticated
    const isAuthenticated = sessionStorage.getItem("admin_authenticated")
    if (isAuthenticated === "true") {
      router.push("/admin/dashboard")
    }
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20 pb-20">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-accent/5 via-background to-accent/10" />
      <AdminLoginForm />
    </div>
  )
}
