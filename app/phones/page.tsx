"use client"

import { useState, useMemo, useEffect } from "react"
import { PhoneFilters } from "@/components/phone-filters"
import { PhoneCard } from "@/components/phone-card"
import { PhoneGridSkeleton } from "@/components/phone-grid-skeleton"
import { motion } from "framer-motion"
import { AlertCircle } from "lucide-react"
import { apiClient } from "@/lib/api-client"
import { useToast } from "@/hooks/use-toast"

export default function PhonesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedBrand, setSelectedBrand] = useState("all")
  const [selectedCondition, setSelectedCondition] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 2000])
  const [isLoading, setIsLoading] = useState(true)
  const [allPhones, setAllPhones] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const fetchPhones = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const response = await apiClient.getPhones()

        const phones = (Array.isArray(response) ? response : response.data || []).map((phone: any) => ({
          id: phone.id,
          name: phone.name,
          brand: phone.brand,
          image: phone.images?.[0] || "/premium-black-smartphone.png",
          rating: 4.5 + Math.random() * 0.5,
          reviews: Math.floor(Math.random() * 300) + 50,
          condition: phone.condition?.replace(/_/g, " ") || "Brand New",
          badge: phone.isFeatured ? "Featured" : phone.isAvailable ? "Available" : "",
          specs: {
            ram: phone.ram,
            storage: phone.storage,
            display: phone.displaySize,
          },
        }))

        setAllPhones(phones)
      } catch (error) {
        console.error("[API Error]", error)
        setError("Failed to load phones. Please ensure the backend server is running on http://localhost:8080")
        toast({
          title: "Connection Error",
          description: "Cannot connect to backend API. Please start the Spring Boot server.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchPhones()
  }, [toast])

  const filteredPhones = useMemo(() => {
    return allPhones.filter((phone) => {
      const matchesSearch =
        phone.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        phone.brand.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesBrand = selectedBrand === "all" || phone.brand.toLowerCase() === selectedBrand.toLowerCase()
      const matchesCondition =
        selectedCondition === "all" || phone.condition.toLowerCase().includes(selectedCondition.toLowerCase())

      return matchesSearch && matchesBrand && matchesCondition
    })
  }, [allPhones, searchQuery, selectedBrand, selectedCondition])

  const handleReset = () => {
    setSearchQuery("")
    setSelectedBrand("all")
    setSelectedCondition("all")
    setPriceRange([0, 2000])
  }

  return (
    <div className="min-h-screen pt-28 pb-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">Premium Smartphones</h1>
          <p className="text-base md:text-lg text-muted-foreground text-pretty">
            Explore our curated collection of the latest and greatest devices
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <PhoneFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
            selectedCondition={selectedCondition}
            setSelectedCondition={setSelectedCondition}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            onReset={handleReset}
          />
        </motion.div>

        {/* Results Count */}
        {!error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {filteredPhones.length} of {allPhones.length} phones
            </p>
          </motion.div>
        )}

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-20"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-destructive/10 mb-6">
              <AlertCircle className="w-10 h-10 text-destructive" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Backend Connection Error</h3>
            <p className="text-muted-foreground mb-2 max-w-md mx-auto">{error}</p>
            <p className="text-sm text-muted-foreground">
              Make sure PostgreSQL is running and Spring Boot backend is started on port 8080
            </p>
          </motion.div>
        )}

        {/* Phone Grid */}
        {!error && (
          <>
            {isLoading ? (
              <PhoneGridSkeleton />
            ) : filteredPhones.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
                {filteredPhones.map((phone, index) => (
                  <PhoneCard key={phone.id} phone={phone} index={index} />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-20"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-6">
                  <AlertCircle className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-2xl font-bold mb-2">No phones found</h3>
                <p className="text-muted-foreground mb-6">Try adjusting your filters or search query</p>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
