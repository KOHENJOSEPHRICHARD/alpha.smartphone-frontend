"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { motion } from "framer-motion"
import { Cpu, HardDrive, Monitor, Battery, Camera, Smartphone } from "lucide-react"

interface Specs {
  processor: string
  ram: string
  storage: string
  display: string
  battery: string
  camera: string
  os: string
  connectivity: string
  [key: string]: string
}

interface ProductSpecsProps {
  specs: Specs
}

const specIcons: Record<string, any> = {
  processor: Cpu,
  ram: HardDrive,
  storage: HardDrive,
  display: Monitor,
  battery: Battery,
  camera: Camera,
  os: Smartphone,
}

export function ProductSpecs({ specs }: ProductSpecsProps) {
  const specEntries = Object.entries(specs)

  return (
    <Card className="glass-card border-2">
      <CardHeader>
        <CardTitle className="text-2xl">Technical Specifications</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {specEntries.map(([key, value], index) => {
          const Icon = specIcons[key] || Smartphone
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10 text-accent flex-shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-muted-foreground capitalize mb-1">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </p>
                  <p className="font-medium">{value}</p>
                </div>
              </div>
              {index < specEntries.length - 1 && <Separator className="mt-4" />}
            </motion.div>
          )
        })}
      </CardContent>
    </Card>
  )
}
