"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Badge } from "@/components/ui/badge"
import {
  Menu,
  Phone,
  Mail,
  GraduationCap,
  Users,
  FileText,
  Globe,
  BookOpen,
  Award,
  UserCheck,
  Plane,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  {
    name: "Services",
    href: "/services",
    children: [
      {
        name: "UK Study Programs",
        href: "/services/study-programs",
        description: "Complete support for UK university applications and admissions",
        icon: GraduationCap,
      },
      {
        name: "Teacher Recruitment",
        href: "/services/teacher-recruitment",
        description: "Professional teacher placement services for UK schools",
        icon: Users,
      },
      {
        name: "Visa Assistance",
        href: "/services/visa-assistance",
        description: "Expert guidance for UK student and work visa applications",
        icon: FileText,
      },
      {
        name: "Online Tutoring",
        href: "/services/online-tutoring",
        description: "Personalized online education and exam preparation",
        icon: BookOpen,
      },
    ],
  },
  { name: "About", href: "/about" },
  { name: "Success Stories", href: "/success-stories" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
]

const quickLinks = [
  { name: "Free Demo", href: "/demo", icon: Award },
  { name: "Apply Now", href: "/apply", icon: UserCheck },
  { name: "UK Guide", href: "/uk-guide", icon: Globe },
  { name: "Visa Check", href: "/visa-check", icon: Plane },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Top Bar */}
      <div className="bg-blue-600 text-white py-2 text-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <a href="tel:+447946732789" className="hover:underline">
                  +44 7946 732789
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:contact@essentialtalent.co" className="hover:underline">
                  contact@essentialtalent.co
                </a>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                🎓 Free Demo Classes Available
              </Badge>
              <div className="flex space-x-2">
                {quickLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="flex items-center space-x-1 hover:underline text-xs"
                  >
                    <link.icon className="h-3 w-3" />
                    <span>{link.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={cn(
          "sticky top-0 z-50 w-full border-b transition-all duration-300",
          isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg dark:bg-gray-900/95" : "bg-white dark:bg-gray-900",
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <Image src="/logo.png" alt="Essential Talent Recruitment" width={40} height={40} className="rounded-lg" />
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Essential Talent</h1>
                <p className="text-xs text-gray-600 dark:text-gray-400">Recruitment Ltd</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList>
                {navigation.map((item) => (
                  <NavigationMenuItem key={item.name}>
                    {item.children ? (
                      <>
                        <NavigationMenuTrigger className="text-gray-700 dark:text-gray-300">
                          {item.name}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div className="grid w-[600px] gap-3 p-6 md:grid-cols-2">
                            {item.children.map((child) => (
                              <NavigationMenuLink key={child.name} asChild>
                                <Link
                                  href={child.href}
                                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                >
                                  <div className="flex items-center space-x-2">
                                    <child.icon className="h-4 w-4 text-blue-600" />
                                    <div className="text-sm font-medium leading-none">{child.name}</div>
                                  </div>
                                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                    {child.description}
                                  </p>
                                </Link>
                              </NavigationMenuLink>
                            ))}
                          </div>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <NavigationMenuLink asChild>
                        <Link
                          href={item.href}
                          className={cn(
                            "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
                            pathname === item.href && "bg-accent text-accent-foreground",
                          )}
                        >
                          {item.name}
                        </Link>
                      </NavigationMenuLink>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Button asChild variant="outline" size="sm">
                <Link href="/contact">Get Started</Link>
              </Button>
              <Button asChild size="sm" className="bg-gradient-to-r from-blue-600 to-blue-700">
                <Link href="/demo">Book Free Demo</Link>
              </Button>
            </div>

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="sm">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-6 mt-6">
                  <div className="flex items-center space-x-3">
                    <Image
                      src="/logo.png"
                      alt="Essential Talent Recruitment"
                      width={32}
                      height={32}
                      className="rounded-lg"
                    />
                    <div>
                      <h2 className="text-lg font-bold">Essential Talent</h2>
                      <p className="text-sm text-gray-600">Recruitment Ltd</p>
                    </div>
                  </div>

                  <nav className="flex flex-col space-y-4">
                    {navigation.map((item) => (
                      <div key={item.name}>
                        <Link
                          href={item.href}
                          className={cn(
                            "block py-2 text-lg font-medium transition-colors hover:text-blue-600",
                            pathname === item.href && "text-blue-600",
                          )}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                        {item.children && (
                          <div className="ml-4 mt-2 space-y-2">
                            {item.children.map((child) => (
                              <Link
                                key={child.name}
                                href={child.href}
                                className="block py-1 text-sm text-gray-600 hover:text-blue-600"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {child.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </nav>

                  <div className="space-y-3 pt-6 border-t">
                    <Button asChild className="w-full bg-transparent" variant="outline">
                      <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                        Get Started
                      </Link>
                    </Button>
                    <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-blue-700">
                      <Link href="/demo" onClick={() => setIsMobileMenuOpen(false)}>
                        Book Free Demo
                      </Link>
                    </Button>
                  </div>

                  <div className="space-y-3 pt-6 border-t">
                    <div className="text-sm text-gray-600">
                      <div className="flex items-center space-x-2 mb-2">
                        <Phone className="h-4 w-4" />
                        <a href="tel:+447946732789" className="hover:text-blue-600">
                          +44 7946 732789
                        </a>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4" />
                        <a href="mailto:contact@essentialtalent.co" className="hover:text-blue-600">
                          contact@essentialtalent.co
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  )
}
