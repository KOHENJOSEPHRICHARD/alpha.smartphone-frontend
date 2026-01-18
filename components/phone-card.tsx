"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Shield, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

interface Phone {
  id: number
  name: string
  brand: string
  price: string
  priceValue: number
  image: string
  rating: number
  reviews: number
  condition: string
  badge?: string
  specs?: {
    ram: string
    storage: string
    display: string
  }
}

interface PhoneCardProps {
  phone: Phone
  index: number
}

export function PhoneCard({ phone, index }: PhoneCardProps) {
  const router = useRouter()

  const handleWhatsApp = () => {
    const phoneNumber = "255629707898"
    const message = encodeURIComponent(`Hi! I'm interested in ${phone.name}`)
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank")
  }

  const handleViewDetails = () => {
    router.push(`/phones/${phone.id}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="h-full"
    >
      <Card className="group overflow-hidden border hover:border-accent/50 transition-all duration-300 hover:shadow-lg h-full cursor-pointer">
        <div className="flex flex-col h-full" onClick={handleViewDetails}>
          {/* Image Section - Square ratio for consistency */}
          <div className="relative overflow-hidden bg-white dark:bg-muted/10 aspect-square border-b">
            <motion.img
              src={phone.image}
              alt={phone.name}
              className="w-full h-full object-contain p-2"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              loading="lazy"
            />
            {phone.badge && (
              <Badge className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-0.5">
                {phone.badge}
              </Badge>
            )}
            <div className="absolute top-2 right-2">
              <Badge variant="secondary" className="bg-white/90 dark:bg-black/90 text-foreground text-xs">
                {phone.condition}
              </Badge>
            </div>
          </div>

          {/* Product Info Section */}
          <div className="p-3 space-y-2 flex-1 flex flex-col">
            {/* Product Name - Truncated */}
            <h3 className="text-sm font-medium leading-tight line-clamp-2 min-h-[2.5rem] text-foreground group-hover:text-accent transition-colors">
              {phone.name}
            </h3>

            {/* Specs - Compact */}
            {phone.specs && (
              <div className="text-xs text-muted-foreground">
                <p className="truncate">
                  {phone.specs.ram} RAM • {phone.specs.storage}
                </p>
              </div>
            )}

            {/* Rating and Reviews */}
            <div className="flex items-center gap-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.floor(phone.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">({phone.reviews})</span>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1">
              <div className="flex items-center gap-1">
                <Shield className="w-3 h-3 text-green-600" />
                <span>Verified</span>
              </div>
              {phone.priceValue > 1000 && (
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-blue-600" />
                  <span>Popular</span>
                </div>
              )}
            </div>

            {/* Action Button */}
            <div className="mt-auto pt-2">
              <Button
                size="sm"
                className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white h-9 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                onClick={(e) => {
                  e.stopPropagation()
                  handleWhatsApp()
                }}
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
