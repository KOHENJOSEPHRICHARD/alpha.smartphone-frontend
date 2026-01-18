"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldCheck, Eye, EyeOff, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { apiClient } from "@/lib/api-client"

export function AdminLoginForm() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const response = await apiClient.login(username, password)

      sessionStorage.setItem("admin_authenticated", "true")
      sessionStorage.setItem("admin_login_time", Date.now().toString())
      sessionStorage.setItem("admin_user", JSON.stringify(response))
      localStorage.setItem("admin_username", response.username || username)
      localStorage.setItem("admin_email", response.email || "alpha.smartphone.cz@gmail.com")

      router.push("/admin/dashboard")
    } catch (err: any) {
      console.error("Login error:", err)
      setError(err.message || "Invalid username or password")
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md"
    >
      <Card className="border-2 shadow-2xl">
        <CardHeader className="space-y-1 text-center p-4 sm:p-6">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-accent/10 rounded-xl">
              <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10 text-accent" />
            </div>
          </div>
          <CardTitle className="text-2xl sm:text-3xl font-bold">Admin Login</CardTitle>
          <CardDescription className="text-sm sm:text-base">Enter your credentials to access the admin dashboard</CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={isLoading}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="h-11 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive"
              >
                {error}
              </motion.div>
            )}

            <Button type="submit" className="w-full h-11" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Login to Dashboard"
              )}
            </Button>
          </form>

          <div className="mt-4 p-3 bg-accent/5 rounded-lg">
            <p className="text-xs text-muted-foreground text-center">
              This is a secure area. Only authorized personnel can access the admin dashboard.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
