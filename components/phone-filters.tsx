"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search, X, SlidersHorizontal } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

interface PhoneFiltersProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  selectedBrand: string
  setSelectedBrand: (brand: string) => void
  selectedCondition: string
  setSelectedCondition: (condition: string) => void
  priceRange: number[]
  setPriceRange: (range: number[]) => void
  onReset: () => void
}

export function PhoneFilters({
  searchQuery,
  setSearchQuery,
  selectedBrand,
  setSelectedBrand,
  selectedCondition,
  setSelectedCondition,
  priceRange,
  setPriceRange,
  onReset,
}: PhoneFiltersProps) {
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search phones by name, brand, or model..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-10 h-12 text-base"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2"
            onClick={() => setSearchQuery("")}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Filter Toggle Button (Mobile) */}
      <Button
        variant="outline"
        className="w-full md:hidden bg-transparent"
        onClick={() => setShowFilters(!showFilters)}
      >
        <SlidersHorizontal className="mr-2 h-4 w-4" />
        {showFilters ? "Hide Filters" : "Show Filters"}
      </Button>

      {/* Filters */}
      <AnimatePresence>
        {(showFilters || (typeof window !== "undefined" && window.innerWidth >= 768)) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="glass-card">
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Filters</h3>
                  <Button variant="ghost" size="sm" onClick={onReset} className="text-accent hover:text-accent">
                    Reset All
                  </Button>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                  {/* Brand Filter */}
                  <div className="space-y-2">
                    <Label htmlFor="brand">Brand</Label>
                    <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                      <SelectTrigger id="brand">
                        <SelectValue placeholder="All Brands" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Brands</SelectItem>
                        <SelectItem value="techphone">TechPhone</SelectItem>
                        <SelectItem value="innotech">InnoTech</SelectItem>
                        <SelectItem value="elitemobile">EliteMobile</SelectItem>
                        <SelectItem value="quantumtech">QuantumTech</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Condition Filter */}
                  <div className="space-y-2">
                    <Label htmlFor="condition">Condition</Label>
                    <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                      <SelectTrigger id="condition">
                        <SelectValue placeholder="All Conditions" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Conditions</SelectItem>
                        <SelectItem value="new">Brand New</SelectItem>
                        <SelectItem value="like-new">Like New</SelectItem>
                        <SelectItem value="excellent">Excellent</SelectItem>
                        <SelectItem value="good">Good</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
