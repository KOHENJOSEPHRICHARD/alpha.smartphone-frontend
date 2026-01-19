"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Users, TrendingUp, Heart, Shield, Zap } from "lucide-react"

const stats = [
  { label: "Happy Customers", value: "10,000+", icon: Users },
  { label: "Phones Sold", value: "25,000+", icon: TrendingUp },
  { label: "Years Experience", value: "8+", icon: Award },
  { label: "Satisfaction Rate", value: "98%", icon: Heart },
]

const values = [
  {
    icon: Shield,
    title: "Trust & Authenticity",
    description:
      "Every device is verified for authenticity and comes with a guarantee of quality. We stand behind every product we sell.",
  },
  {
    icon: Heart,
    title: "Customer First",
    description:
      "Your satisfaction is our priority. We provide personalized service and support to ensure you find the perfect device.",
  },
  {
    icon: Zap,
    title: "Innovation & Quality",
    description:
      "We curate only the latest and most innovative smartphones, ensuring you have access to cutting-edge technology.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            About Us
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            Your Trusted Partner in
            <span className="block mt-2 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Premium Mobile Technology
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty">
            Alpha.SmartPhone is dedicated to bringing you the finest selection of smartphones from around the world.
            With years of expertise and a passion for technology, we've become the go-to destination for mobile
            enthusiasts.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="glass-card border-2 hover:border-accent/50 transition-all duration-300">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 text-accent">
                    <stat.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold mb-1">{stat.value}</p>
                    <p className="text-muted-foreground">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Our Story */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-12 items-center mb-20"
        >
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Our Story</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Founded in 2026, Alpha.SmartPhone began with a simple mission: to make premium smartphones accessible to
                everyone. What started as a small operation has grown into a trusted platform serving thousands of
                satisfied customers.
              </p>
              <p>
                We believe that everyone deserves access to quality technology. That's why we carefully curate our
                collection, ensuring every device meets our high standards for performance, design, and reliability.
              </p>
              <p>
                Today, we're proud to be recognized as one of the leading phone retailers, known for our exceptional
                customer service, competitive pricing, and commitment to authenticity.
              </p>
            </div>
          </div>
          <div className="relative">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="aspect-square rounded-2xl overflow-hidden shadow-2xl"
            >
              <img
                src="/premium-smartphone-showcase-black-elegant.jpg"
                alt="Alpha.SmartPhone Store"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Our Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Drives Us</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Our core values guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="glass-card border-2 hover:border-accent/50 transition-all duration-300 h-full">
                  <CardContent className="p-8 text-center space-y-4">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 text-accent"
                    >
                      <value.icon className="w-8 h-8" />
                    </motion.div>
                    <h3 className="text-xl font-bold">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center glass-card rounded-3xl p-12 md:p-16 border-2"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Find Your Perfect Phone?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust Alpha.SmartPhone for their mobile needs
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="/phones">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Browse Collection
              </motion.button>
            </a>
            <a href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-border hover:border-accent rounded-xl font-semibold hover:bg-accent/10 transition-all duration-300"
              >
                Contact Us
              </motion.button>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
