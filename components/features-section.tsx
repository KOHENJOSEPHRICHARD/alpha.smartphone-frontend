"use client"

import { Smartphone, Shield, Zap, HeadphonesIcon } from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"

export function FeaturesSection() {
  const { t } = useLanguage()

  const features = [
    {
      icon: Smartphone,
      title: t("authenticProducts"),
      description: t("authenticDesc"),
    },
    {
      icon: Shield,
      title: t("expertSupport"),
      description: t("expertDesc"),
    },
    {
      icon: Zap,
      title: t("fastDelivery"),
      description: t("fastDesc"),
    },
    {
      icon: HeadphonesIcon,
      title: t("securePayment"),
      description: t("secureDesc"),
    },
  ]

  return (
    <section className="py-12 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 text-balance">{t("whyChooseUs")}</h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            {t("featuresSubtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group h-full glass-card border-2 hover:border-accent/50 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-4 md:p-6 text-center space-y-2 md:space-y-4">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="inline-flex items-center justify-center w-12 md:w-16 h-12 md:h-16 rounded-xl md:rounded-2xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300"
                  >
                    <feature.icon className="w-6 md:w-8 h-6 md:h-8" />
                  </motion.div>
                  <h3 className="text-sm md:text-xl font-bold">{feature.title}</h3>
                  <p className="text-xs md:text-base text-muted-foreground leading-relaxed hidden md:block">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
