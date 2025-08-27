"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import {
  UploadCloud,
  BookOpen,
  GraduationCap,
  Briefcase,
  CheckCircle2,
  Users,
  Globe2,
  BarChart4,
  FileCheck,
  Clock,
  Award,
  Building,
} from "lucide-react"
import Image from "next/image"
import { Bar } from "react-chartjs-2"
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement,
  Title,
  Tooltip,
  Legend 
} from "chart.js"
import { useState } from "react"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const placementStats = {
  labels: ["2020", "2021", "2022", "2023", "2024", "2025"],
  datasets: [
    {
      label: "Teachers Placed",
      data: [450, 650, 820, 1100, 1500, 2000],
      backgroundColor: "rgba(59, 130, 246, 0.5)",
      borderColor: "rgb(59, 130, 246)",
      borderWidth: 1,
    },
    {
      label: "Partner Schools",
      data: [120, 180, 250, 320, 400, 500],
      backgroundColor: "rgba(34, 197, 94, 0.5)",
      borderColor: "rgb(34, 197, 94)",
      borderWidth: 1,
    },
  ],
}

export default function TeacherHirePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-green-600 py-32 text-white overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-4"
        >
          {Array.from({ length: 36 }).map((_, i) => (
            <div key={i} className="border border-white/10 rounded-lg" />
          ))}
        </motion.div>
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Elevate Education Through Expert Teaching
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Whether you're a teacher looking for opportunities, seeking certification, 
              or a school in need of qualified educators, we've got you covered.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="secondary" asChild>
                <a href="#services" className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Explore Services
                </a>
              </Button>
              <Button size="lg" className="bg-green-500 hover:bg-green-600" asChild>
                <a href="#apply" className="flex items-center gap-2">
                  <FileCheck className="h-5 w-5" />
                  Start Application
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Our Impact in Numbers</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Track record of success in placing qualified teachers and partnering with schools across the UK
            </p>
          </motion.div>

          <div className="bg-white rounded-lg shadow-lg p-6 mb-12">
            <Bar 
              data={placementStats}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                  title: {
                    display: true,
                    text: 'Growth in Teacher Placement and School Partnerships'
                  }
                }
              }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Users, value: "2000+", label: "Teachers Placed" },
              { icon: Building, value: "500+", label: "Partner Schools" },
              { icon: Globe2, value: "25+", label: "Countries" },
              { icon: Award, value: "96%", label: "Success Rate" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <Badge className="mb-4">Our Services</Badge>
            <h2 className="text-4xl font-bold mb-6">Comprehensive Education Solutions</h2>
            <p className="text-xl text-gray-600">
              We provide end-to-end support for teachers and schools, ensuring quality education delivery across the UK
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: BookOpen,
                title: "For Teachers",
                description: "Start your UK teaching journey with comprehensive support and placement services",
                features: [
                  "Career counseling and placement",
                  "Visa sponsorship assistance",
                  "Competitive salary packages",
                  "Professional development",
                ],
                color: "blue"
              },
              {
                icon: GraduationCap,
                title: "Teacher Training",
                description: "Get qualified with our accredited training programs and certification support",
                features: [
                  "QTS preparation courses",
                  "Practical teaching experience",
                  "Mentorship program",
                  "Continuous support",
                ],
                color: "green"
              },
              {
                icon: Building,
                title: "For Schools",
                description: "Access qualified teaching talent and comprehensive recruitment services",
                features: [
                  "Teacher vetting process",
                  "Compliance assistance",
                  "Ongoing support",
                  "Quick placement",
                ],
                color: "purple"
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg bg-${service.color}-100 flex items-center justify-center mb-4`}>
                      <service.icon className={`h-6 w-6 text-${service.color}-600`} />
                    </div>
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-start gap-2">
                          <CheckCircle2 className={`h-5 w-5 text-${service.color}-500 flex-shrink-0 mt-1`} />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <Badge className="mb-4">Our Process</Badge>
            <h2 className="text-4xl font-bold mb-6">How It Works</h2>
            <p className="text-xl text-gray-600">
              We've streamlined the process to make your journey as smooth as possible
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: 1, title: "Initial Consultation", description: "Discuss your goals and requirements" },
              { step: 2, title: "Document Verification", description: "Review qualifications and experience" },
              { step: 3, title: "Placement Matching", description: "Find the perfect opportunity" },
              { step: 4, title: "Ongoing Support", description: "Continuous assistance throughout your journey" },
            ].map((process, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="text-5xl font-bold text-blue-600/20 absolute top-4 right-4">
                      {process.step}
                    </div>
                    <CardTitle className="relative z-10">{process.title}</CardTitle>
                    <CardDescription>{process.description}</CardDescription>
                  </CardHeader>
                </Card>
                {index < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gray-200" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Apply Section */}
      <section id="apply" className="py-20 bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-green-600" />
            <CardHeader>
              <CardTitle className="text-3xl font-bold">Ready to Take the Next Step?</CardTitle>
              <CardDescription>
                Let our AI-powered system match you with the perfect teaching opportunity
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Why Use Our AI Matching?</h3>
                  <ul className="space-y-3">
                    {[
                      "Instant eligibility assessment",
                      "Personalized opportunity matching",
                      "Skills gap analysis",
                      "Career path recommendations",
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <Image
                    src="/placeholder.jpg"
                    alt="AI Matching Process"
                    width={400}
                    height={300}
                    className="rounded-lg"
                  />
                </div>
              </div>
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-green-600 font-semibold w-full">
                <UploadCloud className="mr-2 h-5 w-5" />
                Upload Your CV for AI Analysis
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Floating AI CV Button */}
      <Button
        className="fixed bottom-8 left-8 z-50 bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-lg flex items-center gap-2 px-6 py-3 rounded-full hover:scale-105 transition-transform"
        onClick={() => window.location.href = "#apply"}
      >
        <UploadCloud className="h-5 w-5" />
        AI: Upload CV & Check Eligibility
      </Button>
    </div>
  )
}
