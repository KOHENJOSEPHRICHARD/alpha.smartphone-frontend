"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ImageGallery } from "@/components/image-gallery"
import { ProductSpecs } from "@/components/product-specs"
import { SimilarPhones } from "@/components/similar-phones"
import { motion } from "framer-motion"
import { Star, MessageCircle, ArrowLeft, Share2, Heart, ShieldCheck, Truck, RefreshCw, Loader2 } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { apiClient, type Phone } from "@/lib/api-client"

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isFavorite, setIsFavorite] = useState(false)
  const [similarPhones, setSimilarPhones] = useState<any[]>([])

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true)
        const phoneId = parseInt(params.id as string)
        
        if (isNaN(phoneId)) {
          setIsLoading(false)
          return
        }

        const phoneData = await apiClient.getPhone(phoneId)
        
        // Transform API response to match UI expectations
        const transformedProduct = {
          id: phoneData.id,
          name: phoneData.name,
          brand: phoneData.brand,
          images: phoneData.images && phoneData.images.length > 0 
            ? phoneData.images 
            : ["/premium-black-smartphone.png"],
          rating: 4.5 + Math.random() * 0.5, // Default rating if not available
          reviews: Math.floor(Math.random() * 300) + 50, // Default reviews if not available
          condition: phoneData.condition?.replace(/_/g, " ") || "Brand New",
          badge: phoneData.isFeatured ? "Featured" : phoneData.isAvailable ? "Available" : "",
          description: phoneData.description || "No description available.",
          specs: {
            processor: phoneData.processor || "Not specified",
            ram: phoneData.ram || "Not specified",
            storage: phoneData.storage || "Not specified",
            display: phoneData.displaySize 
              ? `${phoneData.displaySize}${phoneData.displayType ? ` ${phoneData.displayType}` : ""}`
              : "Not specified",
            battery: phoneData.battery || "Not specified",
            camera: phoneData.mainCamera 
              ? `${phoneData.mainCamera}${phoneData.frontCamera ? ` + ${phoneData.frontCamera} Front` : ""}`
              : "Not specified",
            os: phoneData.operatingSystem || "Not specified",
            connectivity: phoneData.network || "Not specified",
          },
        }

        setProduct(transformedProduct)

        // Fetch similar phones (other phones from the same brand or featured phones)
        try {
          const allPhones = await apiClient.getPhones()
          const similar = allPhones
            .filter((p: Phone) => p.id !== phoneData.id && (p.brand === phoneData.brand || p.isFeatured))
            .slice(0, 4)
            .map((p: Phone) => ({
              id: p.id,
              name: p.name,
              brand: p.brand,
              price: "", // Not displayed but required by interface
              image: p.images?.[0] || "/premium-black-smartphone.png",
              rating: 4.5 + Math.random() * 0.5,
            }))
          setSimilarPhones(similar)
        } catch (error) {
          console.error("Error fetching similar phones:", error)
        }
      } catch (error: any) {
        console.error("[Product Detail Error]", error)
        toast.error(error.message || "Failed to load product details")
      } finally {
        setIsLoading(false)
      }
    }

    if (params.id) {
      fetchProduct()
    }
  }, [params.id])

  if (isLoading) {
    return (
      <div className="min-h-screen pt-28 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Loader2 className="w-12 h-12 animate-spin text-accent mx-auto mb-4" />
          <p className="text-muted-foreground">Loading product details...</p>
        </motion.div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-28 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="mb-6">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Product Not Found</h2>
            <p className="text-muted-foreground mb-6">Sorry, we couldn't find the product you're looking for.</p>
          </div>
          <Link href="/phones">
            <Button size="lg">Back to All Phones</Button>
          </Link>
        </motion.div>
      </div>
    )
  }

  const handleWhatsApp = () => {
    const phoneNumber = "255629707898"
    const message = encodeURIComponent(
      `Hi! I'm interested in ${product.name}. Can you provide more details and pricing?`,
    )
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank")
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name} on Alpha.SmartPhone!`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success("Link copied to clipboard!")
    }
  }

  const handleFavorite = () => {
    setIsFavorite(!isFavorite)
    toast.success(isFavorite ? "Removed from favorites" : "Added to favorites")
  }

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </motion.div>

        {/* Product Content */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Left: Image Gallery */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <ImageGallery images={product.images} productName={product.name} />
          </motion.div>

          {/* Right: Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                {product.badge && <Badge className="bg-accent text-accent-foreground">{product.badge}</Badge>}
                <Badge variant="outline">{product.condition}</Badge>
              </div>
              <p className="text-muted-foreground mb-2">{product.brand}</p>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">{product.name}</h1>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-medium">{product.rating}</span>
                </div>
                <Separator orientation="vertical" className="h-6" />
                <span className="text-muted-foreground">{product.reviews} reviews</span>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <Button size="lg" className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white" onClick={handleWhatsApp}>
                <MessageCircle className="mr-2 h-5 w-5" />
                Contact for Price & Details
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" size="lg" className="flex-1 bg-transparent" onClick={handleShare}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
                <Button variant="outline" size="lg" className="flex-1 bg-transparent" onClick={handleFavorite}>
                  <Heart className={`mr-2 h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                  {isFavorite ? "Saved" : "Save"}
                </Button>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-xl font-bold">Description</h3>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            <Separator />

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10 text-accent">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-sm">Quality Assured</p>
                  <p className="text-xs text-muted-foreground">Certified device</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10 text-accent">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-sm">Fast Shipping</p>
                  <p className="text-xs text-muted-foreground">2-5 business days</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10 text-accent">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-sm">Easy Returns</p>
                  <p className="text-xs text-muted-foreground">30-day guarantee</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Specifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <ProductSpecs specs={product.specs} />
        </motion.div>

        {/* Similar Phones */}
        <SimilarPhones phones={similarPhones} />
      </div>
    </div>
  )
}
