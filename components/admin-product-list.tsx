"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit, Trash2, Search, Eye, BarChart3, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import Link from "next/link"
import { apiClient, type Phone } from "@/lib/api-client"

export function AdminProductList() {
  const [products, setProducts] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setIsLoading(true)
      const response = await apiClient.getPhones()

      const phones = (Array.isArray(response) ? response : []).map((phone: Phone) => ({
        id: phone.id,
        name: phone.name,
        brand: phone.brand,
        condition: phone.condition?.replace(/_/g, " ") || "Brand New",
        image: phone.images?.[0] || "/premium-black-smartphone.png",
        status: phone.isAvailable ? "active" : "inactive",
        views: phone.viewCount || 0,
        inquiries: phone.inquiryCount || 0,
      }))

      setProducts(phones)
    } catch (error) {
      console.error("Error fetching products:", error)
      toast.error("Failed to load products. Make sure the backend is running.")
    } finally {
      setIsLoading(false)
    }
  }

  const filteredProducts = products.filter(
    (product) =>
      (product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (filterStatus === "all" || product.status === filterStatus),
  )

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await apiClient.deletePhone(id)
        setProducts((prev) => prev.filter((p) => p.id !== id))
        toast.success("Product deleted successfully")
      } catch (error) {
        console.error("Error deleting product:", error)
        toast.error("Failed to delete product")
      }
    }
  }

  const handleToggleStatus = async (id: number) => {
    try {
      const product = products.find((p) => p.id === id)
      if (!product) return

      const updatedData = {
        isAvailable: product.status !== "active",
      }

      await apiClient.updatePhone(id, updatedData)

      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: p.status === "active" ? "inactive" : "active" } : p)),
      )
      toast.success("Product status updated")
    } catch (error) {
      console.error("Error updating product:", error)
      toast.error("Failed to update product status")
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-[180px] h-12">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Product List */}
      <div className="space-y-4">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className="glass-card border-2 hover:border-accent/50 transition-all duration-300 group">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  {/* Image */}
                  <div className="w-full sm:w-24 md:w-32 h-32 rounded-lg overflow-hidden bg-muted/30 flex-shrink-0 mx-auto sm:mx-0">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-3 sm:gap-4 mb-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg sm:text-xl font-bold mb-1 truncate">{product.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{product.brand}</p>
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <Badge variant="outline">{product.condition}</Badge>
                          <Badge variant={product.status === "active" ? "default" : "secondary"}>
                            {product.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-xs sm:text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span>{product.views} views</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <BarChart3 className="w-4 h-4" />
                            <span>{product.inquiries} inquiries</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2">
                      <Link href={`/phones/${product.id}`}>
                        <Button size="sm" variant="outline" className="h-9 bg-transparent">
                          <Eye className="mr-1.5 h-4 w-4" />
                          <span className="hidden sm:inline">View</span>
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-9 bg-transparent"
                        onClick={() => handleToggleStatus(product.id)}
                      >
                        <Edit className="mr-1.5 h-4 w-4" />
                        <span className="hidden sm:inline">Toggle Status</span>
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(product.id)} className="h-9">
                        <Trash2 className="mr-1.5 h-4 w-4" />
                        <span className="hidden sm:inline">Delete</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {filteredProducts.length === 0 && !isLoading && (
          <Card className="glass-card border-2">
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground">No products found matching your search</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
