"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { apiClient } from "@/lib/api-client"
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  BarChart3,
  MessageSquare,
  Settings,
  Users,
  FileText,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  Bell,
  Database,
} from "lucide-react"

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard", badge: null },
  { icon: Package, label: "Products", href: "/admin/dashboard/products", badge: null },
  { icon: PlusCircle, label: "Add Product", href: "/admin/dashboard/add", badge: null },
  { icon: MessageSquare, label: "Inquiries", href: "/admin/dashboard/inquiries", badge: null },
  { icon: BarChart3, label: "Analytics", href: "/admin/dashboard/analytics", badge: null },
  { icon: Users, label: "Customers", href: "/admin/dashboard/customers", badge: null },
  { icon: FileText, label: "Audit Logs", href: "/admin/dashboard/logs", badge: null },
  { icon: Database, label: "Backups", href: "/admin/dashboard/backups", badge: null },
  { icon: Settings, label: "Settings", href: "/admin/dashboard/settings", badge: null },
]

export function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [adminInfo, setAdminInfo] = useState({ username: "Admin", email: "alpha.smartphone.cz@gmail.com" })
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    // Get admin info from localStorage if available
    if (typeof window !== "undefined") {
      const storedUsername = localStorage.getItem("admin_username")
      const storedEmail = localStorage.getItem("admin_email")
      if (storedUsername) {
        setAdminInfo({
          username: storedUsername,
          email: storedEmail || "alpha.smartphone.cz@gmail.com",
        })
      }
    }
  }, [])

  const handleLogout = () => {
    // Clear all auth data
    apiClient.clearToken()
    sessionStorage.removeItem("admin_authenticated")
    sessionStorage.removeItem("admin_login_time")
    localStorage.removeItem("admin_username")
    localStorage.removeItem("admin_email")
    router.push("/admin")
  }

  return (
    <>
      {/* Mobile/Tablet Toggle */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-20 left-4 z-50 md:hidden glass-card bg-transparent"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : -320 }}
        className="fixed left-0 top-0 z-40 h-screen w-72 sm:w-80 bg-card border-r border-border pt-20 md:translate-x-0 md:static md:z-0"
      >
        <div className="flex flex-col h-full">
          {/* Admin Info */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{adminInfo.username}</p>
                <p className="text-xs text-muted-foreground truncate">{adminInfo.email}</p>
              </div>
              <Button variant="ghost" size="icon" className="shrink-0">
                <Bell className="w-4 h-4" />
              </Button>
            </div>
            <Badge className="w-full justify-center bg-accent/10 text-accent hover:bg-accent/20">Administrator</Badge>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all cursor-pointer ${
                      isActive
                        ? "bg-accent text-accent-foreground shadow-lg shadow-accent/20"
                        : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <item.icon className="w-5 h-5 shrink-0" />
                    <span className="flex-1 font-medium">{item.label}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </motion.div>
                </Link>
              )
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-border">
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full gap-2 hover:bg-destructive/10 hover:text-destructive hover:border-destructive bg-transparent"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </motion.aside>
    </>
  )
}
