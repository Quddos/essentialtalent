"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GraduationCap, Users, Globe, BookOpen, Briefcase, Video, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"

const services = [
  {
    icon: GraduationCap,
    title: "UK Study Routes",
    description: "Complete guidance for studying in the UK with visa assistance and university placement.",
    features: ["University Applications", "Visa Support", "Accommodation Help", "Pre-departure Briefing"],
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Briefcase,
    title: "Work Visa Assistance",
    description: "Professional support for UK work visas and job placement services.",
    features: ["Skilled Worker Visa", "Job Matching", "CV Enhancement", "Interview Preparation"],
    color: "from-green-500 to-green-600",
  },
  {
    icon: Users,
    title: "Teacher Recruitment",
    description: "Specialized recruitment services for qualified teachers seeking UK opportunities.",
    features: ["QTS Support", "School Partnerships", "Relocation Assistance", "Career Development"],
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: Video,
    title: "Online Tutoring",
    description: "Professional online and home tutoring services across various subjects.",
    features: ["1-on-1 Sessions", "Group Classes", "Flexible Scheduling", "Progress Tracking"],
    color: "from-orange-500 to-orange-600",
  },
  {
    icon: BookOpen,
    title: "Education Consulting",
    description: "Expert educational consulting and career guidance services.",
    features: ["Career Counseling", "Course Selection", "Scholarship Guidance", "Academic Planning"],
    color: "from-teal-500 to-teal-600",
  },
  {
    icon: Globe,
    title: "International Services",
    description: "Comprehensive international education and migration services.",
    features: ["Global Partnerships", "Cultural Integration", "Language Support", "Ongoing Support"],
    color: "from-indigo-500 to-indigo-600",
  },
]

export function ServicesSection() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500">Services</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive solutions for your educational and career aspirations in the UK and beyond
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white dark:bg-gray-800">
                <CardHeader className="pb-4">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} p-4 mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">{service.title}</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full group-hover:bg-blue-50 dark:group-hover:bg-blue-900 transition-colors"
                  >
                    <Link href="/services" className="flex items-center justify-center">
                      Learn More
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white px-8 py-4 text-lg"
          >
            <Link href="/demo">
              Book Your Free Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
