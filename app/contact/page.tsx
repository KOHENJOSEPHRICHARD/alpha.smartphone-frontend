"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, MessageCircle, Send, Clock } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    details: "+255 629 707 898",
    action: "tel:+255629707898",
  },
  {
    icon: Mail,
    title: "Email",
    details: "alpha.smartphone.cz@gmail.com",
    action: "mailto:alpha.smartphone.cz@gmail.com",
  },
  {
    icon: MapPin,
    title: "Location",
    details: "Mwera, Zanzibar, Tanzania",
    action: null,
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: "Mon - Sat: 9AM - 8PM",
    action: null,
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast.success("Message sent successfully! We'll get back to you soon.")
    setFormData({ name: "", email: "", phone: "", message: "" })
    setIsSubmitting(false)
  }

  const handleWhatsApp = () => {
    const phoneNumber = "255629707898"
    const message = encodeURIComponent("Hi! I'd like to get in touch.")
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank")
  }

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            Get In Touch
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            Let's Start a
            <span className="block mt-2 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Conversation
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty">
            Have questions about our phones? Need help choosing the perfect device? We're here to assist you every step
            of the way.
          </p>
        </motion.div>

        {/* Contact Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="glass-card border-2 hover:border-accent/50 transition-all duration-300 h-full">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/10 text-accent">
                    <info.icon className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="font-semibold mb-2">{info.title}</p>
                    {info.action ? (
                      <a
                        href={info.action}
                        className="text-sm text-muted-foreground hover:text-accent transition-colors"
                      >
                        {info.details}
                      </a>
                    ) : (
                      <p className="text-sm text-muted-foreground">{info.details}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Form and WhatsApp */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <Card className="glass-card border-2">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Cohen Ferdnands"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="dizierferdnands@gmail.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="h-12"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number (Optional)</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+255712345678"
                      value={formData.phone}
                      onChange={handleChange}
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us how we can help you..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="resize-none"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Contact Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* WhatsApp Card */}
            <Card className="glass-card border-2 border-[#25D366]/30">
              <CardContent className="p-8 text-center space-y-6">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#25D366]/10">
                  <MessageCircle className="w-10 h-10 text-[#25D366]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Quick Response</h3>
                  <p className="text-muted-foreground mb-6">
                    Need immediate assistance? Chat with us on WhatsApp for instant support.
                  </p>
                  <Button
                    size="lg"
                    className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white"
                    onClick={handleWhatsApp}
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Chat on WhatsApp
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Response Time Card */}
            <Card className="glass-card border-2">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-bold">Response Time</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5" />
                    <div>
                      <p className="font-medium">WhatsApp</p>
                      <p className="text-muted-foreground">Within 5 minutes</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-muted-foreground">Within 24 hours</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-1.5" />
                    <div>
                      <p className="font-medium">Contact Form</p>
                      <p className="text-muted-foreground">Within 24 hours</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
