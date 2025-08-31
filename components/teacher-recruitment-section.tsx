"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Users, GraduationCap, Briefcase, UploadCloud, CheckCircle2, Trophy, Globe2, Lightbulb } from "lucide-react"
import { Card } from "@/components/ui/card"

const tabs = [
  { 
    key: "teach", 
    label: "Teach in UK", 
    icon: Users, 
    video: "/video/teach-uk.mp4", 
    description: "Launch your teaching career in the UK with comprehensive support and placement services.",
    benefits: [
      "Competitive salary packages starting from £32,000",
      "sponsorship assistance",
      "Relocation support and guidance",
      "Professional development opportunities"
    ],
    stats: { value: "2000+", label: "Teachers Placed" }
  },
  { 
    key: "learn", 
    label: "Get Qualified", 
    icon: GraduationCap, 
    video: "/video/get_qualified.mp4", 
    description: "Transform your career with our accredited teacher training programs and QTS certification pathway.",
    benefits: [
      "Recognized QTS qualification",
      "Practical classroom experience",
      "Mentor support throughout",
      "Flexible learning options"
    ],
    stats: { value: "96%", label: "Success Rate" }
  },
  { 
    key: "hire", 
    label: "Recruit Teachers", 
    icon: Briefcase, 
    video: "/video/recruit-teacher.mp4", 
    description: "Find exceptional teaching talent for your school through our comprehensive recruitment service.",
    benefits: [
      "Access to qualified international teachers",
      "Thorough vetting process",
      "Ongoing support and follow-up",
      "Compliance assistance"
    ],
    stats: { value: "500+", label: "Partner Schools" }
  },
]

const features = [
  { icon: CheckCircle2, title: "Verified Teachers", description: "All our teachers undergo thorough background checks and qualification verification" },
  { icon: Trophy, title: "Quality Education", description: "Committed to maintaining high standards in education through expert teacher placement" },
  { icon: Globe2, title: "Global Network", description: "Access to a diverse pool of international teaching talent" },
  { icon: Lightbulb, title: "Innovation Focus", description: "Emphasis on modern teaching methods and technological integration" },
]

export function TeacherRecruitmentSection() {
  const [activeTab, setActiveTab] = useState("teach")
  const tab = tabs.find(t => t.key === activeTab)

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold mb-6 text-gray-900 bg-gradient-to-r from-blue-600 to-green-600 inline-block text-transparent bg-clip-text"
          >
            Transform Your Teaching Career
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600"
          >
            Join thousands of educators who have found their perfect teaching opportunity through our comprehensive recruitment and training programs.
          </motion.p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-12 items-start mb-20">
          {/* Tabs & Content */}
          <div className="flex-1">
            <div className="flex flex-wrap gap-4 mb-8">
              {tabs.map(t => (
                <Button
                  key={t.key}
                  variant={activeTab === t.key ? "default" : "outline"}
                  onClick={() => setActiveTab(t.key)}
                  className="flex items-center gap-2 text-lg"
                  size="lg"
                >
                  <t.icon className="h-5 w-5" />
                  {t.label}
                </Button>
              ))}
            </div>
            <motion.div
              key={tab?.key}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-8 space-y-6"
            >
              <p className="text-xl text-gray-700">{tab?.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tab?.benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                    <p className="text-gray-600">{benefit}</p>
                  </motion.div>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-gradient-to-r from-blue-100 to-green-100 p-6 rounded-xl"
              >
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600">{tab?.stats.value}</div>
                  <div className="text-gray-600">{tab?.stats.label}</div>
                </div>
              </motion.div>
            </motion.div>
            <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-green-600 font-semibold">
              <Link href="/teacherhire">Learn More & Apply</Link>
            </Button>
          </div>
          {/* Animated Video */}
          <motion.div
            key={tab?.video}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex-1 flex justify-center"
          >
            <div className="relative">
              <video
                src={tab?.video}
                controls
                autoPlay
                loop
                muted
                className="rounded-2xl shadow-xl w-full max-w-md"
                style={{ background: "#eee" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl pointer-events-none" />
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                <feature.icon className="h-10 w-10 text-blue-600 mb-4" />
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Floating AI CV Button */}
      <Button
        className="fixed bottom-8 left-8 z-50 bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-lg flex items-center gap-2 px-6 py-3 rounded-full hover:scale-105 transition-transform"
        onClick={() => window.location.href = "/teacherhire?ai=1"}
        style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.12)" }}
      >
        <UploadCloud className="h-5 w-5" />
        AI: Upload CV & Check Eligibility
      </Button>
    </section>
  )
}
