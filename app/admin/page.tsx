"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Users,
  GraduationCap,
  Calendar,
  TrendingUp,
  Mail,
  Phone,
  Eye,
  Edit,
  Trash2,
  Download,
  Filter,
  Search,
} from "lucide-react"

// Mock data for demonstration
const dashboardStats = [
  {
    title: "Total Students",
    value: "1,234",
    change: "+12%",
    icon: Users,
    color: "text-blue-600",
  },
  {
    title: "Active Applications",
    value: "89",
    change: "+5%",
    icon: GraduationCap,
    color: "text-green-600",
  },
  {
    title: "Demo Sessions",
    value: "156",
    change: "+23%",
    icon: Calendar,
    color: "text-purple-600",
  },
  {
    title: "Success Rate",
    value: "98%",
    change: "+2%",
    icon: TrendingUp,
    color: "text-orange-600",
  },
]

const recentApplications = [
  {
    id: "1",
    name: "John Smith",
    email: "john@example.com",
    service: "UK Study Programs",
    status: "pending",
    date: "2024-01-15",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    service: "Teacher Recruitment",
    status: "approved",
    date: "2024-01-14",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Ahmed Hassan",
    email: "ahmed@example.com",
    service: "Visa Assistance",
    status: "in-review",
    date: "2024-01-13",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    name: "Priya Patel",
    email: "priya@example.com",
    service: "Online Tutoring",
    status: "approved",
    date: "2024-01-12",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const demoBookings = [
  {
    id: "1",
    name: "Michael Chen",
    email: "michael@example.com",
    phone: "+44 7123 456789",
    service: "UK Study Programs",
    date: "2024-01-20",
    time: "10:00 AM",
    status: "confirmed",
  },
  {
    id: "2",
    name: "Lisa Wang",
    email: "lisa@example.com",
    phone: "+44 7987 654321",
    service: "Teacher Recruitment",
    date: "2024-01-21",
    time: "2:00 PM",
    status: "pending",
  },
]

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loginForm, setLoginForm] = useState({ email: "", password: "" })
  const [searchTerm, setSearchTerm] = useState("")

  // Check authentication on component mount
  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken")
    if (adminToken === "admin-authenticated") {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple authentication check (in production, use proper authentication)
    if (loginForm.email === "admin@essentialtalent.co" && loginForm.password === "admin123") {
      localStorage.setItem("adminToken", "admin-authenticated")
      setIsAuthenticated(true)
    } else {
      alert("Invalid credentials. Use admin@essentialtalent.co / admin123")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    setIsAuthenticated(false)
    setLoginForm({ email: "", password: "" })
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: "bg-yellow-100 text-yellow-800", label: "Pending" },
      approved: { color: "bg-green-100 text-green-800", label: "Approved" },
      "in-review": { color: "bg-blue-100 text-blue-800", label: "In Review" },
      confirmed: { color: "bg-green-100 text-green-800", label: "Confirmed" },
      rejected: { color: "bg-red-100 text-red-800", label: "Rejected" },
    }
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
    return <Badge className={config.color}>{config.label}</Badge>
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Admin Login</CardTitle>
              <CardDescription>Access the Essential Talent admin dashboard</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                    placeholder="admin@essentialtalent.co"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    placeholder="Enter password"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </form>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-700">
                <strong>Demo Credentials:</strong>
                <br />
                Email: admin@essentialtalent.co
                <br />
                Password: admin123
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Essential Talent Recruitment</p>
            </div>
            <Button onClick={handleLogout} variant="outline">
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardStats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-green-600">{stat.change} from last month</p>
                    </div>
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="applications" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="demos">Demo Bookings</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Applications Tab */}
          <TabsContent value="applications">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Recent Applications</CardTitle>
                    <CardDescription>Manage student applications and inquiries</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 mb-4">
                  <Search className="h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search applications..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentApplications.map((application) => (
                      <TableRow key={application.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarImage src={application.avatar || "/placeholder.svg"} />
                              <AvatarFallback>{application.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{application.name}</p>
                              <p className="text-sm text-gray-600">{application.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{application.service}</TableCell>
                        <TableCell>{getStatusBadge(application.status)}</TableCell>
                        <TableCell>{application.date}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Demo Bookings Tab */}
          <TabsContent value="demos">
            <Card>
              <CardHeader>
                <CardTitle>Demo Bookings</CardTitle>
                <CardDescription>Manage scheduled demo sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {demoBookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">{booking.name}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center text-sm">
                              <Mail className="h-3 w-3 mr-1" />
                              {booking.email}
                            </div>
                            <div className="flex items-center text-sm">
                              <Phone className="h-3 w-3 mr-1" />
                              {booking.phone}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{booking.service}</TableCell>
                        <TableCell>
                          <div>
                            <p>{booking.date}</p>
                            <p className="text-sm text-gray-600">{booking.time}</p>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(booking.status)}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students">
            <Card>
              <CardHeader>
                <CardTitle>Student Management</CardTitle>
                <CardDescription>View and manage all registered students</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Student management features coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>Configure system preferences and settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Email Notifications</h3>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked />
                        <span>New application notifications</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked />
                        <span>Demo booking confirmations</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" />
                        <span>Weekly summary reports</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-4">System Preferences</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="timezone">Timezone</Label>
                        <Input id="timezone" value="Europe/London" readOnly />
                      </div>
                      <div>
                        <Label htmlFor="language">Language</Label>
                        <Input id="language" value="English (UK)" readOnly />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
