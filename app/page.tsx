import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { DemoSection } from "@/components/demo-section"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <ServicesSection />
      <DemoSection />
      <Footer />
      <Toaster />
    </main>
  )
}
