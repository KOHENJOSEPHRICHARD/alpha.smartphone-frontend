"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import { Languages } from "lucide-react"
import { motion } from "framer-motion"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setLanguage(language === "en" ? "sw" : "en")}
      className="rounded-full hover:scale-110 transition-transform duration-300 h-9 w-9 md:h-10 md:w-10 relative group"
      title={language === "en" ? "Switch to Kiswahili" : "Badilisha kwa Kiingereza"}
    >
      <Languages className="h-4 md:h-5 w-4 md:w-5" />
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        whileHover={{ opacity: 1, y: 0 }}
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-medium bg-accent text-accent-foreground px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
      >
        {language === "en" ? "EN" : "SW"}
      </motion.span>
    </Button>
  )
}
