"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  GraduationCap, 
  Clock, 
  Users, 
  Globe, 
  BookOpen, 
  Award, 
  CheckCircle, 
  Calendar,
  Video,
  Wifi,
  Laptop,
  ArrowRight,
  Star
} from "lucide-react"

const features = [
  {
    icon: BookOpen,
    title: "UK-style Assignment & Referencing",
    description: "Master academic writing standards and citation methods used in UK universities"
  },
  {
    icon: Clock,
    title: "Time Management & Communication",
    description: "Develop essential skills for academic success and professional growth"
  },
  {
    icon: Laptop,
    title: "Tech Tools for Academic Success",
    description: "Learn digital tools and platforms commonly used in UK educational institutions"
  },
  {
    icon: Globe,
    title: "Life Skills for UK Culture",
    description: "Adapt to British culture, lifestyle, and social expectations"
  }
]

const stats = [
  { value: "2", label: "Weeks", icon: Calendar },
  { value: "3", label: "Sessions/Week", icon: Clock },
  { value: "Live", label: "Zoom Sessions", icon: Video },
  { value: "Free", label: "Certificate", icon: Award }
]

export function BootcampSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            🎓 UK-Ready Bootcamp for African Students!
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            2-Week Virtual
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500">
              {" "}Soft Skills & Academic Prep
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Planning to study in the UK? Get the skills you need before you arrive! 
            Join our comprehensive bootcamp designed specifically for African students.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Content - Features */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              What You'll Learn
            </h3>
            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Stats & CTA */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Stats */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-center">Bootcamp Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="text-center p-4 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg"
                    >
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                        <stat.icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* CTA Card */}
            <Card className="bg-gradient-to-r from-blue-600 to-green-600 text-white border-0 shadow-xl">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-300 text-yellow-300" />
                    ))}
                  </div>
                  <h3 className="text-xl font-bold">Ready to Transform Your Future?</h3>
                  <p className="text-blue-100">
                    Join hundreds of successful students who have prepared for UK education with our bootcamp.
                  </p>
                  <Button
                    asChild
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-gray-100 font-semibold"
                  >
                    <Link href="/bootcamp">
                      Register Now
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              For Recent Secondary School Graduates Heading to the UK or Abroad
            </h3>
            <p className="text-gray-600 mb-6">
              Don't wait until you arrive in the UK to learn these essential skills. 
              Start your journey prepared and confident with our comprehensive bootcamp.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
              >
                <Link href="/bootcamp">
                  Start Your Bootcamp Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
              >
                <Link href="/demo">
                  Book Free Consultation
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 