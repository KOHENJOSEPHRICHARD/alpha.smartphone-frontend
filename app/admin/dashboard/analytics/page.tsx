"use client"

import { Badge } from "@/components/ui/badge"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Users, Eye, ShoppingCart } from "lucide-react"
import { apiClient } from "@/lib/api-client"
import { useToast } from "@/hooks/use-toast"

export default function AnalyticsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [analytics, setAnalytics] = useState<any>(null)
  const [topProducts, setTopProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("admin_authenticated")
    if (isAuthenticated !== "true") {
      router.push("/admin")
      return
    }
    fetchAnalytics()
  }, [router])

  const fetchAnalytics = async () => {
    try {
      setLoading(true)
      const [analyticsData, productsData] = await Promise.all([
        apiClient.getDashboardAnalytics(),
        apiClient.getTopProducts(),
      ])
      setAnalytics(analyticsData)
      setTopProducts(Array.isArray(productsData) ? productsData : [])
    } catch (error) {
      console.error("Failed to fetch analytics:", error)
      toast({
        title: "Error",
        description: "Failed to fetch analytics data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">Analytics Dashboard</h1>
        <p className="text-sm sm:text-base text-muted-foreground">Track your store's performance and insights</p>
      </motion.div>

      {loading ? (
        <p className="text-center text-muted-foreground py-8">Loading analytics...</p>
      ) : (
        <div className="grid gap-4 sm:gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              { icon: Eye, label: "Total Views", value: analytics?.totalViews || "N/A", color: "text-blue-500" },
              {
                icon: Users,
                label: "Unique Visitors",
                value: analytics?.uniqueVisitors || "N/A",
                color: "text-purple-500",
              },
              {
                icon: ShoppingCart,
                label: "Conversions",
                value: analytics?.conversions || "N/A",
                color: "text-emerald-500",
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="glass-card border-2">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <stat.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.color}`} />
                      <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                    <p className="text-xl sm:text-2xl font-bold">{stat.value}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <Card className="glass-card border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-accent" />
                Top Performing Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              {topProducts.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">No data available</p>
              ) : (
                <div className="space-y-4">
                  {topProducts.map((product: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.views} views</p>
                      </div>
                      <Badge className="bg-accent/10 text-accent">#{idx + 1}</Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
