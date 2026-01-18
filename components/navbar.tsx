"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Moon, Sun, Menu, X, Smartphone } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { LanguageSwitcher } from "./language-switcher"
import { useLanguage } from "@/lib/language-context"

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()
  const { t } = useLanguage()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/phones", label: t("phones") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
    { href: "/admin", label: t("admin") },
  ]

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "glass py-2 md:py-3 shadow-lg" : "bg-transparent py-3 md:py-4",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo - Better responsive sizing */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-primary p-1.5 md:p-2 rounded-lg md:rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <Smartphone className="w-4 md:w-5 h-4 md:h-5 text-primary-foreground" />
            </div>
            <span className="text-base md:text-xl font-bold tracking-tight">
              Alpha.<span className="text-accent">SmartPhone</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant={pathname === link.href ? "secondary" : "ghost"}
                  className={cn(
                    "transition-all duration-300 relative",
                    pathname === link.href && "text-accent-foreground",
                  )}
                >
                  {link.label}
                  {pathname === link.href && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-accent rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Button>
              </Link>
            ))}
          </div>

          {/* Theme Toggle, Language Switcher & Mobile Menu - Better mobile sizing */}
          <div className="flex items-center gap-1 md:gap-2">
            {mounted && <LanguageSwitcher />}
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full hover:scale-110 transition-transform duration-300 h-9 w-9 md:h-10 md:w-10"
              >
                {theme === "dark" ? (
                  <Sun className="h-4 md:h-5 w-4 md:w-5" />
                ) : (
                  <Moon className="h-4 md:h-5 w-4 md:w-5" />
                )}
              </Button>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-full h-9 w-9"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu - Smoother animations */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden"
            >
              <div className="mt-4 glass-card p-3 rounded-xl">
                <div className="flex flex-col gap-1">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link href={link.href} onClick={() => setIsMobileMenuOpen(false)}>
                        <Button
                          variant={pathname === link.href ? "secondary" : "ghost"}
                          className="w-full justify-start text-sm"
                        >
                          {link.label}
                        </Button>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
