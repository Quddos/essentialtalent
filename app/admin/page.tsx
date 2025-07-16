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
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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

// Fetch demo bookings from API
function useDemoBookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetch("/api/demo-bookings")
      .then(res => res.json())
      .then(data => {
        setBookings(data)
        setLoading(false)
      })
  }, [])
  return { bookings, loading }
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loginForm, setLoginForm] = useState({ email: "", password: "" })
  const [searchTerm, setSearchTerm] = useState("")
  const { bookings: demoBookings, loading: bookingsLoading } = useDemoBookings()
  const [showAddAdmin, setShowAddAdmin] = useState(false)
  const [adminEmail, setAdminEmail] = useState("")
  const [adminPassword, setAdminPassword] = useState("")
  const [addAdminError, setAddAdminError] = useState("")
  const [addAdminSuccess, setAddAdminSuccess] = useState("")
  const [applications, setApplications] = useState([])
  const [applicationsLoading, setApplicationsLoading] = useState(true)
  useEffect(() => {
    fetch("/api/applications")
      .then(res => res.json())
      .then(data => {
        setApplications(data)
        setApplicationsLoading(false)
      })
  }, [])
  const [currentAdmin, setCurrentAdmin] = useState<{ email: string; role: string } | null>(null)
  const [adminUsers, setAdminUsers] = useState<any[]>([])

  // Check authentication on component mount
  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken")
    if (adminToken === "admin-authenticated") {
      setIsAuthenticated(true)
    }
  }, [])

  // Fetch current admin info after login
  useEffect(() => {
    if (isAuthenticated) {
      fetch(`/api/admin/users?email=${loginForm.email}`)
        .then(res => res.json())
        .then(data => setCurrentAdmin(data))
      fetch('/api/admin/users')
        .then(res => res.json())
        .then(setAdminUsers)
    }
  }, [isAuthenticated])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // Call the API to check credentials
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: loginForm.email, password: loginForm.password }),
    });
    const data = await res.json();
    if (data.success) {
      localStorage.setItem("adminToken", "admin-authenticated");
      setIsAuthenticated(true);
    } else {
      alert(data.error || "Invalid credentials.");
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
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>Created At</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {demoBookings.map((booking: any) => (
                      <TableRow key={booking.id}>
                        <TableCell>{booking.name}</TableCell>
                        <TableCell>{booking.email}</TableCell>
                        <TableCell>{booking.phone}</TableCell>
                        <TableCell>{booking.service}</TableCell>
                        <TableCell>{booking.date}</TableCell>
                        <TableCell>{booking.time}</TableCell>
                        <TableCell>{booking.message}</TableCell>
                        <TableCell>{new Date(booking.created_at).toLocaleString()}</TableCell>
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
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Admin Users</h2>
          {currentAdmin?.email === "superadmin@essentialtalent.co" && (
            <Button onClick={() => setShowAddAdmin(true)} className="bg-blue-600 text-white">Add Admin User</Button>
          )}
        </div>
        {/* Admin Users Table */}
        <div className="overflow-x-auto mb-8">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                {currentAdmin?.email === "superadmin@essentialtalent.co" && <TableHead>Change Role</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {adminUsers.map((user: any) => (
                <TableRow key={user.email}>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  {currentAdmin?.email === "superadmin@essentialtalent.co" && (
                    <TableCell>
                      <Select
                        value={user.role}
                        onValueChange={async (newRole) => {
                          await fetch('/api/admin/users', {
                            method: 'PATCH',
                            headers: {
                              'Content-Type': 'application/json',
                              'x-admin-email': currentAdmin.email,
                            },
                            body: JSON.stringify({ email: user.email, role: newRole }),
                          })
                          setAdminUsers((prev) => prev.map((u) => u.email === user.email ? { ...u, role: newRole } : u))
                        }}
                        disabled={user.email === "superadmin@essentialtalent.co"}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">admin</SelectItem>
                          <SelectItem value="superadmin">superadmin</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Dialog open={showAddAdmin} onOpenChange={setShowAddAdmin}>
          <DialogContent>
            <h3 className="text-lg font-bold mb-4">Add Admin User</h3>
            <form
              onSubmit={async (e) => {
                e.preventDefault()
                setAddAdminError("")
                setAddAdminSuccess("")
                const res = await fetch("/api/admin/users", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "x-admin-email": currentAdmin?.email || "",
                  },
                  body: JSON.stringify({ email: adminEmail, password: adminPassword }),
                })
                const data = await res.json()
                if (data.success) {
                  setAddAdminSuccess("Admin user added successfully!")
                  setAdminEmail("")
                  setAdminPassword("")
                  // Refresh admin users list
                  fetch('/api/admin/users').then(res => res.json()).then(setAdminUsers)
                } else {
                  setAddAdminError(data.error || "Failed to add admin user")
                }
              }}
              className="space-y-4"
            >
              <Input
                type="email"
                placeholder="Admin Email"
                value={adminEmail}
                onChange={e => setAdminEmail(e.target.value)}
                required
              />
              <Input
                type="password"
                placeholder="Password"
                value={adminPassword}
                onChange={e => setAdminPassword(e.target.value)}
                required
              />
              {addAdminError && <div className="text-red-500 text-sm">{addAdminError}</div>}
              {addAdminSuccess && <div className="text-green-600 text-sm">{addAdminSuccess}</div>}
              <Button type="submit" className="w-full bg-blue-600 text-white">Add Admin</Button>
            </form>
          </DialogContent>
        </Dialog>
        {/* Applications Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">User Applications</h2>
          {applicationsLoading ? (
            <div className="text-center py-8 text-gray-500">Loading applications...</div>
          ) : applications.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No applications found.</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Country</TableHead>
                    <TableHead>Program</TableHead>
                    <TableHead>Documents</TableHead>
                    <TableHead>Submitted</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applications.map((app: any) => (
                    <TableRow key={app.id}>
                      <TableCell>{app.full_name}</TableCell>
                      <TableCell>{app.email}</TableCell>
                      <TableCell>{app.phone_number}</TableCell>
                      <TableCell>{app.country}</TableCell>
                      <TableCell>{app.bachelor_program || app.graduate_program || "-"}</TableCell>
                      <TableCell>
                        {/* TODO: Fetch and list documents for this application, with download links */}
                        <ApplicationDocuments applicationId={app.id} />
                      </TableCell>
                      <TableCell>{new Date(app.created_at).toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ApplicationDocuments({ applicationId }: { applicationId: number }) {
  const [docs, setDocs] = useState<any[]>([])
  useEffect(() => {
    fetch(`/api/application-documents?applicationId=${applicationId}`)
      .then(res => res.json())
      .then(setDocs)
  }, [applicationId])
  if (!docs.length) return <span>No documents</span>
  return (
    <ul className="space-y-1">
      {docs.map(doc => (
        <li key={doc.id}>
          <a href={doc.file_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
            {doc.file_name}
          </a>
        </li>
      ))}
    </ul>
  )
}
