"use client"

import Link from "next/link"
import { Smartphone, Mail, MapPin, Phone, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useLanguage } from "@/lib/language-context"

export function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-gradient-to-br from-muted/50 via-muted/30 to-background border-t border-border/50 backdrop-blur-sm">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-gradient-to-br from-accent to-accent/70 p-2.5 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Smartphone className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                Alpha.<span className="text-accent">SmartPhone</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">{t("footerDescription")}</p>
            <div className="flex gap-3 pt-2">
              <Button
                size="icon"
                variant="outline"
                className="h-9 w-9 rounded-full hover:bg-accent hover:text-white hover:border-accent transition-all bg-transparent"
              >
                <Facebook className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="h-9 w-9 rounded-full hover:bg-accent hover:text-white hover:border-accent transition-all bg-transparent"
              >
                <Instagram className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="h-9 w-9 rounded-full hover:bg-accent hover:text-white hover:border-accent transition-all bg-transparent"
              >
                <Twitter className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="h-9 w-9 rounded-full hover:bg-accent hover:text-white hover:border-accent transition-all bg-transparent"
              >
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="font-bold text-lg flex items-center gap-2">
              <div className="w-1 h-6 bg-accent rounded-full" />
              {t("quickLinks")}
            </h3>
            <nav className="flex flex-col gap-3">
              <Link
                href="/"
                className="text-sm text-muted-foreground hover:text-accent hover:translate-x-1 transition-all duration-200 flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent/50" />
                {t("home")}
              </Link>
              <Link
                href="/phones"
                className="text-sm text-muted-foreground hover:text-accent hover:translate-x-1 transition-all duration-200 flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent/50" />
                {t("phones")}
              </Link>
              <Link
                href="/about"
                className="text-sm text-muted-foreground hover:text-accent hover:translate-x-1 transition-all duration-200 flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent/50" />
                {t("about")}
              </Link>
              <Link
                href="/contact"
                className="text-sm text-muted-foreground hover:text-accent hover:translate-x-1 transition-all duration-200 flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent/50" />
                {t("contact")}
              </Link>
            </nav>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="font-bold text-lg flex items-center gap-2">
              <div className="w-1 h-6 bg-accent rounded-full" />
              {t("contactInfo")}
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 group">
                <div className="p-2 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
                  <Phone className="w-4 h-4 text-accent" />
                </div>
                <div className="text-sm">
                  <p className="font-medium mb-0.5">Phone</p>
                  <a href="tel:+255629707898" className="text-muted-foreground hover:text-accent transition-colors">
                    +255 629 707 898
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3 group">
                <div className="p-2 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
                  <Mail className="w-4 h-4 text-accent" />
                </div>
                <div className="text-sm">
                  <p className="font-medium mb-0.5">Email</p>
                  <a
                    href="mailto:alpha.smartphone.cz@gmail.com"
                    className="text-muted-foreground hover:text-accent transition-colors break-all"
                  >
                    alpha.smartphone.cz@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3 group">
                <div className="p-2 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
                  <MapPin className="w-4 h-4 text-accent" />
                </div>
                <div className="text-sm">
                  <p className="font-medium mb-0.5">Location</p>
                  <p className="text-muted-foreground">Tanzania, East Africa</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Business Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="font-bold text-lg flex items-center gap-2">
              <div className="w-1 h-6 bg-accent rounded-full" />
              {t("businessHours")}
            </h3>
            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between items-center p-2 rounded-lg bg-muted/30">
                <span className="text-muted-foreground">{t("mondayFriday")}</span>
                <span className="font-semibold">9AM - 6PM</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-lg bg-muted/30">
                <span className="text-muted-foreground">{t("saturday")}</span>
                <span className="font-semibold">10AM - 4PM</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-lg bg-muted/30">
                <span className="text-muted-foreground">{t("sunday")}</span>
                <span className="font-semibold text-muted-foreground">Closed</span>
              </div>
            </div>
            <Button
              className="w-full bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#20BA5A] hover:to-[#0F7A69] text-white shadow-lg hover:shadow-[0_0_30px_rgba(37,211,102,0.3)] transition-all duration-300 h-11"
              onClick={() =>
                window.open(
                  "https://wa.me/255629707898?text=Hello! I'm interested in your premium smartphones.",
                  "_blank",
                )
              }
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="mr-2 h-5 w-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Us Now
            </Button>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-border/50"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {currentYear} <span className="font-semibold text-foreground">Alpha.SmartPhone</span>.{" "}
              {t("allRightsReserved")}. Built with excellence.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link href="/privacy" className="text-muted-foreground hover:text-accent transition-colors">
                {t("privacyPolicy")}
              </Link>
              <Link href="/terms" className="text-muted-foreground hover:text-accent transition-colors">
                {t("termsOfService")}
              </Link>
              <Link href="/refund" className="text-muted-foreground hover:text-accent transition-colors">
                {t("refundPolicy")}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
