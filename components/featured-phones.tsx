"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Star, AlertCircle } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { useRef, useEffect, useState } from "react"
import { apiClient } from "@/lib/api-client"
import { useToast } from "@/hooks/use-toast"

export function FeaturedPhones() {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }))
  const [featuredPhones, setFeaturedPhones] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const fetchFeaturedPhones = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const response = await apiClient.getFeaturedPhones()

        const phones = (Array.isArray(response) ? response : response.data || []).map((phone: any) => ({
          id: phone.id,
          name: phone.name,
          brand: phone.brand,
          image: phone.images?.[0] || "/premium-black-smartphone.png",
          rating: 4.7 + Math.random() * 0.3,
          badge: "Featured",
          condition: phone.condition?.replace(/_/g, " ") || "Brand New",
        }))

        setFeaturedPhones(phones.slice(0, 4))
      } catch (error) {
        console.error("[API Error] Featured phones:", error)
        setError("Failed to load featured phones")
        toast({
          title: "Connection Error",
          description: "Cannot load featured phones. Please ensure backend is running.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchFeaturedPhones()
  }, [toast])

  if (error) {
    return (
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 mb-4">
              <AlertCircle className="w-8 h-8 text-destructive" />
            </div>
            <h3 className="text-xl font-bold mb-2">Unable to Load Featured Phones</h3>
            <p className="text-sm text-muted-foreground">Please check backend connection</p>
          </div>
        </div>
      </section>
    )
  }

  if (isLoading) {
    return (
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm">
              Featured Collection
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Our Premium Selection</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[400px] bg-muted/50 animate-pulse rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm">
            Featured Collection
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Our Premium Selection</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Handpicked devices that represent the pinnacle of mobile technology
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Carousel
            plugins={[plugin.current]}
            className="w-full max-w-6xl mx-auto"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent>
              {featuredPhones.map((phone, index) => (
                <CarouselItem key={phone.id} className="md:basis-1/2 lg:basis-1/3">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-2"
                  >
                    <Card className="group overflow-hidden border-2 hover:border-accent/50 transition-all duration-300 hover:shadow-2xl glass-card">
                      <CardContent className="p-0">
                        {/* Image Container */}
                        <div className="relative overflow-hidden bg-muted/30 aspect-[3/4]">
                          <img
                            src={phone.image || "/placeholder.svg"}
                            alt={phone.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                            {phone.badge}
                          </Badge>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-4">
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">{phone.brand}</p>
                            <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">
                              {phone.name}
                            </h3>
                            <div className="flex items-center gap-2 mb-2">
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-accent text-accent" />
                                <span className="text-sm font-medium">{phone.rating.toFixed(1)}</span>
                              </div>
                              <span className="text-sm text-muted-foreground">• {phone.condition}</span>
                            </div>
                          </div>

                          <Link href={`/phones/${phone.id}`} className="block">
                            <Button className="w-full group/btn" variant="secondary">
                              View Details
                              <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link href="/phones">
            <Button
              size="lg"
              variant="outline"
              className="border-2 hover:bg-accent/10 hover:border-accent bg-transparent"
            >
              View All Phones
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
