"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

interface Phone {
  id: number
  name: string
  brand: string
  price: string // Keep for backward compatibility but won't display
  image: string
  rating: number
}

interface SimilarPhonesProps {
  phones: Phone[]
}

export function SimilarPhones({ phones }: SimilarPhonesProps) {
  if (phones.length === 0) return null

  return (
    <section className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-8">Similar Phones You Might Like</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {phones.map((phone, index) => (
            <motion.div
              key={phone.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group overflow-hidden border-2 hover:border-accent/50 transition-all duration-300 hover:shadow-xl glass-card">
                <CardContent className="p-0">
                  <Link href={`/phones/${phone.id}`}>
                    <div className="relative overflow-hidden bg-muted/30 aspect-[3/4]">
                      <img
                        src={phone.image || "/placeholder.svg"}
                        alt={phone.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </Link>
                  <div className="p-4 space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">{phone.brand}</p>
                      <Link href={`/phones/${phone.id}`}>
                        <h3 className="font-bold group-hover:text-accent transition-colors line-clamp-2">
                          {phone.name}
                        </h3>
                      </Link>
                      <div className="flex items-center gap-1 mt-2">
                        <Star className="w-3 h-3 fill-accent text-accent" />
                        <span className="text-sm font-medium">{phone.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-end">
                      <Link href={`/phones/${phone.id}`}>
                        <Button size="sm" variant="ghost">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
