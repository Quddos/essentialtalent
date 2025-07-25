"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Clock, Users, Star, Gift } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"
import { useState } from "react"

const demoFeatures = [
  {
    icon: Gift,
    title: "Free First Session",
    description: "Your first demo class is completely free with no obligations",
  },
  {
    icon: Clock,
    title: "30-60 Minutes",
    description: "Comprehensive session tailored to your specific needs",
  },
  {
    icon: Users,
    title: "Expert Tutors",
    description: "Learn from qualified UK-based professionals",
  },
  {
    icon: Star,
    title: "Personalized",
    description: "Customized content based on your goals and level",
  },
]

export function DemoSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <Badge className="mb-4 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                🎁 Limited Time Offer
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Experience Our
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-500">
                  {" "}
                  Free Demo
                </span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                Get a taste of our world-class education services with a completely free demo session. No commitments,
                no hidden fees - just quality education at your fingertips.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {demoFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-3"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{feature.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 text-lg"
              >
                <Link href="/demo">
                  <Play className="mr-2 h-5 w-5" />
                  Book Free Demo Now
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 px-8 py-4 text-lg"
              >
                <Link href="#">Learn More</Link>
              </Button>
            </motion.div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-green-500 border-2 border-white dark:border-gray-800"
                    />
                  ))}
                </div>
                <div>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Trusted by 10,000+ students worldwide</p>
                </div>
              </div>
              <blockquote className="text-gray-700 dark:text-gray-300 italic">
                "The free demo gave me confidence to pursue my UK teaching career. The guidance was exceptional and
                completely changed my perspective."
              </blockquote>
              <cite className="text-sm text-gray-500 dark:text-gray-400 mt-2 block">
                - Sarah M., Teacher from Nigeria
              </cite>
            </div>
          </motion.div>

          {/* Demo Video/Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <Dialog>
              <DialogTrigger asChild>
                <div className="relative cursor-pointer group">
                  <img
                    src="/hero-students.jpg"
                    alt="Demo Session Preview"
                    className="w-full h-64 object-cover rounded-t-lg"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-100 group-hover:bg-black/60 transition">
                    <button
                      className="flex items-center justify-center w-16 h-16 bg-white/80 rounded-full shadow-lg hover:bg-white/90 transition"
                      aria-label="Play Demo Video"
                    >
                      <Play className="w-8 h-8 text-green-600" />
                    </button>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-2xl p-0 overflow-hidden">
                <div className="relative w-full aspect-video bg-black">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/nkB_iieAmP0?autoplay=1"
                    title="Essential Talent Demo Session"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
              </DialogContent>
            </Dialog>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Watch Sample Demo Session</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                See how our expert tutors deliver personalized education experiences
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>Duration: 45 minutes</span>
                <span>Subject: IELTS Preparation</span>
              </div>
            </CardContent>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
