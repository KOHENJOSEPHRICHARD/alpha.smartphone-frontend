"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Users } from "lucide-react"

export default function CustomersPage() {
  const router = useRouter()

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("admin_authenticated")
    if (isAuthenticated !== "true") {
      router.push("/admin")
    }
  }, [router])

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">Customers</h1>
        <p className="text-sm sm:text-base text-muted-foreground">Manage your customer database</p>
      </motion.div>

      <Card className="glass-card border-2">
        <CardContent className="p-8 sm:p-12 text-center">
          <Users className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-muted-foreground" />
          <p className="text-lg sm:text-xl font-semibold mb-2">Customer Management</p>
          <p className="text-sm sm:text-base text-muted-foreground">Customer management features coming soon</p>
        </CardContent>
      </Card>
    </div>
  )
}
