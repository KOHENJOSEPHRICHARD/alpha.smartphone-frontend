"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity } from "lucide-react"
import { apiClient } from "@/lib/api-client"
import { useToast } from "@/hooks/use-toast"

export default function AuditLogsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [logs, setLogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("admin_authenticated")
    if (isAuthenticated !== "true") {
      router.push("/admin")
      return
    }
    fetchLogs()
  }, [router])

  const fetchLogs = async () => {
    try {
      setLoading(true)
      const data = await apiClient.getRecentLogs(24)
      setLogs(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Failed to fetch audit logs:", error)
      toast({
        title: "Error",
        description: "Failed to fetch audit logs",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">Audit Logs</h1>
        <p className="text-sm sm:text-base text-muted-foreground">Track all system activities and changes</p>
      </motion.div>

      <Card className="glass-card border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
            Recent Activity (Last 24 Hours)
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          {loading ? (
            <p className="text-center text-muted-foreground py-8">Loading logs...</p>
          ) : logs.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No audit logs found</p>
          ) : (
            <div className="space-y-3">
              {logs.map((log: any, idx: number) => (
                <div key={idx} className="flex items-start gap-3 p-3 sm:p-4 rounded-lg bg-muted/30">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-xs sm:text-sm break-words">{log.action}</p>
                    <p className="text-xs text-muted-foreground break-words">{log.details}</p>
                    <div className="flex flex-col sm:flex-row sm:gap-3 gap-1 mt-2 text-xs text-muted-foreground">
                      <span>{new Date(log.timestamp).toLocaleString()}</span>
                      <span>by {log.username}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
