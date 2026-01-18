"use client"

import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300)
    }
    window.addEventListener("scroll", handleScroll)

    // Show tooltip after 3 seconds on first load
    const tooltipTimer = setTimeout(() => {
      setShowTooltip(true)
      setTimeout(() => setShowTooltip(false), 3000)
    }, 3000)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(tooltipTimer)
    }
  }, [])

  const handleWhatsAppClick = () => {
    const phoneNumber = "255629707898"
    const message = encodeURIComponent(
      "Hello! I'm interested in your premium smartphones from Alpha.SmartPhone. I'd like to know more about your available products.",
    )
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank")
  }

  if (!isVisible) return null

  return (
    <>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white px-4 py-2 rounded-lg shadow-xl whitespace-nowrap hidden sm:block"
            >
              <p className="text-sm font-medium">Need help? Chat with us!</p>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
                <div className="border-8 border-transparent border-l-[#25D366]" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          onClick={handleWhatsAppClick}
          size="icon"
          className="relative h-16 w-16 rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] hover:from-[#20BA5A] hover:to-[#0F7A69] shadow-2xl hover:shadow-[0_0_40px_rgba(37,211,102,0.5)] hover:scale-110 transition-all duration-300 group"
          aria-label="Contact via WhatsApp"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          {/* Pulse Animation Ring */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />

          {/* WhatsApp Icon */}
          <svg
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 relative z-10 group-hover:scale-110 transition-transform"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16 31C23.732 31 30 24.732 30 17C30 9.26801 23.732 3 16 3C8.26801 3 2 9.26801 2 17C2 19.5109 2.661 21.8674 3.81847 23.905L2 31L9.31486 29.3038C11.3014 30.3854 13.5789 31 16 31Z"
              fill="white"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16 28C22.0751 28 27 23.0751 27 17C27 10.9249 22.0751 6 16 6C9.92487 6 5 10.9249 5 17C5 19.3324 5.67218 21.5013 6.83932 23.3152L5.91205 26.5L9.24095 25.6122C11.0235 26.7039 13.1383 27.3333 15.4 27.3333C15.6 27.3333 15.8 27.3333 16 27.3333V28Z"
              fill="url(#paint0_linear)"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.5 9.49989C12.1672 8.83131 11.6565 8.8905 11.1407 8.8905C10.2188 8.8905 8.78125 9.99478 8.78125 12.05C8.78125 13.7343 9.52345 15.578 12.0244 18.3361C14.438 20.9979 17.6094 22.3748 20.2422 22.3279C22.875 22.2811 23.4167 20.0154 23.4167 19.2503C23.4167 18.9112 23.2062 18.742 23.0613 18.696C22.1641 18.2654 20.5093 17.4631 20.1328 17.3124C19.7563 17.1617 19.5597 17.3656 19.4375 17.4765C19.0961 17.8018 18.4193 18.7608 18.1875 18.9765C17.9558 19.1922 17.6103 19.083 17.4665 19.0015C16.9374 18.7892 15.5029 18.1511 14.3595 17.0426C12.9453 15.6718 12.8623 15.2001 12.5959 14.7803C12.3828 14.4444 12.5392 14.2384 12.6172 14.1483C12.9219 13.7968 13.3426 13.254 13.5313 12.9843C13.7199 12.7145 13.5702 12.305 13.4803 12.05C13.0938 10.953 12.7663 10.0347 12.5 9.49989Z"
              fill="#25D366"
            />
            <defs>
              <linearGradient id="paint0_linear" x1="26.5" y1="7" x2="5" y2="28" gradientUnits="userSpaceOnUse">
                <stop stopColor="#ECFDF5" />
                <stop offset="1" stopColor="#D1FAE5" />
              </linearGradient>
            </defs>
          </svg>
        </Button>
      </motion.div>
    </>
  )
}
