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
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// @ts-ignore
import * as XLSX from 'xlsx';

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

// Remove the recentApplications array

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
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const { bookings: demoBookings, loading: bookingsLoading } = useDemoBookings()
  const [showAddAdmin, setShowAddAdmin] = useState(false)
  const [adminEmail, setAdminEmail] = useState("")
  const [adminPassword, setAdminPassword] = useState("")
  const [addAdminError, setAddAdminError] = useState("")
  const [addAdminSuccess, setAddAdminSuccess] = useState("")
  const [applications, setApplications] = useState([])
  const [applicationsLoading, setApplicationsLoading] = useState(true)
  const [bootcampRegistrations, setBootcampRegistrations] = useState([])
  const [bootcampLoading, setBootcampLoading] = useState(true)
  useEffect(() => {
    fetch("/api/applications")
      .then(res => res.json())
      .then(data => {
        setApplications(data)
        setApplicationsLoading(false)
      })
  }, [])

  useEffect(() => {
    fetch("/api/bootcamp")
      .then(res => res.json())
      .then(data => {
        setBootcampRegistrations(data)
        setBootcampLoading(false)
      })
      .catch(() => {
        setBootcampRegistrations([])
        setBootcampLoading(false)
      })
  }, [])
  const [currentAdmin, setCurrentAdmin] = useState<{ email: string; role: string } | null>(null)
  const [adminUsers, setAdminUsers] = useState<any[]>([])
  const [selectedApplication, setSelectedApplication] = useState<any | null>(null);

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

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this application?')) return;
    await fetch(`/api/applications?id=${id}`, { method: 'DELETE' });
    setApplications(applications.filter((app: any) => app.id !== id));
  };
  const handleEdit = (application: any) => {
    // Placeholder for edit logic
  };

  const handleExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(applications);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Applications');
    XLSX.writeFile(wb, 'applications.xlsx');
  };

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

  const filteredApplications = applications.filter((app: any) => {
    const matchesSearch =
      app.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (app.bachelor_program?.toLowerCase().includes(searchTerm.toLowerCase()) || "") ||
      (app.graduate_program?.toLowerCase().includes(searchTerm.toLowerCase()) || "");
    const matchesStatus = statusFilter === "all" ? true : (app.status || "pending") === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="demos">Demo Bookings</TabsTrigger>
            <TabsTrigger value="bootcamp">Bootcamp</TabsTrigger>
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
                    <Button variant="outline" size="sm" onClick={handleExportExcel}>
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
                  <Select value={statusFilter} onValueChange={v => setStatusFilter(v)}>
                    <SelectTrigger className="w-32 ml-2">
                      <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="in-review">In Review</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
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
                    {filteredApplications.map((application: any) => (
                      <TableRow key={application.id} onClick={() => setSelectedApplication(application)} className="cursor-pointer">
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarImage src={"/placeholder.svg"} />
                              <AvatarFallback>{application.full_name?.charAt(0) || "-"}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{application.full_name}</p>
                              <p className="text-sm text-gray-600">{application.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{application.bachelor_program || application.graduate_program || "-"}</TableCell>
                        <TableCell>{getStatusBadge(application.status || "pending")}</TableCell>
                        <TableCell>{new Date(application.created_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm" onClick={e => { e.stopPropagation(); setSelectedApplication(application); }}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={e => { e.stopPropagation(); handleEdit(application); }}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={e => { e.stopPropagation(); handleDelete(application.id); }}>
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

          {/* Bootcamp Tab */}
          <TabsContent value="bootcamp">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Bootcamp Registrations</CardTitle>
                    <CardDescription>Manage UK-Ready Bootcamp registrations</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => {
                      const ws = XLSX.utils.json_to_sheet(bootcampRegistrations);
                      const wb = XLSX.utils.book_new();
                      XLSX.utils.book_append_sheet(wb, ws, 'Bootcamp Registrations');
                      XLSX.writeFile(wb, 'bootcamp-registrations.xlsx');
                    }}>
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {bootcampLoading ? (
                  <div className="text-center py-8 text-gray-500">Loading bootcamp registrations...</div>
                ) : bootcampRegistrations.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">No bootcamp registrations found.</div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Gender</TableHead>
                          <TableHead>Country</TableHead>
                          <TableHead>Target Country</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Phone</TableHead>
                          <TableHead>UK Admitted</TableHead>
                          <TableHead>Available</TableHead>
                          <TableHead>Tech Access</TableHead>
                          <TableHead>Registered</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {bootcampRegistrations.map((registration: any) => (
                          <TableRow key={registration.id}>
                            <TableCell className="font-medium">{registration.full_name}</TableCell>
                            <TableCell>{registration.gender}</TableCell>
                            <TableCell>{registration.country_of_origin}</TableCell>
                            <TableCell>{registration.country_willing_to_relocate}</TableCell>
                            <TableCell>{registration.student_email}</TableCell>
                            <TableCell>{registration.mobile_number}</TableCell>
                            <TableCell>
                              {registration.is_admitted_to_uk_university ? (
                                <Badge className="bg-green-100 text-green-800">
                                  {registration.uk_university_name || 'Yes'}
                                </Badge>
                              ) : (
                                <Badge className="bg-gray-100 text-gray-800">No</Badge>
                              )}
                            </TableCell>
                            <TableCell>
                              {registration.available_for_virtual_training ? (
                                <Badge className="bg-green-100 text-green-800">Yes</Badge>
                              ) : (
                                <Badge className="bg-red-100 text-red-800">No</Badge>
                              )}
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                {registration.has_laptop && (
                                  <Badge className="bg-blue-100 text-blue-800 text-xs">Laptop</Badge>
                                )}
                                {registration.has_internet_access && (
                                  <Badge className="bg-green-100 text-green-800 text-xs">Internet</Badge>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>{new Date(registration.created_at).toLocaleDateString()}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
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
      <Dialog open={!!selectedApplication} onOpenChange={() => setSelectedApplication(null)}>
        <DialogContent>
          {selectedApplication && (
            <div>
              <DialogTitle>Application Details</DialogTitle>
              <div className="mb-4">
                <p><strong>Name:</strong> {selectedApplication.full_name}</p>
                <p><strong>Email:</strong> {selectedApplication.email}</p>
                <p><strong>Phone:</strong> {selectedApplication.phone_number}</p>
                <p><strong>Country:</strong> {selectedApplication.country}</p>
                <p><strong>Program:</strong> {selectedApplication.bachelor_program || selectedApplication.graduate_program || "-"}</p>
                {/* Add more fields as needed */}
              </div>
              {/* Placeholder for file download */}
              <div className="mb-4">
                <ApplicationDocuments applicationId={selectedApplication.id} />
              </div>
              {/* Print and Close buttons */}
              <div className="flex space-x-2">
                <Button onClick={() => window.print()}>Print as PDF</Button>
                <Button variant="outline" onClick={() => setSelectedApplication(null)}>Close</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
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
          <a href={doc.file_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-semibold">
            {doc.file_name} (Download)
          </a>
        </li>
      ))}
    </ul>
  )
}
