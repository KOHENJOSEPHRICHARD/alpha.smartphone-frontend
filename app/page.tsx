import { HeroSection } from "@/components/hero-section"
import { FeaturedPhones } from "@/components/featured-phones"
import { FeaturesSection } from "@/components/features-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedPhones />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </>
  )
}
