"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import {
  Package,
  Eye,
  Users,
  MessageSquare,
  TrendingUp,
  Loader2,
} from "lucide-react"
import { apiClient, type Analytics } from "@/lib/api-client"

export default function AdminDashboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  const [stats, setStats] = useState<Analytics>({
    totalProducts: 0,
    totalViews: 0,
    totalInquiries: 0,
    totalWhatsAppClicks: 0,
    estimatedRevenue: "$0",
  })

  const [topProducts, setTopProducts] = useState<any[]>([])

  useEffect(() => {
    if (sessionStorage.getItem("admin_authenticated") !== "true") {
      router.push("/admin")
      return
    }

    const load = async () => {
      try {
        setLoading(true)

        const [analytics, top] = await Promise.all([
          apiClient.getDashboardAnalytics(),
          apiClient.getTopProducts(),
        ])

        setStats(analytics)
        setTopProducts(top?.topViewed?.slice(0, 4) || [])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [router])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="animate-spin w-8 h-8 text-accent" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8"
      >
        Dashboard Overview
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {[
          { label: "Products", value: stats.totalProducts, icon: Package },
          { label: "Views", value: stats.totalViews, icon: Eye },
          { label: "Inquiries", value: stats.totalInquiries, icon: MessageSquare },
          { label: "WhatsApp", value: stats.totalWhatsAppClicks, icon: Users },
        ].map((s, i) => (
          <Card key={i}>
            <CardContent className="p-4 sm:p-6">
              <s.icon className="mb-2 w-5 h-5 sm:w-6 sm:h-6 text-accent" />
              <p className="text-lg sm:text-xl lg:text-2xl font-bold">{s.value}</p>
              <p className="text-xs sm:text-sm text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-4 sm:p-6">
          <h3 className="font-bold text-base sm:text-lg flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500" />
            Top Products
          </h3>

          {topProducts.length === 0 && (
            <p className="text-muted-foreground text-sm">
              No analytics data yet
            </p>
          )}

          {topProducts.map((p, i) => (
            <div key={i} className="border-b py-2">
              <p className="font-medium">{p.name}</p>
              <p className="text-xs text-muted-foreground">
                {p.views} views
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
