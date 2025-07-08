"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Linkedin, Users, Target, Globe, Heart } from "lucide-react"

// Note: This would normally be in a separate metadata export, but since this is a client component,
// we'll add the meta tags via next/head in a separate component or convert to server component
const pageMetadata = {
  title: "About Us - Essential Talent Recruitment",
  description:
    "Learn about Essential Talent Recruitment's mission to connect talented individuals with UK education and career opportunities. Meet our founder Eng. Oluwafemi Victoria and our expert team.",
  keywords:
    "about essential talent recruitment, UK education consultancy, international recruitment company, Dr Sarah Johnson CEO, UK immigration experts",
  openGraph: {
    title: "About Essential Talent Recruitment - Our Story & Team",
    description:
      "Discover how Essential Talent Recruitment bridges dreams with opportunities. Meet our founder and expert team dedicated to your UK education and career success.",
    images: ["/ceo.jpeg"],
  },
}

const teamMembers = [
  {
    name: "Eng. Oluwafemi Victoria",
    position: "Chief Executive Officer",
    image: "/ceo.jpeg",
    linkedin: "https://www.linkedin.com/in/sarah-johnson-ceo",
    bio: "Visionary leader with 15+ years in international education and recruitment.",
  },
  {
    name: "Michael Chen",
    position: "Head of UK Study Programs",
    image: "/placeholder.svg?height=300&width=300",
    linkedin: "https://www.linkedin.com/in/michael-chen-education",
    bio: "Expert in UK university partnerships and student placement strategies.",
  },
  {
    name: "Priya Patel",
    position: "Teacher Recruitment Director",
    image: "/placeholder.svg?height=300&width=300",
    linkedin: "https://www.linkedin.com/in/priya-patel-recruitment",
    bio: "Specialist in connecting qualified teachers with UK educational institutions.",
  },
  {
    name: "James Wilson",
    position: "Visa & Immigration Consultant",
    image: "/placeholder.svg?height=300&width=300",
    linkedin: "https://www.linkedin.com/in/james-wilson-immigration",
    bio: "Licensed immigration advisor with expertise in UK work and study visas.",
  },
  {
    name: "Fatima Al-Rashid",
    position: "Student Success Manager",
    image: "/placeholder.svg?height=300&width=300",
    linkedin: "https://www.linkedin.com/in/fatima-al-rashid",
    bio: "Dedicated to ensuring student success throughout their UK journey.",
  },
  {
    name: "David Thompson",
    position: "Online Education Coordinator",
    image: "/placeholder.svg?height=300&width=300",
    linkedin: "https://www.linkedin.com/in/david-thompson-education",
    bio: "Technology-driven educator specializing in online learning platforms.",
  },
  {
    name: "Martin J",
    position: "Human Resources Director",
    image: "/Human Resources Director.jpeg",
    linkedin: "#",
    bio: "Experienced HR leader dedicated to building strong, diverse teams and supporting talent growth.",
  },
  {
    name: "Jeremiah Johnson",
    position: "Chief AI Officer",
    image: "/Chief AI officer.jpeg",
    linkedin: "#",
    bio: "AI strategist focused on leveraging technology to drive innovation and operational excellence.",
  },
]

const companyValues = [
  {
    icon: Target,
    title: "Excellence",
    description:
      "We strive for excellence in every service we provide, ensuring the highest standards for our clients.",
  },
  {
    icon: Heart,
    title: "Integrity",
    description: "We operate with complete transparency and honesty, building trust through ethical practices.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "We connect talent across borders, creating opportunities that transcend geographical boundaries.",
  },
  {
    icon: Users,
    title: "Partnership",
    description:
      "We believe in building lasting partnerships with our clients, students, and educational institutions.",
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Page-specific structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            mainEntity: {
              "@type": "Organization",
              name: "Essential Talent Recruitment Ltd",
              url: "https://www.essentialtalent.co",
              description:
                "Leading UK recruitment company helping talented individuals achieve their dreams through study, work, and career opportunities.",
              founder: {
                "@type": "Person",
                name: "Eng. Oluwafemi Victoria",
                jobTitle: "Chief Executive Officer",
                image: "https://www.essentialtalent.co/ceo.jpg",
              },
              employee: teamMembers.map((member) => ({
                "@type": "Person",
                name: member.name,
                jobTitle: member.position,
                sameAs: member.linkedin,
              })),
            },
          }),
        }}
      />

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <Badge className="mb-6 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                About Essential Talent Recruitment
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Bridging Dreams with
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500">
                  {" "}
                  Opportunities
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                We are passionate about connecting talented individuals with life-changing opportunities in the UK. Our
                mission is to make quality education and career advancement accessible to everyone, everywhere.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Company Story */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">Our Story</h2>
                <div className="space-y-4 text-gray-600 dark:text-gray-300">
                  <p>
                    Founded with a vision to democratize access to UK education and career opportunities, Essential
                    Talent Recruitment has grown from a small consultancy to a trusted global partner for thousands of
                    students and professionals.
                  </p>
                  <p>
                    We understand the challenges of navigating international education systems, visa processes, and
                    career transitions. That's why we've built a comprehensive platform that provides end-to-end support
                    for every step of your journey.
                  </p>
                  <p>
                    Our success is measured not just in numbers, but in the transformed lives of our clients who have
                    achieved their dreams of studying, working, and building successful careers in the UK.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative"
              >
                <Image
                  src="/placeholder.svg?height=500&width=600"
                  alt="Essential Talent Recruitment office"
                  width={600}
                  height={500}
                  className="rounded-2xl shadow-2xl"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Company Values */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Core Values</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                These principles guide everything we do and shape our commitment to excellence
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {companyValues.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full text-center p-6 hover:shadow-lg transition-shadow">
                    <CardContent className="space-y-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto">
                        <value.icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{value.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Founder Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Meet Our Founder</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Visionary leadership driving our mission to transform lives through education and opportunity
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative h-96 md:h-auto">
                      <Image src="/ceo.jpeg" alt="Eng. Oluwafemi Victoria - CEO & Founder" fill className="object-cover" />
                    </div>
                    <div className="p-8 md:p-12 flex flex-col justify-center">
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Eng. Oluwafemi Victoria
                      </h3>
                      <p className="text-blue-600 dark:text-blue-400 font-semibold mb-4">CEO & Founder</p>
                      <div className="space-y-4 text-gray-600 dark:text-gray-300 mb-6">
                        <p>
                          With over 15 years of experience in international education and recruitment, Dr. Johnson
                          founded Essential Talent Recruitment with a simple yet powerful vision: to make quality UK
                          education accessible to talented individuals worldwide.
                        </p>
                        <p>
                          Her expertise in educational policy, combined with a deep understanding of the challenges
                          faced by international students and professionals, has shaped our comprehensive approach to
                          recruitment and support services.
                        </p>
                      </div>
                      <Button asChild variant="outline" className="w-fit bg-transparent">
                        <Link href="https://www.linkedin.com/in/sarah-johnson-ceo" target="_blank">
                          <Linkedin className="mr-2 h-4 w-4" />
                          Connect on LinkedIn
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Talented Team</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Meet the dedicated professionals who make your success their priority
              </p>
            </motion.div>

            {/* Team Carousel */}
            <div className="relative overflow-hidden">
              <motion.div
                className="flex gap-6"
                animate={{ x: [0, -100 * (teamMembers.length - 3)] }}
                transition={{
                  duration: 20,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                {[...teamMembers, ...teamMembers].map((member, index) => (
                  <motion.div
                    key={`${member.name}-${index}`}
                    className="flex-shrink-0 w-80"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="h-full">
                      <CardContent className="p-6 text-center">
                        <div className="relative w-32 h-32 mx-auto mb-4">
                          <Image
                            src={member.image || "/placeholder.svg"}
                            alt={member.name}
                            fill
                            className="object-cover rounded-full"
                          />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">{member.name}</h3>
                        <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">{member.position}</p>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{member.bio}</p>
                        <Button asChild variant="outline" size="sm">
                          <Link href={member.linkedin} target="_blank">
                            <Linkedin className="mr-2 h-4 w-4" />
                            LinkedIn
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center max-w-4xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Ready to Start Your Journey?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Join thousands of successful students and professionals who have achieved their UK dreams with our
                support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700">
                  <Link href="/demo">Book Free Consultation</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}
