"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin,
  Globe,
  GraduationCap,
  Users,
  Award,
} from "lucide-react"

const footerLinks = {
  services: [
    { name: "UK Study Programs", href: "/services/study-programs" },
    { name: "Teacher Recruitment", href: "/services/teacher-recruitment" },
    { name: "Visa Assistance", href: "/services/visa-assistance" },
    { name: "Online Tutoring", href: "/services/online-tutoring" },
    { name: "Career Guidance", href: "/services/career-guidance" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Our Team", href: "/about#team" },
    { name: "Success Stories", href: "/success-stories" },
    { name: "Blog", href: "/blog" },
    { name: "Careers", href: "/careers" },
  ],
  support: [
    { name: "Contact Us", href: "/contact" },
    { name: "FAQ", href: "/faq" },
    { name: "Help Center", href: "/help" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
  resources: [
    { name: "UK University Guide", href: "/resources/university-guide" },
    { name: "Visa Requirements", href: "/resources/visa-requirements" },
    { name: "Application Tips", href: "/resources/application-tips" },
    { name: "Scholarship Info", href: "/resources/scholarships" },
    { name: "Living in UK", href: "/resources/living-in-uk" },
  ],
}

const socialLinks = [
  { name: "Facebook", href: "https://www.facebook.com/essentialtalent", icon: Facebook },
  { name: "Twitter", href: "https://twitter.com/essentialtalent", icon: Twitter },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/essential-talent-recruitment", icon: Linkedin },
  { name: "Instagram", href: "https://www.instagram.com/essentialtalent", icon: Instagram },
]

const quickStats = [
  { icon: Users, value: "5000+", label: "Students Placed" },
  { icon: GraduationCap, value: "200+", label: "Partner Universities" },
  { icon: Globe, value: "50+", label: "Countries Served" },
  { icon: Award, value: "98%", label: "Success Rate" },
]

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center space-x-3">
              <Image src="/logo.png" alt="Essential Talent Recruitment" width={40} height={40} className="rounded-lg" />
              <div>
                <h3 className="text-xl font-bold">Essential Talent</h3>
                <p className="text-sm text-gray-400">Recruitment Ltd</p>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed">
              Bridging dreams with opportunities. We help talented individuals achieve their UK education and career
              goals through comprehensive support services.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <MapPin className="h-4 w-4 text-blue-400 flex-shrink-0" />
                <span className="text-gray-300">Bridge Road, Letchworth Garden City, London, United Kingdom</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="h-4 w-4 text-blue-400 flex-shrink-0" />
                <a href="tel:+447946732789" className="text-gray-300 hover:text-white transition-colors">
                  +44 7946 732789
                </a>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="h-4 w-4 text-blue-400 flex-shrink-0" />
                <a
                  href="mailto:contact@essentialtalent.co"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  contact@essentialtalent.co
                </a>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Globe className="h-4 w-4 text-blue-400 flex-shrink-0" />
                <a href="https://www.essentialtalent.co" className="text-gray-300 hover:text-white transition-colors">
                  www.essentialtalent.co
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                  aria-label={`Follow us on ${social.name}`}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Our Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-300 hover:text-white transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-300 hover:text-white transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Stay Updated</h4>
            <p className="text-gray-300 text-sm mb-4">
              Subscribe to our newsletter for the latest updates on UK education opportunities and success stories.
            </p>
            <div className="space-y-3">
              <div className="flex space-x-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                />
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-gray-400">
                By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <Separator className="my-12 bg-gray-700" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Additional Links */}
        <Separator className="my-12 bg-gray-700" />
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="grid grid-cols-2 gap-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-300 hover:text-white transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="grid grid-cols-2 gap-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-300 hover:text-white transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © {new Date().getFullYear()} Essential Talent Recruitment Ltd. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </Link>
              <Link href="/sitemap" className="text-gray-400 hover:text-white transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
