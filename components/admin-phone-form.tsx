"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, X, Plus } from "lucide-react"
import { toast } from "sonner"
import { motion } from "framer-motion"
import { apiClient } from "@/lib/api-client"
import { useRouter } from "next/navigation"

interface PhoneFormData {
  name: string
  brand: string
  model: string
  condition: string
  description: string
  processor: string
  ram: string
  storage: string
  displaySize: string
  displayType: string
  battery: string
  mainCamera: string
  frontCamera: string
  operatingSystem: string
  network: string
  isFeatured: boolean
  isAvailable: boolean
}

export function AdminPhoneForm() {
  const router = useRouter()
  const [formData, setFormData] = useState<PhoneFormData>({
    name: "",
    brand: "",
    model: "",
    condition: "BRAND_NEW",
    description: "",
    processor: "",
    ram: "",
    storage: "",
    displaySize: "",
    displayType: "",
    battery: "",
    mainCamera: "",
    frontCamera: "",
    operatingSystem: "",
    network: "5G",
    isFeatured: false,
    isAvailable: true,
  })

  const [images, setImages] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value })
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length + images.length > 5) {
      toast.error("Maximum 5 images allowed")
      return
    }

    setImages((prev) => [...prev, ...files])

    files.forEach((file) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
    setImagePreviews((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      console.log("[v0] Submitting phone data to backend...")

      // Upload images first and get URLs
      let imageUrls: string[] = []
      
      if (images.length > 0) {
        toast.info("Uploading images...")
        const uploadPromises = images.map((file) => apiClient.uploadImage(file))
        imageUrls = await Promise.all(uploadPromises)
        console.log("[v0] Uploaded images:", imageUrls)
      } else {
        // Fallback to default image if no images uploaded
        imageUrls = ["/premium-black-smartphone.png"]
      }

      const phoneData = {
        ...formData,
        condition: formData.condition,
        images: imageUrls,
        isFeatured: formData.isFeatured,
        isAvailable: formData.isAvailable,
      }

      console.log("[v0] Phone data:", phoneData)
      const response = await apiClient.createPhone(phoneData)
      console.log("[v0] Create phone response:", response)

      toast.success("Phone added successfully!")

      // Reset form
      setFormData({
        name: "",
        brand: "",
        model: "",
        condition: "BRAND_NEW",
        description: "",
        processor: "",
        ram: "",
        storage: "",
        displaySize: "",
        displayType: "",
        battery: "",
        mainCamera: "",
        frontCamera: "",
        operatingSystem: "",
        network: "5G",
        isFeatured: false,
        isAvailable: true,
      })
      setImages([])
      setImagePreviews([])

      // Redirect to products page
      setTimeout(() => {
        router.push("/admin/dashboard/products")
      }, 1500)
    } catch (error: any) {
      console.error("[v0] Error creating phone:", error)
      
      // Enhanced error messages
      let errorMessage = error.message || "Failed to add phone"
      
      if (errorMessage.includes("Backend") || errorMessage.includes("backend")) {
        errorMessage += "\n\n💡 TIP: Switch to mock backend in .env.local:\nNEXT_PUBLIC_API_URL=/api/mock"
        toast.error(errorMessage, { duration: 5000 })
      } else if (errorMessage.includes("Validation")) {
        toast.error(`Validation Error: ${errorMessage}`, { duration: 4000 })
      } else {
        toast.error(errorMessage)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <Card className="glass-card border-2 hover:border-accent/30 transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-1 h-6 bg-accent rounded-full" />
            Basic Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                name="name"
                placeholder="e.g., iPhone 15 Pro Max"
                value={formData.name}
                onChange={handleChange}
                required
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="brand">Brand *</Label>
              <Select value={formData.brand} onValueChange={(value) => handleSelectChange("brand", value)} required>
                <SelectTrigger id="brand" className="h-11">
                  <SelectValue placeholder="Select brand" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Apple">Apple</SelectItem>
                  <SelectItem value="Samsung">Samsung</SelectItem>
                  <SelectItem value="OnePlus">OnePlus</SelectItem>
                  <SelectItem value="Xiaomi">Xiaomi</SelectItem>
                  <SelectItem value="Google">Google</SelectItem>
                  <SelectItem value="Oppo">Oppo</SelectItem>
                  <SelectItem value="Vivo">Vivo</SelectItem>
                  <SelectItem value="Realme">Realme</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-2">
              <Label htmlFor="model">Model *</Label>
              <Input
                id="model"
                name="model"
                placeholder="e.g., 15 Pro Max"
                value={formData.model}
                onChange={handleChange}
                required
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="condition">Condition *</Label>
              <Select
                value={formData.condition}
                onValueChange={(value) => handleSelectChange("condition", value)}
                required
              >
                <SelectTrigger id="condition" className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BRAND_NEW">Brand New</SelectItem>
                  <SelectItem value="LIKE_NEW">Like New</SelectItem>
                  <SelectItem value="EXCELLENT">Excellent</SelectItem>
                  <SelectItem value="GOOD">Good</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Detailed product description..."
              value={formData.description}
              onChange={handleChange}
              rows={4}
              required
              className="resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isFeatured"
                checked={formData.isFeatured}
                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                className="w-4 h-4"
              />
              <Label htmlFor="isFeatured">Featured Product</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isAvailable"
                checked={formData.isAvailable}
                onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                className="w-4 h-4"
              />
              <Label htmlFor="isAvailable">Available for Sale</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Technical Specifications */}
      <Card className="glass-card border-2 hover:border-accent/30 transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-1 h-6 bg-accent rounded-full" />
            Technical Specifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-2">
              <Label htmlFor="processor">Processor</Label>
              <Input
                id="processor"
                name="processor"
                placeholder="e.g., A17 Pro"
                value={formData.processor}
                onChange={handleChange}
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ram">RAM</Label>
              <Input
                id="ram"
                name="ram"
                placeholder="e.g., 8GB"
                value={formData.ram}
                onChange={handleChange}
                className="h-11"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-2">
              <Label htmlFor="storage">Storage</Label>
              <Input
                id="storage"
                name="storage"
                placeholder="e.g., 256GB"
                value={formData.storage}
                onChange={handleChange}
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="displaySize">Display Size</Label>
              <Input
                id="displaySize"
                name="displaySize"
                placeholder="e.g., 6.7 inches"
                value={formData.displaySize}
                onChange={handleChange}
                className="h-11"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-2">
              <Label htmlFor="battery">Battery</Label>
              <Input
                id="battery"
                name="battery"
                placeholder="e.g., 4422 mAh"
                value={formData.battery}
                onChange={handleChange}
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mainCamera">Main Camera</Label>
              <Input
                id="mainCamera"
                name="mainCamera"
                placeholder="e.g., 48MP + 12MP + 12MP"
                value={formData.mainCamera}
                onChange={handleChange}
                className="h-11"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-2">
              <Label htmlFor="frontCamera">Front Camera</Label>
              <Input
                id="frontCamera"
                name="frontCamera"
                placeholder="e.g., 12MP"
                value={formData.frontCamera}
                onChange={handleChange}
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="operatingSystem">Operating System</Label>
              <Input
                id="operatingSystem"
                name="operatingSystem"
                placeholder="e.g., iOS 17"
                value={formData.operatingSystem}
                onChange={handleChange}
                className="h-11"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-2">
              <Label htmlFor="network">Network</Label>
              <Input
                id="network"
                name="network"
                placeholder="e.g., 5G"
                value={formData.network}
                onChange={handleChange}
                className="h-11"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Images */}
      <Card className="glass-card border-2 hover:border-accent/30 transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-1 h-6 bg-accent rounded-full" />
            Product Images (Max 5)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Image Upload */}
          <div className="space-y-4">
            <label
              htmlFor="images"
              className="flex flex-col items-center justify-center w-full h-32 sm:h-40 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-accent hover:bg-accent/5 transition-all duration-300 bg-muted/30"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 sm:w-10 h-8 sm:h-10 mb-3 text-muted-foreground" />
                <p className="mb-2 text-xs sm:text-sm text-muted-foreground text-center px-4">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-muted-foreground">PNG, JPG or WEBP (Max 5 images)</p>
              </div>
              <input
                id="images"
                name="images"
                type="file"
                className="hidden"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                disabled={images.length >= 5}
              />
            </label>
          </div>

          {/* Image Previews */}
          {imagePreviews.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
              {imagePreviews.map((preview, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="relative aspect-square rounded-lg overflow-hidden border-2 border-border group hover:border-accent transition-all"
                >
                  <img
                    src={preview || "/placeholder.svg"}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:scale-110"
                  >
                    <X className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <Button type="submit" size="lg" className="flex-1 h-12 text-base" disabled={isSubmitting}>
          {isSubmitting ? (
            "Adding Product..."
          ) : (
            <>
              <Plus className="mr-2 h-5 w-5" />
              Add Product
            </>
          )}
        </Button>
        <Button
          type="button"
          size="lg"
          variant="outline"
          className="h-12 sm:w-auto bg-transparent"
          onClick={() => {
            setFormData({
              name: "",
              brand: "",
              model: "",
              condition: "BRAND_NEW",
              description: "",
              processor: "",
              ram: "",
              storage: "",
              displaySize: "",
              displayType: "",
              battery: "",
              mainCamera: "",
              frontCamera: "",
              operatingSystem: "",
              network: "5G",
              isFeatured: false,
              isAvailable: true,
            })
            setImages([])
            setImagePreviews([])
          }}
        >
          Clear Form
        </Button>
      </div>
    </form>
  )
}
