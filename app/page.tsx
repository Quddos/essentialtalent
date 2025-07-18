"use client";

import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { DemoSection } from "@/components/demo-section"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import { StartApplicationButton } from "@/components/ui/start-application-button"
import { FlaskConical } from "lucide-react"
import { motion } from "framer-motion"

function StemTutoringSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex-shrink-0 flex flex-col items-center md:items-start"
        >
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center mb-6 shadow-lg">
            <FlaskConical className="w-12 h-12 text-white" />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex-1"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Tutoring & Consulting: GCSE & A Level STEM Courses & Exams
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            Get expert guidance and personalized tutoring for GCSE and A Level STEM subjects. We help students excel in exams, master coursework, and build a strong foundation in science, technology, engineering, and mathematics.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {[
              "1-on-1 STEM Tutoring",
              "GCSE & A Level Exam Prep",
              "Coursework & Revision Support",
              "Consulting for Academic Success",
              "Maths, Physics, Chemistry, Biology",
              "Study Skills & Motivation"
            ].map((feature) => (
              <li key={feature} className="flex items-center text-base text-gray-700 dark:text-gray-200">
                <span className="inline-block w-2 h-2 rounded-full bg-purple-500 mr-3"></span>
                {feature}
              </li>
            ))}
          </ul>
          <a href="/services" className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:from-pink-600 hover:to-purple-700 transition">
            Learn More
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* <Header /> */}
      <HeroSection />
      <StemTutoringSection />
      <ServicesSection />
      <DemoSection />
      <Footer />
      <Toaster />
    </main>
  )
}
