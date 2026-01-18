"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Mail, Phone, User, Calendar, Trash2, Eye } from "lucide-react"
import { apiClient } from "@/lib/api-client"
import { useToast } from "@/hooks/use-toast"

interface Inquiry {
  id: number
  name: string
  email: string
  phoneNumber: string
  message: string
  status: "PENDING" | "IN_PROGRESS" | "RESOLVED" | "CLOSED"
  phoneId?: number
  phoneName?: string
  createdAt: string
  adminNotes?: string
}

export default function InquiriesPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>("ALL")

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("admin_authenticated")
    if (isAuthenticated !== "true") {
      router.push("/admin")
      return
    }
    fetchInquiries()
  }, [router])

  const fetchInquiries = async () => {
    try {
      setLoading(true)
      const data = await apiClient.getInquiries()
      setInquiries(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Failed to fetch inquiries:", error)
      toast({
        title: "Error",
        description: "Failed to fetch inquiries. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (id: number, status: string) => {
    try {
      await apiClient.updateInquiryStatus(id, status)
      toast({
        title: "Success",
        description: "Inquiry status updated successfully",
      })
      fetchInquiries()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update inquiry status",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this inquiry?")) return

    try {
      await apiClient.deleteInquiry(id)
      toast({
        title: "Success",
        description: "Inquiry deleted successfully",
      })
      fetchInquiries()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete inquiry",
        variant: "destructive",
      })
    }
  }

  const filteredInquiries = filter === "ALL" ? inquiries : inquiries.filter((i) => i.status === filter)

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      PENDING: "bg-yellow-500/10 text-yellow-500",
      IN_PROGRESS: "bg-blue-500/10 text-blue-500",
      RESOLVED: "bg-green-500/10 text-green-500",
      CLOSED: "bg-gray-500/10 text-gray-500",
    }
    return variants[status] || variants.PENDING
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">Customer Inquiries</h1>
        <p className="text-sm sm:text-base text-muted-foreground">Manage and respond to customer inquiries</p>
      </motion.div>

      {/* Filters */}
      <Card className="glass-card border-2 mb-4 sm:mb-6">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-wrap gap-2">
            {["ALL", "PENDING", "IN_PROGRESS", "RESOLVED", "CLOSED"].map((status) => (
              <Button
                key={status}
                variant={filter === status ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(status)}
              >
                {status.replace("_", " ")}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Inquiries List */}
      <div className="grid gap-4">
        {loading ? (
          <p className="text-center text-muted-foreground py-8">Loading inquiries...</p>
        ) : filteredInquiries.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No inquiries found</p>
        ) : (
          filteredInquiries.map((inquiry, index) => (
            <motion.div
              key={inquiry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="glass-card border-2 hover:border-accent/50 transition-all">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1 space-y-3 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <User className="w-4 h-4 text-muted-foreground shrink-0" />
                            <span className="font-semibold truncate">{inquiry.name}</span>
                          </div>
                          {inquiry.phoneName && (
                            <p className="text-xs sm:text-sm text-muted-foreground truncate">Product: {inquiry.phoneName}</p>
                          )}
                        </div>
                        <Badge className={getStatusBadge(inquiry.status)}>{inquiry.status.replace("_", " ")}</Badge>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Mail className="w-4 h-4" />
                          <span>{inquiry.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone className="w-4 h-4" />
                          <span>{inquiry.phoneNumber}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(inquiry.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <p className="text-sm bg-muted/30 p-3 rounded-lg">{inquiry.message}</p>
                    </div>

                    <div className="flex flex-row lg:flex-col gap-2 shrink-0">
                      <Select onValueChange={(value) => handleStatusUpdate(inquiry.id, value)}>
                        <SelectTrigger className="w-full sm:w-auto lg:w-full min-w-[140px]">
                          <SelectValue placeholder="Update Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PENDING">Pending</SelectItem>
                          <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                          <SelectItem value="RESOLVED">Resolved</SelectItem>
                          <SelectItem value="CLOSED">Closed</SelectItem>
                        </SelectContent>
                      </Select>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="icon" onClick={() => setSelectedInquiry(inquiry)}>
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Inquiry Details</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <p className="text-sm font-medium mb-1">Customer</p>
                              <p className="text-sm text-muted-foreground">{inquiry.name}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium mb-1">Message</p>
                              <p className="text-sm text-muted-foreground">{inquiry.message}</p>
                            </div>
                            {inquiry.adminNotes && (
                              <div>
                                <p className="text-sm font-medium mb-1">Admin Notes</p>
                                <p className="text-sm text-muted-foreground">{inquiry.adminNotes}</p>
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Button variant="outline" size="icon" onClick={() => handleDelete(inquiry.id)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}
