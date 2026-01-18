"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { AdminProductList } from "@/components/admin-product-list"

export default function ProductsPage() {
  const router = useRouter()

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("admin_authenticated")
    if (isAuthenticated !== "true") {
      router.push("/admin")
    }
  }, [router])

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-6 sm:mb-8"
      >
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">Manage Products</h1>
        <p className="text-sm sm:text-base text-muted-foreground">View, edit, and manage your product inventory</p>
      </motion.div>

      <AdminProductList />
    </div>
  )
}
